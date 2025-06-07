# Game Boy's Hardware Register

|   Address  |    Name   |                            Description                            | Readable / Writable | Models |
|:----------:|:---------:|:-----------------------------------------------------------------:|:-------------------:|:------:|
| 0xFF00      | P1/JOYP   | Joypad                                                            | Mixed               | All    |
| 0xFF01      | SB        | Serial transfer data                                              | R/W                 | All    |
| 0xFF02      | SC        | Serial transfer control                                           | R/W                 | Mixed  |
| 0xFF04      | DIV       | Divider register                                                  | R/W                 | All    |
| 0xFF05      | TIMA      | Timer counter                                                     | R/W                 | All    |
| 0xFF06      | TMA       | Timer modulo                                                      | R/W                 | All    |
| 0xFF07      | TAC       | Timer control                                                     | R/W                 | All    |
| 0xFF0F      | IF        | Interrupt flag                                                    | R/W                 | All    |
| 0xFF10      | NR10      | Sound channel 1 sweep                                             | R/W                 | All    |
| 0xFF11      | NR11      | Sound channel 1 length timer & duty cycle                         | Mixed               | All    |
| 0xFF12      | NR12      | Sound channel 1 volume & envelope                                 | R/W                 | All    |
| 0xFF13      | NR13      | Sound channel 1 period low                                        | W                   | All    |
| 0xFF14      | NR14      | Sound channel 1 period high & control                             | Mixed               | All    |
| 0xFF16      | NR21      | Sound channel 2 length timer & duty cycle                         | Mixed               | All    |
| 0xFF17      | NR22      | Sound channel 2 volume & envelope                                 | R/W                 | All    |
| 0xFF18      | NR23      | Sound channel 2 period low                                        | W                   | All    |
| 0xFF19      | NR24      | Sound channel 2 period high & control                             | Mixed               | All    |
| 0xFF1A      | NR30      | Sound channel 3 DAC enable                                        | R/W                 | All    |
| 0xFF1B      | NR31      | Sound channel 3 length timer                                      | W                   | All    |
| 0xFF1C      | NR32      | Sound channel 3 output level                                      | R/W                 | All    |
| 0xFF1D      | NR33      | Sound channel 3 period low                                        | W                   | All    |
| 0xFF1E      | NR34      | Sound channel 3 period high & control                             | Mixed               | All    |
| 0xFF20      | NR41      | Sound channel 4 length timer                                      | W                   | All    |
| 0xFF21      | NR42      | Sound channel 4 volume & envelope                                 | R/W                 | All    |
| 0xFF22      | NR43      | Sound channel 4 frequency & randomness                            | R/W                 | All    |
| 0xFF23      | NR44      | Sound channel 4 control                                           | Mixed               | All    |
| 0xFF24      | NR50      | Master volume & VIN panning                                       | R/W                 | All    |
| 0xFF25      | NR51      | Sound panning                                                     | R/W                 | All    |
| 0xFF26      | NR52      | Sound on/off                                                      | Mixed               | All    |
| 0xFF30-FF3F | Wave RAM  | Storage for one of the sound channels’ waveform                   | R/W                 | All    |
| 0xFF40      | LCDC      | LCD control                                                       | R/W                 | All    |
| 0xFF41      | STAT      | LCD status                                                        | Mixed               | All    |
| 0xFF42      | SCY       | Viewport Y position                                               | R/W                 | All    |
| 0xFF43      | SCX       | Viewport X position                                               | R/W                 | All    |
| 0xFF44      | LY        | LCD Y coordinate                                                  | R                   | All    |
| 0xFF45      | LYC       | LY compare                                                        | R/W                 | All    |
| 0xFF46      | DMA       | OAM DMA source address & start                                    | R/W                 | All    |
| 0xFF47      | BGP       | BG palette data                                                   | R/W                 | DMG    |
| 0xFF48      | OBP0      | OBJ palette 0 data                                                | R/W                 | DMG    |
| 0xFF49      | OBP1      | OBJ palette 1 data                                                | R/W                 | DMG    |
| 0xFF4A      | WY        | Window Y position                                                 | R/W                 | All    |
| 0xFF4B      | WX        | Window X position plus 7                                          | R/W                 | All    |
| 0xFF4D      | KEY1      | Prepare speed switch                                              | Mixed               | CGB    |
| 0xFF4F      | VBK       | VRAM bank                                                         | R/W                 | CGB    |
| 0xFF51      | HDMA1     | VRAM DMA source high                                              | W                   | CGB    |
| 0xFF52      | HDMA2     | VRAM DMA source low                                               | W                   | CGB    |
| 0xFF53      | HDMA3     | VRAM DMA destination high                                         | W                   | CGB    |
| 0xFF54      | HDMA4     | VRAM DMA destination low                                          | W                   | CGB    |
| 0xFF55      | HDMA5     | VRAM DMA length/mode/start                                        | R/W                 | CGB    |
| 0xFF56      | RP        | Infrared communications port                                      | Mixed               | CGB    |
| 0xFF68      | BCPS/BGPI | Background color palette specification / Background palette index | R/W                 | CGB    |
| 0xFF69      | BCPD/BGPD | Background color palette data / Background palette data           | R/W                 | CGB    |
| 0xFF6A      | OCPS/OBPI | OBJ color palette specification / OBJ palette index               | R/W                 | CGB    |
| 0xFF6B      | OCPD/OBPD | OBJ color palette data / OBJ palette data                         | R/W                 | CGB    |
| 0xFF6C      | OPRI      | Object priority mode                                              | R/W                 | CGB    |
| 0xFF70      | SVBK      | WRAM bank                                                         | R/W                 | CGB    |
| 0xFF76      | PCM12     | Audio digital outputs 1 & 2                                       | R                   | CGB    |
| 0xFF77      | PCM34     | Audio digital outputs 3 & 4                                       | R                   | CGB    |
| 0xFFFF      | IE        | Interrupt enable                                                  | R/W                 | All    |
