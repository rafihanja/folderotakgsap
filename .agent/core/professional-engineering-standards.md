# Professional Engineering Standards

This file defines the professional-grade baseline for agent work in this repository. It is intentionally practical: use the highest rigor that fits the project size and risk, but do not skip safety just because the project is small.

## Source Standards

Use these standards as reference anchors:

- **Security**: OWASP Application Security Verification Standard (ASVS) for web application security requirements and verification thinking.
- **Accessibility**: W3C Web Content Accessibility Guidelines (WCAG) 2.2 for user-facing web UI.
- **Supply chain**: SLSA for build integrity and software supply-chain risk.
- **Project evidence**: local files, manifest, package scripts, command output, and explicit user instruction.

References checked on 2026-06-01:

- https://owasp.org/www-project-application-security-verification-standard/
- https://www.w3.org/TR/WCAG22/
- https://slsa.dev/

## Engineering Baseline

### Requirements

- Clarify ambiguous inputs when a wrong assumption could create rework, data loss, or security risk.
- If the user asks to proceed, state assumptions briefly and continue.
- Do not invent features, data, credentials, endpoints, or deployment state.

### Design

- Keep changes scoped to the requested behavior.
- Use existing project patterns before introducing new architecture.
- Add abstraction only when it removes real duplication or risk.
- Prefer readable, boring code over clever code.

### Security

- Validate external input.
- Treat file system, network, user input, environment variables, webhooks, and database/API responses as trust boundaries.
- Never commit real secrets, tokens, private keys, or `.env` files.
- Avoid `eval`, dynamic code execution, shell string construction, and unsafe deserialization.
- For auth, payment, database, deploy, or credential changes, increase verification rigor.

### Testing And Verification

- Run the strongest available local validation:
  - build
  - lint
  - typecheck
  - unit/integration tests
  - browser/UI verification for frontend changes
- If no validation exists, run syntax checks or explain the gap.
- Do not claim success without command output or file evidence.

### Frontend Quality

- Use semantic HTML where possible.
- Preserve keyboard access and focus behavior.
- Keep motion respectful of `prefers-reduced-motion`.
- Avoid layout shifts, text overlap, and animation of layout-heavy properties.
- For GSAP, prefer transforms and opacity, cleanup timelines/triggers, and route React work through `useGSAP`.

### Dependencies

- Do not add dependencies by default.
- Prefer built-in platform APIs and existing project packages.
- If a dependency is needed, explain why and verify package scripts still pass.

### Git And Delivery

- Keep commits focused.
- Do not mix unrelated work.
- Do not stage untracked folders unless explicitly requested.
- Before push, run the applicable quality gate and report what passed.

## Professional Completion Template

Use this structure for non-trivial work:

```text
Done:
- Changed: [files]
- Evidence: [files/commands inspected]
- Validation: [commands and result]
- Risk: [none / specific remaining risk]
- GitHub: [commit hash if pushed]
```
