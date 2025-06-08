# Game Boy's Audio Processing Unit

## Terminology

### Frequency

- Pitch of a sound.
- Determine what note of the sound is. (How high & low of the note.)
- High Frequency -> High Pitch
- Low Frequency -> Low Pitch

### Duty Cycle

- Control the shape of the sound wave.

### Volume Envelope

- Make volume of the sound automatically change over the time.

### Length Counter

- Determine the duration of the sound.

## Architecture

| Channel | Sweep | Frequency | Wave Form | Length Timer | Volume |
|:---:|:---:|:---:|:---:|:---:|:---:|
| Square 1 | Sweep | Period Counter | Duty | Length Timer | Envelope |
| Square 2 |  | Period Counter | Duty | Length Timer | Envelope |
| Wave |  | Period Counter | Wave | Length Timer | Volume |
| Noise |  | Period Counter | LFSR | Length Timer | Envelope |

### Channel 1 (CH1): 1st Pulse Wave

- Simple Pulse Wave
- Duty Cycle
- Volume Envelope
- Feature:
  - Frequency Sweep

### Channel 2 (CH2): 2nd Pulse Wave

### Channel 3 (CH3): Waveform

### Channel 4 (CH4): Noise

## Triggering

## Volume & Envelope

## Lenght Timer
