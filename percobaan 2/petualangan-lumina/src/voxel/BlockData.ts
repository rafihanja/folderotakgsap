import { BlockType } from './BlockType';

export type GridPosition = {
  x: number;
  y: number;
  z: number;
};

export type BlockDefinition = {
  type: BlockType;
  displayName: string;
  breakable: boolean;
  placeable: boolean;
};

const blockDefinitions: Record<BlockType, BlockDefinition> = {
  [BlockType.Air]: {
    type: BlockType.Air,
    displayName: 'Air',
    breakable: false,
    placeable: false
  },
  [BlockType.Grass]: {
    type: BlockType.Grass,
    displayName: 'Grass',
    breakable: true,
    placeable: true
  },
  [BlockType.Dirt]: {
    type: BlockType.Dirt,
    displayName: 'Dirt',
    breakable: true,
    placeable: true
  },
  [BlockType.Stone]: {
    type: BlockType.Stone,
    displayName: 'Stone',
    breakable: true,
    placeable: true
  },
  [BlockType.Wood]: {
    type: BlockType.Wood,
    displayName: 'Wood',
    breakable: true,
    placeable: true
  },
  [BlockType.Crystal]: {
    type: BlockType.Crystal,
    displayName: 'Crystal',
    breakable: true,
    placeable: true
  },
  [BlockType.Bridge]: {
    type: BlockType.Bridge,
    displayName: 'Bridge',
    breakable: false,
    placeable: true
  },
  [BlockType.Sand]: {
    type: BlockType.Sand,
    displayName: 'Sand',
    breakable: true,
    placeable: true
  },
  [BlockType.Water]: {
    type: BlockType.Water,
    displayName: 'Water',
    breakable: false,
    placeable: false
  }
};

export function getBlockDefinition(type: BlockType): BlockDefinition {
  return blockDefinitions[type] || blockDefinitions[BlockType.Air];
}
