import React, { useRef, useEffect, useState } from 'react';
import { ALLOW_FILE_EXTENSIONS } from './constants';
import { createTestROM } from './create-test-rom';
import './index.css';

import GameBoy from '@lebranc-gb/emulator';

const allowFileExtension = ALLOW_FILE_EXTENSIONS.map(ext => `.${ext}`).join(',');

export function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameBoy, setGameBoy] = useState<GameBoy | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [romInfo, setRomInfo] = useState<any>(null);
  const [status, setStatus] = useState<string>('Ready to load ROM');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (canvasRef.current && !gameBoy) {
      try {
        console.log('Creating GameBoy instance...');
        const newGameBoy = new GameBoy(canvasRef.current);
        console.log('GameBoy instance created successfully:', newGameBoy);
        setGameBoy(newGameBoy);
        setStatus('GameBoy emulator initialized');
      } catch (err) {
        console.error('Failed to create GameBoy instance:', err);
        setError(`Failed to initialize emulator: ${err}`);
        setStatus('Failed to initialize emulator');
      }
    }
  }, [gameBoy]);

  useEffect(() => {
    if (gameBoy) {
      const interval = setInterval(() => {
        if (isRunning) {
          try {
            const status = gameBoy.getStatus();
            setStatus(`Running - Frame: ${status.frameCount} | FPS: ${status.fps}`);
          } catch (err) {
            console.error('Error getting status:', err);
          }
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameBoy, isRunning]);

  function handleROMFileUpload() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files[0] && gameBoy) {
      const file = files[0];

      try {
        setError(null);
        setStatus('Loading ROM...');
        console.log('Loading ROM file:', file.name, 'Size:', file.size);
        
        const fileBuffer = await file.arrayBuffer();
        console.log('File loaded, buffer size:', fileBuffer.byteLength);
        
        await gameBoy.loadROM(fileBuffer);
        setIsRunning(true);
        
        const status = gameBoy.getStatus();
        setRomInfo(status.romInfo);
        setStatus('ROM loaded successfully!');
        
        console.log('ROM loaded successfully:', file.name);
        console.log('ROM info:', status.romInfo);
      } catch (error) {
        console.error('Error loading ROM: ', error);
        setError(`Failed to load ROM: ${error}`);
        setStatus('Error loading ROM');
      }
    }
  }

  async function handleTestROM() {
    if (!gameBoy) {
      setError('GameBoy emulator not initialized');
      return;
    }

    try {
      setError(null);
      setStatus('Creating test ROM...');
      
      const testROM = createTestROM();
      console.log('Test ROM created, size:', testROM.byteLength);
      
      await gameBoy.loadROM(testROM);
      setIsRunning(true);
      
      const status = gameBoy.getStatus();
      setRomInfo(status.romInfo);
      setStatus('Test ROM loaded successfully!');
      
      console.log('Test ROM loaded successfully!');
      console.log('ROM info:', status.romInfo);
    } catch (error) {
      console.error('Error loading test ROM: ', error);
      setError(`Failed to load test ROM: ${error}`);
      setStatus('Error loading test ROM');
    }
  }

  function handlePause() {
    if (gameBoy && isRunning) {
      try {
        gameBoy.pause();
        setIsRunning(false);
        setStatus('Paused');
      } catch (err) {
        console.error('Error pausing:', err);
        setError(`Failed to pause: ${err}`);
      }
    }
  }

  function handleResume() {
    if (gameBoy && !isRunning) {
      try {
        gameBoy.resume();
        setIsRunning(true);
        setStatus('Resumed');
      } catch (err) {
        console.error('Error resuming:', err);
        setError(`Failed to resume: ${err}`);
      }
    }
  }

  function handleReset() {
    if (gameBoy) {
      try {
        gameBoy.reset();
        setIsRunning(false);
        setRomInfo(null);
        setStatus('Emulator reset');
        setError(null);
      } catch (err) {
        console.error('Error resetting:', err);
        setError(`Failed to reset: ${err}`);
      }
    }
  }

  function handleSpeedChange(event: React.ChangeEvent<HTMLSelectElement>) {
    if (gameBoy) {
      try {
        const speed = parseInt(event.target.value);
        gameBoy.setSpeed(speed);
      } catch (err) {
        console.error('Error changing speed:', err);
        setError(`Failed to change speed: ${err}`);
      }
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Gemina Boy</h1>
        <p className="subtitle">Game Boy Emulator</p>
      </header>

      {error && (
        <div className="error-banner">
          <p>⚠️ {error}</p>
          <button onClick={() => setError(null)} className="error-close">×</button>
        </div>
      )}

      <main className="main">
        <section className="display-section">
          <div className="canvas-container">
            <canvas 
              ref={canvasRef}
              className="gameboy-canvas"
              width="160"
              height="144"
            />
            <div className="canvas-overlay">
              {!romInfo && (
                <div className="placeholder">
                  <p>No ROM loaded</p>
                  <p>Click "Load Test ROM" or "Open ROM File" to start</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="controls-section">
          <div className="file-controls">
            <button 
              onClick={handleTestROM}
              className="btn btn-primary"
              disabled={isRunning}
            >
              Load Test ROM
            </button>
            <button 
              onClick={handleROMFileUpload}
              className="btn btn-secondary"
              disabled={isRunning}
            >
              Open ROM File
            </button>
            <input 
              type="file" 
              accept={allowFileExtension} 
              ref={fileInputRef} 
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>

          {romInfo && (
            <div className="rom-info">
              <h3>ROM Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Title:</span>
                  <span className="value">{romInfo.title}</span>
                </div>
                <div className="info-item">
                  <span className="label">Manufacturer:</span>
                  <span className="value">{romInfo.manufacturer}</span>
                </div>
                <div className="info-item">
                  <span className="label">ROM Size:</span>
                  <span className="value">{romInfo.romSize} KB</span>
                </div>
                <div className="info-item">
                  <span className="label">RAM Size:</span>
                  <span className="value">{romInfo.ramSize} KB</span>
                </div>
              </div>
            </div>
          )}

          <div className="emulation-controls">
            <h3>Controls</h3>
            <div className="control-buttons">
              <button 
                onClick={handlePause}
                className="btn btn-secondary"
                disabled={!isRunning}
              >
                Pause
              </button>
              <button 
                onClick={handleResume}
                className="btn btn-secondary"
                disabled={isRunning}
              >
                Resume
              </button>
              <button 
                onClick={handleReset}
                className="btn btn-danger"
                disabled={!romInfo}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="speed-control">
            <label htmlFor="speed">Speed:</label>
            <select 
              id="speed" 
              onChange={handleSpeedChange}
              defaultValue="60"
              className="speed-select"
            >
              <option value="30">0.5x (30 FPS)</option>
              <option value="60">1x (60 FPS)</option>
              <option value="120">2x (120 FPS)</option>
            </select>
          </div>

          <div className="input-info">
            <h3>Input Mapping</h3>
            <div className="input-grid">
              <div className="input-item">
                <span className="key">Arrow Keys / WASD</span>
                <span className="action">Directional Pad</span>
              </div>
              <div className="input-item">
                <span className="key">Z</span>
                <span className="action">A Button</span>
              </div>
              <div className="input-item">
                <span className="key">X</span>
                <span className="action">B Button</span>
              </div>
              <div className="input-item">
                <span className="key">Enter</span>
                <span className="action">Start Button</span>
              </div>
              <div className="input-item">
                <span className="key">Shift</span>
                <span className="action">Select Button</span>
              </div>
            </div>
          </div>

          <div className="debug-info">
            <h3>Debug Information</h3>
            <div className="debug-content">
              <p><strong>GameBoy Instance:</strong> {gameBoy ? '✅ Created' : '❌ Not Created'}</p>
              <p><strong>Canvas:</strong> {canvasRef.current ? '✅ Ready' : '❌ Not Ready'}</p>
              <p><strong>Status:</strong> {status}</p>
              {gameBoy && (
                <button 
                  onClick={() => console.log('GameBoy Debug:', gameBoy)}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.8rem', padding: '8px 16px' }}
                >
                  Log Debug Info
                </button>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="status-bar">
          <span className="status">{status}</span>
        </div>
        <p className="credits">
          Made by <a href="https://github.com/lebrancconvas" target="_blank" rel="noopener noreferrer">Poom Yimyuean (@lebrancconvas)</a>
        </p>
      </footer>
    </div>
  );
}


