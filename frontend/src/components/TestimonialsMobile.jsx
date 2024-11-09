import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Testimonial = ({ image, name, review, className }) => (
  <div className={`testimonial ${className}`}>
    <img src={image} alt={name} />
    <p><strong>{name}</strong></p>
    <p>{review}</p>
  </div>
);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      image: '/assets/test_img2.png',
      name: 'David R',
      review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      className: 'testss', 
    },
    {
      id: 2,
      image: '/assets/test_img1.png',
      name: 'Linda M',
      review: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      className: 'testss', 
    },
    {
      id: 3,
      image: '/assets/test_img3.jpg',
      name: 'Rozy',
      review: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      className: 'testss', 
    },
  ]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <button type="button" className="slick-prev"><i className="glyphicon glyphicon-chevron-left"></i></button>,
    nextArrow: <button type="button" className="slick-next"><i className="glyphicon glyphicon-chevron-right"></i></button>,
  };

 

  return (
    <div className="testimonialfdxgbgs-container">
      <h1>Testimonials</h1>
      <Slider {...settings}>
        {testimonials.map(testimonial => (
          <Testimonial
            key={testimonial.id}
            image={testimonial.image}
            name={testimonial.name}
            review={testimonial.review}
            className={testimonial.className}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
