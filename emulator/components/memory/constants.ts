import type { u16 } from "~/@types/number";
import { REGION, type IRegion } from "~/@types/mmu";

export const MEMORY_REGION: IRegion[] = [
  {
    region: REGION.FIXED_CARTRDIGE,
    start: 0x0000 as u16,
    end: 0x3FFF as u16
  },
  {
    region: REGION.SWITCHABLE_CARTRIDGE,
    start: 0x4000 as u16,
    end: 0x7FFF as u16
  },
  {
    region: REGION.VRAM, // Video RAM (VRAM)
    start: 0x8000 as u16,
    end: 0x9FFF as u16
  },
  {
    region: REGION.SRAM, // Save RAM (SRAM) or External RAM (XRAM)
    start: 0xA000 as u16,
    end: 0xBFFF as u16
  },
  {
    region: REGION.WRAM, // Work RAM (WRAM)
    start: 0xC000 as u16,
    end: 0xCFFF as u16
  },
  {
    region: REGION.WRAM, // Work RAM (WRAM) in CGB Mode
    start: 0xD000 as u16,
    end: 0xDFFF as u16
  },
  {
    region: REGION.ERAM, // Echo RAM (ERAM)
    start: 0xE000 as u16,
    end: 0xFDFF as u16
  },
  {
    region: REGION.OAM, // Object Attribute Memory (OAM)
    start: 0xFE00 as u16,
    end: 0xFE9F as u16
  },
  {
    region: REGION.IO, // Input / Output (I/O)
    start: 0xFF00 as u16,
    end: 0xFF7F
  },
  {
    region: REGION.HRAM, // High RAM (HRAM)
    start: 0xFF80 as u16,
    end: 0xFFFE as u16
  },
  {
    region: REGION.IE, // Interupt Enable (IE) Register
    start: 0xFFFF as u16,
    end: 0xFFFF as u16
  },
  {
    region: REGION.UNDEFINED,
    start: NaN as u16,
    end: NaN as u16
  }
];


