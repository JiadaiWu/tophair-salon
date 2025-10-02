import React from 'react';
import { useTranslation } from 'react-i18next';
import useScrollAnimation from '../hooks/useScrollAnimation';
import '../styles/Services.css';

const Services = () => {
  const { t } = useTranslation();

  // 为每个服务卡片创建滚动动画
  const [titleRef, titleVisible] = useScrollAnimation();
  const [card1Ref, card1Visible] = useScrollAnimation();
  const [card2Ref, card2Visible] = useScrollAnimation();
  const [card3Ref, card3Visible] = useScrollAnimation();
  const [card4Ref, card4Visible] = useScrollAnimation();
  const [card5Ref, card5Visible] = useScrollAnimation();
  const [card6Ref, card6Visible] = useScrollAnimation();

  const services = [
    {
      id: 'cutting',
      name: t('services.cutting.name'),
      description: t('services.cutting.description'),
      image: '/images/Scissors.jpg'
    },
    {
      id: 'styling',
      name: t('services.styling.name'),
      description: t('services.styling.description'),
      image: '/images/style.jpg'
    },
    {
      id: 'coloring',
      name: t('services.coloring.name'),
      description: t('services.coloring.description'),
      image: '/images/color.jpg'
    }
  ];

  const cardRefs = [card1Ref, card2Ref, card3Ref, card4Ref, card5Ref, card6Ref];
  const cardVisible = [card1Visible, card2Visible, card3Visible, card4Visible, card5Visible, card6Visible];

  return (
    <section id="services" className="services">
      <div className="services-container">
        <div 
          ref={titleRef}
          className={`services-header fade-in-up ${titleVisible ? 'is-visible' : ''}`}
        >
          <h2 className="services-title">{t('services.title')}</h2>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              ref={cardRefs[index]}
              className={`service-card fade-in-scale ${cardVisible[index] ? 'is-visible' : ''} fade-in-delay-${(index % 3) + 1}`}
            >
              <div className="service-image-wrapper">
                <img
                  src={service.image}
                  alt={service.name}
                  className="service-image"
                />
              </div>
              <div className="service-card-body">
                <h3 className="service-card-title">{service.name}</h3>
                <p className="service-card-description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;


