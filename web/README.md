# Gemina Boy - Game Boy Emulator

A modern, web-based Game Boy emulator built with React and TypeScript.

## Features

- **Full Game Boy Emulation**: CPU, PPU, Memory Management, Input Handling
- **Modern Web Interface**: Beautiful, responsive design with retro gaming aesthetic
- **ROM Support**: Load and play .gb and .gbc files
- **Real-time Controls**: Pause, resume, reset, and speed control
- **Input Mapping**: Keyboard controls for all Game Boy buttons
- **ROM Information**: Display detailed ROM header information
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A modern web browser

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   cd web
   bun install
   # or
   npm install
   ```

### Development

Start the development server:
```bash
bun run dev
# or
npm run dev
```

The emulator will be available at `http://localhost:3000`

### Building for Production

Build the production version:
```bash
bun run build
# or
npm run build
```

## How to Use

### Loading ROMs

1. Click the "Open ROM File" button
2. Select a .gb or .gbc file from your computer
3. The emulator will automatically load and start the ROM

### Controls

- **Arrow Keys** or **WASD**: Directional Pad
- **Z**: A Button
- **X**: B Button
- **Enter**: Start Button
- **Shift**: Select Button

### Emulation Controls

- **Pause**: Stop emulation temporarily
- **Resume**: Continue emulation
- **Reset**: Restart the current ROM
- **Speed**: Adjust emulation speed (0.5x, 1x, 2x)

## ROM Compatibility

The emulator supports:
- Original Game Boy (.gb) ROMs
- Game Boy Color (.gbc) ROMs
- Most commercial and homebrew games

**Note**: Only use ROMs you own legally. The emulator is for educational and preservation purposes.

## Technical Details

### Architecture

- **CPU**: Z80-like processor emulation with accurate timing
- **PPU**: Picture Processing Unit with LCD controller
- **Memory**: MMU with ROM banking and RAM management
- **Input**: Keyboard input handling with configurable mapping
- **Graphics**: Tile-based rendering with sprite support

### Performance

- Target: 60 FPS (Game Boy original speed)
- Adjustable speed: 30-120 FPS
- Optimized for modern web browsers

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is for educational purposes. Please respect copyright laws and only use ROMs you own.

## Acknowledgments

- Nintendo for the original Game Boy hardware
- The emulation community for research and documentation
- React and TypeScript communities for excellent tooling

## Troubleshooting

### Common Issues

1. **ROM won't load**: Ensure the file is a valid .gb or .gbc ROM
2. **Poor performance**: Try reducing the emulation speed
3. **Input not working**: Check that the browser has focus and no other applications are capturing keys

### Performance Tips

- Use a modern browser with hardware acceleration
- Close unnecessary browser tabs
- Ensure your device has adequate cooling (emulation can be CPU-intensive)

## Future Features

- Save state support
- Cheat code support
- Audio emulation
- Link cable emulation
- More accurate timing
- Debug tools and memory viewer
