import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Products.css';

const Products = () => {
  const { t } = useTranslation();

  const features = [
    {
      id: 'loreal-color',
      headline: 'L’Oréal Professional',
      subline: t('products.color'),
      description: t('products.feature.loreal'),
      image: '/images/trand2.jpg'
    },
    {
      id: 'kerastase-care',
      headline: 'Kérastase',
      subline: t('products.shampoo'),
      description: t('products.feature.kerastase'),
      image: '/images/trand1.jpg'
    }
  ];

  return (
    <section id="products" className="products">
      <div className="products-container">
        <div className="product-feature-grid">
          {features.map(item => (
            <div key={item.id} className="product-feature-card">
              <div className="feature-image-wrap">
                <img src={item.image} alt={item.headline} className="feature-image" />
              </div>
              <div className="feature-info">
                <h3 className="feature-title">{item.subline}</h3>
                <p className="feature-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;


