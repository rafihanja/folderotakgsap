# Hybrid Router Rule

Apply this rule when choosing skills, workflows, docs, or validation strategy.

Source files:

- @../../.agent/skill-router.json
- @../../.agent/core/hybrid-agent-policy.md
- @../../.agent/scripts/detect-project.mjs
- @../../.agent/scripts/agent-doctor.mjs

## Required Behavior

- Use local repository evidence first.
- Use `.agent/skill-router.json` to choose relevant skills instead of guessing.
- Run `node .agent/scripts/detect-project.mjs` when the project stack is unclear.
- Run `node .agent/scripts/agent-doctor.mjs` after changing `.agent`, `.agents`, `AGENTS.md`, or project-level agent configuration.
- Prefer official documentation for current tool behavior, especially Antigravity, framework, deployment, and package behavior.
- When external research changes a decision, cite the source in the final answer.

## Antigravity-Specific Notes

- Prefer `.agents/rules` for workspace rules.
- Keep `.agent/skills` because this repository already uses it and Antigravity keeps backward compatibility.
- Do not assume skills will be selected automatically. Point the agent with rules, router entries, and explicit task wording.
