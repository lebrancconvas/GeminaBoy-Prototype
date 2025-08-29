export class ROM {
  private romData: Uint8Array;
  private romBanks: Uint8Array[];
  private currentBank: number = 1;
  private totalBanks: number = 1;

  constructor(romBuffer: ArrayBuffer) {
    this.romData = new Uint8Array(romBuffer);
    this.totalBanks = Math.max(1, this.romData.length / 16384); // 16KB per bank
    this.romBanks = [];
    
    // Split ROM into banks
    for (let i = 0; i < this.totalBanks; i++) {
      const start = i * 16384;
      const end = Math.min(start + 16384, this.romData.length);
      this.romBanks.push(this.romData.slice(start, end));
    }
  }

  // Read byte from ROM
  readByte(addr: number): number {
    // Bounds checking
    if (addr < 0 || addr >= this.romData.length) {
      console.warn(`Attempted to read from invalid ROM address: 0x${addr.toString(16).padStart(4, '0')}`);
      return 0xFF;
    }

    if (addr < 0x4000) {
      // Bank 0 (fixed)
      return this.romData[addr];
    } else if (addr < 0x8000) {
      // Switchable bank
      const bankAddr = addr - 0x4000;
      if (this.currentBank < this.romBanks.length && bankAddr >= 0 && bankAddr < this.romBanks[this.currentBank].length) {
        return this.romBanks[this.currentBank][bankAddr];
      }
      return 0xFF;
    }
    return 0xFF;
  }

  // Read word from ROM
  readWord(addr: number): number {
    // Bounds checking for word read
    if (addr < 0 || addr + 1 >= this.romData.length) {
      console.warn(`Attempted to read word from invalid ROM address: 0x${addr.toString(16).padStart(4, '0')}`);
      return 0xFFFF;
    }

    const low = this.readByte(addr);
    const high = this.readByte(addr + 1);
    return (high << 8) | low;
  }

  // Switch ROM bank
  switchBank(bankNumber: number): void {
    if (bankNumber >= 0 && bankNumber < this.totalBanks) {
      this.currentBank = bankNumber;
      console.log(`Switched to ROM bank: ${bankNumber}`);
    } else {
      console.warn(`Invalid bank number: ${bankNumber}, total banks: ${this.totalBanks}`);
    }
  }

  // Get current bank
  getCurrentBank(): number {
    return this.currentBank;
  }

  // Get total banks
  getTotalBanks(): number {
    return this.totalBanks;
  }

  // Get ROM size
  getSize(): number {
    return this.romData.length;
  }

  // Get ROM header info
  getHeaderInfo(): any {
    try {
      const title = this.readString(0x134, 16);
      const manufacturer = this.readString(0x13F, 4);
      const cartridgeType = this.readByte(0x147);
      const romSize = this.readByte(0x148);
      const ramSize = this.readByte(0x149);
      const destination = this.readByte(0x14A);
      const version = this.readByte(0x14C);

      return {
        title: title.trim(),
        manufacturer: manufacturer.trim(),
        cartridgeType,
        romSize: 32 << romSize, // Size in KB
        ramSize: [0, 2, 8, 32, 128, 64][ramSize] || 0, // Size in KB
        destination: destination === 0 ? 'Japan' : 'Non-Japan',
        version
      };
    } catch (error) {
      console.error('Error reading ROM header:', error);
      return {
        title: 'Unknown',
        manufacturer: 'Unknown',
        cartridgeType: 0,
        romSize: this.romData.length / 1024,
        ramSize: 0,
        destination: 'Unknown',
        version: 0
      };
    }
  }

  private readString(addr: number, length: number): string {
    let result = '';
    for (let i = 0; i < length; i++) {
      try {
        const char = this.readByte(addr + i);
        if (char === 0) break;
        result += String.fromCharCode(char);
      } catch (error) {
        console.warn(`Error reading string at address 0x${(addr + i).toString(16).padStart(4, '0')}:`, error);
        break;
      }
    }
    return result;
  }

  // Validate ROM checksum
  validateChecksum(): boolean {
    try {
      let checksum = 0;
      for (let i = 0x134; i < 0x14D; i++) {
        checksum = checksum - this.readByte(i) - 1;
      }
      return (checksum & 0xFF) === this.readByte(0x14D);
    } catch (error) {
      console.error('Error validating ROM checksum:', error);
      return false;
    }
  }
}
