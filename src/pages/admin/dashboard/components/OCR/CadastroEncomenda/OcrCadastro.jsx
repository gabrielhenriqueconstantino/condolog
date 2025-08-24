import { useState } from "react";
import Tesseract from "tesseract.js";
import './ModalCadastro.css'

export default function OcrReader({ onClose }) {
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setResult("");
  };

  const handleOcr = async () => {
    if (!preview) return;
    setLoading(true);
    setResult("");
    try {
      const { data } = await Tesseract.recognize(preview, "por", {
        logger: () => {}
      });
      setResult(data.text || "");
    } catch (e) {
      console.error(e);
      setResult("Não foi possível ler o texto da etiqueta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ocr-wrap">
      <header className="ocr-header">
        <h3>📷 Leia a etiqueta da encomenda</h3>
        <button className="ocr-close" onClick={onClose}>Fechar</button>
      </header>

      <label className="ocr-input">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handlePick}
        />
        <span>Usar câmera / enviar foto</span>
      </label>

      {preview && <img src={preview} alt="Etiqueta" className="ocr-preview" />}

      <button
        className="ocr-action"
        onClick={handleOcr}
        disabled={!preview || loading}
      >
        {loading ? "Lendo..." : "Extrair texto da etiqueta"}
      </button>

      {result && (
        <pre className="ocr-output">{result}</pre>
      )}
    </div>
  );
}
