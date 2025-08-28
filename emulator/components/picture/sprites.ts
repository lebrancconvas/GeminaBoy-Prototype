export class Sprites {
  private mmu: any;

  constructor(mmu: any) {
    this.mmu = mmu;
  }

  // Get all sprites on a specific scanline
  getSpritesOnScanline(scanline: number): any[] {
    const sprites: any[] = [];
    const oamBase = 0xFE00;
    
    for (let i = 0; i < 40; i++) { // Max 40 sprites
      const spriteAddr = oamBase + i * 4;
      const y = this.mmu.readByte(spriteAddr) - 16;
      const x = this.mmu.readByte(spriteAddr + 1) - 8;
      const tileIndex = this.mmu.readByte(spriteAddr + 2);
      const attributes = this.mmu.readByte(spriteAddr + 3);
      
      // Check if sprite is on this scanline
      if (scanline >= y && scanline < y + 8) {
        sprites.push({
          x,
          y,
          tileIndex,
          attributes,
          priority: (attributes & 0x80) === 0, // Lower priority number = higher priority
          yFlip: (attributes & 0x40) !== 0,
          xFlip: (attributes & 0x20) !== 0,
          palette: (attributes & 0x10) !== 0
        });
      }
    }
    
    // Sort by priority (lower number = higher priority)
    sprites.sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority ? -1 : 1;
      }
      return a.x - b.x; // Left to right
    });
    
    return sprites;
  }

  // Get sprite data for debugging
  getAllSprites(): any[] {
    const sprites: any[] = [];
    const oamBase = 0xFE00;
    
    for (let i = 0; i < 40; i++) {
      const spriteAddr = oamBase + i * 4;
      const y = this.mmu.readByte(spriteAddr);
      const x = this.mmu.readByte(spriteAddr + 1);
      const tileIndex = this.mmu.readByte(spriteAddr + 2);
      const attributes = this.mmu.readByte(spriteAddr + 3);
      
      sprites.push({
        index: i,
        x: x - 8,
        y: y - 16,
        tileIndex,
        attributes,
        priority: (attributes & 0x80) === 0,
        yFlip: (attributes & 0x40) !== 0,
        xFlip: (attributes & 0x20) !== 0,
        palette: (attributes & 0x10) !== 0
      });
    }
    
    return sprites;
  }

  // Check if sprite is visible on screen
  isSpriteVisible(sprite: any): boolean {
    return sprite.x >= -8 && sprite.x < 160 && sprite.y >= -16 && sprite.y < 144;
  }
}
