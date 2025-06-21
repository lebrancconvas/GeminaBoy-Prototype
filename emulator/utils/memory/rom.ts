import { Cartridge } from "~/utils/cartridge";
export class ROM {
  cartridge?: Cartridge;

  insert(cartridge: Cartridge) {
    this.cartridge = cartridge;
    alert(`
      Insert Cartridge Success!\n
      ROM Name: ${cartridge.romName}\n
      Cartridge Type: ${cartridge.cartridgeType}\n
      ROM Size: ${cartridge.romSize} Byte(s)\n
      RAM Size: ${cartridge.ramSize} Byte(s)
    `);
  }
};
