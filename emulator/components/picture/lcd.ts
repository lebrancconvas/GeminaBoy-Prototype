export class LCD {
  private mmu: any;
  private enabled: boolean = true;
  private backgroundEnabled: boolean = true;
  private windowEnabled: boolean = true;
  private spritesEnabled: boolean = true;
  private mode: number = 0;
  private scanline: number = 0;

  constructor(mmu: any) {
    this.mmu = mmu;
  }

  // LCD Control Register (0xFF40)
  isEnabled(): boolean {
    return (this.mmu.readByte(0xFF40) & 0x80) !== 0;
  }

  isBackgroundEnabled(): boolean {
    return (this.mmu.readByte(0xFF40) & 0x01) !== 0;
  }

  isWindowEnabled(): boolean {
    return (this.mmu.readByte(0xFF40) & 0x20) !== 0;
  }

  isSpritesEnabled(): boolean {
    return (this.mmu.readByte(0xFF40) & 0x02) !== 0;
  }

  // LCD Status Register (0xFF41)
  setMode(mode: number): void {
    const status = this.mmu.readByte(0xFF41);
    this.mmu.writeByte(0xFF41, (status & 0xFC) | mode);
    this.mode = mode;
  }

  setScanline(scanline: number): void {
    this.mmu.writeByte(0xFF44, scanline);
    this.scanline = scanline;
  }

  // Scroll registers
  getScrollX(): number {
    return this.mmu.readByte(0xFF43);
  }

  getScrollY(): number {
    return this.mmu.readByte(0xFF42);
  }

  // Window position
  getWindowX(): number {
    return this.mmu.readByte(0xFF4B);
  }

  getWindowY(): number {
    return this.mmu.readByte(0xFF4A);
  }

  // Tile data and maps
  getTileData(): number {
    return (this.mmu.readByte(0xFF40) & 0x10) !== 0 ? 0x8000 : 0x8800;
  }

  getBackgroundTileMap(): number {
    return (this.mmu.readByte(0xFF40) & 0x08) !== 0 ? 0x9C00 : 0x9800;
  }

  getWindowTileMap(): number {
    return (this.mmu.readByte(0xFF40) & 0x40) !== 0 ? 0x9C00 : 0x9800;
  }

  // Color palette
  getColor(colorIndex: number): { r: number; g: number; b: number } {
    const palette = this.mmu.readByte(0xFF47);
    const color = (palette >> (colorIndex * 2)) & 0x03;
    
    switch (color) {
      case 0: return { r: 255, g: 255, b: 255 }; // White
      case 1: return { r: 192, g: 192, b: 192 }; // Light gray
      case 2: return { r: 96, g: 96, b: 96 };   // Dark gray
      case 3: return { r: 0, g: 0, b: 0 };      // Black
      default: return { r: 0, g: 0, b: 0 };
    }
  }

  // Reset LCD
  reset(): void {
    this.enabled = true;
    this.backgroundEnabled = true;
    this.windowEnabled = true;
    this.spritesEnabled = true;
    this.mode = 0;
    this.scanline = 0;
    
    // Reset registers
    this.mmu.writeByte(0xFF40, 0x91); // LCD Control
    this.mmu.writeByte(0xFF41, 0x00); // LCD Status
    this.mmu.writeByte(0xFF42, 0x00); // Scroll Y
    this.mmu.writeByte(0xFF43, 0x00); // Scroll X
    this.mmu.writeByte(0xFF44, 0x00); // LY
    this.mmu.writeByte(0xFF45, 0x00); // LYC
    this.mmu.writeByte(0xFF47, 0xFC); // BGP
    this.mmu.writeByte(0xFF48, 0xFF); // OBP0
    this.mmu.writeByte(0xFF49, 0xFF); // OBP1
    this.mmu.writeByte(0xFF4A, 0x00); // WY
    this.mmu.writeByte(0xFF4B, 0x00); // WX
  }
}
