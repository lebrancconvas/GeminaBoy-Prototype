export class Tiles {
  private mmu: any;

  constructor(mmu: any) {
    this.mmu = mmu;
  }

  // Get pixel color from a tile
  getPixel(tileIndex: number, x: number, y: number, tileDataBase: number): number {
    // Calculate tile address
    let tileAddr: number;
    if (tileDataBase === 0x8000) {
      // Unsigned addressing
      tileAddr = tileDataBase + tileIndex * 16;
    } else {
      // Signed addressing
      tileAddr = tileDataBase + ((tileIndex + 128) * 16);
    }

    // Get the two bytes for this row
    const row = y % 8;
    const byte1 = this.mmu.readByte(tileAddr + row * 2);
    const byte2 = this.mmu.readByte(tileAddr + row * 2 + 1);

    // Extract pixel color
    const pixel = x % 8;
    const bit1 = (byte1 >> (7 - pixel)) & 1;
    const bit2 = (byte2 >> (7 - pixel)) & 1;
    
    return (bit2 << 1) | bit1;
  }

  // Get tile data as a 2D array for debugging
  getTileData(tileIndex: number, tileDataBase: number): number[][] {
    const tile = Array(8).fill(0).map(() => Array(8).fill(0));
    
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        tile[y][x] = this.getPixel(tileIndex, x, y, tileDataBase);
      }
    }
    
    return tile;
  }

  // Get multiple tiles for debugging
  getTileMap(startTile: number, width: number, height: number, tileDataBase: number): number[][][] {
    const tiles: number[][][] = [];
    
    for (let i = 0; i < width * height; i++) {
      const tileIndex = startTile + i;
      tiles.push(this.getTileData(tileIndex, tileDataBase));
    }
    
    return tiles;
  }
}
