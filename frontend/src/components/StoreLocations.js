import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useScrollAnimation from '../hooks/useScrollAnimation';
import '../styles/StoreLocations.css';

const StoreLocations = () => {
  const { t } = useTranslation();
  const [activeStore, setActiveStore] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // 滚动动画
  const [headerRef, headerVisible] = useScrollAnimation();
  const [mainRef, mainVisible] = useScrollAnimation();
  const [infoRef, infoVisible] = useScrollAnimation();
  const [thumbnailsRef, thumbnailsVisible] = useScrollAnimation();

  const stores = [
    {
      id: 'city',
      name: t('stores.city.name'),
      address: t('stores.city.address'),
      phone: t('stores.city.phone'),
      hours: t('stores.city.hours'),
      image: '/images/city_1.jpg',
      description: t('stores.city.description')
    },
    {
      id: 'newmarket',
      name: t('stores.newmarket.name'),
      address: t('stores.newmarket.address'),
      phone: t('stores.newmarket.phone'),
      hours: t('stores.newmarket.hours'),
      image: '/images/newMarket_1.jpg',
      description: t('stores.newmarket.description')
    },
    {
      id: 'albany',
      name: t('stores.albany.name'),
      address: t('stores.albany.address'),
      phone: t('stores.albany.phone'),
      hours: t('stores.albany.hours'),
      image: '/images/Albany_1.jpg',
      description: t('stores.albany.description')
    },
    {
      id: 'balmoral',
      name: t('stores.balmoral.name'),
      address: t('stores.balmoral.address'),
      phone: t('stores.balmoral.phone'),
      hours: t('stores.balmoral.hours'),
      image: '/images/Balmoral.jpg',
      description: t('stores.balmoral.description')
    }
  ];

  // 自动播放逻辑
  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setActiveStore((prev) => (prev + 1) % stores.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, stores.length]);

  const handleStoreClick = (index) => {
    setActiveStore(index);
    setIsAutoPlay(false);
  };

  const nextStore = () => {
    setActiveStore((prev) => (prev + 1) % stores.length);
    setIsAutoPlay(false);
  };

  const prevStore = () => {
    setActiveStore((prev) => (prev - 1 + stores.length) % stores.length);
    setIsAutoPlay(false);
  };

  return (
    <section id="stores" className="store-locations">
      <div className="store-container">
        <div 
          ref={headerRef}
          className={`store-header fade-in-up ${headerVisible ? 'is-visible' : ''}`}
        >
          <h2 className="store-title">{t('stores.title')}</h2>
          <p className="store-subtitle">{t('stores.subtitle')}</p>
        </div>

        <div className="store-content">
          {/* 主显示区域 */}
          <div 
            ref={mainRef}
            className={`store-main fade-in-left ${mainVisible ? 'is-visible' : ''}`}
          >
            <div className="store-image-container">
              <img
                key={stores[activeStore].id}
                src={stores[activeStore].image}
                alt={stores[activeStore].name}
                className="store-image"
              />
              <div className="store-overlay store-overlay-animated">
                <h3 className="store-name">{stores[activeStore].name}</h3>
                <p className="store-description">{stores[activeStore].description}</p>
              </div>
            </div>

            {/* 移动端：图片下方文字描述 */}
            <div className="store-caption-mobile">
              <h3 className="store-name">{stores[activeStore].name}</h3>
              <p className="store-description">{stores[activeStore].description}</p>
            </div>

            {/* 导航按钮 */}
            <button 
              className="store-nav-btn store-nav-prev"
              onClick={prevStore}
              aria-label="Previous Store"
            >
              ‹
            </button>
            <button 
              className="store-nav-btn store-nav-next"
              onClick={nextStore}
              aria-label="Next Store"
            >
              ›
            </button>

            {/* 指示器 */}
            <div className="store-indicators">
              {stores.map((_, index) => (
                <button
                  key={index}
                  className={`store-indicator ${index === activeStore ? 'active' : ''}`}
                  onClick={() => handleStoreClick(index)}
                  aria-label={`Go to ${stores[index].name}`}
                />
              ))}
            </div>
          </div>

          {/* 门店信息卡片 */}
          <div 
            ref={infoRef}
            className={`store-info fade-in-right ${infoVisible ? 'is-visible' : ''}`}
          >
            <div className="store-details">
              <h4 className="store-detail-title">{stores[activeStore].name}</h4>
              <div className="store-detail-item">
                <span className="store-detail-label">📍</span>
                <span className="store-detail-text">{stores[activeStore].address}</span>
              </div>
              <div className="store-detail-item">
                <span className="store-detail-label">📞</span>
                <span className="store-detail-text">{stores[activeStore].phone}</span>
              </div>
              <div className="store-detail-item">
                <span className="store-detail-label">🕒</span>
                <span className="store-detail-text">{stores[activeStore].hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 门店缩略图网格 */}
        <div 
          ref={thumbnailsRef}
          className={`store-thumbnails fade-in-up ${thumbnailsVisible ? 'is-visible' : ''}`}
        >
          {stores.map((store, index) => (
            <div
              key={store.id}
              className={`store-thumbnail ${index === activeStore ? 'active' : ''}`}
              onClick={() => handleStoreClick(index)}
            >
              <img
                src={store.image}
                alt={store.name}
                className="thumbnail-image"
              />
              <div className="thumbnail-overlay">
                <span className="thumbnail-name">{store.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoreLocations;



