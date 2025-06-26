import { MEMORY_MAP_SIZE, MEMORY_REGION } from "./constants";
import { U8, U16 } from "~/helpers/number";
import { REGION, type IRegion } from "~/@types/mmu";
import type { u8, u16 } from "~/@types/number";

export class MMU {
  private memoryMap: DataView;
  constructor() {
    const memoryMapBuffer = new ArrayBuffer(MEMORY_MAP_SIZE);
    this.memoryMap = new DataView(memoryMapBuffer);
  }

  getMemoryMap() {

    console.log(`Memory Map: ${this.memoryMap}`);
    return this.memoryMap;
  }

  loadROM(romData: DataView) {
    for(let romAddress = 0; romAddress < romData.byteLength; romAddress++) {
      this.memoryMap.setUint8(U16(romAddress), U8(romData.getUint8(romAddress)));
    }
  }

  write(address: u16, value: u8) {
    const region = this.checkRegion(U16(address));

    if(region.region === REGION.FIXED_CARTRIDGE || region.region === REGION.SWITCHABLE_CARTRIDGE) {
      console.warn(`[WARNING] Cannot write the data to cartridge region.`);
      return;
    }

    this.memoryMap.setUint8(U16(address), U8(value));
  }

  read(address: u16): u8 {
    const value = this.memoryMap.getUint8(U16(address));

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
