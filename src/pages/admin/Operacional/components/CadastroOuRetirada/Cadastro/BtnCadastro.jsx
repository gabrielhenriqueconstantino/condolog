import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import OcrCadastro from "../../OCR/CadastroEncomenda/OcrCadastro";
import "../Style/BtnStyle.css";

export default function BtnCadastro() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="dashboard-button" onClick={() => setShowModal(true)}>
        <div className="button-circle">
          <FiPlus className="button-icon" />
        </div>
        <span className="button-text">Cadastrar encomenda</span>
      </button>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <OcrCadastro onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </>
  );
}
