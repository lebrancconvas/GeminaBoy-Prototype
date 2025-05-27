# Cartridge

## Cartridge Header

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
- List of Old License Code
  - 0x00: None
  - 0x01: Nintendo
  - 0x08: Capcom
  - 0x09: HOT-B
  - 0x0A: Jaleco
  - 0x0B: Coconuts Japan
  - 0x0C: Elite Systems
  - 0x13: EA (Electronic Arts)
  - 0x18: Hudson Soft
  - 0x19: ITC Entertainment
  - 0x1A: Yanoman
  - 0x1D: Japan Clary
  - 0x1F: Virgin Games Ltd.
  - 0x24: PCM Complete
  - 0x25: San-X
  - 0x28: Kemco
  - 0x29: SETA Corporation
  - 0x30: Infogrames
  - 0x31: Nintendo
  - 0x32: Bandai
  - 0x33: **Use New License Code instead**
  - 0x34: Konami
  - 0x35: HectorSoft
  - 0x38: Capcom
  - 0x39: Banpresto
  - 0x3C: Entertainment Interactive (stub)
  - 0x3E: Gremlin
  - 0x41: Ubi Soft
  - 0x42: Atlus
  - 0x44: Malibu Interactive
  - 0x46: Angel
  - 0x47: Spectrum HoloByte
  - 0x49: Item
  - 0x4A: Virgin Games Ltd.
  - 0x4D: Malibu Interactive
  - 0x4F: U.S.gold
  - 0x50: Absolute
  - 0x51: Acclaim Entertainment
  - 0x52: Activision
  - 0x53: Sammy USA Corporation
  - 0x54: GameTek
  - 0x55: Park Place
  - 0x56: LJN
  - 0x57: Matchbox
  - 0x59: Milton Bradley Company
  - 0x5A: Mindscape
  - 0x5B: Romstar
  - 0x5C: Naxat Soft
  - 0x5D: Tradewest
  - 0x60: Titus Interactive
  - 0x61: Virgin Games Ltd.
  - 0x67: Ocean Software
  - 0x69: EA (Electronic Arts)
  - 0x6E: Elite Systems
  - 0x6F: Electro Brain
  - 0x70: Infogrames
  - 0x71: Interplay Entertainment
  - 0x72: Broderbund
  - 0x73: Sculptured Software
  - 0x75: The Sales Curve Limited
  - 0x78: THQ
  - 0x79: Accolade
  - 0x7A: Triffix Entertainment
  - 0x7C: MicroProse
  - 0x7F: Kemco
  - 0x80: Misawa Entertainment
  - 0x83: LOZC G.
  - 0x86: Tokuma Shoten
  - 0x8B: Bullet-Proof Software
  - 0x8C: Vic Tokai Corp.
  - 0x8E: Ape Inc.
  - 0x8F: I'Max
  - 0x91: Chunsoft Co.
  - 0x92: Video System
  - 0x93: Tsuburaya Productions
  - 0x95: Varie
  - 0x96: Yonezawa / S'Pal
  - 0x97: Kemco
  - 0x99: Arc
  - 0x9A: Nihon Bussan
  - 0x9B: Tecmo
  - 0x9C: Imagineer
  - 0x9D: Banpresto
  - 0x9F: Nova
  - 0xA1: Hori Electric
  - 0xA2: Bandai
  - 0xA4: Konami
  - 0xA6: Kawada
  - 0xA7: Takara
  - 0xA9: Technos Japan
  - 0xAA: Broderbund
  - 0xAC: Toei Animation
  - 0xAD: Toho
  - 0xAF: Namco
  - 0xB0: Acclaim Entertainment
  - 0xB1: ASCII Corporation or Nexsoft
  - 0xB2: Bandai
  - 0xB4: Square Enix
  - 0xB6: HAL Laboratory
  - 0xB7: SNK
  - 0xB9: Pony Canyon
  - 0xBA: Culture Brain
  - 0xBB: Sunsoft
  - 0xBD: Sony Imagesoft
  - 0xBF: Sammy Corporation
  - 0xC0: Taito
  - 0xC2: Kemco
  - 0xC3: Square
  - 0xC4: Tokuma Shoten
  - 0xC5: Data East
  - 0xC6: Tonkin House
  - 0xC8: Koei
  - 0xC9: UFL
  - 0xCA: Ultra Games
  - 0xCB: VAP, Inc.
  - 0xCC: Use Corporation
  - 0xCD: Meldac
  - 0xCE: Pony Canyon
  - 0xD0: Taito
  - 0xD1: SOFEL (Software Engineering Lab)
  - 0xD2: Quest
  - 0xD3: Sigma Enterprises
  - 0xD4: ASK Kodansha Co.
  - 0xD6: Naxal Soft
  - 0xD7: Copya System
  - 0xD9: Banpresto
  - 0xDA: Tomy
  - 0xDB: LJN
  - 0xDD: Nippon Computer Systems
  - 0xDE: Human Ent.
  - 0xDF: Altron
  - 0xE0: Jaleco
  - 0xE1: Towa Chiki
  - 0xE2: Yutaka
  - 0xE3: Varie
  - 0xE5: Epoch
  - 0xE7: Athena
  - 0xE8: Asmik Ace Entertainment
  - 0xE9: Natsume
  - 0xEA: King Records
  - 0xEB: Atlus
  - 0xEC: Epic / Sony Records
  - 0xEE: IGS
  - 0xF0: A Wave
  - 0xF3: Extreme Entertainment
  - 0xFF: **LJN**

### New License Code (0x144 ~ 0x145)

- Two-character ASCII code for newer games
- List of New License Code

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
