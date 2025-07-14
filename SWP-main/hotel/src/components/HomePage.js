import React, { useState, useEffect, useRef } from 'react';
import homeSliderImg from '../assets/images/home_slider.jpg';
import '../assets/styles/responsive.css';
import '../assets/styles/HomePage.css';
import '../assets/styles/Search.css';
import { useNavigate, useLocation } from 'react-router-dom';


const slides = [
  {
    title1: 'Homestays',
    title2: 'in Viet Nam'
  },
];

const tabs = [
  { id: 'nhà', icon: 'fas fa-home', label: 'Nhà' },
  { id: 'trải nghiệm', icon: 'fas fa-hiking', label: 'Trải nghiệm' },
  { id: 'dịch vụ', icon: 'fas fa-concierge-bell', label: 'Dịch vụ' },
];

const services = [
  { value: 'Chụp ảnh', icon: 'fas fa-camera' },
  { value: 'Đầu bếp', icon: 'fas fa-utensils' },
  { value: 'Đồ ăn chuẩn bị sẵn', icon: 'fas fa-concierge-bell' },
  { value: 'Massage', icon: 'fas fa-spa' },
  { value: 'Đào tạo', icon: 'fas fa-chalkboard-teacher' },
  { value: 'Trang điểm', icon: 'fas fa-magic' },
  { value: 'Làm tóc', icon: 'fas fa-cut' },
  { value: 'Chăm sóc spa', icon: 'fas fa-hot-tub' },
  { value: 'Dịch vụ ăn uống', icon: 'fas fa-hamburger' },
  { value: 'Làm móng', icon: 'fas fa-hand-paper' },
];

