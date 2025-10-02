import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Hero.css';

const Hero = () => {
  const { t } = useTranslation();
  
   const goToBooking = () => {
     console.log('Navigate to booking page');
     // 在响应式设计中，直接跳转到预约页面
     window.location.href = '/booking';
   };

  return (
    <section className="hero">
      <div className="hero-content-wrapper">
        {/* 左侧文字内容 */}
        <div className="hero-text">
          <h1 className="hero-title">
            {t('hero.title')}
          </h1>
          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>
          <p className="hero-description">
            {t('hero.description')}
          </p>
           <button 
             className="hero-cta"
             onClick={(e) => {
               e.preventDefault();
               console.log('Button clicked!');
               goToBooking();
             }}
           >
             {t('hero.cta')}
           </button>
        </div>

         {/* 右侧图片 */}
         <div className="hero-image">
           <img 
             src="/images/hero.jpg"
             alt="Professional Hair Styling"
             className="hero-img"
           />
           {/* 渐变遮罩 */}
           <div className="hero-gradient"></div>
         </div>
      </div>

    </section>
  );
};

export default Hero;