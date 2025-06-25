import { MEMORY_REGION, REGION } from "./constants";
import type { u8, u16 } from "~/@types";

export class MMU {
  memoryMap: Uint8Array;
  constructor() {
    this.memoryMap = new Uint8Array();
  }

  write(address: u16, value: u8) {

  }

  read(address: u16) {

  }

  checkRegion(address: u16): REGION {
    if(address >= MEMORY_REGION.cartridge_fixed.start && address <= MEMORY_REGION.cartridge_fixed.end) {
      return REGION.CARTRIDGE_FIXED;
    }
    else if(address >= MEMORY_REGION.cartridge_bank.start && address <= MEMORY_REGION.cartridge_bank.end) {
      return REGION.CARTRIDGE_BANK;
    }
    else if(address >= MEMORY_REGION.vram.start && address <= MEMORY_REGION.vram.end) {
      return REGION.VRAM;
    }
    else if(address >= MEMORY_REGION.sram.start && address <= MEMORY_REGION.sram.start) {
      return REGION.SRAM;
    }
    else if(address >= MEMORY_REGION.wram.start && address <= MEMORY_REGION.wram.end) {
      return REGION.WRAM;
    }
    else if(address >= MEMORY_REGION.wram_cgb.start && address <= MEMORY_REGION.wram_cgb.end) {
      return REGION.WRAM_CGB;
    }
    else {
      return REGION.UNDEFINED
    }
  }
};
