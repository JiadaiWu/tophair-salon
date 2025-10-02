import React, { useEffect } from 'react';
import '../styles/Portfolio.css';

const sources = [
  '/images/Scissors.jpg',
  '/images/style.jpg',
  '/images/color.jpg',
  '/images/city_1.jpg',
  '/images/city_2.jpg',
  '/images/newMarket_1.jpg',
  '/images/newMarket_2.jpg',
  '/images/newMarket_3.jpg',
  '/images/Albany_1.jpg',
  '/images/Albany_2.jpg',
  '/images/Balmoral.jpg',
  '/images/hero.jpg'
];

const Portfolio = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="portfolio-page">
      <div className="page-header">
        <div className="container">
          <h1>Portfolio</h1>
          <p>Selected works and store vibes</p>
        </div>
      </div>
      <div className="container">
        <div className="portfolio-grid">
          {sources.map((src, i) => (
            <figure key={src} className={`pf-item s-${(i % 7) + 1}`}>
              <img src={src} alt={`work ${i+1}`} />
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;








