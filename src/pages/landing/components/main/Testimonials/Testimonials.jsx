import React, { useState } from 'react';
import './Testimonials.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonialsData = [
  {
    id: 1,
    quote: "Desde que implementamos o CondoLog, a comunicação com os moradores melhorou 100%. A transparência na gestão de encomendas é o grande diferencial.",
    name: 'Mariana Almeida',
    role: 'Síndica Profissional',
    company: 'Condomínio Praça das Flores',
    image: '/img/testimonials/mariana.jpg',
    rating: 5
  },
  {
    id: 2,
    quote: "A gestão de encomendas ficou muito mais simples e automatizada. Reduzimos o tempo gasto em 50% e os moradores adoraram a praticidade.",
    name: 'Carlos Furtado',
    role: 'Administrador',
    company: 'Condomínio Morada do Sol',
    image: '/img/testimonials/carlos.jpg',
    rating: 5
  },
  {
    id: 3,
    quote: "Como moradora, adoro receber notificações quando minhas encomendas chegam. O sistema é intuitivo e resolveu nossos problemas na portaria.",
    name: 'Juliana Costa',
    role: 'Moradora',
    company: 'Edifício Central Park',
    image: '/img/testimonials/juliana.jpg',
    rating: 4
  },
  {
    id: 4,
    quote: "Implementamos em 3 condomínios que administramos e todos tiveram redução de extravios. A assinatura digital foi um divisor de águas.",
    name: 'Ricardo Mendes',
    role: 'Gerente de Condomínios',
    company: 'Imobiliária Horizonte',
    image: '/img/testimonials/ricardo.jpg',
    rating: 5
  }
];

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow = 2;

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev >= testimonialsData.length - slidesToShow ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? testimonialsData.length - slidesToShow : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="testimonials" aria-label="Depoimentos de clientes">
      <div className="container">
        <div className="testimonials-header">
          <span className="section-subtitle">DEPOIMENTOS</span>
          <h2 className="section-title">Condomínios que transformaram sua gestão</h2>
          <p className="section-description">
            Veja o que síndicos, administradores e moradores têm a dizer sobre sua experiência com o CondoLog
          </p>
        </div>

        <div className="testimonials-carousel">
          <div 
            className="testimonials-track"
            style={{ 
              transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)` 
            }}
          >
            {testimonialsData.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-content">
                  <FaQuoteLeft className="quote-icon" aria-hidden="true" />
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`star ${i < testimonial.rating ? 'filled' : ''}`}
                        aria-hidden="true"
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <blockquote className="testimonial-text">
                    <p>{testimonial.quote}</p>
                  </blockquote>
                </div>
                <div className="testimonial-author">
                  <img 
                    src={testimonial.image} 
                    alt={`${testimonial.name}, ${testimonial.role}`} 
                    className="author-image"
                    width="64"
                    height="64"
                    loading="lazy"
                  />
                  <div className="author-details">
                    <p className="author-name">{testimonial.name}</p>
                    <p className="author-role">{testimonial.role}</p>
                    <p className="author-company">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="testimonials-controls">
          <button 
            className="control-button prev"
            onClick={prevSlide}
            aria-label="Depoimento anterior"
          >
            <FiChevronLeft size={20} />
          </button>
          
          <div className="pagination-dots">
            {testimonialsData.slice(0, testimonialsData.length - slidesToShow + 1).map((_, i) => (
              <button
                key={i}
                className={`dot ${i === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(i)}
                aria-label={`Ir para depoimento ${i + 1}`}
              />
            ))}
          </div>
          
          <button 
            className="control-button next"
            onClick={nextSlide}
            aria-label="Próximo depoimento"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;