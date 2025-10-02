import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './utils/i18n'; // 导入国际化配置

const RootWithFade = () => {
  useEffect(() => {
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.classList.add('app-fade-in');
      const timer = setTimeout(() => {
        rootEl.classList.remove('app-fade-in');
      }, 900);
      return () => clearTimeout(timer);
    }
  }, []);
  return <App />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RootWithFade />
  </React.StrictMode>
);
