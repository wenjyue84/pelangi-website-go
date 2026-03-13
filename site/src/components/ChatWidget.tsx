'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

type MessageRole = 'user' | 'assistant' | 'staff';

interface Message {
  role: MessageRole;
  content: string;
  timestamp: number;
}

const PROFILE_ID = 'pelangi';
const SESSION_KEY = 'webchat_pelangi';
const GREETING =
  "Hi! 👋 Welcome to Pelangi Capsule Hostel. I'm Rainbow, your AI assistant. Ask me anything about our rooms, pricing, check-in, or nearby attractions!";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [lastPollTs, setLastPollTs] = useState(0);
  const [hasUnread, setHasUnread] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ─── Init: load session + history (or set greeting) ───────────────
  useEffect(() => {
    let sid = sessionStorage.getItem(SESSION_KEY + '_sid') ?? '';
    if (!sid) {
      sid = 'web_' + Math.random().toString(36).slice(2, 10) + '_' + Date.now();
      sessionStorage.setItem(SESSION_KEY + '_sid', sid);
    }
    setSessionId(sid);

    try {
      const raw = sessionStorage.getItem(SESSION_KEY + '_history');
      const saved: Message[] = raw ? JSON.parse(raw) : [];
      if (saved.length > 0) {
        setMessages(saved);
      } else {
        setMessages([{ role: 'assistant', content: GREETING, timestamp: Date.now() }]);
      }
    } catch {
      setMessages([{ role: 'assistant', content: GREETING, timestamp: Date.now() }]);
    }

    setLastPollTs(Date.now());
  }, []);

  // ─── Auto-scroll to bottom ─────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, sending]);

  // ─── Focus input when opened + notify other components ─────────────
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('chatwidget-toggle', { detail: isOpen }));
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [isOpen]);

  // ─── Persist history ───────────────────────────────────────────────
  const saveHistory = useCallback((msgs: Message[]) => {
    try {
      sessionStorage.setItem(SESSION_KEY + '_history', JSON.stringify(msgs.slice(-50)));
    } catch {}
  }, []);

  // ─── Poll for staff replies ────────────────────────────────────────
  useEffect(() => {
    if (!sessionId) return;

    if (pollRef.current) clearInterval(pollRef.current);

    pollRef.current = setInterval(async () => {
      try {
        const url =
          `/api/chat/${PROFILE_ID}/messages/${encodeURIComponent(sessionId)}` +
          `?after=${lastPollTs}`;
        const resp = await fetch(url);
        if (!resp.ok) return;
        const data = await resp.json();
        if (!data.messages?.length) return;

        const staffMsgs: Message[] = data.messages
          .filter((m: { role: string }) => m.role === 'staff')
          .map((m: { content: string; timestamp: number }) => ({
            role: 'staff' as MessageRole,
            content: m.content,
            timestamp: m.timestamp,
          }));

        if (staffMsgs.length > 0) {
          setMessages(prev => {
            const updated = [...prev, ...staffMsgs];
            saveHistory(updated);
            return updated;
          });
          if (!isOpen) setHasUnread(true);
        }

        const maxTs = Math.max(...data.messages.map((m: { timestamp: number }) => m.timestamp));
        if (maxTs > lastPollTs) setLastPollTs(maxTs);
      } catch {
        // Silent fail — polling continues
      }
    }, 5000);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, lastPollTs, saveHistory]);

  // ─── Send message ──────────────────────────────────────────────────
  const sendMessage = async () => {
    const text = input.trim();
    if (!text || sending) return;

    setInput('');
    setSending(true);

    const userMsg: Message = { role: 'user', content: text, timestamp: Date.now() };

    setMessages(prev => {
      const updated = [...prev, userMsg];
      saveHistory(updated);
      return updated;
    });

    try {
      const historyForApi = messages.slice(-20).map(m => ({
        role: m.role === 'staff' ? 'assistant' : m.role,
        content: m.content,
      }));

      const resp = await fetch(`/api/chat/${PROFILE_ID}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: historyForApi, sessionId }),
      });

      const data = await resp.json();

      // Server may assign a sessionId on first message
      if (data.sessionId && data.sessionId !== sessionId) {
        setSessionId(data.sessionId);
        sessionStorage.setItem(SESSION_KEY + '_sid', data.sessionId);
      }

      const botMsg: Message = {
        role: 'assistant',
        content: data.message || 'Sorry, I could not process that. Please try again.',
        timestamp: Date.now(),
      };

      setMessages(prev => {
        const updated = [...prev, botMsg];
        saveHistory(updated);
        return updated;
      });
      setLastPollTs(Date.now());
    } catch {
      setMessages(prev => {
        const updated = [
          ...prev,
          {
            role: 'assistant' as MessageRole,
            content:
              'Unable to connect right now. Please try again or contact us directly at +60-123456789.',
            timestamp: Date.now(),
          },
        ];
        saveHistory(updated);
        return updated;
      });
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  };

  // ─── Textarea auto-resize ──────────────────────────────────────────
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 96) + 'px';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const canSend = input.trim().length > 0 && !sending;

  // ─── Render ────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Chat Panel ───────────────────────────────────────────── */}
      <div
        className={`
          fixed bottom-24 right-4 sm:right-6 z-50
          w-[calc(100vw-2rem)] sm:w-96
          shadow-2xl rounded-2xl overflow-hidden flex flex-col bg-white dark:bg-stone-800
          transition-all duration-300 ease-out origin-bottom-right
          ${isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
          }
        `}
        style={{ maxHeight: 'min(540px, calc(100dvh - 110px))' }}
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-4 py-3 text-white shrink-0"
          style={{ background: 'linear-gradient(135deg, #a68b64 0%, #715d47 100%)' }}
        >
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl shrink-0">
            🏨
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm leading-tight truncate">
              Pelangi Capsule Hostel
            </div>
            <div className="text-xs opacity-80 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-300"></span>
              AI Assistant · Online
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/70 hover:text-white p-1 rounded-lg transition shrink-0"
            aria-label="Close chat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5"
          style={{ background: '#faf8f5' }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              style={{ animation: 'fadeUp 0.2s ease-out' }}
            >
              {msg.role === 'staff' && (
                <div className="text-xs text-amber-700 font-medium mb-0.5 ml-1">Staff</div>
              )}
              <div
                className={`
                  max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed wrap-break-word
                  ${msg.role === 'user'
                    ? 'text-white rounded-br-[4px]'
                    : 'bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-bl-[4px] shadow-xs border border-stone-100 dark:border-stone-600'
                  }
                `}
                style={msg.role === 'user' ? { background: '#a68b64' } : {}}
              >
                {msg.content}
              </div>
              <div className="text-[10px] text-stone-500 mt-1 px-1">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {sending && (
            <div className="flex items-start" style={{ animation: 'fadeUp 0.2s ease-out' }}>
              <div className="bg-white dark:bg-stone-700 rounded-2xl rounded-bl-[4px] shadow-xs border border-stone-100 dark:border-stone-600 px-4 py-3">
                <div className="flex gap-1.5 items-center">
                  {[0, 150, 300].map(delay => (
                    <span
                      key={delay}
                      className="w-2 h-2 rounded-full bg-stone-400"
                      style={{
                        animation: 'typingBounce 1.4s infinite ease-in-out both',
                        animationDelay: `${delay}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="bg-white dark:bg-stone-800 border-t border-stone-100 dark:border-stone-700 px-3 py-2.5 flex gap-2 items-end shrink-0">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message…"
            rows={1}
            disabled={sending}
            autoComplete="on"
            className="
              flex-1 resize-none text-sm outline-hidden transition
              border border-stone-200 dark:border-stone-600 rounded-xl px-3 py-2
              bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100
              focus:border-amber-400 focus:ring-1 focus:ring-amber-200
              disabled:opacity-60 placeholder:text-stone-500
            "
            style={{ lineHeight: '1.4', fontFamily: 'inherit', maxHeight: '96px' }}
            aria-label="Message input"
          />
          <button
            onClick={sendMessage}
            disabled={!canSend}
            className="
              w-9 h-9 rounded-full flex items-center justify-center shrink-0
              transition hover:brightness-110 active:scale-95
              disabled:opacity-40 disabled:cursor-not-allowed
            "
            style={{ background: canSend ? '#a68b64' : '#d6d3d1' }}
            aria-label="Send message"
          >
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" stroke="none" />
            </svg>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-[10px] text-stone-500 dark:text-stone-400 py-1.5 bg-white dark:bg-stone-800 border-t border-stone-50 dark:border-stone-700">
          Powered by Rainbow AI
        </div>
      </div>

      {/* ── Floating Button ───────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="
          fixed bottom-5 right-4 sm:right-6 z-50
          w-14 h-14 rounded-full shadow-xl
          flex items-center justify-center
          transition-all duration-200 hover:scale-110 active:scale-95
          focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-amber-400
        "
        style={{ background: 'linear-gradient(135deg, #a68b64 0%, #715d47 100%)' }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {/* Unread badge */}
        {hasUnread && !isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white text-[9px] text-white flex items-center justify-center font-bold">
            •
          </span>
        )}

        {isOpen ? (
          <svg
            className="w-6 h-6 text-white transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        )}
      </button>

      {/* ── Global keyframe animations (injected once) ────────────── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingBounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1);   opacity: 1;   }
        }
      `}</style>
    </>
  );
}
