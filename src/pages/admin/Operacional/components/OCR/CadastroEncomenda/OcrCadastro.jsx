import { useState, useEffect } from "react";
import Tesseract from "tesseract.js";
import './ModalCadastro.css'

export default function OcrReader({ onClose }) {
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCameraAccessing, setIsCameraAccessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    checkCameraPermission();
  }, []);

  const checkCameraPermission = async () => {
    try {
      if (navigator.permissions) {
        const permissionStatus = await navigator.permissions.query({ 
          name: 'camera' 
        });
        
        permissionStatus.onchange = () => {
          console.log('Permissão da câmera alterada:', permissionStatus.state);
        };
      }
    } catch (error) {
      console.log('API de permissões não suportada');
    }
  };

  const requestCameraAccess = async () => {
    try {
      setIsCameraAccessing(true);
      
      // Tenta acessar a câmera primeiro para solicitar permissão
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true 
      });
      
      // Fecha o stream imediatamente - só queríamos a permissão
      stream.getTracks().forEach(track => track.stop());
      
      // Agora clica no input file
      document.getElementById('cameraInput')?.click();
      
    } catch (error) {
      setError("Permissão da câmera negada. Por favor, permita o acesso nas configurações do seu navegador.");
      // Fallback - abre o seletor de arquivos normal
      const input = document.getElementById('cameraInput');
      input.removeAttribute('capture');
      input.click();
    } finally {
      setIsCameraAccessing(false);
    }
  };

  const handleCameraClick = () => {
    setError("");
    requestCameraAccess();
  };

  const handlePick = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setError("Nenhuma imagem selecionada");
      return;
    }
    setPreview(URL.createObjectURL(file));
    setResult("");
    setError("");
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

      <div className="ocr-input-container">
        <input
          type="file"
          id="cameraInput"
          accept="image/*"
          capture="environment"
          style={{ display: "none" }}
          onChange={handlePick}
        />
        <button
          type="button"
          className={`ocr-input-btn ${isCameraAccessing ? 'disabled' : ''}`}
          onClick={handleCameraClick}
          disabled={isCameraAccessing}
        >
          {isCameraAccessing ? (
            <>
              <span className="loading-spinner"></span>
              Acessando câmera...
            </>
          ) : (
            "Usar câmera / enviar foto"
          )}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

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