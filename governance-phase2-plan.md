# Phase 2: Governance Execution Plan — pelangi-website

**Date:** 2026-01-31  
**Scope:** Full governance (root + identity/memory, .claude tracked).  
**Variant:** Development (codebase: Next.js in `site/`).

---

## A) Plan Summary

| Item | Value |
|------|--------|
| **Goal** | Achieve Governance Reference compliance: mandatory root files, .ai/, .claude/agents/identity/ (full memory structure), .claude tracked, GitHub remote. |
| **Total steps** | 12 (atomic, reversible). |
| **Risk level** | Low. |
| **Blockers** | None. User must provide GitHub repo URL for Step 1. |

---

## B) Step-by-Step Execution Plan

### Step 1: Add GitHub remote and push [Verify | Human decision]

- **Action type:** Verify (remote) + Edit (none); user runs commands.
- **Commands (text; do NOT run in Phase 2):**
  1. Create a new repository on GitHub named `pelangi-website` (if it does not exist). Do not add README, .gitignore, or license.
  2. From repo root:  
     `git remote add origin https://github.com/YOUR_USERNAME/pelangi-website.git`  
     Replace `YOUR_USERNAME` with your GitHub username (or use SSH URL if preferred).
  3. Push:  
     `git push -u origin master`
- **Files affected:** `.git/config` (modified by git when remote is added).
- **Validation:** `git remote -v` shows `origin`; `git push` succeeds.
- **Rollback:** `git remote remove origin` if you need to change the URL.

---

### Step 2: Remove `.claude/` from .gitignore [Edit]

- **Action type:** Edit.
- **Action:** Remove the line `# Claude/AI folders` and the line `.claude/` from the root `.gitignore`.
- **Files affected:** ~ `.gitignore`
- **Validation:** After Step 7, `git status` shows `.claude/` as untracked/new (not ignored).
- **Rollback:** Re-add the two lines to `.gitignore`.

---

### Step 3: Create `.ai/` and `.ai/Skills/` [Create]

- **Action type:** Create.
- **Action:** Create directory `.ai` at repo root; create directory `.ai/Skills` (empty).
- **Files affected:** + `.ai/`, + `.ai/Skills/`
- **Validation:** `[ -d .ai ] && [ -d .ai/Skills ]` (or PowerShell equivalent).
- **Rollback:** Remove `.ai/Skills` then `.ai` (both empty).

---

### Step 4: Create `agents.md` at root [Create]

- **Action type:** Create.
- **Action:** Create file `agents.md` at repo root with content from section C below (filled development template).
- **Files affected:** + `agents.md`
- **Validation:** File exists; scan order and identity path are correct.
- **Rollback:** Delete `agents.md`.

---

### Step 5: Create `claude.md` at root [Create]

- **Action type:** Create.
- **Action:** Create file `claude.md` at repo root with content from section C below (filled development template).
- **Files affected:** + `claude.md`
- **Validation:** File exists; references AGENTS.md and identity.
- **Rollback:** Delete `claude.md`.

---

### Step 6: Create `readme.md` at root [Create]

- **Action type:** Create.
- **Action:** Create file `readme.md` at repo root with content from section C below (dual purpose: human + "For AI Agents").
- **Files affected:** + `readme.md`
- **Validation:** File exists; contains "For AI Agents" and key directories.
- **Rollback:** Delete `readme.md`.

---

### Step 7: Create minimal `mcp.json` at root [Create]

- **Action type:** Create.
- **Action:** Create file `mcp.json` at repo root with content: `{}`
- **Files affected:** + `mcp.json`
- **Validation:** Valid JSON; file exists at root.
- **Rollback:** Delete `mcp.json`.

---

### Step 8: Create `.claude/agents/identity/` directory structure [Create]

- **Action type:** Create.
- **Action:** Create directories:  
  `.claude/agents/identity/`  
  `.claude/agents/identity/MEMORY/`  
  `.claude/agents/identity/Bank/`  
  `.claude/agents/identity/Bank/entities/`
- **Files affected:** + directories only.
- **Validation:** All paths exist; `check-identity.ps1` will still fail until Step 9–10 (files missing).
- **Rollback:** Remove directories (empty).

---

### Step 9: Create identity and memory files [Create]

- **Action type:** Create.
- **Action:** Create the following files with content from section C:
  - `.claude/agents/identity/SOUL.md`
  - `.claude/agents/identity/USER.md`
  - `.claude/agents/identity/MEMORY.md`
  - `.claude/agents/identity/MEMORY-SYSTEM.md`
  - `.claude/agents/identity/MEMORY/2026-01-31.md`
  - `.claude/agents/identity/Bank/experience.md`
  - `.claude/agents/identity/Bank/opinions.md`
  - `.claude/agents/identity/Bank/entities/.gitkeep` (or leave `entities/` empty; one placeholder file ensures the dir is tracked)
- **Files affected:** + listed files.
- **Validation:** Run `scripts/check-identity.ps1 -RepoRoot <repo>` (from meta-skill); exit 0.
- **Rollback:** Delete created files only; then remove empty dirs if desired.

---

### Step 10: Verify identity structure [Verify]

