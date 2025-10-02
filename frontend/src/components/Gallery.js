import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Gallery.css';

const Gallery = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 模拟作品数据
  const galleryItems = [
    {
      id: 1,
      category: 'haircut',
      title: 'Modern Bob Cut',
      description: 'Elegant bob cut with soft layers',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop',
      price: '$35+'
    },
    {
      id: 2,
      category: 'color',
      title: 'Balayage Highlights',
      description: 'Natural-looking balayage highlights',
      image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop',
      price: '$85+'
    },
    {
      id: 3,
      category: 'perm',
      title: 'Beach Waves',
      description: 'Effortless beach wave perm',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop',
      price: '$120+'
    },
    {
      id: 4,
      category: 'haircut',
      title: 'Layered Long Cut',
      description: 'Long layered cut with face-framing',
      image: 'https://images.unsplash.com/photo-1492107376256-4026437926cd?w=400&h=400&fit=crop',
      price: '$35+'
    },
    {
      id: 5,
      category: 'color',
      title: 'Ombre Hair',
      description: 'Beautiful ombre color transition',
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=400&fit=crop',
      price: '$85+'
    },
    {
      id: 6,
      category: 'perm',
      title: 'Curl Perm',
      description: 'Classic curl perm for volume',
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop',
      price: '$120+'
    },
    {
      id: 7,
      category: 'haircut',
      title: 'Pixie Cut',
      description: 'Bold and modern pixie cut',
      image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop',
      price: '$35+'
    },
    {
      id: 8,
      category: 'color',
      title: 'Highlights',
      description: 'Subtle highlights for dimension',
      image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400&h=400&fit=crop',
      price: '$85+'
    }
  ];

  const categories = [
    { value: 'all', label: 'gallery.all' },
    { value: 'haircut', label: 'gallery.haircut' },
    { value: 'color', label: 'gallery.color' },
    { value: 'perm', label: 'gallery.perm' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="gallery">
      <div className="gallery-container">
        <div className="gallery-filters">
          {categories.map(category => (
            <button
              key={category.value}
              className={`filter-btn ${selectedCategory === category.value ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.value)}
            >
              {t(category.label)}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="gallery-item">
              <div className="gallery-image">
                <img src={item.image} alt={item.title} />
                <div className="gallery-overlay">
                  <div className="gallery-info">
                    <h3 className="gallery-item-title">{item.title}</h3>
                    <p className="gallery-item-description">{item.description}</p>
                    <span className="gallery-item-price">{item.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;


