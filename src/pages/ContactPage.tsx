import "../styles/ContactPage.css";
import { useLanguage } from "../i18n/LanguageContext";

function ContactPage() {
  const { t } = useLanguage();

  return (
    <section className="contact-page">
      <span className="eyebrow">{t("contact.label")}</span>
    
      <div className="contact-grid">
        <article className="contact-card">
          <span>{t("contact.nameLabel")}</span>
          <p>Huseyin Yurekli</p>
        </article>
        <article className="contact-card">
          <span>{t("contact.phoneLabel")}</span>
          <a href="tel:+905342518418">0534 251 84 18</a>
        </article>
        <article className="contact-card">
          <span>{t("contact.emailLabel")}</span>
          <a href="mailto:hseyin.yrekli@gmail.com">hseyin.yrekli@gmail.com</a>
        </article>
        <article className="contact-card">
          <span>{t("contact.locationLabel")}</span>
          <p>{t("contact.location")}</p>
        </article>
      </div>


    </section>
  );
}

export default ContactPage;
