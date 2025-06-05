# Central Processing Unit (CPU)

## CPU: Sharp SM83

- Custom CPU Core used in "Application Specific Integrated Chips (ASICs)"
- 8-Bit CPU Core + 16-Bit Address Bus
- Instruction Set Architecture (ISA) based on "Z80" and "Intel 8080". (Closed enough to "Z80")
- Mixed between "Z80" and "Intel 8080".
- Runs at "~4.19 MHz" in GameBoy (DMG).
  - Runs at "~8.38 MHz" in GameBoy Color (CGB).
- Only Intel 8080's Set of Registers are implemented. (7 General-Purpose Registers)

## Basic CPU Knowledge

### Fetch-Decode-Execute

- **Fetch**
  - Read The instruction from the memory.
  - The Instruction is in bytes form that tell you what's it doing.
- **Decode**
  - Decoding the byte that you've just fetched and translate it what's it doing.
- **Execute**
  - Doing what the instruction tells the processor to work on.
