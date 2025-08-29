import { LCD } from './lcd';
import { Tiles } from './tiles';
import { Sprites } from './sprites';

export class PPU {
  private lcd: LCD;
  private tiles: Tiles;
  private sprites: Sprites;
  private mmu: any;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private frameBuffer: Uint8Array;
  private scanline: number = 0;
  private mode: number = 0;
  private modeClock: number = 0;
  private romLoaded: boolean = false;

  // LCD modes
  private static readonly MODE_HBLANK = 0;
  private static readonly MODE_VBLANK = 1;
  private static readonly MODE_OAM = 2;
  private static readonly MODE_PIXEL_TRANSFER = 3;

  // Timing constants
  private static readonly MODE_0_CLOCKS = 204;
  private static readonly MODE_1_CLOCKS = 4560;
  private static readonly MODE_2_CLOCKS = 80;
  private static readonly MODE_3_CLOCKS = 172;

  constructor(mmu: any, canvas: HTMLCanvasElement) {
    this.mmu = mmu;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.lcd = new LCD(mmu);
    this.tiles = new Tiles(mmu);
    this.sprites = new Sprites(mmu);
    this.frameBuffer = new Uint8Array(160 * 144 * 4); // RGBA for each pixel

    // Set canvas size
    this.canvas.width = 160;
    this.canvas.height = 144;
  }

  // Set ROM loaded status
  setROMLoaded(loaded: boolean): void {
    this.romLoaded = loaded;
  }

  // Update PPU for a given number of CPU cycles
  update(cycles: number): void {
    if (!this.romLoaded) return; // Don't update if no ROM is loaded
    
    this.modeClock += cycles;

    switch (this.mode) {
      case PPU.MODE_HBLANK:
        if (this.modeClock >= PPU.MODE_0_CLOCKS) {
          this.modeClock -= PPU.MODE_0_CLOCKS;
          this.scanline++;
          
          if (this.scanline >= 144) {
            this.mode = PPU.MODE_VBLANK;
            this.renderFrame();
          } else {
            this.mode = PPU.MODE_OAM;
          }
        }
        break;

      case PPU.MODE_VBLANK:
        if (this.modeClock >= PPU.MODE_1_CLOCKS) {
          this.modeClock -= PPU.MODE_1_CLOCKS;
          this.scanline = 0;
          this.mode = PPU.MODE_OAM;
        }
        break;

      case PPU.MODE_OAM:
        if (this.modeClock >= PPU.MODE_2_CLOCKS) {
          this.modeClock -= PPU.MODE_2_CLOCKS;
          this.mode = PPU.MODE_PIXEL_TRANSFER;
        }
        break;

      case PPU.MODE_PIXEL_TRANSFER:
        if (this.modeClock >= PPU.MODE_3_CLOCKS) {
          this.modeClock -= PPU.MODE_3_CLOCKS;
          this.renderScanline();
          this.mode = PPU.MODE_HBLANK;
        }
        break;
    }

    // Update LCD status
    this.lcd.setMode(this.mode);
    this.lcd.setScanline(this.scanline);
  }

  // Render a single scanline
  private renderScanline(): void {
    if (!this.lcd.isEnabled() || !this.romLoaded) return;

    const y = this.scanline;
    const bgEnabled = this.lcd.isBackgroundEnabled();
    const windowEnabled = this.lcd.isWindowEnabled();
    const spritesEnabled = this.lcd.isSpritesEnabled();

    // Render background
    if (bgEnabled) {
      this.renderBackgroundScanline(y);
    }

    // Render window
    if (windowEnabled) {
      this.renderWindowScanline(y);
    }

    // Render sprites
    if (spritesEnabled) {
      this.renderSpriteScanline(y);
    }
  }

