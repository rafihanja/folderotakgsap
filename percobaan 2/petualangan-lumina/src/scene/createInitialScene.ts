import { Scene, Vector3 } from 'three';
import { setupLighting } from './Lighting';
import { PlayerPlaceholder } from '../player/PlayerPlaceholder';
import { BimoPlaceholder } from '../companion/BimoPlaceholder';
import { VoxelWorld } from '../voxel/VoxelWorld';
import { createSkyDome } from './SkyDome';
import { NPCManager } from '../npc/NPCManager';
import { EntityManager } from '../entity/EntityManager';
import { Animal, AnimalType } from '../entity/Animal';

export function createInitialScene(scene: Scene) {
  // Create Realistic Sky
  createSkyDome(scene);

  // Setup lighting
  setupLighting(scene);

  // Voxel World
  const voxelWorld = new VoxelWorld(scene);
  voxelWorld.generateStarterMap();

  // Entities
  const player = new PlayerPlaceholder(scene);
  const bimo = new BimoPlaceholder(scene);
  const npcManager = new NPCManager(scene, voxelWorld);

  const entityManager = new EntityManager(scene);
  
  entityManager.addEntity(new Animal('bird1', AnimalType.BIRD, new Vector3(5, 8, 5), voxelWorld));
  entityManager.addEntity(new Animal('bird2', AnimalType.BIRD, new Vector3(-10, 10, 15), voxelWorld));
  entityManager.addEntity(new Animal('frog1', AnimalType.FROG, new Vector3(12, 3, 12), voxelWorld));
  
  const petCat = new Animal('pet_cat', AnimalType.CAT, new Vector3(2, 4, 2), voxelWorld);
  petCat.isPet = true;
  entityManager.addEntity(petCat);

  // NPC 1: Pak Ramu (Village builder)
  npcManager.spawnNPC("pak_ramu", new Vector3(10, 3.5, -4), {
    head: 0xd2a679, body: 0x6e8b3d, arm: 0x8b5a2b, leg: 0x5c3a21
  }, -Math.PI / 4);

  // NPC 2: Nara (Explorer)
  npcManager.spawnNPC("nara", new Vector3(2, 3.5, -10), {
    head: 0xe6c2a1, body: 0x4a90e2, arm: 0x4a90e2, leg: 0xe6e6da
  }, Math.PI / 2);

  // NPC 3: Tiko (Crystal Tinkerer)
  npcManager.spawnNPC("tiko", new Vector3(-10, 5.5, 0), {
    head: 0xc4a484, body: 0x40e0d0, arm: 0x7f8c8d, leg: 0x2c3e50
  }, Math.PI);

  return { player, bimo, voxelWorld, npcManager, entityManager };
}
