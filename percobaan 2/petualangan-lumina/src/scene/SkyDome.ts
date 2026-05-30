import { Scene, SphereGeometry, ShaderMaterial, Mesh, BackSide, Color } from 'three';

export function createSkyDome(scene: Scene) {
  const skyGeo = new SphereGeometry(500, 32, 15);
  
  const vertexShader = `
    varying vec3 vWorldPosition;
    void main() {
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 topColor;
    uniform vec3 bottomColor;
    varying vec3 vWorldPosition;
    void main() {
      float h = normalize(vWorldPosition).y;
      // h is mostly from 0 to 1. 0 is horizon, 1 is top
      float mixFactor = smoothstep(0.0, 0.4, h);
      gl_FragColor = vec4(mix(bottomColor, topColor, mixFactor), 1.0);
    }
  `;

  const uniforms = {
    topColor: { value: new Color(0x3a82f8) },    // Deep soft blue
    bottomColor: { value: new Color(0xbbe2fc) }  // Pale blue with haze
  };

  const skyMat = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
    side: BackSide,
    depthWrite: false
  });
  
  const sky = new Mesh(skyGeo, skyMat);
  scene.add(sky);
  
  return sky;
}
