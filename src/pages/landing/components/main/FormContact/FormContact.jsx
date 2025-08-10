import React, { useState } from "react";
import "./FormContact.css";
import { FiCheckCircle, FiClock, FiHeadphones, FiDollarSign, FiHelpCircle } from "react-icons/fi";

const FormContact = () => {
  const [formData, setFormData] = useState({
    email: '',
    nome: '',
    whatsapp: '',
    motivo: '',
    mensagem: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de envio do formulário
    console.log('Formulário enviado:', formData);
  };

  return (
    <section className="contact-form-section">
      <div className="contact-form-container">
        {/* Seção Esquerda - Formulário */}
        <div className="contact-form-content">
          <header className="form-header">
            <h2 className="form-title">Transforme a gestão das suas encomendas hoje mesmo</h2>
            <p className="form-subtitle">
              Preencha o formulário e <strong>agende uma demonstração personalizada</strong> com um de nossos especialistas
            </p>
          </header>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="nome" className="form-label">
                Seu nome completo*
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="Como gostaria de ser chamado"
                className="form-input"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Seu melhor e-mail corporativo*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="exemplo@condominio.com.br"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="whatsapp" className="form-label">
                WhatsApp para contato*
              </label>
              <div className="phone-input-group">
                <span className="country-code">+55</span>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  placeholder="(00) 00000-0000"
                  className="form-input"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Como podemos ajudar seu condomínio?*
              </label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="motivo"
                    value="demonstracao"
                    checked={formData.motivo === 'demonstracao'}
                    onChange={handleChange}
                    required
                  />
                  <div className="radio-content">
                    <FiCheckCircle className="radio-icon" />
                    <div>
                      <span className="radio-title">Demonstração do sistema</span>
                      <span className="radio-description">Quero ver na prática como o CondoLog funciona</span>
                    </div>
                  </div>
                </label>

                <label className="radio-option">
                  <input
                    type="radio"
                    name="motivo"
                    value="orcamento"
                    checked={formData.motivo === 'orcamento'}
                    onChange={handleChange}
                  />
                  <div className="radio-content">
                    <FiDollarSign className="radio-icon" />
                    <div>
                      <span className="radio-title">Solicitar orçamento</span>
                      <span className="radio-description">Quero conhecer os planos e valores</span>
                    </div>
                  </div>
                </label>

                <label className="radio-option">
                  <input
                    type="radio"
                    name="motivo"
                    value="suporte"
                    checked={formData.motivo === 'suporte'}
                    onChange={handleChange}
                  />
                  <div className="radio-content">
                    <FiHeadphones className="radio-icon" />
                    <div>
                      <span className="radio-title">Suporte técnico</span>
                      <span className="radio-description">Sou cliente e preciso de ajuda</span>
                    </div>
                  </div>
                </label>

                <label className="radio-option">
                  <input
                    type="radio"
                    name="motivo"
                    value="outro"
                    checked={formData.motivo === 'outro'}
                    onChange={handleChange}
                  />
                  <div className="radio-content">
                    <FiHelpCircle className="radio-icon" />
                    <div>
                      <span className="radio-title">Outro assunto</span>
                      <span className="radio-description">Tenho uma dúvida específica</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {formData.motivo === 'outro' && (
              <div className="form-group">
                <label htmlFor="mensagem" className="form-label">
                  Nos conte como podemos ajudar*
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  placeholder="Descreva brevemente sua necessidade..."
                  className="form-textarea"
                  value={formData.mensagem}
                  onChange={handleChange}
                  rows="3"
                  required={formData.motivo === 'outro'}
                />
              </div>
            )}

            <button type="submit" className="submit-button">
              <span>Agendar demonstração gratuita</span>
              <FiClock className="button-icon" />
            </button>

            <p className="form-disclaimer">
              Ao enviar, você concorda com nossa <a href="/politica-de-privacidade">Política de Privacidade</a>. 
              Prometemos não enviar spam.
            </p>
          </form>
        </div>

        {/* Seção Direita - Benefícios */}
        <div className="contact-benefits">
          <div className="benefits-content">
            <h3 className="benefits-title">O que você ganha com esta demonstração:</h3>
            
            <ul className="benefits-list">
              <li className="benefit-item">
                <div className="benefit-icon">✓</div>
                <div>
                  <h4>Análise personalizada</h4>
                  <p>Soluções específicas para as necessidades do seu condomínio</p>
                </div>
              </li>
              
              <li className="benefit-item">
                <div className="benefit-icon">✓</div>
                <div>
                  <h4>Sem compromisso</h4>
                  <p>Demonstração gratuita e sem obrigação de contratação</p>
                </div>
              </li>
              
              <li className="benefit-item">
                <div className="benefit-icon">✓</div>
                <div>
                  <h4>Economia imediata</h4>
                  <p>Veja como reduzir custos operacionais já nos primeiros meses</p>
                </div>
              </li>
              
              <li className="benefit-item">
                <div className="benefit-icon">✓</div>
                <div>
                  <h4>Material exclusivo</h4>
                  <p>Receba um guia com melhores práticas para gestão de condomínios</p>
                </div>
              </li>
            </ul>

            <div className="benefits-testimonial">
              <div className="testimonial-content">
                <p>"O CondoLog reduziu em 70% os problemas com encomendas no nosso condomínio. A implementação foi rápida e o suporte excelente!"</p>
                <div className="testimonial-author">
                  <span className="author-name">Carlos Silva</span>
                  <span className="author-role">Síndico, Residencial Green Valley</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormContact;