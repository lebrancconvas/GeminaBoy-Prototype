import { MEMORY_REGION } from "./constants";
import type { u8, u16 } from "~/@types/number";
import { REGION, type IRegion } from "~/@types/mmu";

export class MMU {
  memoryMap: Uint8Array;
  constructor() {
    this.memoryMap = new Uint8Array();
  }

  write(address: u16, value: u8) {
    const region = this.checkRegion(address);

    if(region.region === REGION.FIXED_CARTRIDGE || region.region === REGION.SWITCHABLE_CARTRIDGE) {
      throw new Error(`[ERROR] Cannot write the data to cartridge region.`);
    }

    this.memoryMap[address] = value;
  }

  read(address: u16): u8 {
    const value = this.memoryMap[address];

    if(value === undefined) {
      throw new Error(`[ERROR] Cannot read the data from the undefined address.`);
    }

    return value;
  }

  checkRegion(address: u16): IRegion {
    const targetRegion = MEMORY_REGION.find(region => address >= region.start && address <= region.end) as IRegion;
    const undefinedRegion = MEMORY_REGION[MEMORY_REGION.length - 1] as IRegion;

    if(!targetRegion) {
      return undefinedRegion;
    }

    return targetRegion;
  }
};