- **Action type:** Verify.
- **Action:** Run meta-skill script:  
  `& "<path-to-meta-skill>/scripts/check-identity.ps1" -RepoRoot "c:\Users\Jyue\Desktop\Projects\pelangi-website"`  
  Must exit 0.
- **Files affected:** None.
- **Rollback:** N/A.

---

### Step 11: Verify root structure [Verify]

- **Action type:** Verify.
- **Action:** Run meta-skill script:  
  `& "<path-to-meta-skill>/scripts/check-root.ps1" -RepoRoot "c:\Users\Jyue\Desktop\Projects\pelangi-website"`  
  Must exit 0.
- **Files affected:** None.
- **Rollback:** N/A.

---

### Step 12: Commit governance changes and push [Edit + Verify]

- **Action type:** Edit (git add/commit), Verify (push).
- **Action:**  
  `git add -A`  
  `git commit -m "chore: add full governance (agents, claude, readme, mcp, .ai, .claude identity)"`  
  `git push`
- **Validation:** `git status` clean; push succeeds.
- **Rollback:** `git reset --soft HEAD~1` to uncommit; optionally `git push --force` to undo remote commit (use with care).

---

## C) Proposed File Contents

### agents.md (root)

```markdown
# AGENTS.md — Workspace Operating Rules

> **Purpose:** Onboard the agent each session. This file is loaded into every conversation; keep it short and universally applicable. System development (codebases, apps, libraries).

## WHAT — Map of this repo

- **Identity:** SOUL.md, USER.md, MEMORY.md, MEMORY/YYYY-MM-DD.md, Bank/ (path: `.claude/agents/identity/`)
- **Structure:** `site/` = Next.js 15 app (Pelangi Capsule Hostel website). Root = planning and content (pelangi-website-*.md, assets/, assets-*.md). Key dirs: `site/src/app/`, `site/src/components/`, `site/public/`.
- **Tech:** Node, npm, Next.js 15, Tailwind CSS, TypeScript. No test framework yet; verify via build and lint.

## WHY — Purpose

- **TDD is non-negotiable** when tests exist. This repo exists to host and maintain the Pelangi Capsule Hostel website (Next.js on Vercel).

## HOW — How to work here

1. **Every session:** Read AGENTS.md (this file) → SOUL.md → USER.md → memory (today + yesterday). If main session: also read MEMORY.md. Don't ask permission to follow this file.
2. **Before coding:** Be resourceful — read foundation files, search codebase (semantic + grep), read key files. Prefer pointers (file:line) over pasting code.
3. **Workflow:** When tests exist: RED — failing test first. GREEN — minimum code to pass. REFACTOR — only if it adds value. Each step leaves the codebase in a working state.
4. **Verify changes:** From `site/`: `npm run build`, `npm run lint`. Use these to verify; don't guess.
5. **Memory:** Write it down. MEMORY.md = essential facts; MEMORY/YYYY-MM-DD.md = daily log; Bank/ = typed pages. "Remember this" → write to a file.
6. **Safety:** Don't exfiltrate private data. Don't run destructive commands without asking. Archive instead of delete. When in doubt, ask.
7. **Code style:** Use the project's linter and formatter. Follow existing patterns; the agent is an in-context learner.

## Progressive disclosure — Read when relevant

| Doc or skill | When to read |
|--------------|--------------|
| MEMORY-SYSTEM.md (identity dir) | Full memory rules |
| meta-skill | Governance, structure |

## Summary

Onboard: WHAT (repo map, tech), WHY (purpose), HOW (scan order, verify via build/lint, memory, safety). Keep this file short.
```

---

### claude.md (root)

```markdown
# CLAUDE.md — Claude / IDE Global Instructions

> **Purpose:** Onboard Claude into this codebase each session. This file is loaded into every conversation; keep it short and universally applicable. System development (codebases, apps, libraries).

## WHAT — Map

- **Repo:** `site/` = Next.js 15 app (Pelangi Capsule Hostel). Root = planning and content. Key dirs: `site/src/app/`, `site/src/components/`, `site/public/`.
- **Tech:** Node, npm, Next.js 15, Tailwind CSS, TypeScript. Platform: Windows 11, PowerShell. Relative paths only; forward slashes even on Windows.

## WHY — Purpose

- **TDD is non-negotiable** when tests exist. Project purpose: host and maintain the Pelangi Capsule Hostel website (Next.js on Vercel).

## HOW — How to work

1. **Follow AGENTS.md** in the workspace (scan order, how to verify, memory, safety). Read it first each session.
2. **Workflow:** When tests exist: RED — failing test first. GREEN — minimum code to pass. REFACTOR — only if it adds value.
3. **Verify:** From `site/`: `npm run build`, `npm run lint`. Use them to verify changes; don't guess.
4. **File ops:** Read before editing. Prefer move over delete; archive if uncertain. Never permanently delete without explicit user approval.
5. **Code style:** Use the project's linter and formatter. Follow existing patterns.
6. **Memory:** "Remember this" → MEMORY.md or MEMORY/YYYY-MM-DD.md. Meaningful workflow/structure changes → consider updating AGENTS.md or CLAUDE.md.
7. **Don't auto-generate this file.** Craft it carefully. Prefer pointers to docs over long inline content.

## Progressive disclosure — Read when relevant

| Doc or skill | When to read |
|--------------|--------------|
| AGENTS.md (workspace) | Always first |
| meta-skill | Governance, structure |

## Summary

Onboard: WHAT (repo map, tech), WHY (purpose), HOW (AGENTS.md first, verify via build/lint, memory). Keep this file short.
```

