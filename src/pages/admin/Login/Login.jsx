import React, { useState } from "react";
import "./Login.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";

export default function Login() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [dadosLogin, setDadosLogin] = useState({
    email: "",
    senha: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDadosLogin({
      ...dadosLogin,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadosLogin),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      alert("✅ Login realizado com sucesso!");
      // aqui você pode salvar o "estado de login"
      // ex: localStorage.setItem("usuario", JSON.stringify(data));
      
      // redirecionar para o dashboard
      window.location.href = "/dashboard"; 
      // ou, se estiver usando react-router-dom v6:
      // navigate("/dashboard");
    } else {
      alert("❌ " + data.message);
    }
  } catch (error) {
    console.error("Erro ao conectar com o servidor:", error);
    alert("Erro no servidor. Tente novamente.");
  }
};

  return (
    <div className="login-prof-container">
      <div className="login-prof-box">
        <div className="login-prof-header">
          <h2>Bem-vindo(a)</h2>
          <p>Faça login para acessar sua conta</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="login-prof-input-group">
            <span className="login-prof-input-icon"><FaUser /></span>
            <input 
              type="email" 
              name="email"
              placeholder="E-mail" 
              value={dadosLogin.email}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="login-prof-input-group">
            <span className="login-prof-input-icon"><FaLock /></span>
            <input 
              type={mostrarSenha ? "text" : "password"} 
              name="senha"
              placeholder="Senha" 
              value={dadosLogin.senha}
              onChange={handleChange}
              required 
            />
            <span 
              className="login-prof-password-toggle"
              onClick={() => setMostrarSenha(!mostrarSenha)}
            >
              {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          
          <div className="login-prof-options">
            <label className="login-prof-remember">
              <input type="checkbox" />
              <span>Lembrar-me</span>
            </label>
            <a href="/" className="login-prof-forgot">Esqueceu a senha?</a>
          </div>
          
          <button type="submit" className="login-prof-btn">Entrar</button>
        </form>

        <div className="login-prof-divider">
          <span>Ou continue com</span>
        </div>
        
        <div className="login-prof-social">
          <a href="/" className="login-prof-social-btn login-prof-facebook"><FaFacebookF /></a>
          <a href="/" className="login-prof-social-btn login-prof-instagram"><FaInstagram /></a>
          <a href="/" className="login-prof-social-btn login-prof-twitter"><FaTwitter /></a>
        </div>

        <div className="login-prof-signup">
          Não tem uma conta? <a href="/">Cadastre-se</a>
        </div>
      </div>
    </div>
  );
}