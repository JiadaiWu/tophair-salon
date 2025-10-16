import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/About.css';

const storeRows = [
  [
    { id: 'city', title: 'City:', images: ['/images/city_1.jpg', '/images/city_2.jpg'] },
    { id: 'albany', title: 'Albany:', images: ['/images/Albany_1.jpg', '/images/Albany_2.jpg'] }
  ],
  [
    { id: 'newmarket', title: 'Newmarket:', images: ['/images/newMarket_1.jpg', '/images/newMarket_2.jpg', '/images/newMarket_3.jpg'] },
    { id: 'balmoral', title: 'Balmoral:', images: ['/images/Balmoral.jpg'] }
  ]
];

const About = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <div className="page-header">
        <div className="container">
          <h1>{t('about.title')}</h1>
          <p>{t('about.subtitle')}</p>
        </div>
      </div>

      <section className="about-history">
        <div className="container">
          <h2 className="section-title">{t('about.history.title')}</h2>
          <p className="history-text" dangerouslySetInnerHTML={{ __html: t('about.history.content') }} />
        </div>
      </section>

      <section className="about-founder">
        <div className="container founder-wrap">
          <div className="founder-photo">
            <img src="/images/David.jpg" alt={t('about.founder.name')} />
          </div>
          <div className="founder-info">
            <h2 className="section-title">{t('about.founder.title')}</h2>
            <h3 className="founder-name">{t('about.founder.name')}</h3>
            <p className="founder-bio">{t('about.founder.bio')}</p>
          </div>
        </div>
      </section>

      <section className="about-gallery">
        <div className="container">
          <h2 className="section-title">{t('about.gallery.title')}</h2>

          {storeRows.map((row, rowIdx) => (
            <div key={`row-${rowIdx}`} className="store-row">
              {row.map((store) => (
                <div key={store.id} className="store-section" id={`about-${store.id}`}>
                  <h3 className="store-title">{store.title}</h3>
                  <div className="collage">
                    {store.images.map((src, idx) => (
                  <figure key={src} className={`polaroid p-${(idx % 12) + 1}`}>
                    <img src={src} alt={`${store.title} ${idx + 1}`} />
                  </figure>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;


