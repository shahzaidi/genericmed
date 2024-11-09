
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from "react-router-dom";

const Carousel = () => {
  const settings = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    prevArrow: <button type="button" className="slick-prev"><i className="glyphicon glyphicon-chevron-left"></i></button>,
    nextArrow: <button type="button" className="slick-next"><i className="glyphicon glyphicon-chevron-right"></i></button>,
  };
  const banners = [  {  image: '/assets/image_6.png', title: 'Pain Management' },
  { image: '/assets/image_7.png', title: 'Cardiovascular Health' },
  {  image: '/assets/image_8.png',title: 'Sleep Aids' },
  { image: '/assets/image_9.png',title: 'Cold and Flu'},
  { image: '/assets/image_10.png',title: 'Allergy Relief' },
  {  image: '/assets/image_11.png',title: 'Digestive Health' },
  {  image: '/assets/image_6.png', title: 'Pain Management'},
  { image: '/assets/image_7.png', title: 'Cardiovascular Health'},
  { image: '/assets/image_8.png' ,title: 'Sleep Aids'},
  { image: '/assets/image_9.png',title: 'Cold and Flu' },
  {  image: '/assets/image_10.png' ,title: 'Allergy Relief'},
  { image: '/assets/image_11.png',title: 'Digestive Health'},
  { image: '/assets/image_6.png', title: 'Pain Management' },
 
  { image: '/assets/image_7.png', title: 'Cardiovascular Health'},
  { image: '/assets/image_8.png' ,title: 'Sleep Aids'},
  { image: '/assets/image_9.png' ,title: 'Cold and Flu'},
  {  image: '/assets/image_10.png',title: 'Allergy Relief' },
  { image: '/assets/image_11.png',title: 'Digestive Health'},]

  return (
    <div className='categiorikd'>
            <h1>Categories</h1>
   
    <div className="container" style={{ height: '366px' }}>
  
      <Slider {...settings}>
        {banners.map((banner, index) => (
            <Link to ="/subcategories"id="dnsj">
          <div key={index}>
            <a href={`#${index + 1}`}>
              <img src={banner.image} alt={`Slid ${index + 1}`} className="banners" />
            </a>
            
            <div className="banner-title">
              <p>{banner.title}</p>
            </div>
            
          </div>
          </Link>
        ))}
      </Slider>
    </div>
    </div>
  );
};

export default Carousel;