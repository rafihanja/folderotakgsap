# GDD.md

# Game Design Document — Petualangan Lumina

## 1. Game Overview

**Petualangan Lumina** is a web-first 3D voxel sandbox educational adventure game for children. The prototype is played in a browser but designed with mobile controls and future mobile app packaging in mind.

The player explores **Pulau Lumina**, a small magical voxel island affected by fading light. With help from **Bimo**, a friendly glowing companion, the player helps local characters restore parts of the world through exploration, gathering, crafting, building, and puzzle solving.

## 2. Design Pillars

### Pillar 1 — Learning Through Action

Learning must happen through meaningful gameplay actions:

- Counting resources.
- Planning crafting.
- Building structures.
- Solving world problems.
- Following instructions.
- Discovering cause and effect.

### Pillar 2 — Sandbox Freedom in a Small Scope

The prototype does not need an infinite world. It needs a small world that gives the feeling of agency.

The player should be able to:

- Walk around.
- Choose when to gather.
- Interact with objects.
- Place bridge blocks.
- Explore the unlocked area after success.

### Pillar 3 — World Reaction

The world must visibly change when the player succeeds.

Example:

- Broken bridge becomes passable.
- Locked area opens.
- Bimo celebrates.
- Pak Ramu thanks the player.
- The player sees the reward.

### Pillar 4 — Child-Friendly Feedback

Failure must never feel harsh. Wrong puzzle attempts should trigger hints.

Bimo should say things like:

- “Coba kita hitung pelan-pelan.”
- “Setiap blok butuh 2 kayu. Kalau ada 6 kayu, kita bisa buat berapa?”
- “Hampir benar. Yuk coba lagi.”

### Pillar 5 — Lightweight by Design

The game must be visually appealing but technically light:

- Small island.
- Simple geometry.
- Simple materials.
- Low draw calls.
- Minimal post-processing.
- Touch-friendly UI.

## 3. Target Experience

The first 5–10 minutes should feel like this:

1. Player enters Pulau Lumina.
2. Bimo greets the player.
3. Player explores and learns movement.
4. Player collects resources.
5. Player meets Pak Ramu.
6. Player receives bridge repair quest.
7. Player gathers materials.
8. Player solves the visual crafting puzzle.
9. Player crafts and places bridge blocks.
10. Bridge opens access to a new area.
11. Player feels accomplishment and curiosity.

## 4. Player Character

The prototype may use a placeholder capsule or simple voxel character.

Requirements:

- Must be easy to see.
- Must move smoothly.
- Must face movement direction if possible.
- Must not require final character art.

Future character customization is out of scope.

## 5. Camera

### Default Camera

Third-person orbit/follow camera.

Requirements:

- Follows behind or above the player.
- Allows mouse drag on desktop.
- Allows touch swipe on mobile.
- Avoids extreme camera angles.
- Keeps the player visible.
- Keeps block targeting readable.

### Camera Constraints

- No first-person mode in prototype.
- No cinematic camera system.
- No complex camera collision required unless simple implementation is available.

## 6. World Design

### Prototype World

Name:

**Pulau Lumina**

Main areas:

1. Spawn clearing
2. Resource grove
3. Pak Ramu bridge area
4. Broken bridge
5. Locked area beyond bridge

### World Size

The world should be small enough for performance and clarity.

Recommended prototype size:

- Around 32x32 to 48x48 block footprint.
- Height variation limited.
- Block count kept intentionally low.
- No infinite terrain.

### Environmental Feel

The world should feel:

- Magical
- Safe
- Bright
- Colorful
- Simple
- Readable
- Not realistic

## 7. Blocks

Prototype block types:

| Block | Purpose | Breakable | Gives Resource | Placeable |
|---|---|---:|---|---:|
| Grass | Ground | No/Optional | None | No |
| Dirt | Terrain | Optional | Dirt | Optional |
| Stone | Resource | Yes | Stone | Optional |
| Wood | Resource | Yes | Wood | Optional |
| Crystal | Reward/Quest | Yes or pickup | Crystal | No |
| Bridge Block | Built object | Optional | None | Yes, bridge zone only |

## 8. Resource Gathering

