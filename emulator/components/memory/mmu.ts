import { MEMORY_MAP_SIZE, MEMORY_REGION } from "./constants";
import { U8, U16 } from "~/helpers/number";
import { REGION, type IRegion } from "~/@types/mmu";
import type { u8, u16 } from "~/@types/number";

export class MMU {
  private memoryMap: Uint8Array;
  constructor() {
    this.memoryMap = new Uint8Array(MEMORY_MAP_SIZE);
  }

  getMemoryMap() {
    return this.memoryMap;
  }

  write(address: u16, value: u8) {
    const region = this.checkRegion(U16(address));

    if(region.region === REGION.FIXED_CARTRIDGE || region.region === REGION.SWITCHABLE_CARTRIDGE) {
      throw new Error(`[ERROR] Cannot write the data to cartridge region.`);
    }

    this.memoryMap[address] = U8(value);
  }

  read(address: u16): u8 {
    const value = this.memoryMap[U16(address)];

    if(value === undefined) {
      throw new Error(`[ERROR] Cannot read the data from the undefined address.`);
    }

    return U8(value);
  }

  checkRegion(address: u16): IRegion {
    const targetRegion = MEMORY_REGION.find(region => U16(address) >= region.start && U16(address) <= region.end) as IRegion;
    const undefinedRegion = MEMORY_REGION[MEMORY_REGION.length - 1] as IRegion;

    if(!targetRegion) {
      return undefinedRegion;
    }

    return targetRegion;
  }
};
