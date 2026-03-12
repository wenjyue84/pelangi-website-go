---
description: How to commit changes using atomic commits and conventional commit standards
---

# Commit Workflow

When committing changes, ALWAYS follow these rules:

## 1. Analyze Staged/Unstaged Changes First

```bash
git status
git diff --stat
```

## 2. Group Changes by Logical Unit

Break down changes into atomic commits by:
- **Single responsibility**: Each commit does ONE thing
- **Type of change**: Don't mix features, fixes, refactors, or docs
- **Component/file grouping**: Related files go together

## 3. Conventional Commit Format

```
<type>(<optional scope>): <description>

[optional body]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `style`: Formatting, missing semicolons, etc (no code change)
- `docs`: Documentation only
- `test`: Adding or fixing tests
- `chore`: Maintenance tasks, dependencies, config
- `build`: Build system or external dependencies
- `ci`: CI configuration
- `perf`: Performance improvement

## 4. Commit Order (Example)

If user asks to "commit all", break it down:

```bash
# 1. Config/setup first
git add package.json package-lock.json next.config.ts tsconfig.json
git commit -m "chore: initialize next.js project with typescript"

# 2. Core/shared components
git add src/components/Header.tsx src/components/Footer.tsx
git commit -m "feat: add header and footer components"

# 3. Feature by feature
git add src/components/Hero.tsx src/app/page.tsx
git commit -m "feat: add hero section to homepage"

git add src/components/Rooms.tsx src/app/rooms/page.tsx
git commit -m "feat: add rooms page with capsule details"

# 4. Assets grouped by purpose
git add public/images/destinations/*
git commit -m "feat: add destination images"

# 5. Docs last
git add README.md docs/*
git commit -m "docs: add project documentation"
```

## 5. Before Committing, Always Ask

If user says "commit everything" or similar, STOP and:
1. List the logical groups of changes
2. Propose the atomic commit sequence
3. Wait for user approval before proceeding

## 6. Never Do

- ❌ Single commit with 100+ files unless it's truly atomic (e.g., a single rename refactor)
- ❌ Mix unrelated changes in one commit
- ❌ Use vague messages like "update files" or "fix stuff"
- ❌ Commit without checking `git status` first
