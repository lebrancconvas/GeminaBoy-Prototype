export class Input {
  private mmu: any;
  private keys: { [key: string]: boolean } = {};
  private keyMap: { [key: string]: number } = {};

  constructor(mmu: any) {
    this.mmu = mmu;
    this.setupKeyMap();
    this.setupEventListeners();
  }

  private setupKeyMap(): void {
    // Map keyboard keys to Game Boy buttons
    this.keyMap = {
      'ArrowUp': 0x04,      // Up
      'ArrowDown': 0x08,    // Down
      'ArrowLeft': 0x02,    // Left
      'ArrowRight': 0x01,   // Right
      'z': 0x10,            // A
      'x': 0x20,            // B
      'Enter': 0x40,        // Start
      'Shift': 0x80,        // Select
      'w': 0x04,            // Up (WASD)
      's': 0x08,            // Down (WASD)
      'a': 0x02,            // Left (WASD)
      'd': 0x01,            // Right (WASD)
    };
  }

  private setupEventListeners(): void {
    // Keyboard events
    document.addEventListener('keydown', (e) => {
      this.handleKeyDown(e);
    });

    document.addEventListener('keyup', (e) => {
      this.handleKeyUp(e);
    });

    // Prevent default behavior for game keys
    document.addEventListener('keydown', (e) => {
      if (this.keyMap[e.key]) {
        e.preventDefault();
      }
    });
  }

  private handleKeyDown(e: KeyboardEvent): void {
    const key = e.key;
    if (this.keyMap[key]) {
      this.keys[key] = true;
      this.updateInputRegisters();
    }
  }

  private handleKeyUp(e: KeyboardEvent): void {
    const key = e.key;
    if (this.keyMap[key]) {
      this.keys[key] = false;
      this.updateInputRegisters();
    }
  }

  private updateInputRegisters(): void {
    let joypad = 0xFF;
    
    // Check which buttons are pressed
    for (const [key, button] of Object.entries(this.keyMap)) {
      if (this.keys[key]) {
        joypad &= ~button;
      }
    }
    
    // Write to joypad register (0xFF00)
    this.mmu.writeByte(0xFF00, joypad);
  }

  // Get current input state
  getInputState(): { [key: string]: boolean } {
    return { ...this.keys };
  }

  // Check if a specific button is pressed
  isButtonPressed(button: string): boolean {
    return this.keys[button] || false;
  }

  // Simulate button press (for testing)
  pressButton(button: string): void {
    if (this.keyMap[button]) {
      this.keys[button] = true;
      this.updateInputRegisters();
    }
  }

  // Simulate button release (for testing)
  releaseButton(button: string): void {
    if (this.keyMap[button]) {
      this.keys[button] = false;
      this.updateInputRegisters();
    }
  }

  // Reset input state
  reset(): void {
    this.keys = {};
    this.updateInputRegisters();
  }

  // Get button mapping
  getButtonMapping(): { [key: string]: number } {
    return { ...this.keyMap };
  }
}
