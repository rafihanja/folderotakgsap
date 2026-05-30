export const ItemType = {
  GrassBlock: "grass_block",
  DirtBlock: "dirt_block",
  StoneBlock: "stone_block",
  WoodBlock: "wood_block",
  CrystalShard: "crystal_shard",
  BridgeBlock: "bridge_block",
  WoodPlatform: "wood_platform",
  CrystalLamp: "crystal_lamp"
} as const;

export type ItemType = typeof ItemType[keyof typeof ItemType];
