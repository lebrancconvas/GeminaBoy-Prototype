import type { u16 } from "./number";

export enum REGION {
  FIXED_CARTRIDGE,
  SWITCHABLE_CARTRIDGE,
  VRAM,
  SRAM,
  WRAM,
  WRAM_CGB,
  ERAM,
  OAM,
  IO,
  HRAM,
  IE,
  UNDEFINED
};

export interface IRegion {
  region: REGION,
  start: u16,
  end: u16
};