Player can gather resources by targeting and breaking blocks.

### Rules

- Only resource blocks are breakable in the first prototype.
- Breaking a resource block increments inventory.
- Broken blocks should disappear or change state.
- Resource feedback should show on UI.
- Use simple animation or particle feedback only if lightweight.

## 9. Inventory and Hotbar

### Inventory

The inventory tracks resource counts:

- Wood
- Stone
- Crystal
- Bridge Block

### Hotbar

- 5 slots.
- Shows selected item.
- Allows placing bridge blocks when selected.

### UX Requirement

Inventory must be readable on mobile. Avoid tiny grids in the prototype.

## 10. Crafting

Crafting is simple and quest-gated.

### Initial Recipe

Bridge Block:

- Requires Wood and/or Stone.
- Must be unlocked by Pak Ramu quest.
- Requires solving the visual material puzzle before crafting.

Example tuning:

```text
2 Wood + 1 Stone = 1 Bridge Block
```

The exact numbers can be adjusted for pacing.

## 11. Quest System

The first quest:

**Repair the Broken Bridge**

### Quest Flow

1. Player talks to Pak Ramu.
2. Pak Ramu explains bridge is broken.
3. Quest starts.
4. Player gathers required resources.
5. Crafting UI opens.
6. Puzzle appears.
7. Correct answer unlocks bridge block crafting.
8. Player places bridge blocks.
9. Bridge becomes complete.
10. Area unlocks.
11. Pak Ramu and Bimo react.

## 12. Educational Puzzle Design

The puzzle must be embedded into crafting/building.

### Puzzle Goal

Teach resource counting and division through visual material grouping.

Example:

- Player has 6 wood.
- Each bridge block uses 2 wood.
- Ask: “How many bridge blocks can we make?”
- Show 6 wood icons.
- Show groups of 2.
- Player selects or drags correct number.

### Failure State

If wrong:

- No harsh sound.
- No red “wrong” screen.
- Bimo gives hint.
- Player can retry immediately.

### Success State

If correct:

- Positive animation.
- Bridge block recipe completes.
- Player receives craftable blocks.

## 13. Bimo Companion

Bimo is the emotional guide.

### Prototype Role

Bimo should:

- Introduce the world.
- Give basic tutorial hints.
- Encourage the player.
- Give puzzle hints.
- Celebrate quest completion.

### Bimo Behavior

Prototype Bimo can be:

- A small glowing sphere.
- A small voxel sprite-like object.
- A simple floating mesh.

Bimo should follow near the player or appear in dialogue.

## 14. NPC Design

### Pak Ramu

Role:

- Bridge builder NPC.
- Gives the first quest.
- Teaches through practical problem solving.

Personality:

- Warm
- Simple speech
- Encouraging
- Not teacher-like

Dialogue tone:

- “Aku butuh bantuanmu memperbaiki jembatan ini.”
- “Kita perlu menghitung bahan agar jembatannya kuat.”
- “Bagus! Sekarang kita bisa memasang blok jembatan.”

## 15. Progression

Prototype progression is simple:

- Quest started
- Resources gathered
- Puzzle solved
- Bridge crafted
- Bridge placed
- Area unlocked

No XP system required in prototype.

Optional:

- Crystal reward after completion.

## 16. First 10 Minutes

### Minute 0–1

Load game. Player appears on small island. Bimo greets player.

### Minute 1–2

Player learns movement and camera.

### Minute 2–4

Player discovers resource blocks and gathers wood/stone.

### Minute 4–5

Player meets Pak Ramu.

### Minute 5–7

Player gathers missing materials and opens crafting.

### Minute 7–8

Player solves puzzle.

### Minute 8–10

Player places bridge blocks and unlocks area.

## 17. Anti-Boredom Principles for Future

The prototype is small, but future design should support:

- More blocks
- More recipes
- More quests
- More biomes
- More puzzle types
- More unlockable areas
- More Bimo reactions
- More player-created goals

## 18. Success Criteria

The GDD is successfully implemented when the player experiences:

- Exploration
- Gathering
- Helping an NPC
- Solving an embedded learning problem
- Building
- World change
- Curiosity to continue