---

### readme.md (root)

```markdown
# Pelangi Capsule Hostel — Website

Next.js 15 website for Pelangi Capsule Hostel (Johor Bahru). Deployed on Vercel.

## Structure

- **site/** — Next.js app (pages, components, public assets).
- **Root** — Planning and content: pelangi-website-plan.md, pelangi-website-content.md, pelangi-website-wireframe.md, assets/, assets-*.md.

## Develop

From `site/`:

- `npm install`
- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run lint` — lint

## For AI Agents

- **Project purpose:** Host and maintain the Pelangi Capsule Hostel website (Next.js on Vercel).
- **Key directories:** `site/` (app), `site/src/app/`, `site/src/components/`, `site/public/`, `.claude/agents/identity/` (identity and memory), `.ai/Skills/` (skills).
- **Constraints:** Follow AGENTS.md and CLAUDE.md; verify with `npm run build` and `npm run lint` from `site/`; relative paths only; archive instead of delete.
```

---

### .claude/agents/identity/SOUL.md

Use meta-skill template `SOUL-template.md`. Replace `<YOUR_NAME>` with a project-derived name (e.g. **Pela** from Pelangi). If user prefers a different name, substitute in Phase 3. Rest of content = template as-is (Core Truths, Boundaries, Vibe, Continuity, Memory System).

*(Full SOUL content not duplicated here; Phase 3 copies from `C:\Users\Jyue\.ai\Skills\meta-skill\templates\SOUL-template.md` and substitutes the name.)*

---

### .claude/agents/identity/USER.md

Use meta-skill template `USER-template.md`. The template in your `.ai/Skills/meta-skill/templates/` already contains your profile (Jay, businesses, preferences). Phase 3 copies that file as-is into `.claude/agents/identity/USER.md`, or uses `<FILL_BY_USER>` if a generic template is preferred.

*(Phase 3: copy from meta-skill templates; user may replace with project-specific profile later.)*

---

### .claude/agents/identity/MEMORY.md

```markdown
# MEMORY.md — Core Memory

Essential, durable facts only. Loaded every session.

- Pelangi-website: Next.js 15 app in `site/`; root holds planning and content. Verify with `npm run build` and `npm run lint` from `site/`.
```

---

### .claude/agents/identity/MEMORY-SYSTEM.md

```markdown
# MEMORY-SYSTEM.md

Governance for identity and memory. Agent may propose changes; agent must ask before modifying this file.

- MEMORY.md = essential facts. MEMORY/YYYY-MM-DD.md = daily log (append-only; only today editable). Bank/ = experience.md, opinions.md, entities/.
- See meta-skill Governance Reference §4–§8 for full rules.
```

---

### .claude/agents/identity/MEMORY/2026-01-31.md

```markdown
# 2026-01-31

- Governance Phase 2 plan created. Full compliance: agents.md, claude.md, readme.md, mcp.json, .ai/, .claude/agents/identity/ with SOUL, USER, MEMORY, MEMORY-SYSTEM, MEMORY/, Bank/. .claude/ tracked.
```

---

### .claude/agents/identity/Bank/experience.md

```markdown
# Experience (first-person)

What the agent did: "I implemented…", "I learned…". Append here over time.
```

---

### .claude/agents/identity/Bank/opinions.md

```markdown
# Opinions

Subjective views, confidence, evidence. Append here over time.
```

---

### .claude/agents/identity/Bank/entities/.gitkeep

Empty file so `entities/` is tracked by git. Optional: delete and leave directory empty if your git tracks empty dirs.

---

## D) MCP Conservative Merge Plan

- **Discovered configs:** 0 (no mcp.json or mcp.jsonc in repo).
- **Proposed root mcp.json:** `{}` (minimal). No merge needed; no existing config to preserve.
- **Decision points:** None. When you add MCP servers later, edit root `mcp.json`; do not delete this file.

---

## E) Risk Register

| Risk | Severity | Why it matters | Mitigation | User decision? |
|------|----------|----------------|------------|----------------|
| Wrong GitHub URL | Low | Push fails or pushes to wrong repo | User runs Step 1 with correct URL | Yes — user provides URL |
| .claude/ content visible in repo | Low | Identity/memory are now tracked | By design; user chose to track .claude/ | No |
| Template placeholders left unfilled | Low | SOUL name or USER details may need tuning | Phase 3 uses templates; user can edit after | No |
| Empty .ai/Skills/ | Low | No skills yet | By design; add skills when needed | No |

---

## F) Final Clarifying Questions

No blocking questions. Proceed to Phase 3 when you say **EXECUTE** (after completing Step 1 if you want the checkpoint and governance commits pushed to GitHub).
