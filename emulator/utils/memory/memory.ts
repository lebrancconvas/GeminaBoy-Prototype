import { Cartridge } from "~/utils/cartridge";
export class Memory {
  cartridge?: Cartridge;

  insert(cartridge: Cartridge) {
    this.cartridge = cartridge;
    alert(`Insert Cartridge Success!`);
  }
};
