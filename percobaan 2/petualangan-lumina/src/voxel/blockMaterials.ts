import { MeshLambertMaterial } from 'three';
import { BlockType } from './BlockType';
import { ProceduralTextureFactory } from './ProceduralTextureFactory';

// Create one shared instance of each material for performance
export const blockMaterials: Record<string, MeshLambertMaterial> = {
  [BlockType.Grass]: new MeshLambertMaterial({ 
    map: ProceduralTextureFactory.generateTexture(0x43b66a, 0.15)
  }),
  [BlockType.Dirt]: new MeshLambertMaterial({ 
    map: ProceduralTextureFactory.generateTexture(0x9a6233, 0.1)
  }),
  [BlockType.Stone]: new MeshLambertMaterial({ 
    map: ProceduralTextureFactory.generateTexture(0x8d99a6, 0.2)
  }),
  [BlockType.Wood]: new MeshLambertMaterial({ 
    map: ProceduralTextureFactory.generateTexture(0xb9773e, 0.15)
  }),
  [BlockType.Crystal]: new MeshLambertMaterial({
    map: ProceduralTextureFactory.generateTexture(0x48d9ff, 0.1),
    emissive: 0x008888,
    emissiveIntensity: 0.3,
    transparent: true,
    opacity: 0.9
  }),
  [BlockType.Bridge]: new MeshLambertMaterial({ 
    map: ProceduralTextureFactory.generateTexture(0xc58a48, 0.05)
  }),
  [BlockType.Sand]: new MeshLambertMaterial({ 
    map: ProceduralTextureFactory.generateTexture(0xeedd82, 0.05)
  }),
  [BlockType.Water]: new MeshLambertMaterial({ 
    color: 0x3498db,
    transparent: true,
    opacity: 0.7,
    depthWrite: false
  })
};

export function getMaterialForBlock(type: BlockType): MeshLambertMaterial | null {
  if (type === BlockType.Air) return null;
  return blockMaterials[type] || blockMaterials[BlockType.Stone]; // fallback
}
