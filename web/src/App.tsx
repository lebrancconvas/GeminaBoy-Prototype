import React, { useRef } from 'react';
import { ALLOW_FILE_EXTENSIONS } from './constants';
import './index.css';

import GameBoyEmulator from '@lebranc-gb/emulator';

const allowFileExtension = ALLOW_FILE_EXTENSIONS.map(ext => `.${ext}`).join(',');

export function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleROMFileUpload() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if(files && files[0]) {
      const file = files[0];

      try {
        const fileBuffer = await file.arrayBuffer();
        const fileView = new Uint8Array(fileBuffer);
        console.log('File Data: ', fileView);
      } catch(error) {
        console.error('Error reading file: ', error);
      }
    }
  };

  return (
    <>
      <header>
        <h1>Lebranc-GB</h1>
      </header>
      <section className="display">
        <canvas>Display Canvas</canvas>
      </section>
      <section className="upload">
        <button onClick={handleROMFileUpload}>Open ROM File</button>
        <input type="file" accept={allowFileExtension} ref={fileInputRef} onChange={handleFileChange} />
      </section>
      <footer>
        <p>Made by <a href="https://github.com/lebrancconvas" target="_blank">Poom Yimyuean (@lebrancconvas)</a></p>
      </footer>
    </>
  )
};


