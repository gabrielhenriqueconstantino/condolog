import React, { useState, useEffect, useRef } from "react";
import './DropdownSolutions.css';
import { 
  FaFileInvoice, 
  FaClipboardList, 
  FaMoneyCheckAlt, 
  FaEnvelope, 
  FaTools, 
  FaTh, 
  FaBrain,
  FaChevronRight,
  FaChevronDown
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const DropdownSolutions = ({ mobile, closeMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const subPanelVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      x: 50,
      transition: {
        duration: 0.15
      }
    }
  };

  return (
    <div
      className={`dropdown ${mobile ? 'mobile' : ''}`}
      ref={dropdownRef}
      onMouseEnter={!mobile ? handleMouseEnter : undefined}
      onMouseLeave={!mobile ? handleMouseLeave : undefined}
    >
      <button 
        className="dropdown-toggle"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Soluções 
        <span className="chevron">
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <FaChevronDown className="chevron-icon" />
          </motion.span>
        </span>
      </button>

      <AnimatePresence>
        {(isOpen || activePanel) && (
          <motion.div 
            className={`dropdown-panel${activePanel ? ' subpanel-open' : ''}`}
            onMouseEnter={!mobile ? handleMouseEnter : undefined}
            onMouseLeave={!mobile ? handleMouseLeave : undefined}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariants}
          >
            {/* Speech Bubble Triangle */}
            {!mobile && (
              <div className="speech-bubble-triangle" />
            )}

            {/* Main Panel */}
            {!activePanel && (
              <motion.div 
                className="dropdown-main-panel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="dropdown-column">
                  <span className="column-title">FUNCIONALIDADES</span>
                  <ul>
                    {[
                      { icon: FaFileInvoice, title: "Boletos", desc: "Emissão de boletos automática", panel: 'boletos' },
                      { icon: FaClipboardList, title: "Relatórios", desc: "Prestação de contas rápida", panel: 'relatorios' },
                      { icon: FaMoneyCheckAlt, title: "Controle de Inadimplência", desc: "Painel de controle completo" },
                      { icon: FaEnvelope, title: "Avisos automáticos", desc: "Notificações instantâneas" },
                      { icon: FaTools, title: "Manutenções", desc: "Agenda de manutenções" },
                      { icon: FaTh, title: "Ver tudo", desc: "Descubra a Condolog", className: "see-all" }
                    ].map((item, i) => (
                      <motion.li 
                        key={i}
                        custom={i}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className={item.className}
                        onClick={() => item.panel && mobile ? setActivePanel(item.panel) : handleItemClick()}
                      >
                        <div className="icon-container">
                          <item.icon className="dropdown-icon" />
                        </div>
                        <div className="item-content">
                          <strong>{item.title}</strong>
                          <span>{item.desc}</span>
                        </div>
                        {mobile && item.panel && <FaChevronRight className="arrow-right" />}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="dropdown-column">
                  <span className="column-title">NOVIDADES</span>
                  <ul>
                    {[
                      { icon: FaClipboardList, title: "Previsão orçamentária" },
                      { icon: FaMoneyCheckAlt, title: "Conciliação bancária" },
                      { icon: FaBrain, title: "Móra – IA do condomínio" }
                    ].map((item, i) => (
                      <motion.li 
                        key={i}
                        custom={i + 6}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        onClick={handleItemClick}
                      >
                        <div className="icon-container">
                          <item.icon className="dropdown-icon" />
                        </div>
                        <div className="item-content">
                          <strong>{item.title}</strong>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Mobile Subpanels */}
            {mobile && (
              <AnimatePresence>
                {activePanel === 'boletos' && (
                  <motion.div 
                    className="dropdown-subpanel"
                    variants={subPanelVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <button className="back-button" onClick={() => setActivePanel(null)}>
                      ← Voltar
                    </button>
                    <h3 className="subpanel-title">Boletos</h3>
                    <ul>
                      {["Emissão automática", "Configuração de bancos", "Histórico de cobranças", "Personalização de modelos"].map((item, i) => (
                        <motion.li 
                          key={i}
                          custom={i}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          onClick={handleItemClick}
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {activePanel === 'relatorios' && (
                  <motion.div 
                    className="dropdown-subpanel"
                    variants={subPanelVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <button className="back-button" onClick={() => setActivePanel(null)}>
                      ← Voltar
                    </button>
                    <h3 className="subpanel-title">Relatórios</h3>
                    <ul>
                      {["Financeiro mensal", "Prestação de contas", "Personalização", "Exportação para Excel"].map((item, i) => (
                        <motion.li 
                          key={i}
                          custom={i}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          onClick={handleItemClick}
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownSolutions;