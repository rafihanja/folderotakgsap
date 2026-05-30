# QUEST_AND_PUZZLE_SPEC.md

## 1. Purpose

This file defines the first quest and puzzle for the prototype.

The quest must prove that educational content can be embedded inside sandbox gameplay without feeling like a school test.

## 2. Quest Name

**Repair the Broken Bridge**

Indonesian display:

**Perbaiki Jembatan Rusak**

## 3. Characters Involved

### Bimo

Companion guide.

Role:

- Introduces the world.
- Gives hints.
- Encourages player.
- Helps explain puzzle gently.

### Pak Ramu

Bridge builder NPC.

Role:

- Gives the bridge quest.
- Explains resource need.
- Reacts to completion.

## 4. Quest Location

Pulau Lumina, near a broken bridge connecting the spawn area to a small locked area.

## 5. Quest Premise

A bridge has broken, preventing access to the next part of Pulau Lumina. Pak Ramu wants to repair it but needs help gathering resources and counting materials correctly.

## 6. Quest Objectives

### Objective 1 — Meet Pak Ramu

Trigger:

- Player approaches Pak Ramu and taps/clicks interact.

Dialogue:

Pak Ramu:

> “Wah, kamu datang tepat waktu. Jembatan ini rusak, dan aku butuh bantuan untuk memperbaikinya.”

Bimo:

> “Ayo bantu Pak Ramu. Kalau jembatan ini selesai, kita bisa melihat area di seberang!”

### Objective 2 — Gather Resources

Required resources:

Recommended starter values:

- 6 Wood
- 3 Stone

The numbers can be adjusted, but keep them small.

UI objective:

```text
Kumpulkan bahan:
Kayu: 0/6
Batu: 0/3
```

### Objective 3 — Open Crafting

After resources are gathered, Bimo prompts:

> “Bahannya sudah cukup. Sekarang kita hitung berapa blok jembatan yang bisa dibuat.”

### Objective 4 — Solve Material Puzzle

Puzzle concept:

Player has 6 wood. Each bridge block uses 2 wood.

Question:

> “Setiap Blok Jembatan membutuhkan 2 Kayu. Kalau kita punya 6 Kayu, berapa Blok Jembatan yang bisa dibuat?”

Correct answer:

```text
3
```

### Objective 5 — Craft Bridge Blocks

After correct answer:

- Consume resources.
- Add Bridge Blocks to hotbar/inventory.
- Show success feedback.

Bimo:

> “Mantap! Kita bisa membuat 3 Blok Jembatan.”

### Objective 6 — Place Bridge Blocks

Player places bridge blocks in highlighted bridge slots.

Requirements:

- Show ghost/highlight slots.
- Only allow bridge blocks in correct placement zones for prototype.
- Each placed block updates quest progress.

UI objective:

```text
Pasang Blok Jembatan: 0/3
```

### Objective 7 — Unlock Area

When all bridge blocks are placed:

- Remove barrier.
- Mark area unlocked.
- Trigger success dialogue.

Pak Ramu:

> “Jembatannya kuat lagi! Terima kasih, Penjaga Lumina.”

Bimo:

> “Kita berhasil! Sekarang jalan ke area baru sudah terbuka.”

## 7. Puzzle UI Design

### Required Elements

- Title: “Hitung Bahan Jembatan”
- Wood icon row showing 6 wood.
- Grouping hint showing pairs of 2.
- Answer options: 2, 3, 4.
- Bimo hint area.
- Confirm button.

### Avoid

- Plain school worksheet layout.
- Red failure screen.
- Timer pressure.
- Punitive feedback.
- Long text.

### Correct Answer Feedback

Show:

- Green/bright glow around bridge recipe.
- Bimo success line.
- Craft button enabled.

### Incorrect Answer Feedback

First wrong attempt:

Bimo:

> “Coba lihat lagi. Satu Blok Jembatan butuh 2 Kayu.”

Second wrong attempt:

Bimo:

> “Kita bisa kelompokkan kayunya: 2, 2, dan 2. Jadi ada berapa kelompok?”

Third wrong attempt:

Optional stronger hint:

> “Ada 3 kelompok kayu. Coba pilih angka 3.”

## 8. Educational Principle

The puzzle teaches:

- Counting
- Grouping
- Early division
- Resource planning

But it must feel like crafting preparation, not a formal math test.

## 9. Quest State Machine

```text
not_started
  ↓ talk_to_pak_ramu
started
  ↓ collect_resources
resources_ready
  ↓ open_crafting
puzzle_active
  ↓ correct_answer
puzzle_completed
  ↓ craft_bridge_blocks
bridge_blocks_ready
  ↓ place_all_blocks
bridge_completed
  ↓ unlock_area
completed
```

## 10. Edge Cases

### Player lacks resources

Craft button disabled. Show:

> “Bahan belum cukup.”

### Player tries to place bridge block outside bridge zone

Show:

> “Blok ini hanya bisa dipasang di area jembatan.”

### Player refreshes page mid-quest

Save/load must restore:

- Inventory
- Quest state
- Placed bridge blocks
- Removed resource blocks
- Area lock state

### Player answers wrong repeatedly

Keep allowing retry. Do not fail quest.

### Player breaks blocks before quest starts

Allow resources to enter inventory. Quest can recognize already collected resources.

## 11. Acceptance Criteria

Quest is complete only if:

- Pak Ramu can start the quest.
- Resource objectives update.
- Puzzle appears after resources are ready.
- Wrong answers trigger hints.
- Correct answer unlocks crafting.
- Bridge blocks are added to inventory.
- Player can place bridge blocks in bridge zone.
- Area unlocks after placement.
- Quest completion is saved.