  // Render background for a scanline
  private renderBackgroundScanline(y: number): void {
    try {
      const scrollX = this.lcd.getScrollX();
      const scrollY = this.lcd.getScrollY();
      const tileMap = this.lcd.getBackgroundTileMap();
      const tileData = this.lcd.getTileData();

      for (let x = 0; x < 160; x++) {
        const tileX = Math.floor((x + scrollX) / 8);
        const tileY = Math.floor((y + scrollY) / 8);
        
        // Safety check for valid tile coordinates
        if (tileX < 0 || tileX >= 32 || tileY < 0 || tileY >= 32) {
          this.setPixel(x, y, 0); // Set to transparent
          continue;
        }
        
        const tileIndex = this.mmu.readByte(tileMap + tileY * 32 + tileX);
        
        const pixelX = (x + scrollX) % 8;
        const pixelY = (y + scrollY) % 8;
        const color = this.tiles.getPixel(tileIndex, pixelX, pixelY, tileData);
        
        this.setPixel(x, y, color);
      }
    } catch (error) {
      console.warn('Error rendering background scanline:', error);
      // Fill scanline with transparent pixels on error
      for (let x = 0; x < 160; x++) {
        this.setPixel(x, y, 0);
      }
    }
  }

  // Render window for a scanline
  private renderWindowScanline(y: number): void {
    try {
      const windowX = this.lcd.getWindowX() - 7;
      const windowY = this.lcd.getWindowY();
      
      if (y < windowY || windowX >= 160) return;

      const tileMap = this.lcd.getWindowTileMap();
      const tileData = this.lcd.getTileData();

      for (let x = Math.max(0, windowX); x < 160; x++) {
        const tileX = Math.floor((x - windowX) / 8);
        const tileY = Math.floor((y - windowY) / 8);
        
        // Safety check for valid tile coordinates
        if (tileX < 0 || tileX >= 32 || tileY < 0 || tileY >= 32) {
          this.setPixel(x, y, 0);
          continue;
        }
        
        const tileIndex = this.mmu.readByte(tileMap + tileY * 32 + tileX);
        
        const pixelX = (x - windowX) % 8;
        const pixelY = (y - windowY) % 8;
        const color = this.tiles.getPixel(tileIndex, pixelX, pixelY, tileData);
        
        this.setPixel(x, y, color);
      }
    } catch (error) {
      console.warn('Error rendering window scanline:', error);
    }
  }

  // Render sprites for a scanline
  private renderSpriteScanline(y: number): void {
    try {
      const sprites = this.sprites.getSpritesOnScanline(y);
      
      for (const sprite of sprites) {
        this.renderSprite(sprite, y);
      }
    } catch (error) {
      console.warn('Error rendering sprite scanline:', error);
    }
  }

  // Render a single sprite
  private renderSprite(sprite: any, y: number): void {
    try {
      const spriteY = y - sprite.y;
      if (spriteY < 0 || spriteY >= 8) return;

      const tileData = this.lcd.getTileData();
      const tileIndex = sprite.tileIndex;
      
      for (let x = 0; x < 8; x++) {
        const spriteX = sprite.x + x;
        if (spriteX < 0 || spriteX >= 160) continue;

        const color = this.tiles.getPixel(tileIndex, x, spriteY, tileData);
        if (color !== 0) { // Transparent
          this.setPixel(spriteX, y, color);
        }
      }
    } catch (error) {
      console.warn('Error rendering sprite:', error);
    }
  }

  // Set pixel in frame buffer
  private setPixel(x: number, y: number, color: number): void {
    try {
      const index = (y * 160 + x) * 4;
      const rgb = this.lcd.getColor(color);
      
      this.frameBuffer[index] = rgb.r;     // Red
      this.frameBuffer[index + 1] = rgb.g; // Green
      this.frameBuffer[index + 2] = rgb.b; // Blue
      this.frameBuffer[index + 3] = 255;   // Alpha
    } catch (error) {
      console.warn('Error setting pixel:', error);
    }
  }

  // Render the complete frame to canvas
  private renderFrame(): void {
    try {
      const imageData = this.ctx.createImageData(160, 144);
      imageData.data.set(this.frameBuffer);
      this.ctx.putImageData(imageData, 0, 0);
    } catch (error) {
      console.warn('Error rendering frame:', error);
    }
  }

  // Reset PPU
  reset(): void {
    this.scanline = 0;
    this.mode = PPU.MODE_OAM;
    this.modeClock = 0;
    this.frameBuffer.fill(0);
    this.romLoaded = false;
  }

  // Get current scanline
  getScanline(): number {
    return this.scanline;
  }

  // Get current mode
  getMode(): number {
    return this.mode;
  }
}
