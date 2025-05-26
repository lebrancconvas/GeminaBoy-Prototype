class GameBoyEmulator {
  static run(romBuffer: ArrayBuffer) {
    const romData = new DataView(romBuffer);
    console.log(romData);
  }
};

export default GameBoyEmulator;
