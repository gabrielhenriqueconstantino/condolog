import React from 'react';
import './Footer.css';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiClock } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Seção Principal */}
        <div className="footer-main">
          {/* Coluna 1 - Logo e sobre */}
          <div className="footer-col footer-about">
            <img 
              src="/img/condolog-white.png" 
              alt="CondoLog - Sistema de Gestão de Encomendas para Condomínios" 
              className="footer-logo"
              width="180"
              height="40"
              loading="lazy"
            />
            <p className="footer-description">
              O sistema completo para gestão de encomendas em condomínios. 
              Praticidade para a portaria, segurança e transparência para os moradores.
            </p>
            
            <div className="footer-social">
              <a href="https://facebook.com/condolog" aria-label="Facebook" className="social-link">
                <FiFacebook size={18} />
              </a>
              <a href="https://twitter.com/condolog" aria-label="Twitter" className="social-link">
                <FiTwitter size={18} />
              </a>
              <a href="https://instagram.com/condolog" aria-label="Instagram" className="social-link">
                <FiInstagram size={18} />
              </a>
              <a href="https://linkedin.com/company/condolog" aria-label="LinkedIn" className="social-link">
                <FiLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Coluna 2 - Links rápidos */}
          <div className="footer-col">
            <h4 className="footer-title">CondoLog</h4>
            <ul className="footer-links">
              <li><a href="/sobre" className="footer-link">Sobre nós</a></li>
              <li><a href="/funcionalidades" className="footer-link">Funcionalidades</a></li>
              <li><a href="/planos" className="footer-link">Planos</a></li>
              <li><a href="/blog" className="footer-link">Blog</a></li>
              <li><a href="/cases" className="footer-link">Cases de sucesso</a></li>
            </ul>
          </div>

          {/* Coluna 3 - Suporte */}
          <div className="footer-col">
            <h4 className="footer-title">Suporte</h4>
            <ul className="footer-links">
              <li><a href="/ajuda" className="footer-link">Central de ajuda</a></li>
              <li><a href="/faq" className="footer-link">Perguntas frequentes</a></li>
              <li><a href="/tutoriais" className="footer-link">Tutoriais</a></li>
              <li><a href="/contato" className="footer-link">Fale conosco</a></li>
              <li><a href="/politica-de-privacidade" className="footer-link">Política de privacidade</a></li>
            </ul>
          </div>

          {/* Coluna 4 - Contato */}
          <div className="footer-col footer-contact">
            <h4 className="footer-title">Contato</h4>
            <ul className="footer-contact-info">
              <li>
                <FiMail className="contact-icon" />
                <a href="mailto:suporte@condolog.com.br">suporte@condolog.com.br</a>
              </li>
              <li>
                <FaWhatsapp className="contact-icon" />
                <a href="https://wa.me/5511999999999">(11) 99999-9999</a>
              </li>
              <li>
                <FiPhone className="contact-icon" />
                <a href="tel:+551130041234">(11) 3004-1234</a>
              </li>
              <li>
                <FiClock className="contact-icon" />
                Segunda a Sexta, 9h às 18h
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer-newsletter">
          <h4 className="newsletter-title">Receba nossas atualizações</h4>
          <form className="newsletter-form">
            <input 
              type="email" 
              placeholder="Seu melhor e-mail" 
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-button">
              Assinar
            </button>
          </form>
          <p className="newsletter-disclaimer">
            Ao assinar, você concorda com nossos Termos e Política de Privacidade.
          </p>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="copyright">
            © {new Date().getFullYear()} CondoLog Tecnologia Ltda. CNPJ: 12.345.678/0001-99. Todos os direitos reservados.
          </p>
          
          <div className="footer-payments">
            <span>Métodos de pagamento:</span>
            <div className="payment-methods">
              <img src="/img/payments/visa.svg" alt="Visa" width="40" height="25" loading="lazy" />
              <img src="/img/payments/mastercard.svg" alt="Mastercard" width="40" height="25" loading="lazy" />
              <img src="/img/payments/amex.svg" alt="American Express" width="40" height="25" loading="lazy" />
              <img src="/img/payments/boleto.svg" alt="Boleto" width="40" height="25" loading="lazy" />
              <img src="/img/payments/pix.svg" alt="PIX" width="40" height="25" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;