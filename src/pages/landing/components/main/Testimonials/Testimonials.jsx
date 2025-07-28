import React from 'react';
import './Testimonials.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';

// Dados de exemplo. Em uma aplicação real, isso viria de uma API.
const testimonialsData = [
  {
    quote: "Desde que implementamos o sistema, a comunicação com os moradores melhorou 100%. A transparência na prestação de contas é o grande diferencial.",
    name: 'Mariana Almeida',
    role: 'Síndica Profissional, Condomínio Praça das Flores',
    image: 'https://randomuser.me/api/portraits/women/44.jpg' // Substituir por fotos reais
  },
  {
    quote: "A gestão de inadimplência ficou muito mais simples e automatizada. Reduzimos o tempo gasto com cobranças em mais de 50%. Recomendo!",
    name: 'Carlos Furtado',
    role: 'Administrador, Condomínio Morada do Sol',
    image: 'https://randomuser.me/api/portraits/men/32.jpg' // Substituir por fotos reais
  },
  {
    quote: "Como moradora, adoro a facilidade de reservar o salão de festas e participar das enquetes pelo aplicativo. Tudo na palma da mão.",
    name: 'Juliana Costa',
    role: 'Moradora, Edifício Central Park',
    image: 'https://randomuser.me/api/portraits/women/33.jpg' // Substituir por fotos reais
  },
];

const Testimonials = () => {
  // OBS: A lógica do carrossel (useState, etc.) não foi implementada 
  // para manter o foco no design (JSX/CSS).
  // Em um projeto real, você usaria um estado para controlar o slide atual
  // ou uma biblioteca como Swiper.js.

  return (
    <section className="testimonials-section">
      <div className="testimonial-header">
        <h3 className="testimonial-subtitle">PROVA SOCIAL</h3>
        <h2 className="testimonial-title">Milhares de condomínios já confiam em nossa solução</h2>
      </div>

      <div className="testimonial-carousel">
        {/* Lógica de Carrossel iria aqui. Mostrando apenas um card para o design. */}
        {/* Em um app real: testimonialsData.map(...) */}
        
        <div className="testimonial-card">
          <FaQuoteLeft className="quote-icon" />
          <p className="testimonial-text">{testimonialsData[0].quote}</p>
          <div className="testimonial-author">
            <img src={testimonialsData[0].image} alt={testimonialsData[0].name} className="author-photo" />
            <div className="author-info">
              <p className="author-name">{testimonialsData[0].name}</p>
              <p className="author-role">{testimonialsData[0].role}</p>
            </div>
          </div>
        </div>
        
        {/* Repetindo mais um card para visualização */}
         <div className="testimonial-card">
          <FaQuoteLeft className="quote-icon" />
          <p className="testimonial-text">{testimonialsData[1].quote}</p>
          <div className="testimonial-author">
            <img src={testimonialsData[1].image} alt={testimonialsData[1].name} className="author-photo" />
            <div className="author-info">
              <p className="author-name">{testimonialsData[1].name}</p>
              <p className="author-role">{testimonialsData[1].role}</p>
            </div>
          </div>
        </div>

      </div>

      <div className="testimonial-navigation">
        <button className="testimonial-nav-button prev">
          <FiChevronLeft size={24} />
        </button>
        <button className="testimonial-nav-button next">
          <FiChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;