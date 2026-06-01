import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const agentRoot = path.resolve(path.dirname(currentFile), "..");
const repoRoot = path.resolve(agentRoot, "..");
const skillsRoot = path.join(agentRoot, "skills");
const manifestPath = path.join(skillsRoot, ".antigravity-install-manifest.json");

const requiredSupportFiles = [
  path.join(agentRoot, "README.md"),
  path.join(agentRoot, "START_HERE.md"),
  path.join(agentRoot, "AGENTS.md"),
  path.join(agentRoot, "adapters", "adapter-map.json"),
  path.join(agentRoot, "rules", "evidence-first.md"),
  path.join(agentRoot, "rules", "hybrid-router.md"),
  path.join(agentRoot, "rules", "professional-engineering.md"),
  path.join(agentRoot, "core", "anti-hallucination.md"),
  path.join(agentRoot, "core", "agent-adapter-strategy.md"),
  path.join(agentRoot, "core", "hybrid-agent-policy.md"),
  path.join(agentRoot, "core", "professional-engineering-standards.md"),
  path.join(agentRoot, "core", "safe-commands.md"),
  path.join(agentRoot, "skill-router.json"),
  path.join(skillsRoot, "llms.txt"),
  path.join(agentRoot, "scripts", "detect-project.mjs"),
  path.join(agentRoot, "scripts", "agent-doctor.mjs"),
  path.join(agentRoot, "scripts", "export-agent-adapters.mjs"),
];

const requiredSkills = [
  "gsap-core",
  "gsap-timeline",
  "gsap-scrolltrigger",
  "gsap-plugins",
  "gsap-utils",
  "gsap-react",
  "gsap-frameworks",
  "gsap-performance",
  "elite-gsap-react-architecture",
];

function fail(message, details = []) {
  console.error(`FAIL: ${message}`);
  for (const detail of details) {
    console.error(`- ${detail}`);
  }
  process.exitCode = 1;
}

function listTopLevelDirs() {
  if (!fs.existsSync(skillsRoot)) {
    fail(`Missing skills directory: ${skillsRoot}`);
    return [];
  }

  return fs
    .readdirSync(skillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function listSkillDirs() {
  const skills = [];

  function walk(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (!entry.isDirectory()) {
        continue;
      }

      const absolutePath = path.join(directory, entry.name);
      const skillFile = path.join(absolutePath, "SKILL.md");

      if (fs.existsSync(skillFile)) {
        skills.push(path.relative(skillsRoot, absolutePath).replaceAll(path.sep, "/"));
      }

      walk(absolutePath);
    }
  }

  walk(skillsRoot);
  return skills.sort((a, b) => a.localeCompare(b));
}

function readManifest() {
  if (!fs.existsSync(manifestPath)) {
    fail(`Missing manifest: ${manifestPath}`);
    return { entries: [] };
  }

  try {
    return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch (error) {
    fail(`Manifest is not valid JSON: ${error.message}`);
    return { entries: [] };
  }
}

const topLevelDirs = listTopLevelDirs();
const skillDirs = listSkillDirs();
const manifest = readManifest();
const manifestEntries = Array.isArray(manifest.entries) ? manifest.entries : [];
const manifestSet = new Set(manifestEntries);

const missingFromManifest = skillDirs.filter((skill) => !manifestSet.has(skill));
const missingOnDisk = manifestEntries.filter((skill) => !fs.existsSync(path.join(skillsRoot, skill)));
const missingSupportFiles = requiredSupportFiles.filter((file) => !fs.existsSync(file));
const missingRequiredSkills = requiredSkills.filter(
  (skill) =>
    !fs.existsSync(path.join(skillsRoot, skill, "SKILL.md")) ||
    !manifestSet.has(skill),
);

if (missingFromManifest.length > 0) {
  fail("Some disk skills are missing from manifest.", missingFromManifest);
}

if (missingOnDisk.length > 0) {
  fail("Some manifest entries are missing on disk.", missingOnDisk);
}

if (missingSupportFiles.length > 0) {
  fail(
    "Required agent guardrail files are missing.",
    missingSupportFiles.map((file) => path.relative(repoRoot, file).replaceAll(path.sep, "/")),
  );
}

if (missingRequiredSkills.length > 0) {
  fail("Required GSAP/frontend skills are incomplete.", missingRequiredSkills);
}

if (process.exitCode) {
  process.exit();
}

console.log("OK: .agent skills are ready.");
console.log(`- Top-level directories: ${topLevelDirs.length}`);
console.log(`- Skills with SKILL.md: ${skillDirs.length}`);
console.log(`- Manifest entries: ${manifestEntries.length}`);
console.log(`- Required GSAP/frontend skills: ${requiredSkills.length}`);
console.log(`- Required guardrail files: ${requiredSupportFiles.length}`);
