import React from 'react';

const HeaderLogo = ({ isSidebarOpen }) => {
    return (
        <div
            className={`admin_header-left ${!isSidebarOpen ? "move-to-center" : "move-to-left"}`}  // Kiểm tra trạng thái sidebar
        >
            <a href="img/logo1.jpg" className="logo text-decoratin" style={{ textDecoration: "none" }}>
                <img src="img/logo1.jpg" width="50" height="70" alt="logo" />
                <span className="logoclass">TRAEXCO</span>
            </a>

        </div>
    );
};

export default HeaderLogo;