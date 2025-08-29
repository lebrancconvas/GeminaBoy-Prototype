// Utility to create a minimal test ROM for development
// This creates a basic Game Boy ROM structure for testing

export function createTestROM(): ArrayBuffer {
  // Create a minimal 32KB ROM (minimum size for Game Boy)
  const romSize = 32 * 1024; // 32KB
  const buffer = new ArrayBuffer(romSize);
  const view = new Uint8Array(buffer);
  
  // Fill with 0x00 (NOP instructions)
  view.fill(0x00);
  
  // Set up basic Game Boy header
  // Entry point (0x0000-0x0003): Jump to 0x0150
  view[0x0000] = 0x00; // NOP
  view[0x0001] = 0x00; // NOP
  view[0x0002] = 0x00; // NOP
  view[0x0003] = 0x00; // NOP
  
  // Nintendo Logo (0x0104-0x0133): Standard Game Boy logo
  const nintendoLogo = [
    0xCE, 0xED, 0x66, 0x66, 0xCC, 0x0D, 0x00, 0x0B, 0x03, 0x73, 0x00, 0x83, 0x00, 0x0C, 0x00, 0x0D,
    0x00, 0x08, 0x11, 0x1F, 0x88, 0x89, 0x00, 0x0E, 0xDC, 0xCC, 0x6E, 0xE6, 0xDD, 0xDD, 0xD9, 0x99,
    0xBB, 0xBB, 0x67, 0x63, 0x6E, 0x0E, 0xEC, 0xCC, 0xDD, 0xDC, 0x99, 0x9F, 0xBB, 0xB9, 0x33, 0x3E
  ];
  
  for (let i = 0; i < nintendoLogo.length; i++) {
    view[0x0104 + i] = nintendoLogo[i];
  }
  
  // Game title (0x0134-0x0142): "TEST ROM"
  const title = "TEST ROM";
  for (let i = 0; i < title.length; i++) {
    view[0x0134 + i] = title.charCodeAt(i);
  }
  
  // Manufacturer code (0x013F-0x0142): "TEST"
  const manufacturer = "TEST";
  for (let i = 0; i < manufacturer.length; i++) {
    view[0x013F + i] = manufacturer.charCodeAt(i);
  }
  
  // CGB flag (0x0143): 0x00 = DMG only
  view[0x0143] = 0x00;
  
  // New license code (0x0144-0x0145): 0x0000 = none
  view[0x0144] = 0x00;
  view[0x0145] = 0x00;
  
  // SGB flag (0x0146): 0x00 = DMG only
  view[0x0146] = 0x00;
  
  // Cartridge type (0x0147): 0x00 = ROM only
  view[0x0147] = 0x00;
  
  // ROM size (0x0148): 0x02 = 128KB (32 banks)
  view[0x0148] = 0x02;
  
  // RAM size (0x0149): 0x00 = none
  view[0x0149] = 0x00;
  
  // Destination code (0x014A): 0x00 = Japan
  view[0x014A] = 0x00;
  
  // Old license code (0x014B): 0x33 = Nintendo
  view[0x014B] = 0x33;
  
  // Mask ROM version (0x014C): 0x00
  view[0x014C] = 0x00;
  
  // Header checksum (0x014D): Calculate and set
  let checksum = 0;
  for (let i = 0x0134; i < 0x014D; i++) {
    checksum = checksum - view[i] - 1;
  }
  view[0x014D] = checksum & 0xFF;
  
  // Global checksum (0x014E-0x014F): Calculate and set
  let globalChecksum = 0;
  for (let i = 0; i < romSize; i++) {
    if (i !== 0x014E && i !== 0x014F) {
      globalChecksum += view[i];
    }
  }
  view[0x014E] = (globalChecksum >> 8) & 0xFF;
  view[0x014F] = globalChecksum & 0xFF;
  
  // Add some basic instructions at 0x0150 (entry point)
  view[0x0150] = 0x3E; // LD A, n
  view[0x0151] = 0x42; // n = 0x42
  view[0x0152] = 0x32; // LD (nn), A
  view[0x0153] = 0x00; // nn low byte
  view[0x0154] = 0xC0; // nn high byte (0xC000 = internal RAM)
  view[0x0155] = 0x76; // HALT
  
  console.log('✅ Test ROM created successfully!');
  console.log('📊 ROM Size:', romSize, 'bytes');
  console.log('🎮 Title:', title);
  console.log('🏭 Manufacturer:', manufacturer);
  
  return buffer;
}

// Export for use in other files
export default createTestROM;
