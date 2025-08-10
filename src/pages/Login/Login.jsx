import React, { useState } from 'react';
import { FiLogIn, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulação de requisição de login
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login attempt with:', { email, password, rememberMe });
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Cabeçalho */}
        <div className="login-header">
          <img 
            src="/img/condolog-dark.png" 
            alt="CondoLog" 
            className="login-logo"
            width="180"
            height="40"
          />
          <h1 className="login-title">Acesse sua conta</h1>
          <p className="login-subtitle">Gerencie seu condomínio com praticidade e segurança</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-input-group">
            <label htmlFor="email" className="login-label">E-mail</label>
            <div className="login-input-wrapper">
              <FiMail className="login-input-icon" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="login-input"
                required
                autoFocus
              />
            </div>
          </div>

          <div className="login-input-group">
            <label htmlFor="password" className="login-label">Senha</label>
            <div className="login-input-wrapper">
              <FiLock className="login-input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                className="login-input"
                required
                minLength="6"
              />
              <button 
                type="button" 
                className="login-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className="login-options">
            <label className="login-remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Manter conectado</span>
            </label>
            <a href="/recuperar-senha" className="login-forgot-password">Esqueceu sua senha?</a>
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="login-spinner"></span>
            ) : (
              <>
                <span>Acessar minha conta</span>
                <FiLogIn className="login-button-icon" />
              </>
            )}
          </button>
        </form>

        {/* Rodapé */}
        <div className="login-footer">
          <p className="login-footer-text">
            Novo no CondoLog? <a href="/cadastro" className="login-footer-link">Crie sua conta</a>
          </p>
          <p className="login-footer-help">
            Precisa de ajuda? <a href="/suporte" className="login-footer-link">Fale com nosso time</a>
          </p>
        </div>
      </div>

      {/* Versão mobile */}
      <div className="login-mobile-footer">
        <p>© {new Date().getFullYear()} CondoLog. Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

export default Login;