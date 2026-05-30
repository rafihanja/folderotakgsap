# Phase 1 — Product Foundation

Project: **Petualangan Lumina**  
Version: **v2 Web-First Agent Handoff**  
Date: **2026-05-29**

## Purpose

This phase defines the product direction, MVP boundaries, and roadmap for an AI coding agent. This package replaces the earlier Unity-oriented handoff. The correct direction is:

> Build a web-first 3D voxel educational sandbox prototype using Vite, TypeScript, and Three.js. Test it in browser first. Keep the architecture ready for future mobile app packaging through Capacitor or a similar wrapper.

## Files in This Phase

1. `README_AGENT.md`  
   Main orientation file for the AI coding agent.

2. `PRD.md`  
   Product Requirement Document for the web-first prototype and future mobile-ready direction.

3. `MVP_SCOPE.md`  
   Strict boundary of what must be built now and what must not be built yet.

4. `ROADMAP.md`  
   Step-by-step production roadmap from technical prototype to mobile-ready beta.

## Critical Instruction

Do not start coding before reading all files in this phase and all subsequent phases. This project must not become a full Minecraft clone. The first deliverable is a lightweight, playable, browser-based prototype that proves the core loop:

**Explore → Gather → Craft → Build → Solve Puzzle → Unlock Area → Continue Exploring**

## Non-Negotiable Direction

- No Unity.
- No Unreal.
- No native-only app first.
- No multiplayer in prototype.
- No login in prototype.
- No parent dashboard.
- No payment.
- No ads.
- No infinite world in prototype.
- No heavy graphics.
- No oversized scope.

## Correct Stack Direction

- Vite
- TypeScript
- Three.js
- HTML/CSS UI layer
- Mobile-first touch controls
- Local save using localStorage first, IndexedDB later if needed
- PWA-ready structure
- Capacitor-ready structure for future Android packaging
