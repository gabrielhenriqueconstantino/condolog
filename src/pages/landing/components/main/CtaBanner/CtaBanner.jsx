import React from 'react';
import './CtaBanner.css';
import { FiArrowRight } from 'react-icons/fi';

const CtaBanner = () => {
  return (
    <section className="cta-banner">
      <div className="cta-container">
        <div className="cta-media">
          <div className="cta-media-background" aria-hidden="true"></div>
          <div className="cta-media-foreground">
            <img 
              src="/img/cta-img.png" 
              alt="Demonstração do sistema CondoLog em um tablet" 
              className="cta-image"
              loading="lazy"
              width="480"
              height="360"
            />
          </div>
        </div>

        <div className="cta-content">
          <h2 className="cta-headline">
            Eleve a gestão do seu condomínio a um <span className="highlight">novo patamar</span>
          </h2>
          <p className="cta-subtext">
            Descubra como nossa plataforma pode trazer mais eficiência, transparência e harmonia para o seu dia a dia.
          </p>
          <button className="cta-action">
            <span>Solicitar demonstração</span>
            <FiArrowRight className="cta-action-icon" />
          </button>
          
          <div className="cta-assurance">
            <div className="assurance-item">
              <div className="assurance-badge">✓</div>
              <span>Sem compromisso inicial</span>
            </div>
            <div className="assurance-item">
              <div className="assurance-badge">✓</div>
              <span>Implementação rápida</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;