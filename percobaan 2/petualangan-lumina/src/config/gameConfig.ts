export const gameConfig = {
  world: {
    blockSize: 1,
    renderDistance: 5,
    chunkSize: 16,
    activeChunkRadius: 3,
    maxVisibleChunksLow: 25,
    maxVisibleChunksHigh: 49,
    mapSize: 96
  },
  player: {
    movementSpeed: 4.2,      // units per second
    rotationSpeed: 10,      // lerp speed for rotation
    height: 1.72,
    radius: 0.35,
    eyeHeight: 1.62
  },
  camera: {
    mode: "first_person",
    eyeHeight: 1.62,
    yawSensitivity: 0.0035,
    pitchSensitivity: 0.0025,
    minPitch: -1.05,
    maxPitch: 1.05,
    smoothing: 0.0
  },
  performance: {
    targetFps: 30,
    capFrameRate: true,
    maxDeltaTime: 0.05,
    pixelRatioMax: 1.25,
    lowEndMode: true,
    enableShadows: false,
    adaptiveQuality: {
      enabled: true,
      checkIntervalSeconds: 3,
      lowFpsThreshold: 24,
      recoveryFpsThreshold: 29,
      minRenderDistanceChunks: 2,
      maxRenderDistanceChunks: 4,
      minEntityUpdateDistance: 18,
      maxEntityUpdateDistance: 36
    }
  },
  entities: {
    maxActiveNPCs: 5,
    maxActiveAnimals: 10,
    maxActiveBirds: 15,
    farEntityUpdateInterval: 0.5, // Update distant entities twice a second
    nearEntityUpdateInterval: 0.033, // Target 30fps update for near
    maxUpdateDistance: 32 // Skip updates if further than this
  },
  inventory: {
    slotCount: 20,
    hotbarSlotCount: 5,
    enableStarterItems: true
  },
  crafting: {
    enabled: true,
    allowCraftingWithoutStation: true,
    showLockedRecipes: false
  },
  ui: {
    showDebugPanel: true
  },
  debug: true
};
