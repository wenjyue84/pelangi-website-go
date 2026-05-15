'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface FaqEntry {
  question: string;
  answer: string;
  keywords: string[];
  chipLabel?: string;
}

const FAQ_DATA: FaqEntry[] = [
  {
    question: 'What time is check-in and check-out?',
    answer:
      'Check-in is from 3:00 PM onwards, and check-out is before 12:00 PM (noon). We offer self-check-in so you can arrive anytime after 3 PM. Early check-in or late check-out may be available on request \u2014 message us on WhatsApp at +60 12-708 8789.',
    keywords: ['check-in', 'check-out', 'checkout', 'checkin', 'time', 'arrive', 'arrival', 'early', 'late'],
    chipLabel: 'Check-in times',
  },
  {
    question: 'How much does a capsule pod cost?',
    answer:
      'Capsule pods start from RM35 per night. A Tourism Tax (TTx) of RM10 per room per night is added as required by law. Monthly stays are available from RM594/month. Book directly on our website at pelangicapsulehostel.com/book for the best rate.',
    keywords: ['price', 'pricing', 'cost', 'rate', 'rm', 'cheap', 'afford', 'how much', 'per night', 'monthly', 'budget'],
    chipLabel: 'Pricing & rates',
  },
  {
    question: 'Where is Pelangi Capsule Hostel located?',
    answer:
      'We are at 26A Jalan Perang, Taman Pelangi, 80400 Johor Bahru, Johor, Malaysia. Taman Pelangi is a central neighbourhood known for restaurants, cafes, and the famous Tuesday night market. A short Grab ride from JB Sentral, CIQ, and Senai Airport.',
    keywords: ['location', 'located', 'where', 'address', 'direction', 'map', 'area', 'taman pelangi', 'jalan'],
    chipLabel: 'Location',
  },
  {
    question: 'What is a capsule pod like?',
    answer:
      'Each capsule pod has a sliding door that locks for privacy, a premium mattress, personal fan and air-conditioning, adjustable LED lighting, USB charging ports, and a power outlet. Unlike open dorm beds, you get your own enclosed private space \u2014 more privacy than a traditional hostel at a similar budget price.',
    keywords: ['capsule', 'pod', 'dorm', 'dormitory', 'room', 'bed', 'type', 'private', 'shared', 'what is'],
    chipLabel: 'Room types',
  },
  {
    question: 'Is there free WiFi?',
    answer:
      'Yes! We provide complimentary high-speed WiFi throughout the entire property, including inside the pod areas and common lounge. The connection is reliable enough for video calls and remote work.',
    keywords: ['wifi', 'wi-fi', 'internet', 'connection', 'online'],
  },
  {
    question: 'What is the WiFi password?',
    answer:
      'The WiFi network name is "Pelangi_Hostel_Free" and the password is "ilovestaycapsule". You can connect from anywhere on the property including your capsule pod and the common areas.',
    keywords: ['wifi', 'wi-fi', 'password', 'password', 'network', 'ssid', 'connect'],
  },
  {
    question: 'How do I get here from Singapore?',
    answer:
      'We are only 15 minutes by car from the Woodlands CIQ checkpoint. Take a Grab or taxi from JB CIQ to Taman Pelangi for around RM8\u201312. Alternatively, take bus CW1 from Woodlands to JB Sentral, then a short Grab ride to us.',
    keywords: ['singapore', 'border', 'ciq', 'woodlands', 'crossing', 'causeway'],
  },
  {
    question: 'Is parking available?',
    answer:
      'Free street parking is available along Jalan Perang in front of the hostel. The area has plenty of open parking spaces, especially in the evenings. For longer stays, there are also nearby paid parking lots.',
    keywords: ['parking', 'park', 'car', 'drive', 'vehicle'],
    chipLabel: 'Parking',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      "We accept cash (Malaysian Ringgit), DuitNow QR (all Malaysian banks and e-wallets including Maybank, CIMB, Touch 'n Go, Boost, GrabPay), and credit cards. DuitNow QR is the most convenient option for domestic travellers.",
    keywords: ['payment', 'pay', 'cash', 'card', 'credit', 'duitnow', 'grab', 'boost'],
  },
  {
    question: 'Do you provide towels and toiletries?',
    answer:
      'Yes, every guest receives a fresh towel. Body wash and shampoo are provided in the shared bathrooms. Toothbrushes and toothpaste are available at the front desk for a small fee.',
    keywords: ['towel', 'toiletries', 'shampoo', 'soap', 'toothbrush', 'amenities'],
  },
  {
    question: 'Is breakfast included?',
    answer:
      'Breakfast is not included, but we have a fully equipped shared kitchen. Taman Pelangi is surrounded by dozens of affordable local restaurants and kopitiam \u2014 a typical Malaysian breakfast costs RM3\u20138 nearby.',
    keywords: ['breakfast', 'food', 'eat', 'meal', 'kitchen', 'cook'],
  },
  {
    question: 'Is the hostel safe?',
    answer:
      'Yes! We have 24/7 CCTV surveillance, secure keypad entry, and personal lockers in each pod room. Each capsule has a sliding door that locks from the inside. The hostel operates 24 hours with no curfew.',
    keywords: ['safe', 'safety', 'secure', 'security', 'lock', 'cctv', 'locker'],
  },
  {
    question: 'Can I stay monthly?',
    answer:
      'Yes, monthly rates start from RM594/month including all amenities: WiFi, air-conditioning, hot showers, kitchen access, and laundry facilities. We also offer in-house laundry service at RM5/load (guests only, cheaper than outside dobi). Popular with remote workers and digital nomads.',
    keywords: ['monthly', 'long stay', 'long-term', 'month', 'weekly', 'extended'],
  },
];

