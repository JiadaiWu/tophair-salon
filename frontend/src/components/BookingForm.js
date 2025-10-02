import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { appointmentAPI } from '../utils/api';
import '../styles/BookingForm.css';

const BookingForm = ({ showHeader = true }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState('book'); // 'book' or 'search'
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    location: '',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '',
    notes: ''
  });

  const [searchData, setSearchData] = useState({
    customerName: '',
    contact: ''
  });

  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [errors, setErrors] = useState({});
  const [searchErrors, setSearchErrors] = useState({});
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const dateInputRef = useRef(null);
  // Toast notification 
  const [toast, setToast] = useState({ visible: false, type: 'success', text: '' });
  const toastTimerRef = useRef(null);

  const openDatePicker = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === 'function') {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
        dateInputRef.current.click && dateInputRef.current.click();
      }
    }
  };

  const serviceOptions = [
    { value: 'haircut', label: 'services.haircut.name' },
    { value: 'color', label: 'services.color.name' },
    { value: 'perm', label: 'services.perm.name' },
    { value: 'cut-color', label: 'services.cutcolor.name' },
    { value: 'cut-perm', label: 'services.cutperm.name' },
    { value: 'others', label: 'services.others.name' }
  ];

  const locationOptions = [
    { value: '1', label: 'location.1.name' },
    { value: '2', label: 'location.2.name' },
    { value: '3', label: 'location.3.name' },
    { value: '4', label: 'location.4.name' }
  ];

  const timeOptions = [
    { value: '9:00', label: 'time.9am' },
    { value: '10:00', label: 'time.10am' },
    { value: '11:00', label: 'time.11am' },
    { value: '12:00', label: 'time.12pm' },
    { value: '13:00', label: 'time.1pm' },
    { value: '14:00', label: 'time.2pm' },
    { value: '15:00', label: 'time.3pm' },
    { value: '16:00', label: 'time.4pm' },
    { value: '17:00', label: 'time.5pm' },
    { value: '18:00', label: 'time.6pm' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSearchInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (searchErrors[name]) {
      setSearchErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('form.required');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('form.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('form.invalid.email');
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('form.required');
    } else if (!/^[\+]?[0-9\s\-\(\)]{7,}$/.test(formData.phone)) {
      newErrors.phone = t('form.invalid.phone');
    }

    if (!formData.service) {
      newErrors.service = t('form.required');
    }

    if (!formData.location) {
      newErrors.location = t('form.required');
    }

    if (!formData.date) {
      newErrors.date = t('form.required');
    }

    if (!formData.time) {
      newErrors.time = t('form.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSearchForm = () => {
    const newErrors = {};

    if (!searchData.customerName.trim()) {
      newErrors.customerName = t('form.required');
    }

    const contact = (searchData.contact || '').trim();
    if (!contact) {
      newErrors.contact = t('form.search.phone_or_email_required');
    } else {
      const isEmail = /\S+@\S+\.\S+/.test(contact);
      const isPhone = /^[\+]?[0-9\s\-\(\)]{7,}$/.test(contact);
      if (!isEmail && !isPhone) {
        newErrors.contact = t('form.search.phone_or_email_required');
      }
    }

    setSearchErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('=== FORM SUBMIT STARTED ===');
    console.log('Form submitted with data:', formData);
    console.log('isLoading state:', isLoading);
    
    if (!validateForm()) {
      console.log('Form validation failed');
      return;
    }

    console.log('Form validation passed, starting API call');
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const appointmentData = {
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        location: formData.location,
        appointmentDate: formData.date,
        appointmentTime: formData.time,
        notes: formData.notes
      };

      await appointmentAPI.book(appointmentData);
      
      setMessage({ 
        type: 'success', 
        text: t('form.success') 
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        location: '',
        date: minDateString,
        time: '',
        notes: ''
      });
      
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.message || t('form.error') 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!validateSearchForm()) {
      return;
    }

    setIsSearching(true);
    setMessage({ type: '', text: '' });
    setSearchResults([]);

    try {
      const contact = (searchData.contact || '').trim();
      const isEmail = /\S+@\S+\.\S+/.test(contact);
      const payload = {
        customerName: searchData.customerName.trim(),
        ...(isEmail ? { email: contact } : { phone: contact })
      };
      const response = await appointmentAPI.search(payload);
      
      if (response.success) {
        setSearchResults(response.appointments || []);
        setMessage({ 
          type: 'success', 
          text: t('form.search.success', { count: response.count }) 
        });
      } else {
        setMessage({ 
          type: 'error', 
          text: response.message || t('form.search.error') 
        });
      }
      
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.message || t('form.search.error') 
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleCancelAppointment = (appointment) => {
    setAppointmentToCancel(appointment);
    setShowCancelDialog(true);
  };

  const confirmCancelAppointment = async () => {
    if (!appointmentToCancel) return;

    setIsCancelling(true);
    // 使用 toast 显示结果，不再用 message 提示
    setMessage({ type: '', text: '' });

    try {
      const response = await appointmentAPI.cancel(appointmentToCancel._id);
      
      if (response.success) {
        // 成功后从列表直接删除
        
        // 更新搜索结果，移除已取消的预约
        setSearchResults(prev => 
          prev.filter(app => app._id !== appointmentToCancel._id)
        );
        // 弹出2秒自动消失的Toast
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        setToast({ visible: true, type: 'success', text: t('form.cancel.success') });
        toastTimerRef.current = setTimeout(() => {
          setToast(prev => ({ ...prev, visible: false }));
        }, 2000);
      } else {
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        setToast({ visible: true, type: 'error', text: response.message || t('form.cancel.error') });
        toastTimerRef.current = setTimeout(() => {
          setToast(prev => ({ ...prev, visible: false }));
        }, 2000);
      }
      
    } catch (error) {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      setToast({ visible: true, type: 'error', text: error.message || t('form.cancel.error') });
      toastTimerRef.current = setTimeout(() => {
        setToast(prev => ({ ...prev, visible: false }));
      }, 2000);
    } finally {
      setIsCancelling(false);
      setShowCancelDialog(false);
      setAppointmentToCancel(null);
    }
  };

  const cancelCancelAppointment = () => {
    setShowCancelDialog(false);
    setAppointmentToCancel(null);
  };

  // 键盘事件处理
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && showCancelDialog) {
        cancelCancelAppointment();
      }
    };

    if (showCancelDialog) {
      document.addEventListener('keydown', handleKeyDown);
      // 防止背景滚动
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [showCancelDialog]);

  // 卸载时清除Toast计时器
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getServiceName = (service) => {
    const serviceMap = {
      'haircut': t('services.haircut.name'),
      'color': t('services.color.name'),
      'perm': t('services.perm.name'),
      'cut-color': t('services.cutcolor.name'),
      'cut-perm': t('services.cutperm.name'),
      'others': t('services.others.name')
    };
    return serviceMap[service] || service;
  };

  const getLocationName = (location) => {
    const locationMap = {
      '1': t('location.1.name'),
      '2': t('location.2.name'),
      '3': t('location.3.name'),
      '4': t('location.4.name')
    };
    return locationMap[location] || location;
  };

  const getStatusName = (status) => {
    const statusMap = {
      'pending': t('status.pending'),
      'confirmed': t('status.confirmed'),
      'completed': t('status.completed'),
      'cancelled': t('status.cancelled')
    };
    return statusMap[status] || status;
  };

  // 最小可选日期（明天）
  const minDateString = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMessage({ type: '', text: '' });
    if (tab === 'search') {
      // 进入查询页时清除预约表单错误
      setErrors({});
    } else if (tab === 'book') {
      // 回到预约页时清理查询提示与结果
      setSearchErrors({});
      setSearchResults([]);
    }
  };

  return (
    <section id="booking" className="booking">
      <div className="booking-container">
        {showHeader && (
          <div className="booking-header">
            <h2 className="booking-title">{t('booking.title')}</h2>
            <p className="booking-subtitle">{t('booking.subtitle')}</p>
          </div>
        )}
        
        {/* 标签页切换 */}
        <div className="booking-tabs">
          <button 
            className={`tab-button ${activeTab === 'book' ? 'active' : ''}`}
            onClick={() => handleTabChange('book')}
          >
            {t('booking.tabs.book')}
          </button>
          <button 
            className={`tab-button ${activeTab === 'search' ? 'active' : ''}`}
            onClick={() => handleTabChange('search')}
          >
            {t('booking.tabs.search')}
          </button>
        </div>

        {/* 预约表单 */}
        {activeTab === 'book' && (
          <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">{t('form.name')} *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'error' : ''}
                placeholder={t('form.name')}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">{t('form.email')} *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
                placeholder={t('form.email')}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">{t('form.phone')} *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={errors.phone ? 'error' : ''}
                placeholder={t('form.phone')}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="service">{t('form.service')} *</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className={errors.service ? 'error' : ''}
              >
                <option value="">{t('form.service')}</option>
                {serviceOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {t(option.label)}
                  </option>
                ))}
              </select>
              {errors.service && <span className="error-message">{errors.service}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">{t('form.location')} *</label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={errors.location ? 'error' : ''}
              >
                <option value="">{t('form.location')}</option>
                {locationOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {t(option.label)}
                  </option>
                ))}
              </select>
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="date">{t('form.date')} *</label>
              <div className="date-input-wrapper">
                <input
                  ref={dateInputRef}
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={minDateString}
                  className={errors.date ? 'error' : ''}
                  onClick={openDatePicker}
                />
                <button
                  type="button"
                  className="date-picker-button"
                  aria-label="Open calendar"
                  onClick={openDatePicker}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                    <path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1zm13 8H4v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9zM6 6H4v2h16V6h-2V7a1 1 0 1 1-2 0V6H8v1a1 1 0 1 1-2 0V6z"/>
                  </svg>
                </button>
              </div>
              {errors.date && <span className="error-message">{errors.date}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="time">{t('form.time')} *</label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className={errors.time ? 'error' : ''}
              >
                <option value="">{t('form.time')}</option>
                {timeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {t(option.label)}
                  </option>
                ))}
              </select>
              {errors.time && <span className="error-message">{errors.time}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="notes">{t('form.notes')}</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder={t('form.notes')}
                rows="3"
              />
            </div>
          </div>

          {message.text && message.type === 'success' && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              onClick={() => {
                console.log('=== TEST BUTTON CLICKED ===');
                alert('Test button works!');
              }}
              style={{
                marginRight: '10px',
                padding: '10px 20px',
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Test Button
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isLoading}
              onClick={() => console.log('Submit button clicked')}
            >
              {isLoading ? t('form.loading') : t('form.submit')}
            </button>
          </div>
        </form>
        )}

        {/* 搜索表单 */}
        {activeTab === 'search' && (
          <div className="search-section">
            <form className="search-form" onSubmit={handleSearch}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="customerName">{t('form.name')} *</label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={searchData.customerName}
                    onChange={handleSearchInputChange}
                    className={searchErrors.customerName ? 'error' : ''}
                    placeholder={t('form.name')}
                  />
                  {searchErrors.customerName && <span className="error-message">{searchErrors.customerName}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="searchContact">{t('form.search.contact')}</label>
                  <input
                    type="text"
                    id="searchContact"
                    name="contact"
                    value={searchData.contact}
                    onChange={handleSearchInputChange}
                    className={searchErrors.contact ? 'error' : ''}
                    placeholder={t('form.search.contact')}
                  />
                  {searchErrors.contact && <span className="error-message">{searchErrors.contact}</span>}
                </div>
              </div>

              <div className="form-row form-row-actions">
                <div className="form-group form-group-actions">
                  <button
                    type="submit"
                    className="search-btn"
                    disabled={isSearching}
                  >
                    {isSearching ? t('form.search.loading') : t('form.search.submit')}
                  </button>
                </div>
              </div>
            </form>

            {/* 搜索结果 */}
            {message.text && (
              <div className={`message ${message.type}`}>
                {message.text}
              </div>
            )}
            {searchResults.length > 0 && (
              <div className="search-results">
                <h3>{t('form.search.results')}</h3>
                <div className="results-list">
                  {searchResults.map((appointment) => (
                    <div key={appointment._id} className="result-item">
                      <div className="result-header">
                        <h4>{appointment.customerName}</h4>
                        <span className={`status status-${appointment.status}`}>
                          {getStatusName(appointment.status)}
                        </span>
                      </div>
                      <div className="result-details">
                        <div className="detail-row">
                          <span className="detail-label">{t('form.service')}:</span>
                          <span className="detail-value">{getServiceName(appointment.service)}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">{t('form.location')}:</span>
                          <span className="detail-value">{getLocationName(appointment.location)}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">{t('form.date')}:</span>
                          <span className="detail-value">{formatDate(appointment.appointmentDate)}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">{t('form.time')}:</span>
                          <span className="detail-value">{appointment.appointmentTime}</span>
                        </div>
                        {appointment.notes && (
                          <div className="detail-row">
                            <span className="detail-label">{t('form.notes')}:</span>
                            <span className="detail-value">{appointment.notes}</span>
                          </div>
                        )}
                      </div>
                      <div className="result-actions">
                        <button
                          className="cancel-btn"
                          onClick={() => handleCancelAppointment(appointment)}
                          disabled={appointment.status === 'cancelled'}
                        >
                          {t('form.cancel.button')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {searchResults.length === 0 && message.text && message.type === 'success' && (
              <div className="no-results">
                <p>{t('form.search.no_results')}</p>
              </div>
            )}
          </div>
        )}

        {/* 取消预约确认对话框（通过 Portal 渲染到 body，确保层级最高） */}
        {showCancelDialog && createPortal(
          (
            <div className="dialog-overlay" onClick={cancelCancelAppointment}>
              <div className="dialog" onClick={(e) => e.stopPropagation()}>
                <button 
                  className="dialog-close-btn"
                  onClick={cancelCancelAppointment}
                  disabled={isCancelling}
                  aria-label="Close dialog"
                >
                  ×
                </button>
                <h3>{t('form.cancel.dialog.title')}</h3>
                <p>{t('form.cancel.dialog.message')}</p>
                <div className="dialog-actions">
                  <button
                    className="dialog-btn dialog-btn-cancel"
                    onClick={cancelCancelAppointment}
                    disabled={isCancelling}
                  >
                    {t('form.cancel.dialog.no')}
                  </button>
                  <button
                    className="dialog-btn dialog-btn-confirm"
                    onClick={confirmCancelAppointment}
                    disabled={isCancelling}
                  >
                    {isCancelling ? t('form.cancel.loading') : t('form.cancel.dialog.yes')}
                  </button>
                </div>
              </div>
            </div>
          ),
          document.body
        )}

        {/* Toast 提示（通过 Portal 渲染，避免被裁剪或遮挡） */}
        {toast.visible && createPortal(
          (
            <div className={`toast ${toast.type}`} role="status" aria-live="polite">
              {toast.text}
            </div>
          ),
          document.body
        )}
      </div>
    </section>
  );
};

export default BookingForm;


