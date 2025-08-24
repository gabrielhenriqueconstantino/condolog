import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import BtnCadastro from "../components/CadastroOuRetirada/Cadastro/BtnCadastro";
import BtnRetirada from "../components/CadastroOuRetirada/Retirada/BtnRetirada";
import OcrReader from "../components/OCR/CadastroEncomenda/OcrCadastro";

const Dashboard = () => {
  const [showOcr, setShowOcr] = useState(false);

  const handleCadastrar = () => setShowOcr(true);
  const handleEntregar = () => {
    // lógica futura da retirada
    console.log("Retirada de encomenda");
  };

  return (
    <div className="Dashboard">
      <Sidebar />
      <BtnCadastro onCadastrar={handleCadastrar} />
      <BtnRetirada onEntregar={handleEntregar} />

      {/* Modal do OCR */}
      {showOcr && (
        <div className="modal-backdrop" onClick={() => setShowOcr(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <OcrReader onClose={() => setShowOcr(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
