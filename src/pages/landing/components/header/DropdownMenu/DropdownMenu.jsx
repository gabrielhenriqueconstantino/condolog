import React, { useState } from "react";
import './DropdownMenu.css';
import { FaFileInvoice, FaClipboardList, FaMoneyCheckAlt, FaEnvelope, FaTools, FaTh, FaBrain } from "react-icons/fa";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="dropdown"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="dropbtn">Soluções ▾</button>
      {isOpen && (
        <div className="dropdown-panel">
          <div className="dropdown-column">
            <span className="column-title">FUNCIONALIDADES</span>
            <ul>
              <li><FaFileInvoice /> <div><strong>Boletos</strong><span>Emissão de boletos automática</span></div></li>
              <li><FaClipboardList /> <div><strong>Relatórios</strong><span>Prestação de contas rápida</span></div></li>
              <li><FaMoneyCheckAlt /> <div><strong>Controle de Inadimplência</strong><span>Painel de controle completo</span></div></li>
              <li><FaEnvelope /> <div><strong>Avisos automáticos</strong><span>Notificações instantâneas</span></div></li>
              <li><FaTools /> <div><strong>Manutenções</strong><span>Agenda de manutenções</span></div></li>
              <li><FaTh /> <div><strong>Ver tudo</strong><span>Descubra a Condolog</span></div></li>
            </ul>
          </div>

          <div className="dropdown-column">
            <span className="column-title">NOVIDADES</span>
            <ul>
              <li><FaClipboardList /> Previsão orçamentária</li>
              <li><FaMoneyCheckAlt /> Conciliação bancária</li>
              <li><FaBrain /> Móra – IA do condomínio</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
