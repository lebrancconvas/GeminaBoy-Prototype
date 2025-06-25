import { Cartridge } from "./components/cartridge";

class GameBoyEmulator {
  static run(romBuffer: ArrayBuffer) {
    // Log ROM Data.
    const romData = new DataView(romBuffer);
    console.log(romData);

    // Working.
    const cartridge = new Cartridge(romBuffer);
    cartridge.insert();
  }
};

export default GameBoyEmulator;
