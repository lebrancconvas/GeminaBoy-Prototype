import { CartridgeType } from "./cartridge.enum";
import { KB } from "~/helpers/byte";

export class Cartridge {
  romBuffer: ArrayBuffer;
  romData: DataView;

  constructor(romBuffer: ArrayBuffer) {
    this.romBuffer = romBuffer;
    this.romData = new DataView(romBuffer);
  }

  get romName(): string {
    const romNameOffsetBeginPoint = 0x134;
    const romNameOffsetEndPoint = 0x143;
    let romName = "";

    for(let offset = romNameOffsetBeginPoint; offset < romNameOffsetEndPoint; offset++) {
      const ascii = this.romData.getUint8(offset);
      if(ascii === 0x00) romName += " ";
      else {
        const char = String.fromCharCode(ascii);
        romName += char;
      }
    }

    return romName.trim();
  };


  get cartridgeType(): string {
    const cartridgeTypeOffset = 0x147;
    const cartridgeTypeValue = this.romData.getUint8(cartridgeTypeOffset) as CartridgeType;

    return cartridgeTypeValue.toString(16).padStart(4, '0x');
  };

  get romSize(): number {

    const romSizeOffset = 0x148;
    const romSizeValue = this.romData.getUint8(romSizeOffset);
    return 32 * (1 << romSizeValue);
  };

  get ramSize(): number {
    const ramSizeOffset = 0x149;
    const ramSizeValue = this.romData.getUint8(ramSizeOffset);

    switch(ramSizeValue) {
      case 0x00:
        return KB(0);
      case 0x02:
        return KB(8);
      case 0x03:
        return KB(32);
      case 0x04:
        return KB(128)
      case 0x05:
        return KB(64)
      default:
        return KB(0);
    }
  };

  insert() {
    alert(`
      Insert Cartridge Success!\n
      ROM Name: ${this.romName}\n
      Cartridge Type: ${this.cartridgeType}\n
      ROM Size: ${this.romSize * (2**10)} Byte(s) or ${this.romSize} KB(s)\n
      RAM Size: ${this.ramSize} Byte(s) or ${this.ramSize / (2**10)} KB(s)
    `);
  }
};

