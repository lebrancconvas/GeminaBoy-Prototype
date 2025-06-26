import { U16 } from "~/helpers/number";
import { REGION, type IRegion } from "~/@types/mmu";
import { KB } from "~/helpers/byte";

export const MEMORY_MAP_SIZE = KB(64); // 64 KB

export const MEMORY_REGION: IRegion[] = [
  {
    region: REGION.FIXED_CARTRIDGE,
    start: U16(0x0000),
    end: U16(0x3FFF)
  },
  {
    region: REGION.SWITCHABLE_CARTRIDGE,
    start: U16(0x4000),
    end: U16(0x7FFF)
  },
  {
    region: REGION.VRAM, // Video RAM (VRAM)
    start: U16(0x8000),
    end: U16(0x9FFF)
  },
  {
    region: REGION.SRAM, // Save RAM (SRAM) or External RAM (XRAM)
    start: U16(0xA000),
    end: U16(0xBFFF)
  },
  {
    region: REGION.WRAM, // Work RAM (WRAM)
    start: U16(0xC000),
    end: U16(0xCFFF)
  },
  {
    region: REGION.WRAM, // Work RAM (WRAM) in CGB Mode
    start: U16(0xD000),
    end: U16(0xDFFF)
  },
  {
    region: REGION.ERAM, // Echo RAM (ERAM)
    start: U16(0xE000),
    end: U16(0xFDFF)
  },
  {
    region: REGION.OAM, // Object Attribute Memory (OAM)
    start: U16(0xFE00),
    end: U16(0xFE9F)
  },
  {
    region: REGION.IO, // Input / Output (I/O)
    start: U16(0xFF00),
    end: U16(0xFF7F)
  },
  {
    region: REGION.HRAM, // High RAM (HRAM)
    start: U16(0xFF80),
    end: U16(0xFFFE)
  },
  {
    region: REGION.IE, // Interupt Enable (IE) Register
    start: U16(0xFFFF),
    end: U16(0xFFFF)
  },
  {
    region: REGION.UNDEFINED,
    start: U16(NaN),
    end: U16(NaN)
  }
];


