# Start Here For Any AI Agent

This is the entrypoint for using the portable agent kit in this repository.

## First Instruction To Give Any Agent

Paste this at the start of a new AI agent session:

```text
Before doing any work, read and follow:

.agent/AGENTS.md
.agent/rules/evidence-first.md
.agent/rules/hybrid-router.md
.agent/rules/professional-engineering.md
.agent/skill-router.json

Then run, if shell access is available:

node .agent/scripts/bootstrap-agent.mjs
node .agent/scripts/detect-project.mjs
node .agent/scripts/agent-doctor.mjs

Do not claim facts without file or command evidence. Keep changes scoped. Do not touch files outside the task.
```

## Why This Exists

The canonical agent kit intentionally stays inside `.agent`. Some tools automatically load root files like `AGENTS.md`, `CLAUDE.md`, `.cursor/rules`, or `.agents/rules`; others do not. This file gives a universal manual entrypoint and the adapter exporter gives an opt-in way to generate tool-specific bridge files.

## Best Available Activation Levels

1. **Manual activation**: paste the instruction above.
2. **Bootstrap**: run `node .agent/scripts/bootstrap-agent.mjs`.
3. **Dry-run adapter check**: run `node .agent/scripts/export-agent-adapters.mjs --dry-run`.
4. **Tool-specific adapter export**: run `node .agent/scripts/export-agent-adapters.mjs --write --tool <tool>` after you decide which AI tool should auto-load the kit.

## Safety

The exporter is dry-run by default. It does not write outside `.agent` unless `--write` is explicitly passed.
