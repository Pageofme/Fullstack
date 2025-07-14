// Header.js
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/responsive.css';
import '../assets/styles/Header.css';
import logo from '../assets/images/logo.png';
import '@fortawesome/fontawesome-free/css/all.css';
import LanguageSelectorModal from './LanguageModal';
import AuthModal from './LoginSignupForm';
import axios from 'axios';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const navigate = useNavigate();
  const userDropdownRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      console.log('Header - Token:', token);
      if (token) {
        try {
          const response = await axios.get('http://localhost:8080/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log('Header - User data:', response.data);
          setUser({ fullName: response.data.fullName || response.data.email.split('@')[0] });
          setUnreadNotifications(3); // Giá trị mẫu, thay bằng API nếu cần
          setUnreadMessages(2); // Giá trị mẫu, thay bằng API nếu cần
        } catch (err) {
          console.error('Header - Error fetching user info:', err.response ? err.response.data : err.message);
          localStorage.removeItem('token');
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    fetchUser();
  }, []); // Loại bỏ dependency localStorage.getItem('token') để tránh lặp vô hạn

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 0 && !isScrolled) {
        setIsScrolled(true);
      } else if (scrollY === 0 && isScrolled) {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (code) => {
    setCurrentLanguage(code);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setUserDropdownOpen(false);
    navigate('/');
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setIsAuthModalOpen(false);
  };

  const getUserInitial = () => {
    return user && user.fullName ? user.fullName.charAt(0).toUpperCase() : '';
  };

  return (
    <div className="super_container" style={{ position: 'relative', zIndex: 1050, background: '#361354' }}>
      <header className={`header ${isMenuOpen ? 'menu-open' : ''} ${isScrolled ? 'scrolled' : ''}`}>
        <nav className="main_nav">
          <div className="container">
            <div className="row">
              <div className="col main_nav_col d-flex flex-row align-items-center justify-content-between">
                <div className="logo_container">
                  <div className="logo">
                    <Link to="/">
                      <img src={logo} alt="TraExCo Logo" />
                      TraExCo
                    </Link>
                  </div>
                </div>
                <div className="main_nav_container d-none d-lg-flex">
                  <ul className="main_nav_list">
                    <li className="main_nav_item"><Link to="/">Home</Link></li>
                    <li className="main_nav_item"><Link to="/about">About Us</Link></li>
                    <li className="main_nav_item"><Link to="/offer">Offers</Link></li>
                    <li className="main_nav_item"><Link to="/news">News</Link></li>
                    <li className="main_nav_item"><Link to="/contact">Contact</Link></li>
                  </ul>
                </div>
                <div className="right_nav d-flex align-items-center">
                  <div className="become_host mr-3">
                    <Link to="/become-host" className="host_btn">
                      <span className="host_text">Trở thành Host</span>
                    </Link>
                  </div>
                  <div className="language_selector mr-3">
                    <div className="language_icon" onClick={() => setIsLanguageModalOpen(true)}>
                      <i className="fas fa-globe"></i>
                    </div>
                  </div>
                  <div className="user_auth">
                    <div
                      className={`user_menu_icon ${user ? 'logged-in' : ''}`}
                      onClick={() => {
                        console.log('Dropdown toggled, userDropdownOpen:', !userDropdownOpen);
                        setUserDropdownOpen(!userDropdownOpen);
                      }}
                      style={user ? {
                        backgroundColor: '#ffa500',
                        color: 'white',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        fontWeight: 'bold',
                      } : {}}
                    >
                      {user ? getUserInitial() : <i className="fas fa-bars"></i>}
                    </div>
                    {userDropdownOpen && (
                      <div className="user_dropdown" ref={userDropdownRef}>
                        {console.log('Rendering dropdown, user:', user)}
                        {user ? (
                          <>
                            <Link to="/profile" className="dropdown_item" onClick={() => setUserDropdownOpen(false)}>
                              <i className="fas fa-user mr-2"></i>{user.fullName}
                            </Link>
                            <Link to="/become-host" className="dropdown_item" onClick={() => setUserDropdownOpen(false)}>
                              <i className="fas fa-home mr-2"></i>Trở thành Host
                            </Link>
                            <Link to="/find-host" className="dropdown_item" onClick={() => setUserDropdownOpen(false)}>
                              <i className="fas fa-search mr-2"></i>Tìm Host
                            </Link>
                            <Link to="/notifications" className="dropdown_item" onClick={() => setUserDropdownOpen(false)}>
                              <i className="fas fa-bell mr-2"></i>Thông báo {unreadNotifications > 0 && <span className="badge">{unreadNotifications}</span>}
                            </Link>
                            <Link to="/messages" className="dropdown_item" onClick={() => setUserDropdownOpen(false)}>
                              <i className="fas fa-envelope mr-2"></i>Tin nhắn {unreadMessages > 0 && <span className="badge">{unreadMessages}</span>}
                            </Link>
                            <div className="dropdown_divider"></div>
                            <a href="#" className="dropdown_item" onClick={handleLogout}>
                              <i className="fas fa-sign-out-alt mr-2"></i>Đăng xuất
                            </a>
                          </>
                        ) : (
                          <>
                            <a href="#" className="dropdown_item" onClick={() => { setIsAuthModalOpen(true); setUserDropdownOpen(false); }}>
                              <i className="fas fa-sign-in-alt mr-2"></i>Đăng nhập hoặc Đăng ký
                            </a>
                            <Link to="/become-host" className="dropdown_item" onClick={() => setUserDropdownOpen(false)}>
                              <i className="fas fa-home mr-2"></i>Trở thành Host
                            </Link>
                            <Link to="/find-host" className="dropdown_item" onClick={() => setUserDropdownOpen(false)}>
                              <i className="fas fa-search mr-2"></i>Tìm Host
                            </Link>
                            <div className="dropdown_divider"></div>
                            <a href="/support" className="dropdown_item" onClick={() => setUserDropdownOpen(false)}>
                              <i className="fas fa-question-circle mr-2"></i>Hỗ trợ
                            </a>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="hamburger ml-3" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <i className="fas fa-bars trans_200"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className={`menu trans_500 ${isMenuOpen ? 'active' : ''}`}>
          <div className="menu_content d-flex flex-column align-items-center justify-content-center text-center">
            <div className="menu_close_container" onClick={() => setIsMenuOpen(false)}>
              <div className="menu_close"></div>
            </div>
            <div className="logo menu_logo">
              <Link to="/">
                <img src={logo} alt="TraExCo Logo" />
              </Link>
            </div>
            <ul id="menuItems">
              <li className="menu_item"><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
              <li className="menu_item"><Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
              <li className="menu_item"><Link to="/offers" onClick={() => setIsMenuOpen(false)}>Offers</Link></li>
              <li className="menu_item"><Link to="/news" onClick={() => setIsMenuOpen(false)}>News</Link></li>
              <li className="menu_item"><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
              {user ? (
                <>
                  <li className="menu_item">
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                      <i className="fas fa-user mr-2"></i>{user.fullName}
                    </Link>
                  </li>
                  <li className="menu_item">
                    <Link to="/notifications" onClick={() => setIsMenuOpen(false)}>
                      <i className="fas fa-bell mr-2"></i>Thông báo {unreadNotifications > 0 && <span className="badge">{unreadNotifications}</span>}
                    </Link>
                  </li>
                  <li className="menu_item">
                    <Link to="/messages" onClick={() => setIsMenuOpen(false)}>
                      <i className="fas fa-envelope mr-2"></i>Tin nhắn {unreadMessages > 0 && <span className="badge">{unreadMessages}</span>}
                    </Link>
                  </li>
                  <li className="menu_item">
                    <a href="#" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                      <i className="fas fa-sign-out-alt mr-2"></i>Đăng xuất
                    </a>
                  </li>
                </>
              ) : (
                <li className="menu_item">
                  <a href="#" onClick={() => { setIsAuthModalOpen(true); setIsMenuOpen(false); }}>
                    <i className="fas fa-sign-in-alt mr-2"></i>Đăng nhập hoặc Đăng ký
                  </a>
                </li>
              )}
              <li className="menu_item">
                <Link to="/become-host" onClick={() => setIsMenuOpen(false)}>
                  <i className="fas fa-home mr-2"></i>Trở thành Host
                </Link>
              </li>
              <li className="menu_item">
                <Link to="/find-host" onClick={() => setIsMenuOpen(false)}>
                  <i className="fas fa-search mr-2"></i>Tìm Host
                </Link>
              </li>
              <li className="menu_item">
                <Link to="/support" onClick={() => setIsMenuOpen(false)}>
                  <i className="fas fa-question-circle mr-2"></i>Hỗ trợ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {isLanguageModalOpen && (
          <LanguageSelectorModal
            onSelect={handleLanguageSelect}
            onClose={() => setIsLanguageModalOpen(false)}
          />
        )}
        {isAuthModalOpen && (
          <AuthModal
            show={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onAuthSuccess={handleAuthSuccess}
          />
        )}
      </header>
    </div>
  );
};

export default Header;