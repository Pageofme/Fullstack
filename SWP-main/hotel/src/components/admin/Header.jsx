import React from 'react';
import HeaderLogo from './Header-logo';
import HeaderUser from './Header-user';

const Header = ({ onToggleSidebar, isOpen }) => {
  return (
    <div className="admin_header">
      <button onClick={onToggleSidebar} className="toggle-btn">
        ☰
        <a className="mobile_btn" id="mobile_btn">
          <i className="fas fa-bars"></i>
        </a>
      </button>
      <HeaderLogo isSidebarOpen={isOpen} />

      <HeaderUser />
    </div>
  );
};

export default Header;