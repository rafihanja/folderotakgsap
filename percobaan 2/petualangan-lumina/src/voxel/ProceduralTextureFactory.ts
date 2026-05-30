import { CanvasTexture, NearestFilter, RepeatWrapping, SRGBColorSpace } from 'three';

export class ProceduralTextureFactory {
  // Generates a simple pixelated noise texture with a base color and variations
  static generateTexture(baseColorHex: number, noiseIntensity: number = 0.1, resolution: number = 16): CanvasTexture {
    const canvas = document.createElement('canvas');
    canvas.width = resolution;
    canvas.height = resolution;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      return new CanvasTexture(canvas);
    }

    // Parse base color
    const r = (baseColorHex >> 16) & 255;
    const g = (baseColorHex >> 8) & 255;
    const b = baseColorHex & 255;

    for (let x = 0; x < resolution; x++) {
      for (let y = 0; y < resolution; y++) {
        // Random noise variation between -noiseIntensity and +noiseIntensity
        const noise = (Math.random() * 2 - 1) * noiseIntensity;
        
        // Calculate new color with noise applied (clamped 0-255)
        const nr = Math.min(255, Math.max(0, Math.floor(r + r * noise)));
        const ng = Math.min(255, Math.max(0, Math.floor(g + g * noise)));
        const nb = Math.min(255, Math.max(0, Math.floor(b + b * noise)));

        // Add a subtle border/grid effect to make it look like blocks (optional)
        let finalR = nr;
        let finalG = ng;
        let finalB = nb;
        
        // Darken edges slightly
        if (x === 0 || y === 0 || x === resolution - 1 || y === resolution - 1) {
          finalR = Math.floor(nr * 0.85);
          finalG = Math.floor(ng * 0.85);
          finalB = Math.floor(nb * 0.85);
        }

        ctx.fillStyle = `rgb(${finalR}, ${finalG}, ${finalB})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }

    const texture = new CanvasTexture(canvas);
    // Minecraft-like pixelated look
    texture.magFilter = NearestFilter;
    texture.minFilter = NearestFilter;
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.colorSpace = SRGBColorSpace;
    
    return texture;
  }
}
