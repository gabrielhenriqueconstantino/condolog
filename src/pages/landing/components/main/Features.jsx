import React, { useRef, useState } from 'react';
import '../../styles/Features.css';
import { 
  FiPackage, 
  FiEdit2, 
  FiBell, 
  FiClock,
  FiArrowLeft, 
  FiArrowRight, 
  FiPhone 
} from 'react-icons/fi';

const featuresData = [
  {
    icon: <FiPackage size={28} />,
    title: 'Registro de encomendas',
    description: 'Cadastre todas as entregas com data, hora e foto. Nada se perde, tudo fica documentado.',
  },
  {
    icon: <FiEdit2 size={28} />,
    title: 'Assinatura na retirada',
    description: 'Evite confusões: moradores assinam digitalmente ao retirar suas encomendas.',
  },
  {
    icon: <FiBell size={28} />,
    title: 'Notificações automáticas',
    description: 'Moradores recebem alertas em tempo real assim que uma encomenda chega na portaria.',
  },
  {
    icon: <FiClock size={28} />,
    title: 'Histórico completo',
    description: 'Acompanhe todo o histórico de entregas por apartamento e melhore a segurança do condomínio.',
  },
  {
    icon: <FiPackage size={28} />,
    title: 'Relatórios personalizados',
    description: 'Gere relatórios completos sobre todas as movimentações do condomínio.',
  },
  {
    icon: <FiEdit2 size={28} />,
    title: 'Controle de visitantes',
    description: 'Registre e gerencie todas as entradas e saídas de visitantes.',
  }
];

const Features = () => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardWidth = 320; // Largura aproximada de cada card + gap

  const scrollToCard = (index) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: index * cardWidth,
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
    if (carouselRef.current) {
      const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      const maxIndex = Math.floor(maxScroll / cardWidth);
      const newIndex = Math.min(maxIndex, currentIndex + 1);
      scrollToCard(newIndex);
    }
  };

  return (
    <div className="features-container">
      <div className="features-header">
         <p className="features-subtitle">CONHEÇA AS FUNCIONALIDADES DO CONDOLOG</p>
         <h2 className="features-title">Organize a portaria e mantenha o controle total de entregas</h2>
      </div>
      <div className="features-carousel">
        <button 
          className={`arrow-button left-arrow ${currentIndex === 0 ? 'disabled' : ''}`}
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <FiArrowLeft size={24} />
        </button>

        <div className="features-list" ref={carouselRef}>
          {featuresData.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-card-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <a href="/" className="feature-link">
                Saiba mais →
              </a>
            </div>
          ))}
        </div>

        <button 
          className={`arrow-button right-arrow ${currentIndex === featuresData.length - 1 ? 'disabled' : ''}`}
          onClick={handleNext}
          disabled={currentIndex === featuresData.length - 1}
        >
          <FiArrowRight size={24} />
        </button>
      </div>
      
      <button className="whatsapp-fab">
        <FiPhone size={24} />
      </button>
    </div>
  );
};

export default Features;