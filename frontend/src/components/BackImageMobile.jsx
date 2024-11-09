import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const BackImage = () => {
  const banners = [
    '/assets/TopBannerone.png',
    '/assets/TopBannertwo.png',
    '/assets/TopBannerthree.png'
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
     
      setCurrentBanner((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="medicccine-store">
      <div className="topbanner" style={{ position: 'relative', overflow: 'hidden',     height: '568px',
    top: '32px',left:'119px',
 }}>
        {banners.map((banner, index) => (
          <img
            key={index}
            src={banner}
            alt={`Banner ${index + 1}`}
            className={`top ${index === currentBanner ? 'active' : ''}`}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: index === currentBanner ? 1 : 0, transition: 'opacity 0.5s ease-in-out' }}
          />
        ))}
      </div>
     
    </div>
  );
};

export default BackImage;
