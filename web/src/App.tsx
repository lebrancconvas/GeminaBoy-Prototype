import { useRef } from 'react';
import './index.css';

export function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleROMFileUpload() {
    fileInputRef.current?.click();
  }

  return (
    <>
      <header>
        <h1>Lebranc-GB</h1>
      </header>
      <section className="display">

      </section>
      <section className="upload">
        <button onClick={handleROMFileUpload}>Upload GB ROM File</button>
        <input type="file" accept=".gb,.gbc" ref={fileInputRef} />
      </section>
      <footer>
        <p>Made by <a href="https://github.com/lebrancconvas" target="_blank">Poom Yimyuean (@lebrancconvas)</a></p>
      </footer>
    </>
  )
};


