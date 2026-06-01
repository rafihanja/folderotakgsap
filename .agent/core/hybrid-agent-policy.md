# Hybrid Agent Policy

This repository uses a hybrid operating model:

1. **Local evidence first**: inspect project files, manifests, package scripts, and command output.
2. **Skill routing second**: choose relevant `.agent/skills/*/SKILL.md` entries through `.agent/skill-router.json`.
3. **Official docs third**: use official or primary docs for current platform behavior.
4. **Model reasoning last**: use general reasoning only after the above sources are exhausted or explicitly marked as assumptions.

## Why This Exists

The repository intentionally stores `.agent/skills` in Git so moving to a new device does not require rebuilding the agent brain manually. Antigravity can use project-specific rules and skills, but rules need to point the agent toward the right local context. Without a router and validation commands, a large skill library can become noisy and increase hallucination risk.

## Verified Antigravity Facts

Checked on 2026-06-01 from Google Antigravity documentation:

- Agents operate inside **Projects**, and projects define folder/repository boundaries.
- Antigravity supports **Local Mode** and **New Worktree Mode**.
- Workspace rules default to `.agents/rules`, with backward support for `.agent/rules`.
- Workspace skills default to `.agents/skills`, with backward support for `.agent/skills`.
- A skill is a folder with `SKILL.md`; `description` helps the agent decide when to use it.
- Workflows are reusable Markdown step sequences invoked by slash commands.
- Security settings include terminal command review, non-workspace file access, Strict Mode, and sandboxing.

Primary references:

- https://antigravity.google/docs/projects
- https://antigravity.google/docs/rules
- https://antigravity.google/docs/skills
- https://antigravity.google/docs/ide-workflows
- https://antigravity.google/docs/ide-settings

## Operating Modes

### Fast Local Mode

Use when the task is fully answerable from local files:

- inspect files
- use skill router
- edit minimal scope
- run local validation

### Research Mode

Use when tool behavior, dependency behavior, deployment behavior, or security guidance may have changed:

- browse official docs or primary sources
- record source in the final answer
- update local policy/router only when it helps future work

### Hybrid Mode

Use when both project context and current external behavior matter:

- run project detection
- read relevant local rules/skills
- verify current external docs
- implement local guardrails or code
- run `agent-doctor`

## Anti-Hallucination Contract

An agent must not present a guess as fact. If a claim came from local files, cite the path. If it came from command output, name the command. If it came from external research, cite the link. If it came from reasoning, label it as a recommendation or assumption.
