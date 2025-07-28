import React, { useState } from 'react';
import '../styles/Sidebar.css'
import { 
  FiHome, 
  FiPieChart, 
  FiUsers, 
  FiSettings, 
  FiMail, 
  FiCalendar,
  FiChevronLeft,
  FiMenu
} from 'react-icons/fi';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: <FiHome /> },
    { name: 'Analytics', icon: <FiPieChart /> },
    { name: 'Users', icon: <FiUsers /> },
    { name: 'Messages', icon: <FiMail /> },
    { name: 'Calendar', icon: <FiCalendar /> },
    { name: 'Settings', icon: <FiSettings /> }
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