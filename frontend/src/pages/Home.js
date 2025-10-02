import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import StoreLocations from '../components/StoreLocations';
import Team from '../components/Team';
import BookingForm from '../components/BookingForm';
import useScrollAnimation from '../hooks/useScrollAnimation';
import '../styles/ScrollAnimations.css';

const Home = () => {
  // 页面加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 为每个部分创建滚动动画
  const [servicesRef, servicesVisible] = useScrollAnimation();
  const [storesRef, storesVisible] = useScrollAnimation();
  const [teamRef, teamVisible] = useScrollAnimation();
  const [bookingRef, bookingVisible] = useScrollAnimation();

  return (
    <div className="home">
      <Hero />
      <div 
        ref={servicesRef}
        className={`fade-in-section ${servicesVisible ? 'is-visible' : ''}`}
      >
        <Services />
      </div>
      <div 
        ref={storesRef}
        className={`fade-in-section ${storesVisible ? 'is-visible' : ''}`}
      >
        <StoreLocations />
      </div>
      <div 
        ref={teamRef}
        className={`fade-in-section ${teamVisible ? 'is-visible' : ''}`}
      >
        <Team />
      </div>
      <div 
        ref={bookingRef}
        className={`fade-in-section ${bookingVisible ? 'is-visible' : ''}`}
      >
        <BookingForm />
      </div>
    </div>
  );
};

export default Home;

