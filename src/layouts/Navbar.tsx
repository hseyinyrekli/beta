import "../styles/Navbar.css";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useLanguage } from "../i18n/LanguageContext";
import type { Language } from "../types";
import logo from '../assets/jotformlogo.png';

function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLanguageChange = (nextLanguage: Language) => {
    const isContactRoute =
      location.pathname.endsWith("/contact") || location.pathname.endsWith("/iletisim");

    setLanguage(nextLanguage);
    void navigate({
      params: { lang: nextLanguage },
      to: isContactRoute
        ? nextLanguage === "tr"
          ? "/$lang/iletisim"
          : "/$lang/contact"
        : "/$lang",
    });
  };

  return (
    <header className="site-header">
      <nav className="site-nav">
        <Link className="site-brand" params={{ lang: language }} to="/$lang">
          <img alt="Jotform logo" className='w-25' src={logo} />
        </Link>

        <div className="site-nav-links">
          <Link
            activeProps={{ className: "nav-link-item nav-link-active" }}
            className="nav-link-item"
            params={{ lang: language }}
            to="/$lang"
          >
            {t("nav.home")}
          </Link>
          <Link
            activeProps={{ className: "nav-link-item nav-link-active" }}
            className="nav-link-item"
            params={{ lang: language }}
            to={language === "tr" ? "/$lang/iletisim" : "/$lang/contact"}
          >
            {t("nav.contact")}
          </Link>
        </div>

        <div className="language-switcher" aria-label="Language switcher">
          <button
            className={`language-button ${language === "tr" ? "language-active" : ""}`}
            onClick={() => handleLanguageChange("tr")}
            type="button"
          >
            TR
          </button>
          <button
            className={`language-button ${language === "en" ? "language-active" : ""}`}
            onClick={() => handleLanguageChange("en")}
            type="button"
          >
            EN
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
