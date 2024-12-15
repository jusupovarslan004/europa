import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Header.scss";
import Logo from "../../../assets/images/logo.svg";
import ContactModal from "../../common/Modal/ContactModal";

const languages = [
  { code: "ru", name: "Русский", flag: "/images/flags/ru.svg" },
  { code: "kg", name: "Кыргызча", flag: "/images/flags/kg.svg" },
  { code: "en", name: "English", flag: "/images/flags/us.svg" },
];

const Header = () => {
  const { t, i18n } = useTranslation();
  const languageSelectorRef = useRef(null);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(() => {
    const saved = localStorage.getItem("language");
    const initial = languages.find((lang) => lang.code === saved);
    return initial || languages[0];
  });
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Закрываем меню при изменении ма��шрута
  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  // Блокируем скролл при открытом меню
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  // Добавляем обработчик клика вне селектора
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLangOpen && !event.target.closest('.language-selector')) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isLangOpen]);

  const scrollToFooter = (e) => {
    e.preventDefault();
    const footer = document.querySelector(".footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
    i18n.changeLanguage(lang.code);
    localStorage.setItem("language", lang.code);
    setIsLangOpen(false);
  };

  const renderLanguageSelector = () => (
    <div className="language-selector" ref={languageSelectorRef}>
      <button
        className="language-selector__current"
        onClick={() => setIsLangOpen(!isLangOpen)}
      >
        <img
          src={currentLang.flag}
          alt={currentLang.code}
          className="language-selector__flag"
        />
        <span>{currentLang.name}</span>
        <svg
          className={`language-selector__arrow ${isLangOpen ? "open" : ""}`}
          width="10"
          height="6"
          viewBox="0 0 10 6"
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      <div
        className={`language-selector__dropdown ${isLangOpen ? "show" : ""}`}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            className="language-selector__option"
            onClick={() => handleLanguageChange(lang)}
          >
            <img
              src={lang.flag}
              alt={lang.code}
              className="language-selector__flag"
            />
            <span>{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="header__logo">
          <img src={Logo} alt="Together recruitment" />
        </Link>

        {/* Бургер кнопка */}
        <button
          className={`header__burger ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Мобильное меню */}
        <div className={`header__mobile-overlay ${isMenuOpen ? "active" : ""}`}>
          <div className={`header__mobile-menu ${isMenuOpen ? "active" : ""}`}>
            <nav className="header__nav">
              <Link to="/about">{t("header.about")}</Link>
              <Link to="/vacancies">{t("header.vacancies")}</Link>
              <a href="#" onClick={scrollToFooter}>
                {t("header.contacts")}
              </a>
              <Link to="/partners">{t("header.partners")}</Link>
            </nav>

            <div className="header__actions header__actions--mobile">
              {renderLanguageSelector()}
              <button
                className="button button--primary"
                onClick={() => {
                  setIsModalOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                {t("header.submitRequest")}
              </button>
            </div>
          </div>
        </div>

        {/* Десктопное меню */}
        <div className="header__desktop">
          <nav className="header__nav">
            <Link to="/about">{t("header.about")}</Link>
            <Link to="/vacancies">{t("header.vacancies")}</Link>
            <a href="#" onClick={scrollToFooter}>
              {t("header.contacts")}
            </a>
            <Link to="/partners">{t("header.partners")}</Link>
          </nav>

          <div className="header__actions">
            {renderLanguageSelector()}
            <button
              className="button button--primary"
              onClick={() => setIsModalOpen(true)}
            >
              {t("header.submitRequest")}
            </button>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </header>
  );
};

export default Header;
