import { Registers } from './registers';
import { Instructions } from './instructions';
import { Timing } from './timing';

export class CPU {
  private registers: Registers;
  private instructions: Instructions;
  private timing: Timing;
  private mmu: any;
  private halted: boolean = false;
  private interruptsEnabled: boolean = true;

  constructor(mmu: any) {
    this.mmu = mmu;
    this.registers = new Registers();
    this.instructions = new Instructions(this.registers, mmu);
    this.timing = new Timing();
  }

  reset(): void {
    this.registers.reset();
    this.timing.reset();
    this.halted = false;
    this.interruptsEnabled = true;
  }

  step(): number {
    if (this.halted) {
      this.timing.addCycles(4);
      return 4;
    }

    const opcode = this.mmu.readByte(this.registers.pc);
    const cycles = this.executeInstruction(opcode);
    
    this.timing.addCycles(cycles);
    return cycles;
  }

  private executeInstruction(opcode: number): number {
    // Basic instruction set implementation
    switch (opcode) {
      case 0x00: // NOP
        this.registers.pc++;
        return 1;

      case 0x06: // LD B, n
        const value = this.mmu.readByte(this.registers.pc + 1);
        this.registers.b = value;
        this.registers.pc += 2;
        return 2;

      case 0x0E: // LD C, n
        const value2 = this.mmu.readByte(this.registers.pc + 1);
        this.registers.c = value2;
        this.registers.pc += 2;
        return 2;

      case 0x16: // LD D, n
        const value3 = this.mmu.readByte(this.registers.pc + 1);
        this.registers.d = value3;
        this.registers.pc += 2;
        return 2;

      case 0x1E: // LD E, n
        const value4 = this.mmu.readByte(this.registers.pc + 1);
        this.registers.e = value4;
        this.registers.pc += 2;
        return 2;

      case 0x26: // LD H, n
        const value5 = this.mmu.readByte(this.registers.pc + 1);
        this.registers.h = value5;
        this.registers.pc += 2;
        return 2;

      case 0x2E: // LD L, n
        const value6 = this.mmu.readByte(this.registers.pc + 1);
        this.registers.l = value6;
        this.registers.pc += 2;
        return 2;

      case 0x3E: // LD A, n
        const value7 = this.mmu.readByte(this.registers.pc + 1);
        this.registers.a = value7;
        this.registers.pc += 2;
        return 2;

      case 0x76: // HALT
        this.halted = true;
        this.registers.pc++;
        return 1;

      case 0xF3: // DI
        this.interruptsEnabled = false;
        this.registers.pc++;
        return 1;

      case 0xFB: // EI
        this.interruptsEnabled = true;
        this.registers.pc++;
        return 1;

      default:
        // Unknown opcode - just increment PC and continue
        console.warn(`Unknown opcode: 0x${opcode.toString(16).padStart(2, '0')} at PC: 0x${this.registers.pc.toString(16).padStart(4, '0')}`);
        this.registers.pc++;
        return 1;
    }
  }

  getRegisters(): Registers {
    return this.registers;
  }

  getTiming(): Timing {
    return this.timing;
  }

  isHalted(): boolean {
    return this.halted;
  }

  areInterruptsEnabled(): boolean {
    return this.interruptsEnabled;
  }

  // Debug methods
  getState(): string {
    return `CPU State: ${this.registers.toString()}\nHalted: ${this.halted}\nInterrupts: ${this.interruptsEnabled}\nCycles: ${this.timing.getCycles()}`;
  }
}
