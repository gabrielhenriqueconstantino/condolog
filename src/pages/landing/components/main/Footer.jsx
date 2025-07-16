import React from 'react';
import '../../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Coluna 1 - Logo e descrição */}
        <div className="footer-col">
          <img src="/img/condolog.png" alt="CondoLog" className="footer-logo" />
          <p className="footer-description">
            O CondoLog é um sistema moderno para gestão de encomendas em condomínios. Praticidade para a portaria, segurança para os moradores.
          </p>
        </div>

        {/* Coluna 2 - Links úteis */}
        <div className="footer-col">
          <h4>Institucional</h4>
          <ul>
            <li><a href="/">Sobre nós</a></li>
            <li><a href="/">Funcionalidades</a></li>
            <li><a href="/">Contato</a></li>
            <li><a href="/">Política de privacidade</a></li>
          </ul>
        </div>

        {/* Coluna 3 - Suporte */}
        <div className="footer-col">
          <h4>Suporte</h4>
          <ul>
            <li><a href="/">Central de ajuda</a></li>
            <li><a href="/">Perguntas frequentes</a></li>
            <li><a href="/">Fale com a equipe</a></li>
          </ul>
        </div>

        {/* Coluna 4 - Contato */}
        <div className="footer-col">
          <h4>Contato</h4>
          <ul>
            <li>Email: suporte@condolog.com</li>
            <li>WhatsApp: (11) 99999-9999</li>
            <li>Atendimento: Seg a Sex, 9h às 18h</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CondoLog. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
