import React, { useRef } from 'react';
import './index.css';

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
        const title = new TextDecoder().decode(fileView.slice(0x134, 0x143)).replace(/\0/, '');
        console.log(fileView);
        console.log(title);
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

      </section>
      <section className="upload">
        <button onClick={handleROMFileUpload}>Upload GB ROM File</button>
        <input type="file" accept=".gb,.gbc" ref={fileInputRef} onChange={handleFileChange} />
      </section>
      <footer>
        <p>Made by <a href="https://github.com/lebrancconvas" target="_blank">Poom Yimyuean (@lebrancconvas)</a></p>
      </footer>
    </>
  )
};


