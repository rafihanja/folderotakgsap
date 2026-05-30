import { Scene, HemisphereLight, DirectionalLight } from 'three';

export function setupLighting(scene: Scene) {
  // Sky color (bright blue) and Ground color (earthy green)
  const hemiLight = new HemisphereLight(0xffffff, 0x5a8a65, 0.9);
  scene.add(hemiLight);

  // Soft warm sunlight
  const dirLight = new DirectionalLight(0xfffae6, 0.9);
  dirLight.position.set(5, 8, 4);
  dirLight.castShadow = false;
  
  scene.add(dirLight);
}
