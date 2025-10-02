import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import StoreLocations from './components/StoreLocations';
import ProductsPage from './pages/ProductsPage';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Booking from './pages/Booking';
import './App.css';
import './styles/ChineseFonts.css';

const AppContent = () => {
  const location = useLocation();
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <div key={location.pathname} className={location.pathname === '/services' ? '' : 'app-fade-in'}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<StoreLocations />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// Disable React Router scroll position restoration
if (typeof window !== 'undefined') {
  // Scroll to top on every route change
  window.addEventListener('popstate', () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
  
  // Listen for route changes
  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;
  
  window.history.pushState = function(...args) {
    originalPushState.apply(this, args);
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };
  
  window.history.replaceState = function(...args) {
    originalReplaceState.apply(this, args);
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };
  
  // Listen for page load completion
  window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
}

export default App;