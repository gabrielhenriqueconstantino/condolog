import React, { useState } from 'react';
import './Sidebar.css'
import { 
  FiBox,          // encomendas
  FiClipboard,    // logs/registro
  FiDatabase,     // dados gerais
  FiUsers,        // moradores
  FiMessageSquare,// mensagens
  FiSettings,     // configurações
  FiChevronLeft,
  FiMenu
} from 'react-icons/fi';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');

  const menuItems = [
    { name: 'Cadastrar/Entregar', icon: <FiBox /> },
    { name: 'Logs de retirada', icon: <FiClipboard /> },
    { name: 'Dados', icon: <FiDatabase /> },
    { name: 'Moradores', icon: <FiUsers /> },
    { name: 'Mensagens', icon: <FiMessageSquare /> },
    { name: 'Configurações', icon: <FiSettings /> }
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && <h2>Dashboard</h2>}
        <button onClick={toggleSidebar} className="toggle-btn">
          {collapsed ? <FiMenu /> : <FiChevronLeft />}
        </button>
      </div>
      
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <div 
            key={item.name}
            className={`menu-item ${activeItem === item.name ? 'active' : ''}`}
            onClick={() => setActiveItem(item.name)}
          >
            <span className="menu-icon">{item.icon}</span>
            {!collapsed && <span className="menu-text">{item.name}</span>}
          </div>
        ))}
      </nav>
      
      {!collapsed && (
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">JD</div>
            <div className="user-info">
              <div className="user-name">John Doe</div>
              <div className="user-role">Admin</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;