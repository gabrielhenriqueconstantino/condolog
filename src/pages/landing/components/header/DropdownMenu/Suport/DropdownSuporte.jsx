import React, { useState, useEffect, useRef } from "react";
import './DropdownSuporte.css';
import { 
  FaHeadset, 
  FaBook, 
  FaVideo, 
  FaWhatsapp,
  FaEnvelope,
  FaQuestionCircle,
  FaComments,
  FaChevronRight,
  FaChevronDown
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const DropdownSuporte = ({ mobile, closeMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [activePanel, setActivePanel] = useState(null);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(timeoutRef.current);
    };
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (!mobile) {
      clearTimeout(timeoutRef.current);
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!mobile) {
      timeoutRef.current = setTimeout(() => {
        closeDropdown();
      }, 300);
    }
  };

  const closeDropdown = () => {
    setIsOpen(false);
    setActivePanel(null);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setActivePanel(null);
    }
  };

  const handleItemClick = () => {
    if (mobile) {
      closeMenu();
    }
  };

  // Animations
  const panelVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.15,
        ease: "easeIn"
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    }),
    exit: {
      opacity: 0,
      transition: {
        duration: 0.1
      }
    }
  };

  return (
    <div
      className={`suporte-dropdown ${mobile ? 'mobile' : ''}`}
      ref={dropdownRef}
      onMouseEnter={!mobile ? handleMouseEnter : undefined}
      onMouseLeave={!mobile ? handleMouseLeave : undefined}
    >
      <button 
        className="suporte-dropdown-toggle"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Suporte 
        <span className="suporte-chevron">
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <FaChevronDown className="suporte-chevron-icon" />
          </motion.span>
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="suporte-dropdown-panel"
            onMouseEnter={!mobile ? handleMouseEnter : undefined}
            onMouseLeave={!mobile ? handleMouseLeave : undefined}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariants}
          >
            {/* Speech Bubble Triangle */}
            {!mobile && (
              <div className="suporte-speech-bubble" />
            )}

            <div className="suporte-main-panel">
              <div className="suporte-column">
                <span className="suporte-column-title">CANAIS DE ATENDIMENTO</span>
                <ul>
                  {[
                    { icon: FaWhatsapp, title: "Chat Online", desc: "Atendimento instantâneo via WhatsApp", className: "suporte-whatsapp" },
                    { icon: FaHeadset, title: "Central de Relacionamento", desc: "(11) 4002-8922" },
                    { icon: FaEnvelope, title: "E-mail", desc: "suporte@condolog.com.br" }
                  ].map((item, i) => (
                    <motion.li 
                      key={i}
                      custom={i}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className={item.className}
                      onClick={handleItemClick}
                    >
                      <div className="suporte-icon-container">
                        <item.icon className="suporte-feature-icon" />
                      </div>
                      <div className="suporte-content">
                        <strong>{item.title}</strong>
                        <span>{item.desc}</span>
                      </div>
                      {mobile && <FaChevronRight className="suporte-arrow-right" />}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="suporte-column">
                <span className="suporte-column-title">RECURSOS DE AJUDA</span>
                <ul>
                  {[
                    { icon: FaBook, title: "Base de Conhecimento", desc: "Tutoriais e artigos explicativos" },
                    { icon: FaVideo, title: "Vídeo Aulas", desc: "Guia visual para usar a plataforma" },
                    { icon: FaQuestionCircle, title: "FAQ", desc: "Perguntas frequentes" },
                    { icon: FaComments, title: "Fórum da Comunidade", desc: "Tire dúvidas com outros usuários" }
                  ].map((item, i) => (
                    <motion.li 
                      key={i}
                      custom={i + 3}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      onClick={handleItemClick}
                    >
                      <div className="suporte-icon-container">
                        <item.icon className="suporte-feature-icon" />
                      </div>
                      <div className="suporte-content">
                        <strong>{item.title}</strong>
                        <span>{item.desc}</span>
                      </div>
                      {mobile && <FaChevronRight className="suporte-arrow-right" />}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownSuporte;