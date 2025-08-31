import { useState, useRef, useEffect } from "react";
import Quagga from "quagga";
import Tesseract from "tesseract.js";
import { 
  FaCamera, 
  FaTimes, 
  FaBarcode, 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaTrash, 
  FaSync,
  FaUser,
  FaBox,
  FaEdit
} from "react-icons/fa";
import "./ModalCadastro.css";

export default function OcrReader({ onClose, onTextExtracted }) {
  const [preview, setPreview] = useState(null);
  const [barcodeResult, setBarcodeResult] = useState("");
  // eslint-disable-next-line
  const [recipientText, setRecipientText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCameraAccessing, setIsCameraAccessing] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("barcode");
  const [extractedData, setExtractedData] = useState({
    nome: "",
    endereco: "",
    telefone: "",
    observacoes: ""
  });
  const fileInputRef = useRef(null);
  const modalRef = useRef(null);

  // Efeito para garantir que o modal esteja sempre visível
  useEffect(() => {
    const handleResize = () => {
      if (modalRef.current) {
        const modal = modalRef.current;
        const viewportHeight = window.innerHeight;
        modal.style.maxHeight = `${viewportHeight - 40}px`;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Solicitação da câmera
  const handleCameraClick = async () => {
    setError("");
    setIsCameraAccessing(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      stream.getTracks().forEach(track => track.stop());
      fileInputRef.current?.click();
    } catch {
      setError("Permissão da câmera negada. Você pode enviar uma imagem existente.");
      fileInputRef.current?.removeAttribute("capture");
      fileInputRef.current?.click();
    } finally {
      setIsCameraAccessing(false);
    }
  };

  // Seleção de imagem
  const handlePick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return setError("Nenhuma imagem selecionada");
    if (!file.type.match("image.*")) return setError("Selecione um arquivo de imagem");

    if (preview) URL.revokeObjectURL(preview);
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    setError("");
    setProgress(0);

    if (phase === "barcode") {
      setBarcodeResult("");
      setTimeout(() => handleScanBarcode(imageUrl), 100);
    } else if (phase === "recipient") {
      setRecipientText("");
      setTimeout(() => handleScanRecipient(imageUrl), 100);
    }
  };

  // Leitura do código de barras
  const handleScanBarcode = async (image = preview) => {
    if (!image) return;
    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 5;
      });
    }, 100);

    try {
      const barcodeData = await new Promise((resolve) => {
        Quagga.decodeSingle(
          {
            src: image,
            numOfWorkers: 4,
            inputStream: { size: 800 },
            decoder: { readers: ["code_128_reader", "ean_reader", "upc_reader"] },
          },
          (res) => resolve(res?.codeResult?.code || null)
        );
      });

      clearInterval(interval);
      setProgress(100);
      
      setTimeout(() => {
        if (barcodeData) {
          setBarcodeResult(barcodeData);
          setPhase("success");
          if (onTextExtracted) onTextExtracted(barcodeData);
          setLoading(false);

          // Após 2 segundos, passa para captura do destinatário
          setTimeout(() => setPhase("recipient"), 2000);
        } else {
          setError("Não foi possível identificar o código de barras. Tente novamente.");
          setLoading(false);
        }
      }, 1000);
    } catch {
      setError("Erro ao processar a imagem.");
      setLoading(false);
    }
  };

  // Processar texto extraído para preencher campos
  const processExtractedText = (text) => {
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    const data = {
      nome: "",
      endereco: "",
      telefone: "",
      observacoes: ""
    };
    
    // Tentativa de identificar padrões comuns
    lines.forEach(line => {
      const lowerLine = line.toLowerCase();
      
      // Nome (geralmente aparece primeiro)
      if (!data.nome && (lowerLine.includes("nome") || lowerLine.includes("destinatário") || 
          lowerLine.includes("para:") || /^[A-Za-zÀ-ÿ\s]+$/.test(line))) {
        data.nome = line.replace(/^(nome|destinatário|para:?)\s*:/i, '').trim();
      }
      
      // Endereço
      else if (!data.endereco && (lowerLine.includes("endereço") || lowerLine.includes("rua") || 
               lowerLine.includes("av.") || lowerLine.includes("avenida") || 
               lowerLine.includes("logradouro") || /\d/.test(line))) {
        data.endereco = line.replace(/^(endereço|rua|av\.?|avenida|logradouro):?/i, '').trim();
      }
      
      // Telefone
      else if (!data.telefone && (lowerLine.includes("tel") || lowerLine.includes("telefone") || 
               lowerLine.includes("celular") || /(\(\d{2}\)\s?\d{4,5}-\d{4})|(\d{2}\s?\d{4,5}-\d{4})/.test(line))) {
        data.telefone = line.replace(/^(tel|telefone|celular):?/i, '').trim();
      }
      
      // Observações (se sobrar algo)
      else {
        if (data.observacoes) data.observacoes += " | ";
        data.observacoes += line;
      }
    });
    
    // Se não encontrou padrões, tenta uma abordagem diferente
    if (!data.nome && lines.length > 0) data.nome = lines[0];
    if (!data.endereco && lines.length > 1) data.endereco = lines[1];
    if (!data.telefone && lines.length > 2) data.telefone = lines[2];
    
    setExtractedData(data);
    return data;
  };

  // Leitura OCR dos dados do destinatário
  const handleScanRecipient = async (image = preview) => {
    if (!image) return;
    setLoading(true);
    setProgress(0);
    setPhase("recipientOcr");

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 5;
      });
    }, 100);

    try {
      const result = await Tesseract.recognize(image, "por", { 
        logger: m => {
          if (m.status === "recognizing text") {
            setProgress(Math.min(90, Math.floor(m.progress * 100)));
          }
        } 
      });

      clearInterval(interval);
      setProgress(100);
      
      setTimeout(() => {
        const text = result.data.text.trim();
        setRecipientText(text);
        processExtractedText(text);
        setPhase("recipientSuccess");
        setLoading(false);

        // Após 2 segundos, vai para confirmação dos dados
        setTimeout(() => setPhase("confirm"), 2000);
      }, 1000);
    } catch {
      setError("Erro ao processar a imagem do destinatário.");
      setLoading(false);
    }
  };

  const handleClear = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setBarcodeResult("");
    setRecipientText("");
    setError("");
    setProgress(0);
    setPhase("barcode");
    setExtractedData({
      nome: "",
      endereco: "",
      telefone: "",
      observacoes: ""
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Cadastrar encomenda
  const handleCadastrar = () => {
    // Simulação de envio para API
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPhase("final");
    }, 1500);
  };

  // Reiniciar para nova encomenda
  const handleNovaEncomenda = () => {
    setBarcodeResult("");
    setRecipientText("");
    setPreview(null);
    setError("");
    setProgress(0);
    setPhase("barcode");
    setExtractedData({
      nome: "",
      endereco: "",
      telefone: "",
      observacoes: ""
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Alternar entre as fases manualmente
  const handleManualPhaseChange = (newPhase) => {
    setPhase(newPhase);
  };

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card" ref={modalRef}>
        <div className="ocr-container">
          <header className="ocr-header">
            <div className="ocr-title">
              <div className="phase-indicator">
                <div className={`phase-dot ${phase === "barcode" || phase === "success" ? "active" : "completed"}`}>
                  {phase !== "barcode" && phase !== "success" ? <FaCheckCircle /> : "1"}
                </div>
                <div className={`phase-line ${phase !== "barcode" && phase !== "success" ? "completed" : ""}`}></div>
                <div className={`phase-dot ${phase === "recipient" || phase === "recipientOcr" || phase === "recipientSuccess" ? "active" : phase === "confirm" || phase === "final" ? "completed" : ""}`}>
                  {(phase === "confirm" || phase === "final") ? <FaCheckCircle /> : "2"}
                </div>
                <div className={`phase-line ${phase === "confirm" || phase === "final" ? "completed" : ""}`}></div>
                <div className={`phase-dot ${phase === "confirm" ? "active" : phase === "final" ? "completed" : ""}`}>
                  {phase === "final" ? <FaCheckCircle /> : "3"}
                </div>
              </div>
              <h3>
                {phase === "barcode" && "Leitura do Código de Barras"}
                {phase === "success" && "Código Identificado!"}
                {phase === "recipient" && "Dados do Destinatário"}
                {(phase === "recipientOcr" || phase === "recipientSuccess") && "Processando Destinatário"}
                {phase === "confirm" && "Confirmar Dados"}
                {phase === "final" && "Encomenda Cadastrada!"}
              </h3>
            </div>
            <button className="ocr-close" onClick={onClose}>
              <FaTimes className="icon-close" />
            </button>
          </header>

          <div className="ocr-content">
            {/* Mensagem de erro */}
            {error && (
              <div className="error-message">
                <FaExclamationTriangle /> {error}
              </div>
            )}

            {/* Fase 1: Leitura de código de barras */}
            {phase === "barcode" && (
              <>
                <div className="step-guide">
                  <div className="step-number">1</div>
                  <p className="step-text">Posicione o código de barras da encomenda dentro do quadro da câmera</p>
                </div>
                
                <div className="camera-instruction">
                  <FaCamera className="camera-icon" />
                  <p>Centralize o código de barras na tela para uma leitura precisa</p>
                </div>
                
                <div className="ocr-input-container">
                  <input 
                    ref={fileInputRef} 
                    type="file" 
                    accept="image/*" 
                    capture="environment" 
                    onChange={handlePick} 
                  />
                  <button 
                    type="button" 
                    className={`ocr-input-btn ${isCameraAccessing ? "disabled" : ""}`} 
                    onClick={handleCameraClick} 
                    disabled={isCameraAccessing}
                  >
                    {isCameraAccessing ? (
                      <> 
                        <span className="loading-spinner"></span> 
                        Acessando câmera...
                      </>
                    ) : (
                      <> 
                        <FaCamera className="icon-camera" /> 
                        Ler código de barras
                      </>
                    )}
                  </button>
                </div>
                
                <div className="alternative-options">
                  <p>Ou</p>
                  <button 
                    className="btn-secondary"
                    onClick={() => handleManualPhaseChange("confirm")}
                  >
                    <FaEdit /> Inserir dados manualmente
                  </button>
                </div>
              </>
            )}

            {/* Fase 2: Tela de sucesso do código de barras */}
            {phase === "success" && (
              <div className="success-screen">
                <div className="success-icon">
                  <FaCheckCircle />
                </div>
                <h2>Código identificado com sucesso!</h2>
                <div className="barcode-result">
                  <FaBarcode /> 
                  <span>{barcodeResult}</span>
                </div>
                <div className="progress-container">
                  <div className="progress-text">Preparando para próxima etapa...</div>
                </div>
              </div>
            )}

            {/* Fase 3: Captura de dados do destinatário */}
            {phase === "recipient" && (
              <div className="recipient-screen">
                <div className="step-guide">
                  <div className="step-number">2</div>
                  <p className="step-text">Agora fotografe os dados do destinatário</p>
                </div>
                
                <div className="camera-instruction">
                  <FaUser className="camera-icon" />
                  <p>Certifique-se de que todos os dados estejam legíveis na imagem</p>
                </div>
                
                <div className="ocr-input-container">
                  <input 
                    ref={fileInputRef} 
                    type="file" 
                    accept="image/*" 
                    capture="environment" 
                    onChange={handlePick} 
                  />
                  <button 
                    type="button" 
                    className={`ocr-input-btn ${isCameraAccessing ? "disabled" : ""}`} 
                    onClick={handleCameraClick} 
                    disabled={isCameraAccessing}
                  >
                    {isCameraAccessing ? (
                      <> 
                        <span className="loading-spinner"></span> 
                        Acessando câmera...
                      </>
                    ) : (
                      <> 
                        <FaCamera className="icon-camera" /> 
                        Capturar dados
                      </>
                    )}
                  </button>
                </div>
                
                <button 
                  className="btn-secondary"
                  onClick={() => handleManualPhaseChange("confirm")}
                >
                  <FaEdit /> Preencher manualmente
                </button>
              </div>
            )}

            {/* Fase 4: OCR em andamento */}
            {(phase === "recipientOcr" || loading) && (
              <div className="progress-screen">
                <div className="progress-indicator">
                  <div className="progress-circle">
                    <span>{Math.floor(progress)}%</span>
                  </div>
                </div>
                <h3>Processando imagem...</h3>
                <p>Estamos extraindo as informações do destinatário</p>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            )}

            {/* Fase 5: Sucesso OCR do destinatário */}
            {phase === "recipientSuccess" && (
              <div className="success-screen">
                <div className="success-icon">
                  <FaCheckCircle />
                </div>
                <h2>Dados extraídos com sucesso!</h2>
                <p>Verifique se todas as informações estão corretas</p>
                <div className="extracted-data-preview">
                  <div className="data-item">
                    <label>Nome:</label>
                    <span>{extractedData.nome || "Não identificado"}</span>
                  </div>
                  <div className="data-item">
                    <label>Endereço:</label>
                    <span>{extractedData.endereco || "Não identificado"}</span>
                  </div>
                </div>
                <div className="progress-container">
                  <div className="progress-text">Preparando para confirmação...</div>
                </div>
              </div>
            )}

            {/* Fase 6: Confirmação dos dados */}
            {phase === "confirm" && (
              <div className="confirm-screen">
                <h2>Confirme os dados da encomenda</h2>
                
                <div className="form-section">
                  <h3><FaBarcode /> Código de Barras</h3>
                  <div className="input-group">
                    <input 
                      type="text" 
                      value={barcodeResult} 
                      onChange={e => setBarcodeResult(e.target.value)} 
                      placeholder="Código de barras da encomenda"
                    />
                    <button 
                      className="icon-btn"
                      onClick={() => handleManualPhaseChange("barcode")}
                      title="Escanear novamente"
                    >
                      <FaSync />
                    </button>
                  </div>
                </div>
                
                <div className="form-section">
                  <h3><FaUser /> Dados do Destinatário</h3>
                  
                  <div className="form-row">
                    <div className="input-group">
                      <label>Nome completo</label>
                      <input 
                        type="text" 
                        value={extractedData.nome} 
                        onChange={e => setExtractedData({...extractedData, nome: e.target.value})} 
                        placeholder="Nome do destinatário"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="input-group">
                      <label>Endereço</label>
                      <input 
                        type="text" 
                        value={extractedData.endereco} 
                        onChange={e => setExtractedData({...extractedData, endereco: e.target.value})} 
                        placeholder="Endereço completo"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="input-group">
                      <label>Telefone</label>
                      <input 
                        type="text" 
                        value={extractedData.telefone} 
                        onChange={e => setExtractedData({...extractedData, telefone: e.target.value})} 
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                    
                    <div className="input-group">
                      <label>Observações</label>
                      <input 
                        type="text" 
                        value={extractedData.observacoes} 
                        onChange={e => setExtractedData({...extractedData, observacoes: e.target.value})} 
                        placeholder="Informações adicionais"
                      />
                    </div>
                  </div>
                  
                  <button 
                    className="btn-secondary"
                    onClick={() => handleManualPhaseChange("recipient")}
                  >
                    <FaCamera /> Capturar dados novamente
                  </button>
                </div>
                
                <div className="form-actions">
                  <button className="btn-secondary" onClick={handleClear}>
                    <FaTrash /> Limpar
                  </button>
                  <button 
                    className="btn-primary" 
                    onClick={handleCadastrar}
                    disabled={!barcodeResult || !extractedData.nome}
                  >
                    {loading ? (
                      <>
                        <span className="loading-spinner"></span>
                        Cadastrando...
                      </>
                    ) : (
                      <>
                        <FaCheckCircle /> Cadastrar Encomenda
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Fase 7: Tela final */}
            {phase === "final" && (
              <div className="final-screen">
                <div className="success-icon">
                  <FaCheckCircle />
                </div>
                <h2>Encomenda cadastrada com sucesso!</h2>
                <p>A encomenda foi adicionada ao sistema e já pode ser rastreada.</p>
                
                <div className="encomenda-summary">
                  <div className="summary-item">
                    <label>Código:</label>
                    <span>{barcodeResult}</span>
                  </div>
                  <div className="summary-item">
                    <label>Destinatário:</label>
                    <span>{extractedData.nome}</span>
                  </div>
                </div>
                
                <div className="final-actions">
                  <button className="btn-primary" onClick={handleNovaEncomenda}>
                    <FaBox /> Cadastrar outra encomenda
                  </button>
                  <button className="btn-secondary" onClick={onClose}>
                    Fechar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}