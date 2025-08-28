import React, { useRef, useEffect, useState } from 'react';
import { ALLOW_FILE_EXTENSIONS } from './constants';
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

  useEffect(() => {
    if (canvasRef.current && !gameBoy) {
      const newGameBoy = new GameBoy(canvasRef.current);
      setGameBoy(newGameBoy);
    }
  }, [gameBoy]);

  useEffect(() => {
    if (gameBoy) {
      const interval = setInterval(() => {
        if (isRunning) {
          const status = gameBoy.getStatus();
          setStatus(`Running - Frame: ${status.frameCount} | FPS: ${status.fps}`);
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
        setStatus('Loading ROM...');
        const fileBuffer = await file.arrayBuffer();
        
        await gameBoy.loadROM(fileBuffer);
        setIsRunning(true);
        setRomInfo(gameBoy.getStatus().romInfo);
        setStatus('ROM loaded successfully!');
        
        console.log('ROM loaded:', file.name);
      } catch (error) {
        console.error('Error loading ROM: ', error);
        setStatus('Error loading ROM');
      }
    }
  }

  function handlePause() {
    if (gameBoy && isRunning) {
      gameBoy.pause();
      setIsRunning(false);
      setStatus('Paused');
    }
  }

  function handleResume() {
    if (gameBoy && !isRunning) {
      gameBoy.resume();
      setIsRunning(true);
      setStatus('Resumed');
    }
  }

  function handleReset() {
    if (gameBoy) {
      gameBoy.reset();
      setIsRunning(false);
      setRomInfo(null);
      setStatus('Emulator reset');
    }
  }

  function handleSpeedChange(event: React.ChangeEvent<HTMLSelectElement>) {
    if (gameBoy) {
      const speed = parseInt(event.target.value);
      gameBoy.setSpeed(speed);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Gemina Boy</h1>
        <p className="subtitle">Game Boy Emulator</p>
      </header>

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
                  <p>Click "Open ROM File" to start</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="controls-section">
          <div className="file-controls">
            <button 
              onClick={handleROMFileUpload}
              className="btn btn-primary"
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
                <span className="action">Start</span>
              </div>
              <div className="input-item">
                <span className="key">Shift</span>
                <span className="action">Select</span>
              </div>
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


