import { Scene, Group, Vector3, Box3 } from 'three';
import { NPCFactory } from './NPCFactory';
import { NPC_DEFINITIONS } from './NPCData';
import type { NPCData } from './NPCData';
import { VoxelWorld } from '../voxel/VoxelWorld';
import { gameConfig } from '../config/gameConfig';

export interface NPCInstance {
  data: NPCData;
  group: Group;
  baseY: number;
  timeOffset: number;
  boundingBox: Box3;
  state: 'idle' | 'wandering';
  stateTimer: number;
  velocity: Vector3;
}

export class NPCManager {
  private scene: Scene;
  private voxelWorld: VoxelWorld;
  private npcs: NPCInstance[] = [];

  constructor(scene: Scene, voxelWorld: VoxelWorld) {
    this.scene = scene;
    this.voxelWorld = voxelWorld;
  }

  public spawnNPC(npcId: string, position: Vector3, colors: { head: number, body: number, arm: number, leg: number }, rotationY: number = 0) {
    const data = NPC_DEFINITIONS[npcId];
    if (!data) {
      console.warn(`NPC ID ${npcId} not found in definitions.`);
      return;
    }

    const groundHeight = this.voxelWorld.getGroundHeightAtWorldPosition(position.x, position.z);
    const spawnY = Math.max(position.y, groundHeight);

    const npcGroup = NPCFactory.createNPC({
      headColor: colors.head,
      bodyColor: colors.body,
      armColor: colors.arm,
      legColor: colors.leg
    });

    npcGroup.position.set(position.x, spawnY, position.z);
    npcGroup.rotation.y = rotationY;
    this.scene.add(npcGroup);

    const boundingBox = new Box3().setFromObject(npcGroup);
    boundingBox.expandByScalar(0.2);

    this.npcs.push({
      data,
      group: npcGroup,
      baseY: spawnY,
      timeOffset: Math.random() * Math.PI * 2,
      boundingBox,
      state: 'idle',
      stateTimer: 2 + Math.random() * 3,
      velocity: new Vector3()
    });
  }

  public update(_deltaTime: number, elapsedTime: number, playerPos: Vector3) {
    for (const npc of this.npcs) {
      // Distance culling optimization
      if (npc.group.position.distanceTo(playerPos) > gameConfig.entities.maxUpdateDistance) {
        continue;
      }

      npc.stateTimer -= _deltaTime;
      
      if (npc.stateTimer <= 0) {
        if (Math.random() > 0.5) {
          npc.state = 'idle';
          npc.velocity.set(0, 0, 0);
          npc.stateTimer = 2 + Math.random() * 4;
        } else {
          npc.state = 'wandering';
          npc.stateTimer = 2 + Math.random() * 3;
          const angle = Math.random() * Math.PI * 2;
          npc.velocity.set(Math.cos(angle) * 1.5, 0, Math.sin(angle) * 1.5);
        }
      }

      if (npc.state === 'wandering') {
        npc.group.position.addScaledVector(npc.velocity, _deltaTime);
        npc.group.lookAt(npc.group.position.x + npc.velocity.x, npc.group.position.y, npc.group.position.z + npc.velocity.z);
      }

      const currentGroundHeight = this.voxelWorld.getGroundHeightAtWorldPosition(npc.group.position.x, npc.group.position.z);
      
      if (currentGroundHeight > -10) {
        if (npc.baseY > currentGroundHeight) {
           npc.baseY = Math.max(currentGroundHeight, npc.baseY - _deltaTime * 5); // Fall speed
        } else {
           npc.baseY = currentGroundHeight;
        }
      }

      // Idle bobbing only when not wandering
      let bobOffset = 0;
      if (npc.state === 'idle') {
         bobOffset = Math.sin(elapsedTime * 2 + npc.timeOffset) * 0.05;
      } else {
         bobOffset = Math.abs(Math.sin(elapsedTime * 10)) * 0.1; // walk bob
      }
      
      npc.group.position.y = npc.baseY + bobOffset;
      
      // Look at player if nearby and idle
      const dist = npc.group.position.distanceTo(playerPos);
      if (dist < 6 && npc.state === 'idle') {
        const targetPos = playerPos.clone();
        targetPos.y = npc.group.position.y;
        npc.group.lookAt(targetPos);
      }

      npc.boundingBox.setFromObject(npc.group);
      npc.boundingBox.expandByScalar(0.2);
    }
  }

  public getNPCs(): NPCInstance[] {
    return this.npcs;
  }
}

