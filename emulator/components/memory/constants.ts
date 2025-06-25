import type { u16 } from "~/@types";

export const MEMORY_REGION = {
  cartridge_fixed: {
    start: 0x0000 as u16,
    end: 0x3FFF as u16
  },
  cartridge_bank: {
    start: 0x4000 as u16,
    end: 0x7FFF as u16
  },
  vram: { // Video RAM (VRAM)
    start: 0x8000 as u16,
    end: 0x9FFF as u16
  },
  sram: { // Save RAM (SRAM) or External RAM (XRAM)
    start: 0xA000 as u16,
    end: 0xBFFF as u16
  },
  wram: { // Work RAM (WRAM)
    start: 0xC000 as u16,
    end: 0xCFFF as u16
  },
  wram_cgb: { // Work RAM (WRAM) in CGB Mode
    start: 0xD000 as u16,
    end: 0xDFFF as u16
  },
  eram: { // Echo RAM (ERAM)
    start: 0xE000 as u16,
    end: 0xFDFF as u16
  },
  oam: { // Object Attribute Memory (OAM)
    start: 0xFE00 as u16,
    end: 0xFE9F as u16
  },
  io: { // Input / Output (I/O)
    start: 0xFF00 as u16,
    end: 0xFF7F
  },
  hram: { // High RAM (HRAM)
    start: 0xFF80 as u16,
    end: 0xFFFE as u16
  },
  ie: { // Interupt Enable (IE) Register
    start: 0xFFFF as u16,
    end: 0xFFFF as u16
  }
};

export enum REGION {
  CARTRIDGE_FIXED = "Cartridge Fixed",
  CARTRIDGE_BANK = "Cartridge Bank",
  VRAM = "Video RAM (VRAM)",
  SRAM = "Save RAM (SRAM) / External RAM (XRAM)",
  WRAM = "Work RAM (WRAM)",
  WRAM_CGB = "Work RAM (WRAM) for CGB Mode",
  ERAM = "Echo RAM (ERAM)",
  OAM = "Object Attribute Memory (OAM)",
  IO = "Input / Output (I/O)",
  HRAM = "High RAM (HRAM)",
  IE = "Interupt Enable (IE)",
  UNDEFINED = "Undefined"
};
