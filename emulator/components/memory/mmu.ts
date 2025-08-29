import { ROM } from './rom';
import { RAM } from './ram';

export class MMU {
  private rom: ROM | null = null;
  private ram: RAM;
  private hardwareRegisters: Uint8Array;

  constructor() {
    this.ram = new RAM();
    this.hardwareRegisters = new Uint8Array(256);
    this.initializeHardwareRegisters();
  }

  private initializeHardwareRegisters(): void {
    // Initialize hardware registers with default values
    this.hardwareRegisters.fill(0);
    
    // Set some default values for LCD and other hardware
    this.hardwareRegisters[0x40] = 0x91; // LCD Control
    this.hardwareRegisters[0x41] = 0x00; // LCD Status
    this.hardwareRegisters[0x42] = 0x00; // Scroll Y
    this.hardwareRegisters[0x43] = 0x00; // Scroll X
    this.hardwareRegisters[0x44] = 0x00; // LY
    this.hardwareRegisters[0x45] = 0x00; // LYC
    this.hardwareRegisters[0x47] = 0xFC; // BGP
    this.hardwareRegisters[0x48] = 0xFF; // OBP0
    this.hardwareRegisters[0x49] = 0xFF; // OBP1
    this.hardwareRegisters[0x4A] = 0x00; // WY
    this.hardwareRegisters[0x4B] = 0x00; // WX
  }

  // Load ROM into memory
  loadROM(romBuffer: ArrayBuffer): void {
    this.rom = new ROM(romBuffer);
    console.log('ROM loaded:', this.rom.getHeaderInfo());
  }

  // Read byte from memory
  readByte(addr: number): number {
    if (addr < 0x4000) {
      // ROM Bank 0
      return this.rom ? this.rom.readByte(addr) : 0xFF;
    } else if (addr < 0x8000) {
      // ROM Bank 1-N
      return this.rom ? this.rom.readByte(addr) : 0xFF;
    } else if (addr < 0xA000) {
      // Video RAM
      return this.readVideoRAM(addr);
    } else if (addr < 0xC000) {
      // External RAM
      return this.ram.readExternalRAM(addr);
    } else if (addr < 0xE000) {
      // Internal RAM
      return this.ram.readInternalRAM(addr);
    } else if (addr < 0xFE00) {
      // Echo RAM (mirror of internal RAM)
      return this.ram.readInternalRAM(addr - 0x2000);
    } else if (addr < 0xFEA0) {
      // Sprite Attribute Table (OAM)
      return this.readOAM(addr);
    } else if (addr < 0xFF00) {
      // Unusable
      return 0xFF;
    } else if (addr < 0xFF80) {
      // Hardware registers
      return this.readHardwareRegister(addr);
    } else if (addr < 0xFFFF) {
      // High RAM
      return this.ram.readHighRAM(addr);
    } else {
      // Interrupt Enable Register
      return this.hardwareRegisters[0xFF];
    }
  }

  // Write byte to memory
  writeByte(addr: number, value: number): void {
    if (addr < 0x8000) {
      // ROM - handle banking
      if (this.rom && addr >= 0x2000 && addr < 0x4000) {
        // ROM bank switching
        this.rom.switchBank(value);
      }
    } else if (addr < 0xA000) {
      // Video RAM
      this.writeVideoRAM(addr, value);
    } else if (addr < 0xC000) {
      // External RAM
      this.ram.writeExternalRAM(addr, value);
    } else if (addr < 0xE000) {
      // Internal RAM
      this.ram.writeInternalRAM(addr, value);
    } else if (addr < 0xFE00) {
      // Echo RAM
      this.ram.writeInternalRAM(addr - 0x2000, value);
    } else if (addr < 0xFEA0) {
      // OAM
      this.writeOAM(addr, value);
    } else if (addr < 0xFF00) {
      // Unusable
      return;
    } else if (addr < 0xFF80) {
      // Hardware registers
      this.writeHardwareRegister(addr, value);
    } else if (addr < 0xFFFF) {
      // High RAM
      this.ram.writeHighRAM(addr, value);
    } else {
      // Interrupt Enable Register
      this.hardwareRegisters[0xFF] = value;
    }
  }

  // Read word from memory
  readWord(addr: number): number {
    const low = this.readByte(addr);
    const high = this.readByte(addr + 1);
    return (high << 8) | low;
  }

  // Write word to memory
  writeWord(addr: number, value: number): void {
    this.writeByte(addr, value & 0xFF);
    this.writeByte(addr + 1, (value >> 8) & 0xFF);
  }

  // Video RAM access
  private readVideoRAM(addr: number): number {
    // Placeholder for video RAM
    return 0x00;
  }

  private writeVideoRAM(addr: number, value: number): void {
    // Placeholder for video RAM
  }

  // OAM access
  private readOAM(addr: number): number {
    // Placeholder for OAM
    return 0x00;
  }

  private writeOAM(addr: number, value: number): void {
    // Placeholder for OAM
  }

  // Hardware register access
  private readHardwareRegister(addr: number): number {
    const offset = addr - 0xFF00;
    if (offset >= 0 && offset < this.hardwareRegisters.length) {
      return this.hardwareRegisters[offset];
    }
    return 0xFF;
  }

  private writeHardwareRegister(addr: number, value: number): void {
    const offset = addr - 0xFF00;
    if (offset >= 0 && offset < this.hardwareRegisters.length) {
      this.hardwareRegisters[offset] = value & 0xFF;
    }
  }

  // Get ROM info
  getROMInfo(): any {
    return this.rom ? this.rom.getHeaderInfo() : null;
  }

  // Reset memory
  reset(): void {
    this.ram.clear();
    this.initializeHardwareRegisters();
    this.rom = null;
  }
}
