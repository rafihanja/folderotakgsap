export const BlockType = {
  Air: 'air',
  Grass: 'grass',
  Dirt: 'dirt',
  Stone: 'stone',
  Wood: 'wood',
  Crystal: 'crystal',
  Bridge: 'bridge',
  Sand: 'sand',
  Water: 'water'
} as const;

export type BlockType = typeof BlockType[keyof typeof BlockType];
