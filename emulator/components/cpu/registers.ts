export class Registers {
  // Main registers
  public a: number = 0;
  public b: number = 0;
  public c: number = 0;
  public d: number = 0;
  public e: number = 0;
  public h: number = 0;
  public l: number = 0;

  // Flag register (F)
  private _f: number = 0;

  // Program Counter and Stack Pointer
  public pc: number = 0;
  public sp: number = 0;

  // Flag getters/setters
  get f(): number { return this._f; }
  set f(value: number) { this._f = value & 0xF0; } // Only upper 4 bits are used

  get zero(): boolean { return (this._f & 0x80) !== 0; }
  set zero(value: boolean) { this._f = value ? (this._f | 0x80) : (this._f & ~0x80); }

  get subtract(): boolean { return (this._f & 0x40) !== 0; }
  set subtract(value: boolean) { this._f = value ? (this._f | 0x40) : (this._f & ~0x40); }

  get halfCarry(): boolean { return (this._f & 0x20) !== 0; }
  set halfCarry(value: boolean) { this._f = value ? (this._f | 0x20) : (this._f & ~0x20); }

  get carry(): boolean { return (this._f & 0x10) !== 0; }
  set carry(value: boolean) { this._f = value ? (this._f | 0x10) : (this._f & ~0x10); }

  // 16-bit register pairs
  get af(): number { return (this.a << 8) | this._f; }
  set af(value: number) { this.a = (value >> 8) & 0xFF; this._f = value & 0xFF; }

  get bc(): number { return (this.b << 8) | this.c; }
  set bc(value: number) { this.b = (value >> 8) & 0xFF; this.c = value & 0xFF; }

  get de(): number { return (this.d << 8) | this.e; }
  set de(value: number) { this.d = (value >> 8) & 0xFF; this.e = value & 0xFF; }

  get hl(): number { return (this.h << 8) | this.l; }
  set hl(value: number) { this.h = (value >> 8) & 0xFF; this.l = value & 0xFF; }

  // Reset all registers
  reset(): void {
    this.a = 0;
    this.b = 0;
    this.c = 0;
    this.d = 0;
    this.e = 0;
    this.h = 0;
    this.l = 0;
    this._f = 0;
    this.pc = 0;
    this.sp = 0xFFFF;
  }

  // Debug info
  toString(): string {
    return `A:${this.a.toString(16).padStart(2, '0')} F:${this._f.toString(16).padStart(2, '0')} B:${this.b.toString(16).padStart(2, '0')} C:${this.c.toString(16).padStart(2, '0')} D:${this.d.toString(16).padStart(2, '0')} E:${this.e.toString(16).padStart(2, '0')} H:${this.h.toString(16).padStart(2, '0')} L:${this.l.toString(16).padStart(2, '0')} PC:${this.pc.toString(16).padStart(4, '0')} SP:${this.sp.toString(16).padStart(4, '0')}`;
  }
}
