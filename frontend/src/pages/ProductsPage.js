import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Products from '../components/Products';

const ProductsPage = () => {
  const { t } = useTranslation();

  // 在组件渲染前就设置滚动位置
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  // 页面加载时强制滚动到顶部
  useEffect(() => {
    // 立即滚动到顶部
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // 使用多个时机确保滚动到顶部
    const timer1 = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
    
    const timer2 = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 10);
    
    const timer3 = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="products-page">
      <div className="page-header">
        <div className="container">
          <h1>{t('products.title')}</h1>
          <p>{t('products.subtitle')}</p>
        </div>
      </div>
      <Products />
    </div>
  );
};

export default ProductsPage;
