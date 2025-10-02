import React, { useState, useEffect } from 'react';
import '../styles/AnimatedBackground.css';

const AnimatedBackground = ({ 
  animationSpeed = 1, 
  opacity = 0.06, 
  gridPosition = 'right' 
}) => {
  const [icons, setIcons] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  // 美发相关emoji图标
  const hairIcons = [
    '✂️', '💇‍♀️', '💇‍♂️', '🧴', '💄', '🎨', '💆‍♀️', '🪒',
    '💇', '💅', '✨', '🌟', '💫', '⭐', '🔮', '💎',
    '💍', '👑', '🎭', '🎪', '🎨', '🖌️', '🖍️', '📐',
    '🔧', '⚙️', '🎯', '🎪', '🎨', '🖼️', '🖼️', '🎭'
  ];

  // 初始化图标数组
  useEffect(() => {
    const generateIcons = () => {
      const newIcons = [];
      const totalIcons = window.innerWidth > 768 ? 80 : (window.innerWidth > 480 ? 72 : 75); // 8x10, 6x12, 5x15
      
      for (let i = 0; i < totalIcons; i++) {
        newIcons.push({
          id: i,
          icon: hairIcons[Math.floor(Math.random() * hairIcons.length)],
          opacity: Math.random() * 0.15 + 0.08, // 0.08-0.23之间，调暗
          animationDelay: Math.random() * 6, // 0-6秒随机延迟
          x: Math.random() * 100, // 0-100%随机位置
          y: Math.random() * 100
        });
      }
      setIcons(newIcons);
    };

    generateIcons();
    window.addEventListener('resize', generateIcons);
    return () => window.removeEventListener('resize', generateIcons);
  }, []);

  // 随机更换图标
  useEffect(() => {
    const interval = setInterval(() => {
      setIcons(prevIcons => 
        prevIcons.map(icon => 
          Math.random() < 0.05 // 5%概率更换
            ? {
                ...icon,
                icon: hairIcons[Math.floor(Math.random() * hairIcons.length)],
                opacity: Math.random() * 0.15 + 0.08
              }
            : icon
        )
      );
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className={`animated-background ${gridPosition}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        '--animation-speed': animationSpeed,
        '--base-opacity': opacity
      }}
    >
      <div className="background-grid">
        {icons.map((icon) => (
          <div
            key={icon.id}
            className="background-icon"
            style={{
              '--icon-opacity': isHovered ? 0.2 : icon.opacity,
              '--animation-delay': `${icon.animationDelay}s`,
              '--x-position': `${icon.x}%`,
              '--y-position': `${icon.y}%`
            }}
          >
            {icon.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
