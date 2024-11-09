import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const [rating, setRating] = useState(0);
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: (
      <button type="button" className="slick-prev">
        <i className="glyphicon glyphicon-chevron-left"></i>
      </button>
    ),
    nextArrow: (
      <button type="button" className="slick-next">
        <i className="glyphicon glyphicon-chevron-right"></i>
      </button>
    ),
  };
  const banners = [
    {
      image: "/assets/Offer1.png",
      title: "Healthy Heart Capsules",
      price: 200,
    },
    { image: "/assets/Offer2.png", title: "Acme Pain Relief", price: 100 },
    { image: "/assets/Offer3.png", title: "SereniSleep Aid", price: 200 },
    {
      image: "/assets/Offer4.png",
      title: "Revitalize Energy Tonic",
      price: 70,
    },
    {
      image: "/assets/Offer1.png",
      title: "Healthy Heart Capsules",
      price: 80,
    },
    { image: "/assets/Offer2.png", title: "Acme Pain Relief", price: 20 },
    { image: "/assets/Offer3.png", title: "SereniSleep Aid", price: 100 },
    {
      image: "/assets/Offer4.png",
      title: "Revitalize Energy Tonic",
      price: 500,
    },
    {
      image: "/assets/Offer1.png",
      title: "Healthy Heart Capsules",
      price: 40,
    },
    { image: "/assets/Offer2.png", title: "Acme Pain Relief", price: 65 },
    { image: "/assets/Offer3.png", title: "SereniSleep Aid", price: 55 },
    {
      image: "/assets/Offer4.png",
      title: "Revitalize Energy Tonic",
      price: 25,
    },
    {
      image: "/assets/Offer1.png",
      title: "Healthy Heart Capsules",
      price: 30,
    },
    { image: "/assets/Offer2.png", title: "Acme Pain Relief", price: 60 },
    { image: "/assets/Offer3.png", title: "SereniSleep Aid", price: 50 },
    {
      image: "/assets/Offer4.png",
      title: "Revitalize Energy Tonic",
      price: 30,
    },
  ];
  const handleStarsClick = (starIndex) => {
    setRating(starIndex + 1);
  };
  return (
    <div className="fp_m">
      <h1>Featured Products</h1>
      <div className="container">
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <div key={index} className="images" style={{ margin: "10px" }}>
              <a href={`#${index + 1}`}>
                <img
                  src={banner.image}
                  alt={`Slide ${index + 1}`}
                  className="img-responsive"
                />
              </a>
              <div className="information">
                <h2>{banner.title}</h2>
                <div className="rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`stars ${i < rating ? "selected" : ""}`}
                      onClick={() => handleStarsClick(i)}
                    >
                      &#9733;
                    </span>
                  ))}
                  <span className="reviews">{`${rating} `}</span>
                  <span className="helpful">Helpful in Many ways...</span>
                </div>
                <p className="prooo">{`$${banner.price}`}</p>

                <div className="addbuy">
                  <button
                    onClick={() => console.log("Add to Cart clicked")}
                    className="add-to-cart"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
