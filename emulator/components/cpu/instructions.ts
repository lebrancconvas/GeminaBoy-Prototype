import { Registers } from './registers';

export class Instructions {
  private registers: Registers;
  private mmu: any;

  constructor(registers: Registers, mmu: any) {
    this.registers = registers;
    this.mmu = mmu;
  }

  // Load instructions
  ld_r_r(dest: keyof Registers, src: keyof Registers): number {
    (this.registers as any)[dest] = (this.registers as any)[src];
    return 1;
  }

  ld_r_n(dest: keyof Registers, value: number): number {
    (this.registers as any)[dest] = value;
    return 2;
  }

  ld_r_hl(dest: keyof Registers): number {
    const addr = this.registers.hl;
    (this.registers as any)[dest] = this.mmu.readByte(addr);
    return 2;
  }

  ld_hl_r(src: keyof Registers): number {
    const addr = this.registers.hl;
    this.mmu.writeByte(addr, (this.registers as any)[src]);
    return 2;
  }

  // Arithmetic instructions
  add_a_r(src: keyof Registers): number {
    const value = (this.registers as any)[src];
    const result = this.registers.a + value;
    
    this.registers.zero = (result & 0xFF) === 0;
    this.registers.subtract = false;
    this.registers.halfCarry = (this.registers.a & 0xF) + (value & 0xF) > 0xF;
    this.registers.carry = result > 0xFF;
    
    this.registers.a = result & 0xFF;
    return 1;
  }

  sub_a_r(src: keyof Registers): number {
    const value = (this.registers as any)[src];
    const result = this.registers.a - value;
    
    this.registers.zero = (result & 0xFF) === 0;
    this.registers.subtract = true;
    this.registers.halfCarry = (this.registers.a & 0xF) < (value & 0xF);
    this.registers.carry = result < 0;
    
    this.registers.a = result & 0xFF;
    return 1;
  }

  // Jump instructions
  jp_nn(addr: number): number {
    this.registers.pc = addr;
    return 3;
  }

  jr_n(offset: number): number {
    this.registers.pc += (offset << 24) >> 24; // Sign extend
    return 2;
  }

  // Call instructions
  call_nn(addr: number): number {
    this.registers.sp -= 2;
    this.mmu.writeWord(this.registers.sp, this.registers.pc);
    this.registers.pc = addr;
    return 3;
  }

  ret(): number {
    this.registers.pc = this.mmu.readWord(this.registers.sp);
    this.registers.sp += 2;
    return 1;
  }

  // Stack instructions
  push_rr(high: keyof Registers, low: keyof Registers): number {
    this.registers.sp -= 2;
    const value = ((this.registers as any)[high] << 8) | (this.registers as any)[low];
    this.mmu.writeWord(this.registers.sp, value);
    return 1;
  }

  pop_rr(high: keyof Registers, low: keyof Registers): number {
    const value = this.mmu.readWord(this.registers.sp);
    (this.registers as any)[high] = (value >> 8) & 0xFF;
    (this.registers as any)[low] = value & 0xFF;
    this.registers.sp += 2;
    return 1;
  }
}
