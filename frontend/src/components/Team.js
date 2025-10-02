import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Team.css';

const Team = () => {
  const { t } = useTranslation();
  const [activeStore, setActiveStore] = useState('newmarket');
  const stylistsGridRef = useRef(null);

  // 发型师数据按店铺分组
  const stylistsByStore = {
    newmarket: [
      {
        id: 'allen',
        name: t('team.allen.name'),
        role: t('team.allen.role'),
        image: '/images/stylists/Allen.jpg',
        description: t('team.allen.description')
      },
      {
        id: 'fei',
        name: t('team.fei.name'),
        role: t('team.fei.role'),
        image: '/images/stylists/阿飞 Fei.jpg',
        description: t('team.fei.description')
      },
      {
        id: 'ying',
        name: t('team.ying.name'),
        role: t('team.ying.role'),
        image: '/images/stylists/Ying.jpg',
        description: t('team.ying.description')
      }
    ],
    northshore: [
      {
        id: 'tony',
        name: t('team.tony.name'),
        role: t('team.tony.role'),
        image: '/images/stylists/Tony.jpg',
        description: t('team.tony.description')
      },
      {
        id: 'lee',
        name: t('team.lee.name'),
        role: t('team.lee.role'),
        image: '/images/stylists/Lee.jpg',
        description: t('team.lee.description')
      },
      {
        id: 'xu',
        name: t('team.xu.name'),
        role: t('team.xu.role'),
        image: '/images/stylists/小许 Xu.jpg',
        description: t('team.xu.description')
      },
      {
        id: 'hyman',
        name: t('team.hyman.name'),
        role: t('team.hyman.role'),
        image: '/images/stylists/Hyman.jpg',
        description: t('team.hyman.description')
      }
    ],
    dominion: [
      {
        id: 'yuan',
        name: t('team.yuan.name'),
        role: t('team.yuan.role'),
        image: '/images/stylists/阿远 Yuan.jpg',
        description: t('team.yuan.description')
      },
      {
        id: 'nana',
        name: t('team.nana.name'),
        role: t('team.nana.role'),
        image: '/images/stylists/NaNa.jpg',
        description: t('team.nana.description')
      },
      {
        id: 'yu',
        name: t('team.yu.name'),
        role: t('team.yu.role'),
        image: '/images/stylists/Yu 小宇.jpg',
        description: t('team.yu.description')
      }
    ],
    city: [
      {
        id: 'joe',
        name: t('team.joe.name'),
        role: t('team.joe.role'),
        image: '/images/stylists/Joe.jpg',
        description: t('team.joe.description')
      },
      {
        id: 'liang',
        name: t('team.liang.name'),
        role: t('team.liang.role'),
        image: '/images/stylists/梁 Liang.jpg',
        description: t('team.liang.description')
      },
      {
        id: 'gavin',
        name: t('team.gavin.name'),
        role: t('team.gavin.role'),
        image: '/images/stylists/Gavin.jpg',
        description: t('team.gavin.description')
      }
    ]
  };

  const stores = [
    { id: 'newmarket', name: t('team.newmarket.title') },
    { id: 'northshore', name: t('team.northshore.title') },
    { id: 'dominion', name: t('team.dominion.title') },
    { id: 'city', name: t('team.city.title') }
  ];

  // 移动端：切换店铺时回到第一个卡片
  useEffect(() => {
    if (stylistsGridRef.current) {
      requestAnimationFrame(() => {
        stylistsGridRef.current.scrollTo({ left: 0, behavior: 'auto' });
      });
    }
  }, [activeStore]);

  // 移动端：左右切换
  const scrollMobile = (dir) => {
    const container = stylistsGridRef.current;
    if (!container) return;
    const viewportWidth = container.clientWidth;
    const delta = dir === 'next' ? viewportWidth : -viewportWidth;
    // 保证不会越界
    const target = container.scrollLeft + delta;
    const maxLeft = container.scrollWidth - container.clientWidth;
    const clamped = Math.max(0, Math.min(maxLeft, target));
    container.scrollTo({ left: clamped, behavior: 'smooth' });
  };

  return (
    <section id="team" className="team">
      <div className="team-container">
        <div className="team-header">
          <h2 className="team-title">{t('team.title')}</h2>
          <p className="team-subtitle">{t('team.subtitle')}</p>
        </div>

        {/* 店铺选择器 */}
        <div className="store-selector">
          {stores.map((store) => (
            <button
              key={store.id}
              className={`store-tab ${activeStore === store.id ? 'active' : ''}`}
              onClick={() => setActiveStore(store.id)}
            >
              {store.name}
            </button>
          ))}
        </div>

        {/* 发型师展示区域 */}
        <div className="stylists-section">
          <div className="stylists-grid" ref={stylistsGridRef}>
            {stylistsByStore[activeStore].map((stylist) => (
              <div key={stylist.id} className="stylist-card">
                <div className="stylist-image-container">
                  <img
                    src={stylist.image}
                    alt={stylist.name}
                    className="stylist-photo"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=280&h=350&fit=crop&crop=face';
                    }}
                  />
                  <div className="stylist-overlay">
                    <div className="stylist-info-overlay">
                      <h3 className="stylist-name">{stylist.name}</h3>
                    </div>
                  </div>
                </div>
                <div className="stylist-details">
                  <h3 className="stylist-name">{stylist.name}</h3>
                  <p className="stylist-description">{stylist.description}</p>
                </div>
              </div>
            ))}
          </div>
          {/* 移动端左右切换按钮 */}
          <button 
            type="button"
            className="mobile-nav mobile-nav-prev"
            aria-label="Prev"
            onClick={() => scrollMobile('prev')}
          >
            ‹
          </button>
          <button 
            type="button"
            className="mobile-nav mobile-nav-next"
            aria-label="Next"
            onClick={() => scrollMobile('next')}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default Team;