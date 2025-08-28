export class RAM {
  private internalRAM: Uint8Array;
  private highRAM: Uint8Array;
  private externalRAM: Uint8Array;

  constructor() {
    // Internal RAM: 8KB
    this.internalRAM = new Uint8Array(8192);
    
    // High RAM: 127 bytes
    this.highRAM = new Uint8Array(127);
    
    // External RAM: 8KB (for cartridges with RAM)
    this.externalRAM = new Uint8Array(8192);
  }

  // Internal RAM access (0xC000-0xDFFF)
  readInternalRAM(addr: number): number {
    const offset = addr - 0xC000;
    if (offset >= 0 && offset < this.internalRAM.length) {
      return this.internalRAM[offset];
    }
    return 0xFF;
  }

  writeInternalRAM(addr: number, value: number): void {
    const offset = addr - 0xC000;
    if (offset >= 0 && offset < this.internalRAM.length) {
      this.internalRAM[offset] = value & 0xFF;
    }
  }

  // High RAM access (0xFF80-0xFFFE)
  readHighRAM(addr: number): number {
    const offset = addr - 0xFF80;
    if (offset >= 0 && offset < this.highRAM.length) {
      return this.highRAM[offset];
    }
    return 0xFF;
  }

  writeHighRAM(addr: number, value: number): void {
    const offset = addr - 0xFF80;
    if (offset >= 0 && offset < this.highRAM.length) {
      this.highRAM[offset] = value & 0xFF;
    }
  }

  // External RAM access (0xA000-0xBFFF)
  readExternalRAM(addr: number): number {
    const offset = addr - 0xA000;
    if (offset >= 0 && offset < this.externalRAM.length) {
      return this.externalRAM[offset];
    }
    return 0xFF;
  }

  writeExternalRAM(addr: number, value: number): void {
    const offset = addr - 0xA000;
    if (offset >= 0 && offset < this.externalRAM.length) {
      this.externalRAM[offset] = value & 0xFF;
    }
  }

  // Clear all RAM
  clear(): void {
    this.internalRAM.fill(0);
    this.highRAM.fill(0);
    this.externalRAM.fill(0);
  }

  // Get RAM contents for debugging
  getInternalRAM(): Uint8Array {
    return this.internalRAM;
  }

  getHighRAM(): Uint8Array {
    return this.highRAM;
  }

  getExternalRAM(): Uint8Array {
    return this.externalRAM;
  }
}
