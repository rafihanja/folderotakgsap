import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(currentFile), "..", "..");
const agentRoot = path.join(repoRoot, ".agent");
const mapPath = path.join(agentRoot, "adapters", "adapter-map.json");

const args = new Set(process.argv.slice(2));
const write = args.has("--write");
const force = args.has("--force");
const explicitTool = process.argv.includes("--tool")
  ? process.argv[process.argv.indexOf("--tool") + 1]
  : "all";

const validTools = new Set(["all", "agents-md", "claude", "cursor", "agents-rules"]);

if (!validTools.has(explicitTool)) {
  console.error(`Unknown tool: ${explicitTool}`);
  console.error(`Valid tools: ${[...validTools].join(", ")}`);
  process.exit(1);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function bridgeHeader(toolName) {
  return [
    "# Agent Kit Bridge",
    "",
    `This file is generated for ${toolName}.`,
    "Canonical source lives in `.agent`; edit `.agent`, not this bridge.",
    "",
  ].join("\n");
}

function markdownBridge(toolName) {
  return `${bridgeHeader(toolName)}## Required Reading\n\n- .agent/START_HERE.md\n- .agent/AGENTS.md\n- .agent/rules/evidence-first.md\n- .agent/rules/hybrid-router.md\n- .agent/rules/professional-engineering.md\n- .agent/skill-router.json\n\n## Required Commands When Available\n\n\`\`\`bash\nnode .agent/scripts/detect-project.mjs\nnode .agent/scripts/agent-doctor.mjs\n\`\`\`\n\n## Core Instruction\n\nBefore doing any project work, read the files above. Do not claim facts without file or command evidence. Keep changes scoped. Do not touch unrelated files.\n`;
}

function claudeBridge() {
  return `${bridgeHeader("Claude Code")}See @.agent/START_HERE.md\nSee @.agent/AGENTS.md\nSee @.agent/rules/evidence-first.md\nSee @.agent/rules/hybrid-router.md\nSee @.agent/rules/professional-engineering.md\nSee @.agent/skill-router.json\n\nBefore doing any project work, use those imported instructions as the source of truth.\n`;
}

function cursorBridge() {
  return `---\ndescription: Portable .agent kit bridge for evidence-first professional engineering\nalwaysApply: true\n---\n\n${markdownBridge("Cursor")}`;
}

function agentsRulesBridge() {
  return markdownBridge("Agents rules host");
}

const adapterMap = readJson(mapPath);

const generators = {
  "agents-md": () => ({
    target: path.join(repoRoot, adapterMap.adapters["agents-md"].path),
    content: markdownBridge("AGENTS.md-compatible agent"),
  }),
  claude: () => ({
    target: path.join(repoRoot, adapterMap.adapters.claude.path),
    content: claudeBridge(),
  }),
  cursor: () => ({
    target: path.join(repoRoot, adapterMap.adapters.cursor.path),
    content: cursorBridge(),
  }),
  "agents-rules": () => ({
    target: path.join(repoRoot, adapterMap.adapters["agents-rules"].path),
    content: agentsRulesBridge(),
  }),
};

const selectedTools = explicitTool === "all"
  ? Object.keys(generators)
  : [explicitTool];

const planned = selectedTools.map((tool) => ({ tool, ...generators[tool]() }));

for (const item of planned) {
  const relativeTarget = path.relative(repoRoot, item.target).replaceAll(path.sep, "/");
  const exists = fs.existsSync(item.target);

  if (!write) {
    console.log(`[dry-run] ${exists ? "would update" : "would create"} ${relativeTarget}`);
    continue;
  }

  if (exists && !force) {
    console.error(`Refusing to overwrite ${relativeTarget}. Re-run with --force if intended.`);
    process.exitCode = 1;
    continue;
  }

  fs.mkdirSync(path.dirname(item.target), { recursive: true });
  fs.writeFileSync(item.target, item.content, "utf8");
  console.log(`${exists ? "updated" : "created"} ${relativeTarget}`);
}

if (!write) {
  console.log("");
  console.log("Dry-run only. Add --write to create adapter files outside .agent.");
  console.log("Use --tool agents-md|claude|cursor|agents-rules to export one adapter.");
}
