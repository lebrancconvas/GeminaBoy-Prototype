import type { u8, u16 } from "~/@types/number";

export const U8 = (num: number): u8 => {
  const outOfU8 = (num < 0x00) || (num > 0xFF) || !Number.isInteger(num);

  if(outOfU8) {
    throw new Error(`[ERROR] Cannot assign the value that doesn't fit the u8 (0-255) type.`);
  }

  return num as u8;
}


export const U16 = (num: number): u16 => {
  const outOfU16 = (num < 0x0000) || (num > 0xFFFF) || !Number.isInteger(num);

  if(outOfU16) {
    throw new Error(`[ERROR] Cannot assign the value that doesn't fit the u16 (0-65535) type.`);
  }

  return num as u16;
}
