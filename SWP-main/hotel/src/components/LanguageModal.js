
import '../assets/styles/LanguageModal.css';
import React, { useEffect, useRef, useState } from "react";

const LanguageModal = ({ onSelect, onClose }) => {
    const modalRef = useRef(null);

    const languages = [
      { code: 'EN', name: 'English', flag: '🇬🇧' },
      { code: 'VI', name: 'Tiếng Việt', flag: '🇻🇳' },
      { code: 'JA', name: '日本語', flag: '🇯🇵' },
      { code: 'KO', name: '한국어', flag: '🇰🇷' },
      { code: 'FR', name: 'Français', flag: '🇫🇷' },
      { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
      { code: 'ES', name: 'Español', flag: '🇪🇸' },
      { code: 'ZH', name: '中文', flag: '🇨🇳' },
    ];
  
    const recommended = languages.slice(0, 4);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          onClose();
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [onClose]);
  
    return (
      <div className="language_modal">
        <div className="language_modal_overlay"></div>
        <div className="language_modal_content" ref={modalRef}>
          <div className="language_modal_header">
            <h5>Chọn ngôn ngữ của bạn</h5>
            <span className="close_btn" onClick={onClose}>&times;</span>
          </div>
  
          <div className="language_section">
            <h6>Được đề xuất cho bạn</h6>
            <div className="language_grid">
              {recommended.map((lang) => (
                <div
                  key={lang.code}
                  className="language_option_box"
                  onClick={() => {
                    onSelect(lang.code);
                    onClose();
                  }}
                >
                  <span className="flag">{lang.flag}</span>
                  <span>{lang.name}</span>
                </div>
              ))}
            </div>
          </div>
  
          <div className="language_section">
            <h6>Tất cả ngôn ngữ</h6>
            <div className="language_grid">
              {languages.map((lang) => (
                <div
                  key={lang.code}
                  className="language_option_box"
                  onClick={() => {
                    onSelect(lang.code);
                    onClose();
                  }}
                >
                  <span className="flag">{lang.flag}</span>
                  <span>{lang.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default LanguageModal;
