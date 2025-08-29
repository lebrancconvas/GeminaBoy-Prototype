import { MMU } from "../memory";

export class Cartridge {
  private romBuffer: ArrayBuffer;
  private romData: DataView;
  private mmu: MMU;

  constructor(romBuffer: ArrayBuffer, mmu: MMU) {
    this.romBuffer = romBuffer;
    this.romData = new DataView(romBuffer);
    this.mmu = mmu;
  }

  get romName(): string {
    const romNameOffsetBeginPoint = 0x134;
    const romNameOffsetEndPoint = 0x143;
    let romName = "";

    for (let offset = romNameOffsetBeginPoint; offset < romNameOffsetEndPoint; offset++) {
      const ascii = this.romData.getUint8(offset);
      if (ascii === 0x00) romName += " ";
      else {
        const char = String.fromCharCode(ascii);
        romName += char;
      }
    }

    return romName.trim();
  }

  get cartridgeType(): number {
    const cartridgeTypeOffset = 0x147;
    return this.romData.getUint8(cartridgeTypeOffset);
  }

  get romSize(): number {
    const romSizeOffset = 0x148;
    const romSizeValue = this.romData.getUint8(romSizeOffset);
    return 32 * (1 << romSizeValue);
  }

  get ramSize(): number {
    const ramSizeOffset = 0x149;
    const ramSizeValue = this.romData.getUint8(ramSizeOffset);

    switch (ramSizeValue) {
      case 0x00:
        return 0;
      case 0x02:
        return 8;
      case 0x03:
        return 32;
      case 0x04:
        return 128;
      case 0x05:
        return 64;
      default:
        return 0;
    }
  }

  insert(): void {
    this.mmu.loadROM(this.romBuffer);
    console.log('Cartridge inserted successfully!');
    this.log();
  }

  log(): void {
    console.log(`
      Insert Cartridge Success!
      ROM Name: ${this.romName}
      Cartridge Type: 0x${this.cartridgeType.toString(16).padStart(2, '0')}
      ROM Size: ${this.romSize} KB
      RAM Size: ${this.ramSize} KB
    `);
  }
}