/** Quick suggestion chips: check-in, pricing, location, room types, parking */
const QUICK_FAQS: number[] = [0, 1, 2, 3, 6];

const GREETING =
  "Hi! Welcome to Pelangi Capsule Hostel. I can answer common questions about our rooms, pricing, check-in, location, and more. Tap a topic below or type your question!";

const FALLBACK =
  "I'm not sure about that one. For specific questions, please contact us directly on WhatsApp at +60 12-708 8789 or visit our contact page.";

const SESSION_KEY = 'chatwidget_history';
const DELAY_MS = 10_000;

function matchFaq(input: string): string {
  const lower = input.toLowerCase().trim();
  let bestScore = 0;
  let bestAnswer = '';

  for (const faq of FAQ_DATA) {
    let score = 0;
    for (const kw of faq.keywords) {
      if (lower.includes(kw)) {
        score += kw.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = faq.answer;
    }
  }

  return bestScore > 0 ? bestAnswer : FALLBACK;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showChips, setShowChips] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // ─── 10-second delay before showing the widget ────────────────────
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  // ─── Init: load session history ───────────────────────────────────
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      const saved: Message[] = raw ? JSON.parse(raw) : [];
      if (saved.length > 0) {
        setMessages(saved);
        setShowChips(false);
      } else {
        setMessages([{ role: 'assistant', content: GREETING, timestamp: Date.now() }]);
      }
    } catch {
      setMessages([{ role: 'assistant', content: GREETING, timestamp: Date.now() }]);
    }
  }, []);

  // ─── Auto-scroll to bottom ────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ─── Focus input when opened + notify other components ────────────
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('chatwidget-toggle', { detail: isOpen }));
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [isOpen]);

  // ─── Escape key to close ──────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // ─── Persist history ──────────────────────────────────────────────
  const saveHistory = useCallback((msgs: Message[]) => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(msgs.slice(-50)));
    } catch {
      /* quota exceeded */
    }
  }, []);

  // ─── Handle a question (from input or chip) ───────────────────────
  const handleQuestion = useCallback(
    (text: string) => {
      const userMsg: Message = { role: 'user', content: text, timestamp: Date.now() };
      const answer = matchFaq(text);
      const botMsg: Message = { role: 'assistant', content: answer, timestamp: Date.now() + 1 };

      setMessages(prev => {
        const updated = [...prev, userMsg, botMsg];
        saveHistory(updated);
        return updated;
      });
      setShowChips(false);
    },
    [saveHistory],
  );

  // ─── Send from input ──────────────────────────────────────────────
  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    handleQuestion(text);
    if (inputRef.current) inputRef.current.style.height = 'auto';
  };

  // ─── Textarea auto-resize ────────────────────────────────────────
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

  const canSend = input.trim().length > 0;

  if (!isVisible) return null;

  return (
    <>
      {/* ── Chat Panel ──────────────────────────────────────────────── */}
      <div
        className={`
          fixed z-50
          w-[calc(100vw-2rem)] sm:w-96
          shadow-2xl rounded-2xl overflow-hidden flex flex-col bg-white dark:bg-stone-800
          transition-all duration-300 ease-out origin-bottom-right
          ${isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
          }
        `}
        style={{
          bottom: 'calc(5rem + 8px)',
          right: '1rem',
          maxHeight: 'min(540px, calc(100dvh - 110px))',
        }}
        role="dialog"
        aria-label="Chat with Pelangi Capsule Hostel FAQ assistant"
        aria-modal="true"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-4 py-3 text-white shrink-0"
          style={{ background: 'linear-gradient(135deg, #a68b64 0%, #715d47 100%)' }}
        >
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm leading-tight truncate">
              Pelangi Capsule Hostel
            </div>
            <div className="text-xs opacity-80">FAQ Assistant</div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-11 h-11 flex items-center justify-center text-white/70 hover:text-white rounded-lg transition shrink-0"
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
              <div
                className={`
                  max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed
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

          {/* Quick FAQ chips */}
          {showChips && (
            <div className="flex flex-wrap gap-1.5 pt-1" style={{ animation: 'fadeUp 0.3s ease-out' }}>
              {QUICK_FAQS.map(idx => {
                const faq = FAQ_DATA[idx];
                return (
                  <button
                    key={idx}
                    onClick={() => handleQuestion(faq.question)}
                    className="text-xs px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-700 dark:text-stone-300 hover:border-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors"
                  >
                    {faq.chipLabel ?? faq.question}
                  </button>
                );
              })}
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
            placeholder="Type a question\u2026"
            rows={1}
            autoComplete="on"
            className="flex-1 resize-none text-sm transition border border-stone-500 dark:border-stone-600 rounded-xl px-3 py-2 bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 focus-visible:border-amber-400 placeholder:text-stone-500"
            style={{ lineHeight: '1.4', fontFamily: 'inherit', maxHeight: '96px' }}
            aria-label="Type your question"
          />
          <button
            onClick={sendMessage}
            disabled={!canSend}
            className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
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

        {/* WhatsApp fallback */}
        <div className="text-center text-[10px] text-stone-500 dark:text-stone-400 py-1.5 bg-white dark:bg-stone-800 border-t border-stone-50 dark:border-stone-700">
          Need more help?{' '}
          <a
            href="https://wa.me/60127088789?text=Hi!%20I%20have%20a%20question%20about%20Pelangi%20Capsule%20Hostel."
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline"
          >
            WhatsApp us
          </a>
        </div>
      </div>

      {/* ── Floating Button ─────────────────────────────────────────── */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-20 right-4 sm:bottom-5 sm:right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
        style={{
          background: 'linear-gradient(135deg, #a68b64 0%, #715d47 100%)',
          animation: 'fadeUp 0.4s ease-out',
        }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
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

      {/* ── Keyframe animations ─────────────────────────────────────── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
