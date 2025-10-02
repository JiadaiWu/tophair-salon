import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Footer.css';

const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <footer id="contact" className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{t('footer.contact')}</h3>
            <div className="footer-address" dangerouslySetInnerHTML={{__html: t('footer.address')}}></div>
          </div>
          
          <div className="footer-section">
            <h3>{t('footer.hours')}</h3>
            <div className="footer-hours" dangerouslySetInnerHTML={{__html: t('footer.hours.detail')}}></div>
            <div className="footer-hours" dangerouslySetInnerHTML={{__html: t('footer.hours.sunday')}}></div>
          </div>
          
          <div className="footer-section">
            <h3>{t('footer.contactUs')}</h3>
            <div className="footer-social">
              <p className="footer-wechat">{t('footer.wechat')}</p>
              <p className="footer-instagram">{t('footer.instagram')}</p>
              <p className="footer-email-contact">{t('footer.emailContact')}</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


