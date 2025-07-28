import React from "react";
import "./Hero.css";


const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        
        <div className="hero-content">
  <p className="hero-subtitle">Já são milhares de portarias organizadas com o CondoLog</p>
  
  <h1 className="hero-title">
    A forma mais segura de <span>gerenciar encomendas</span> no seu condomínio
  </h1>

  <p className="hero-description">
    Registre, acompanhe e entregue encomendas com controle total. O CondoLog traz praticidade para o porteiro e transparência para os moradores.
  </p>

  <div className="hero-buttons">
    <button className="btn-primary">Comece agora</button>
    <button className="btn-outline">Ver demonstração</button>
  </div>
</div>


        <div className="hero-image">
          <img src="/img/hero-img.jpg" alt="Síndico usando sistema" />
        </div>
        
      </div>
    </section>
  );
};

export default Hero;
