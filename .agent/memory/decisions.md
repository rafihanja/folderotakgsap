# Agent Kit Decisions

This file records durable decisions so future AI agents do not reverse them accidentally.

## 2026-06-01

- Keep the canonical agent kit inside `.agent`.
- Do not keep root `AGENTS.md`, `CLAUDE.md`, `.cursor/rules`, or `.agents/rules` unless the user explicitly asks to export adapters.
- Use `.agent/START_HERE.md` as the universal manual entrypoint.
- Use `.agent/scripts/export-agent-adapters.mjs` for adapter export; it must stay dry-run by default.
- Keep `.agent/skills` in Git so moving devices does not require rebuilding the skill library.
- Do not run scripts from `.agent/skills` automatically.
- Every `.agent` change should pass:

```bash
node .agent/scripts/validate-agent-skills.mjs
node .agent/scripts/agent-doctor.mjs
node .agent/scripts/export-agent-adapters.mjs --dry-run
```

- For device bootstrap, prefer:

```bash
node .agent/scripts/bootstrap-agent.mjs
```

- Treat TypeUI as an optional external UI design source, not an installed dependency, until the user explicitly asks to install or import it.
