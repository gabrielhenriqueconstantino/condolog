import React, { useRef, useState } from 'react';
import './Features.css';
import { 
  FiPackage, 
  FiEdit2, 
  FiBell, 
  FiClock,
  FiArrowLeft, 
  FiArrowRight, 
  FiPhone,
  FiChevronRight
} from 'react-icons/fi';

const featuresData = [
  {
    icon: <FiPackage size={20} />,
    title: 'Registro de encomendas',
    description: 'Cadastre todas as entregas com data, hora e foto. Nada se perde, tudo fica documentado.',
  },
  {
    icon: <FiEdit2 size={20} />,
    title: 'Assinatura na retirada',
    description: 'Evite confusões: moradores assinam digitalmente ao retirar suas encomendas.',
  },
  {
    icon: <FiBell size={20} />,
    title: 'Notificações automáticas',
    description: 'Moradores recebem alertas em tempo real assim que uma encomenda chega na portaria.',
  },
  {
    icon: <FiClock size={20} />,
    title: 'Histórico completo',
    description: 'Acompanhe todo o histórico de entregas por apartamento e melhore a segurança do condomínio.',
  },
  {
    icon: <FiPackage size={20} />,
    title: 'Relatórios personalizados',
    description: 'Gere relatórios completos sobre todas as movimentações do condomínio.',
  },
];

const Features = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 280; // Largura reduzida dos cards

  const scrollToCard = (index) => {
    if (carouselRef.current) {
      const scrollPosition = index * (cardWidth + 16); // cardWidth + gap
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToCard(newIndex);
  };

  const handleNext = () => {
    const newIndex = Math.min(featuresData.length - 1, currentIndex + 1);
    scrollToCard(newIndex);
  };

  return (
    <section className="features-section">
      <div className="features-header">
        <p className="features-subtitle">CONHEÇA AS FUNCIONALIDADES DO CONDOLOG</p>
        <h2 className="features-title">Organize a portaria e mantenha o controle total de entregas</h2>
      </div>

      <div className="features-carousel-container">
        <div className="features-carousel">
          <div className="features-list" ref={carouselRef}>
            {featuresData.map((feature, index) => (
              <article className="feature-card" key={index}>
                <div className="feature-icon-container">
                  <div className="feature-icon">{feature.icon}</div>
                </div>
                <h3 className="feature-card-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <a href="/" className="feature-link">
                  Saiba mais <FiChevronRight size={14} />
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="carousel-controls">
          <button 
            className={`carousel-button prev ${currentIndex === 0 ? 'disabled' : ''}`}
            onClick={handlePrev}
            aria-label="Anterior"
          >
            <FiArrowLeft size={18} />
          </button>
          <div className="carousel-dots">
            {featuresData.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => scrollToCard(index)}
                aria-label={`Ir para item ${index + 1}`}
              />
            ))}
          </div>
          <button 
            className={`carousel-button next ${currentIndex === featuresData.length - 1 ? 'disabled' : ''}`}
            onClick={handleNext}
            aria-label="Próximo"
          >
            <FiArrowRight size={18} />
          </button>
        </div>
      </div>

      <button className="whatsapp-fab" aria-label="Contato via WhatsApp">
        <FiPhone size={20} />
      </button>
    </section>
  );
};

export default Features;