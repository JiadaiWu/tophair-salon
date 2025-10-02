import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BookingForm from '../components/BookingForm';

const Booking = () => {
  const { t } = useTranslation();

  // 页面加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="booking-page">
      <div className="page-header">
        <div className="container">
          <h1>{t('booking.title')}</h1>
          <p>{t('booking.subtitle')}</p>
        </div>
      </div>
      <BookingForm showHeader={false} />
    </div>
  );
};

export default Booking;

