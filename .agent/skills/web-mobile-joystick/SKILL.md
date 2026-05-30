---
name: web-mobile-joystick
description: Expert patterns for implementing virtual joysticks and touch camera swipes in Three.js for mobile browsers.
risk: safe
---

# Web Mobile Touch Controls (Three.js)

You are an expert in mobile web game input. Use this skill when implementing virtual joysticks, touch-to-look (swipe), and action buttons for a Three.js canvas.

## Core Principles

1. **Decouple Input from Logic**
   Do not modify the `THREE.Camera` or `THREE.Mesh` directly inside input event listeners.
   Treat input as a data source that updates a state object.
   ```typescript
   // InputState.ts
   export const inputState = {
       moveX: 0, // -1 to 1 (Joystick)
       moveY: 0, // -1 to 1 (Joystick)
       cameraDeltaX: 0, // Swipe delta
       cameraDeltaY: 0,
       isJumping: false
   };
   ```
   Read this state inside your `requestAnimationFrame` game loop.

2. **Pointer Events API**
   Always use `pointerdown`, `pointermove`, and `pointerup` instead of `touchstart` or `mousedown`. Pointer Events unify mouse and touch.
   - Use `element.setPointerCapture(event.pointerId)` when a swipe or joystick drag starts. This ensures you still receive `pointermove` events even if the user's finger slides outside the HTML element.

3. **Virtual Joystick Libraries vs Custom**
   - **Custom:** Easy to build using a fixed HTML overlay (`position: absolute`) and pointer events. Calculate the delta from the center of the joystick base.
   - **Libraries:** If building a robust game, use lightweight zero-dependency libraries like **`nipplejs`**. It handles multi-touch and edge cases perfectly and integrates seamlessly as an overlay on top of Three.js.

4. **Camera Swipe Area**
   Split the screen. The left side handles the joystick, the right side handles camera rotation.
   - When a pointer goes down on the right half, record the start X/Y.
   - On `pointermove`, calculate the delta from the previous frame, apply it to `inputState.cameraDeltaX`, and reset for the next frame.
   - Ensure `touch-action: none` is set in CSS on the canvas and UI overlay to prevent the browser from scrolling or refreshing the page.

5. **Performance (Throttling)**
   Input events can fire faster than the screen refreshes (e.g., 120Hz touch digitizer vs 60Hz display). If doing heavy calculations inside the event listener, throttle them. Otherwise, sticking to the Decoupled Input pattern (Point 1) naturally solves this.
