import "../styles/Footer.css";
import { useLanguage } from "../i18n/LanguageContext";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer-inner">
        <div>
          <span className="footer-label">{t("footer.label")}</span>
          <h2>{t("footer.title")}</h2>
        </div>

        <div className="footer-contact">
          <a href="mailto:hseyin.yrekli@gmail.com">hseyin.yrekli@gmail.com</a>
          <p>{t("footer.description")}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
