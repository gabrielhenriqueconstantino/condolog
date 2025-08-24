import { useState } from "react";
import { FiPackage } from "react-icons/fi";
import OcrRetirada from "../../OCR/RetiradaEncomenda/OcrRetirada";
import "../Style/BtnStyle.css";

export default function BtnRetirada() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="dashboard-button" onClick={() => setShowModal(true)}>
        <div className="button-circle">
          <FiPackage className="button-icon" />
        </div>
        <span className="button-text">Entregar encomenda</span>
      </button>

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <OcrRetirada onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </>
  );
}
