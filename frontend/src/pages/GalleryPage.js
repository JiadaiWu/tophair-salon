import React from 'react';
import { useTranslation } from 'react-i18next';
import Gallery from '../components/Gallery';

const GalleryPage = () => {
  const { t } = useTranslation();

  return (
    <div className="gallery-page">
      <div className="page-header">
        <div className="container">
          <h1>{t('gallery.title')}</h1>
          <p>{t('gallery.subtitle')}</p>
        </div>
      </div>
      <Gallery />
    </div>
  );
};

export default GalleryPage;
