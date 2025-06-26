import { MMU } from "./components";
import { Cartridge } from "./components/cartridge";

class GameBoyEmulator {
  static run(romBuffer: ArrayBuffer) {
    // Log ROM Data.
    const romData = new DataView(romBuffer);
    console.log(`index.ts ~ [LOG] ROM Data: ${romData}`);

    // Working.
    const mmu = new MMU();
    const cartridge = new Cartridge(romBuffer, mmu);
    cartridge.insert();
  }
};

export default GameBoyEmulator;
