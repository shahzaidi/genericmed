import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Carousel } from 'react-bootstrap';

const BlogContainer = ({ title, content, imageSrc }) => (
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={imageSrc}
      alt={title}
    />
    <Carousel.Caption>
      <h3>{title}</h3>
      <p>{content}</p>
      <span>Read More..</span>
    </Carousel.Caption>
  </Carousel.Item>
);

const LatestBlogs = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const slickSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <button type="button" className="sli-prev"><i className="glyphicon glyphicon-chevron-left"></i></button>,
    nextArrow: <button type="button" className="sli-next"><i className="glyphicon glyphicon-chevron-right"></i></button>,
  };

  return (
    <div className="latesttt-blogs">
      <h1>Latest Blogs</h1>
      <div className="lb">
      <Slider {...slickSettings}>
        <BlogContainer
          title="Navigating the Health Journey"
          content="Information about the top medicines in the market....."
          imageSrc="/assets/blog1.png"
        />
        <BlogContainer
          title="Welness Wonders Unveiled"
          content="Exploring the mechanisms of action of various medicines......"
          imageSrc="/assets/blog2.png"
        />
        <BlogContainer
          title="Navigating the Wealthness Frontier"
          content="Information about the top medicines in the market....."
          imageSrc="/assets/blog3.png"
        />
        <BlogContainer
          title="Wellness Wonders Unveiled"
          content="Exploring the mechanisms of action of various medicines......"
          imageSrc="/assets/blog4.png"
        />
      </Slider>
    
      </div>
      <div className='readm'>
        <img src="/assets/readmore.png" alt="" srcSet="" />
      </div>
    </div>
  );
};

export default LatestBlogs;
