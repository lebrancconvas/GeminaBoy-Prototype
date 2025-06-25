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
};
