import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const getInitialBanners = () => [
  { image: '/assets/Offer1.png', title: 'Healthy Heart Capsules', price: 200 },
  { image: '/assets/Offer2.png', title: 'Acme Pain Relief', price: 100 },
  { image: '/assets/Offer3.png', title: 'SereniSleep Aid', price: 200 },
  { image: '/assets/Offer4.png', title: 'Revitalize Energy Tonic', price: 70 },
  { image: '/assets/Offer1.png', title: 'Healthy Heart Capsules', price: 80 },
  { image: '/assets/Offer2.png', title: 'Acme Pain Relief', price: 20 },
  { image: '/assets/Offer3.png', title: 'SereniSleep Aid', price: 100 },
  { image: '/assets/Offer4.png', title: 'Revitalize Energy Tonic', price: 500 },
  { image: '/assets/Offer1.png', title: 'Healthy Heart Capsules', price: 40 },
  { image: '/assets/Offer2.png', title: 'Acme Pain Relief', price: 65 },
  { image: '/assets/Offer3.png', title: 'SereniSleep Aid', price: 55 },
  { image: '/assets/Offer4.png', title: 'Revitalize Energy Tonic', price: 25 },
  { image: '/assets/Offer1.png', title: 'Healthy Heart Capsules', price: 30 },
  { image: '/assets/Offer2.png', title: 'Acme Pain Relief', price: 60 },
  { image: '/assets/Offer3.png', title: 'SereniSleep Aid', price: 50 },
  { image: '/assets/Offer4.png', title: 'Revitalize Energy Tonic', price: 30 },
];

const LoadmoreCatMobile = ({ banners: initialBanners }) => {
  const [rating, setRating] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(10); // Initial number of visible products
  const [loading, setLoading] = useState(false);
  const [banners, setBanners] = useState(initialBanners || getInitialBanners());
  const [wishlist, setWishlist] = useState([]);

  const handleStarsClick = (starIndex) => {
    setRating(starIndex + 1);
  };
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isWishlistHovered, setIsWishlistHovered] = useState(null);
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      const remainingPixels = scrollHeight - (scrollTop + window.innerHeight);

      if (remainingPixels <= 100 && !loading) {
        
        setLoading(true);

      
        setTimeout(() => {
          setBanners((prevBanners) => [...prevBanners, ...getInitialBanners().slice(visibleProducts, visibleProducts + 10)]);
          setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 10);
          setLoading(false);
        }, 2000);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, visibleProducts]);

  return (
    <div className='prooshop'>
      <h1>Shop All Products</h1>
      <div className="shopallproduct">
        {banners.map((banner, index) => (
          <div className='everyall'>
          <div key={banner.id} className='imagesshopto' >
          <Link to={'/productpggee'}>
              <img
                             src={(hoveredIndex === index || isWishlistHovered === banner.id) ? '/assets/Offer3.png' : banner.image}
                alt={`Slide ${index + 1}`}
                className="img-responsive"
            
              />
            </Link>
            {(hoveredIndex === index || isWishlistHovered === banner.id) && (
            <div className={`banner-iccons ${isWishlistHovered === banner.id ? 'wishlist-hover' : ''}`}>
              <div className={`wishisttt ${isWishlistHovered === banner.id ? 'wishlist-hover' : ''}`} >
                <button onClick={() => toggleWishlist(banner.id)}>
                  {wishlist[banner.id] ? (
                    <span role="img" aria-label="heart" style={{ color: 'red' }}>❤️</span>
                  ) : (
                    <span role="img" aria-label="heart" style={{ color: 'white' }}>🤍</span>
                  )}
                </button>
      </div>
           
          </div>
           )}
            <div className='in'>
              <h2>{banner.title}</h2>
              <div className="rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`stars ${i < rating ? 'selected' : ''}`} onClick={() => handleStarsClick(i)}>&#9733;</span>
                ))}
                <span className="reviews">{`${rating} `}</span>
              

                {/* <span className="helpful">Helpful in Many ways...</span> */}
              </div>
              <p className='praao'>{`$${banner.price}`}</p>
              <div className="productcategory-icons">
                <button onClick={() => toggleWishlist(banner.id)}>
                  {wishlist[banner.id] ? (
                    <span role="img" aria-label="heart" style={{ color: "red" }}>
                      ❤️
                    </span>
                  ) : (
                    <span role="img" aria-label="heart" style={{ color: "white" }}>
                      🤍
                    </span>
                  )}
                </button>
              </div>


              <div className='addbuycategor'>
                <button onClick={() => console.log('Add to Cart clicked')} className='add-to-cart'>Add to Cart</button>
   
                </div>
                  </div>
                </div>
                </div>
              ))}




        {loading && <p>Loading...</p>}
        {!loading && visibleProducts < (banners?.length || 0) && (
          <button onClick={() => setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 10)}>Load More</button>
        )}
      </div>
    </div>
  );
};

export default LoadmoreCatMobile;
