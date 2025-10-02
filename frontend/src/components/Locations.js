import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Locations.css';

const Locations = () => {
  const { t } = useTranslation();

  const locations = [
    {
      id: 1,
      name: 'location.1.name',
      address: 'location.1.address',
      hours: 'location.1.hours',
      icon: '🏢'
    },
    {
      id: 2,
      name: 'location.2.name',
      address: 'location.2.address',
      hours: 'location.2.hours',
      icon: '🌊'
    },
    {
      id: 3,
      name: 'location.3.name',
      address: 'location.3.address',
      hours: 'location.3.hours',
      icon: '🌅'
    },
    {
      id: 4,
      name: 'location.4.name',
      address: 'location.4.address',
      hours: 'location.4.hours',
      icon: '🌄'
    }
  ];

  return (
    <section id="locations" className="locations">
      <div className="locations-container">
        <div className="locations-header">
          <h2 className="locations-title">{t('locations.title')}</h2>
          <p className="locations-subtitle">{t('locations.subtitle')}</p>
        </div>
        
        <div className="locations-grid">
          {locations.map((location) => (
            <div key={location.id} className="location-card">
              <div className="location-icon">{location.icon}</div>
              <h3 className="location-name">{t(location.name)}</h3>
              <p className="location-address">{t(location.address)}</p>
              <p className="location-hours">{t(location.hours)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;


