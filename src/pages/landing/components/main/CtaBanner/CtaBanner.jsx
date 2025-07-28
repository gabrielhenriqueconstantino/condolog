import React from 'react';
import './CtaBanner.css';
import { FiArrowRight } from 'react-icons/fi'; // Usando um ícone para o botão


const CtaBanner = () => {
  return (
    <div className="cta-banner-container">
      <div className="cta-image-section">
        <div className="cta-image-background"></div>
        <img src="/img/cta-img.png" alt="Demonstração do sistema em um tablet" className="cta-image" />
      </div>

      <div className="cta-text-section">
        <h2 className="cta-title">
          Eleve a gestão do seu condomínio a um novo patamar.
        </h2>
        <p className="cta-description">
          Descubra como nossa plataforma pode trazer mais eficiência, transparência e harmonia para o seu dia a dia.
        </p>
        <button className="cta-button">
          <span>Solicitar um contato</span>
          <FiArrowRight />
        </button>
      </div>
    </div>
  );
};

export default CtaBanner;