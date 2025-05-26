import { CartridgeType } from "./cartridge.enum";
import { KB } from "~/helpers/byte";

export class Cartridge {
  romBuffer: ArrayBuffer;
  romData: DataView;

  constructor(romBuffer: ArrayBuffer) {
    this.romBuffer = romBuffer;
    this.romData = new DataView(romBuffer);
  }


  get cartridgeType(): CartridgeType {
    const cartridgeTypeOffset = 0x147;
    const cartridgeTypeValue = this.romData.getUint8(cartridgeTypeOffset) as CartridgeType;

    return cartridgeTypeValue;
  }

  get romSize(): number {

    const romSizeOffset = 0x148;
    const romSizeValue = this.romData.getUint8(romSizeOffset);
    return 32 * (1 << romSizeValue);
  }

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
  }
};
