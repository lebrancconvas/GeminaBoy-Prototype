# Note

## File Upload Data

- lastModified
- lastModifiedDate
- name
- size
- type
- webkitRelativePath

## GameBoy File (.gbc) (Based from Claude 3.7 Sonnet)

### Entry Point (0x100 ~ 0x103)

The first few bytes (usually 0x00, 0xC3, 0x50, 0x01) contain:

- First instruction executed (typically a jump to the actual code)

### Nintendo Logo (0x104 ~ 0x133)

- A bitmap of the Nintendo logo
- The GameBoy checks this logo against an internal copy
- If they don't match, the game won't boot (anti-piracy measure)

### Game Title (0x134 ~ 0x143)

- ASCII characters representing the game's title
- Up to 16 characters (11 for Game Boy, 15 for GBC)
- Often padded with 0x00 (null characters)

### Manufacturer Code (0x13F ~ 0x142)

- Four-character code representing the game's manufacturer
- Only used in newer Game Boy games

### GBC Flag (0x143)

- 0x80: Game supports Game Boy Color features but works on original Game Boy
- 0xC0: Game exclusively for Game Boy Color
- 0x00: Original Game Boy game

### New License Code (0x144 ~ 0x145)

- Two-character ASCII code for newer games

### SGB Flag (0x146)

- 0x00: No Super Game Boy features
- 0x03: Game supports Super Game Boy features

### Cartridge Type (0x147)

- Specifies the cartridge hardware:
  - 0x00: ROM ONLY
  - 0x01: ROM+MBC1
  - 0x02: ROM+MBC1+RAM
  - 0x03: ROM+MBC1+RAM+BATTERY
  - 0x05: ROM+MBC2
  - 0x06: ROM+MBC2+BATTERY
  - 0x08: ROM+RAM
  - 0x09: ROM+RAM+BATTERY
  - 0x0B: ROM+MMM01
  - 0x0C: ROM+MMM01+SRAM
  - 0x0D: ROM+MMM01+SRAM+BATTERY
  - 0x0F: ROM+MBC3+TIMER+BATTERY
  - 0x10: ROM+MBC3+TIMER+RAM+BATTERY
  - 0x11: ROM+MBC3
  - 0x12: ROM+MBC3+RAM
  - 0x13: ROM+MBC3+RAM+BATTERY
  - 0x19: ROM+MBC5
  - 0x1A: ROM+MBC5+RAM
  - 0x1B: ROM+MBC5+RAM+BATTERY
  - 0x1C: ROM+MBC5+RUMBLE
  - 0x1D: ROM+MBC5+RUMBLE+SRAM
  - 0x1E: ROM+MBC5+RUMBLE+SRAM+BATTERY
  - 0x20: ROM+MBC6
  - 0x22: ROM+MBC7+SENSOR+RUMBLE+RAM+BATTERY

### ROM Size (0x148)

- 0x00: 32 KByte (no ROM banking)
- 0x01: 64 KByte (4 banks)
- 0x02: 128 KByte (8 banks)
- 0x03: 256 KByte (16 banks)
- 0x04: 512 KByte (32 banks)
- 0x05: 1 MByte (64 banks)
- 0x06: 2 MByte (128 banks)
- 0x07: 4 MByte (256 banks)
- 0x08: 8 MByte (512 banks)

### RAM Size (0x149)

- 0x00: None
- 0x01: 2 KBytes
- 0x02: 8 KBytes
- 0x03: 32 KBytes (4 banks of 8 KBytes)
- 0x04: 128 KBytes (16 banks of 8 KBytes)
- 0x05: 64 KBytes (8 banks of 8 KBytes)

### Destination Code (0x14A)

- 0x00: Japanese
- 0x01: Non-Japanese

### Old License Code (0x14B)

- 0x33 means to use the new licensee code instead
- Otherwise, it's a single byte representing the publisher

### ROM Version (0x14C)

- Version number of the game, usually 0x00

### Header Checksum (0x14D)

- Checksum of bytes 0x134-0x14C
- Formula: x=0; for(i=0x134;i<=0x14C;i++) x=x-bytes[i]-1;

### Global Checksum (0x14E ~ 0x14F)

- 16-bit checksum across the entire ROM
- Not verified by the Game Boy

### ROM Banks (0x0150 ~ ...)

- Bank 0: Present at 0x0000 ~ 0x3FFF (First 16KB)
- Bank 1+: Switchable Banks at 0x4000 ~ 0x7FFF (Second 16KB)
