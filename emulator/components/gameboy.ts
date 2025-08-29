import { CPU } from './cpu';
import { MMU } from './memory';
import { PPU } from './picture';
import { Input } from './input';

export class GameBoy {
  private cpu: CPU;
  private mmu: MMU;
  private ppu: PPU;
  private input: Input;
  private canvas: HTMLCanvasElement;
  private running: boolean = false;
  private animationId: number | null = null;
  private lastTime: number = 0;
  private frameCount: number = 0;
  private fps: number = 60;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.mmu = new MMU();
    this.cpu = new CPU(this.mmu);
    this.ppu = new PPU(this.mmu, canvas);
    this.input = new Input(this.mmu);
  }

  // Load and run a ROM
  async loadROM(romBuffer: ArrayBuffer): Promise<void> {
    try {
      // Load ROM into memory
      this.mmu.loadROM(romBuffer);
      
      // Set PPU ROM loaded status
      this.ppu.setROMLoaded(true);
      
      // Reset all components
      this.reset();
      
      // Start emulation
      this.start();
      
      console.log('ROM loaded successfully!');
    } catch (error) {
      console.error('Failed to load ROM:', error);
      throw error;
    }
  }

  // Start emulation
  start(): void {
    if (this.running) return;
    
    this.running = true;
    this.lastTime = performance.now();
    this.frameCount = 0;
    
    this.runFrame();
    console.log('Emulation started');
  }

  // Stop emulation
  stop(): void {
    if (!this.running) return;
    
    this.running = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    
    console.log('Emulation stopped');
  }

  // Reset emulator
  reset(): void {
    this.cpu.reset();
    this.mmu.reset();
    this.ppu.reset();
    this.input.reset();
    
    console.log('Emulator reset');
  }

  // Main emulation loop
  private runFrame(): void {
    if (!this.running) return;

    const currentTime = performance.now();
    const deltaTime = currentTime - this.lastTime;
    const targetFrameTime = 1000 / this.fps;

    if (deltaTime >= targetFrameTime) {
      this.emulateFrame();
      this.lastTime = currentTime;
      this.frameCount++;
    }

    this.animationId = requestAnimationFrame(() => this.runFrame());
  }

  // Emulate one frame (60 FPS)
  private emulateFrame(): void {
    let cyclesThisFrame = 0;
    const targetCycles = 70224; // Cycles per frame at 4.194304 MHz

    // Run CPU until we've completed a frame
    while (cyclesThisFrame < targetCycles) {
      const cycles = this.cpu.step();
      cyclesThisFrame += cycles;
      
      // Update PPU
      this.ppu.update(cycles);
      
      // Check for interrupts and handle them
      this.handleInterrupts();
    }
  }

  // Handle CPU interrupts
  private handleInterrupts(): void {
    // Check for V-Blank interrupt
    if (this.ppu.getMode() === 1) { // V-Blank mode
      this.mmu.writeByte(0xFF0F, this.mmu.readByte(0xFF0F) | 0x01);
    }
    
    // Check for LCD interrupt
    if (this.ppu.getScanline() === this.mmu.readByte(0xFF45)) {
      this.mmu.writeByte(0xFF0F, this.mmu.readByte(0xFF0F) | 0x02);
    }
  }

  // Get emulator status
  getStatus(): any {
    return {
      running: this.running,
      frameCount: this.frameCount,
      fps: this.fps,
      cpuState: this.cpu.getState(),
      romInfo: this.mmu.getROMInfo(),
      inputState: this.input.getInputState()
    };
  }

  // Set emulation speed
  setSpeed(speed: number): void {
    this.fps = Math.max(1, Math.min(120, speed));
    console.log(`Emulation speed set to ${this.fps} FPS`);
  }

  // Pause emulation
  pause(): void {
    this.stop();
  }

  // Resume emulation
  resume(): void {
    this.start();
  }

  // Get canvas element
  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  // Get CPU for debugging
  getCPU(): CPU {
    return this.cpu;
  }

  // Get MMU for debugging
  getMMU(): MMU {
    return this.mmu;
  }

  // Get PPU for debugging
  getPPU(): PPU {
    return this.ppu;
  }

  // Get input for debugging
  getInput(): Input {
    return this.input;
  }

  // Save state (placeholder for future implementation)
  saveState(): any {
    // TODO: Implement save state functionality
    console.log('Save state not implemented yet');
    return null;
  }

  // Load state (placeholder for future implementation)
  loadState(state: any): void {
    // TODO: Implement load state functionality
    console.log('Load state not implemented yet');
  }
}
