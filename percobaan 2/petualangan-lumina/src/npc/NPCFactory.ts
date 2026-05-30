import { BoxGeometry, MeshLambertMaterial, Mesh, Group } from 'three';

export interface NPCStyleOptions {
  headColor: number;
  bodyColor: number;
  armColor: number;
  legColor: number;
}

export class NPCFactory {
  // Create an original blocky voxel humanoid
  public static createNPC(options: NPCStyleOptions): Group {
    const npcGroup = new Group();

    // Reusable materials
    const headMat = new MeshLambertMaterial({ color: options.headColor });
    const bodyMat = new MeshLambertMaterial({ color: options.bodyColor });
    const armMat = new MeshLambertMaterial({ color: options.armColor });
    const legMat = new MeshLambertMaterial({ color: options.legColor });
    
    // Simple face features (eyes)
    const eyeMat = new MeshLambertMaterial({ color: 0x111111 });

    // 1. Head (cube)
    const headGeom = new BoxGeometry(0.5, 0.5, 0.5);
    const head = new Mesh(headGeom, headMat);
    head.position.set(0, 1.45, 0); // Neck base is around 1.2
    
    // Eyes
    const eyeGeom = new BoxGeometry(0.05, 0.05, 0.05);
    const eyeL = new Mesh(eyeGeom, eyeMat);
    eyeL.position.set(-0.15, 0.05, 0.25);
    const eyeR = new Mesh(eyeGeom, eyeMat);
    eyeR.position.set(0.15, 0.05, 0.25);
    head.add(eyeL);
    head.add(eyeR);

    // 2. Torso (rectangle)
    const torsoGeom = new BoxGeometry(0.5, 0.7, 0.3);
    const torso = new Mesh(torsoGeom, bodyMat);
    torso.position.set(0, 0.85, 0);

    // 3. Arms (blocky)
    const armGeom = new BoxGeometry(0.2, 0.7, 0.2);
    const armL = new Mesh(armGeom, armMat);
    armL.position.set(-0.35, 0.85, 0);
    
    const armR = new Mesh(armGeom, armMat);
    armR.position.set(0.35, 0.85, 0);

    // 4. Legs (blocky)
    const legGeom = new BoxGeometry(0.24, 0.5, 0.24);
    const legL = new Mesh(legGeom, legMat);
    legL.position.set(-0.13, 0.25, 0);
    
    const legR = new Mesh(legGeom, legMat);
    legR.position.set(0.13, 0.25, 0);

    // Add all to group
    npcGroup.add(head);
    npcGroup.add(torso);
    npcGroup.add(armL);
    npcGroup.add(armR);
    npcGroup.add(legL);
    npcGroup.add(legR);

    // To allow idle animation, we could store references in userData
    npcGroup.userData = { head, armL, armR, legL, legR };

    return npcGroup;
  }
}
