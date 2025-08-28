export class Timing {
  private cycles: number = 0;
  private totalCycles: number = 0;

  // Game Boy CPU runs at 4.194304 MHz
  private static readonly CPU_FREQUENCY = 4194304;
  private static readonly FRAME_CYCLES = 70224; // Cycles per frame at 60Hz

  reset(): void {
    this.cycles = 0;
    this.totalCycles = 0;
  }

  addCycles(cycles: number): void {
    this.cycles += cycles;
    this.totalCycles += cycles;
  }

  getCycles(): number {
    return this.cycles;
  }

  getTotalCycles(): number {
    return this.totalCycles;
  }

  // Check if a frame is complete
  isFrameComplete(): boolean {
    return this.cycles >= Timing.FRAME_CYCLES;
  }

  // Reset frame cycles
  resetFrameCycles(): void {
    this.cycles = 0;
  }

  // Get time elapsed in seconds
  getTimeElapsed(): number {
    return this.totalCycles / Timing.CPU_FREQUENCY;
  }

  // Get frames elapsed
  getFramesElapsed(): number {
    return Math.floor(this.totalCycles / Timing.FRAME_CYCLES);
  }
}
