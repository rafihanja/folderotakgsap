export const RecipeType = {
  BridgeBlock: "bridge_block",
  WoodPlatform: "wood_platform",
  CrystalLamp: "crystal_lamp"
} as const;

export type RecipeType = typeof RecipeType[keyof typeof RecipeType];
