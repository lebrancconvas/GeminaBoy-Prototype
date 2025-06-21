import { ROM } from "./utils";
import { Cartridge } from "./utils/cartridge";

class GameBoyEmulator {
  static run(romBuffer: ArrayBuffer) {
    // Log ROM Data.
    const romData = new DataView(romBuffer);
    console.log(romData);

    // Working.
    const cartridge = new Cartridge(romBuffer);
    const rom = new ROM();
    rom.insert(cartridge);
  }
};

export default GameBoyEmulator;