const HomeSlider = () => {
  return (
    <div className="home">
      <div className="home_slider_container">
        <div className="home_slider owl-carousel owl-theme">
          {slides.map((slide, index) => (
            <div className="owl-item home_slider_item" key={index}>
              <div
                className="home_slider_background"
                style={{ backgroundImage: `url(${homeSliderImg})` }}
              ></div>
              <div className="home_slider_content text-center">
                <div
                  className="home_slider_content_inner"
                  data-animation-in="flipInX"
                  data-animation-out="animate-out fadeOut"
                >
                  <h1>{slide.title1}</h1>
                  <h1>{slide.title2}</h1>
                  <div className="button home_slider_button">
                    <div className="button_bcg"></div>
                    <a href="#">
                      explore now<span></span><span></span><span></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="home_slider_dots">
          <ul id="home_slider_custom_dots" className="home_slider_custom_dots">
            <li className="home_slider_custom_dot active">
              <div></div>01.
            </li>
            <li className="home_slider_custom_dot">
              <div></div>02.
            </li>
            <li className="home_slider_custom_dot">
              <div></div>03.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Search = () => {
  
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const serviceInputRef = useRef(null);
  const serviceOptionsRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();


  const getActiveTabFromUrl = () => {
    if (location.pathname.includes('/experience')) return 'trải nghiệm';
    if (location.pathname.includes('/service')) return 'dịch vụ';
    return 'nhà'; // Mặc định
  };

  const [activeTab, setActiveTab] = useState(getActiveTabFromUrl());

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    // Chuyển trang tương ứng
    switch(tabId) {
      case 'trải nghiệm':
        navigate('/experience');
        break;
      case 'dịch vụ':
        navigate('/service');
        break;
      default:
        navigate('/');
    }
  };

  // Đồng bộ tab khi URL thay đổi
  useEffect(() => {
    setActiveTab(getActiveTabFromUrl());
  }, [location.pathname]);



  const handleServiceInputClick = () => {
    setServiceDropdownOpen(true);
  };

  const handleServiceOptionClick = (value) => {
    if (serviceInputRef.current) {
      serviceInputRef.current.value = value;
    }
    setServiceDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        serviceInputRef.current &&
        serviceOptionsRef.current &&
        !serviceInputRef.current.contains(event.target) &&
        !serviceOptionsRef.current.contains(event.target)
      ) {
        setServiceDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="search">
      <div className="search_container">
        <div className="search_tabs_container">
          <ul className="search_tabs">
            {tabs.map((tab, index) => (
              <li
                key={tab.id}
                className={`search_tab ${index === 0 ? 'first' : ''} ${
                  index === tabs.length - 1 ? 'last' : ''
                } ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabClick(tab.id)}
              >
                <div>
                  <i className={`${tab.icon} search-tab-icon`}></i>
                  {tab.label}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="search_panels">
          {/* Search Panel for Nhà */}
          <div className={`search_panel ${activeTab === 'nhà' ? 'active' : ''}`}>
            <div className="search_panel_content">
              <div className="search_item">
                <div>Địa điểm</div>
                <input
                  type="text"
                  className="search_input destination"
                  placeholder="Tìm kiếm địa điểm"
                  required
                />
              </div>
              <div className="search_item">
                <div>Check in</div>
                <input
                  type="date"
                  className="search_input check_in"
                  placeholder="YYYY-MM-DD"
                />
              </div>
              <div className="search_item">
                <div>Check out</div>
                <input
                  type="date"
                  className="search_input check_out"
                  placeholder="YYYY-MM-DD"
                />
              </div>
              <div className="search_item">
                <div>Adults</div>
                <select name="adults" className="search_input dropdown_item_select">
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                </select>
              </div>
              <div className="search_item">
                <div>Children</div>
                <select name="children" className="search_input dropdown_item_select">
                  <option>0</option>
                  <option>02</option>
                  <option>03</option>
                </select>
              </div>
              <div className="button search_button">
                <div className="button_bcg"></div>
                <a href="#">
                  search<span></span><span></span><span></span>
                </a>
              </div>
            </div>
          </div>

          {/* Search Panel for Trải nghiệm */}
          <div className={`search_panel ${activeTab === 'trải nghiệm' ? 'active' : ''}`}>
            <div className="search_panel_content">
              <div className="search_item">
                <div>Địa điểm</div>
                <input
                  type="text"
                  className="search_input destination"
                  placeholder="Tìm kiếm địa điểm"
                  required
                />
              </div>
              <div className="search_item">
                <div>Ngày</div>
                <input
                  type="date"
                  className="search_input"
                  placeholder="Chọn ngày"
                />
              </div>
              <div className="search_item">
                <div>Adults</div>
                <select name="adults" className="search_input dropdown_item_select">
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                </select>
              </div>
              <div className="search_item">
                <div>Children</div>
                <select name="children" className="search_input dropdown_item_select">
                  <option>0</option>
                  <option>02</option>
                  <option>03</option>
                </select>
              </div>
              <div className="button search_button">
                <div className="button_bcg"></div>
                <a href="#">
                  search<span></span><span></span><span></span>
                </a>
              </div>
            </div>
          </div>

          {/* Search Panel for Dịch vụ */}
          <div className={`search_panel ${activeTab === 'dịch vụ' ? 'active' : ''}`}>
            <div className="search_panel_content">
              <div className="search_item">
                <div>Địa điểm</div>
                <input
                  type="text"
                  className="search_input destination"
                  placeholder="Tìm kiếm địa điểm"
                  required
                />
              </div>
              <div className="search_item">
                <div>Ngày</div>
                <input
                  type="date"
                  className="search_input"
                  placeholder="Chọn ngày"
                />
              </div>
              <div className="search_item">
                <div>Dịch vụ</div>
                <div className="service-selector">
                  <input
                    type="text"
                    ref={serviceInputRef}
                    className="search_input form-control"
                    placeholder="Tìm kiếm dịch vụ"
                    onClick={handleServiceInputClick}
                    readOnly
                  />
                  <ul
                    id="service_options"
                    ref={serviceOptionsRef}
                    className={`dropdown-menu ${serviceDropdownOpen ? 'show' : ''}`}
                  >
                    {services.map((service) => (
                      <li
                        key={service.value}
                        className="service-option"
                        onClick={() => handleServiceOptionClick(service.value)}
                      >
                        <i className={service.icon}></i> {service.value}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="button search_button">
                <div className="button_bcg"></div>
                <a href="#">
                  search<span></span><span></span><span></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div>
      <HomeSlider />
      <Search />
    </div>
  );
};

export default HomePage;