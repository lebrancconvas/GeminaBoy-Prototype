// Simple test to verify emulator instantiation
import { GameBoy } from '@lebranc-gb/emulator';

// Create a test canvas
const testCanvas = document.createElement('canvas');
testCanvas.width = 160;
testCanvas.height = 144;

try {
  // Try to instantiate the emulator
  const gameBoy = new GameBoy(testCanvas);
  console.log('✅ Emulator instantiated successfully!');
  console.log('GameBoy instance:', gameBoy);
  
  // Test basic methods
  console.log('Status:', gameBoy.getStatus());
  console.log('Canvas:', gameBoy.getCanvas());
  
} catch (error) {
  console.error('❌ Failed to instantiate emulator:', error);
}
