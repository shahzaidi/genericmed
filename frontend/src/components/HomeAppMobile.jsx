import React from "react";
import BackImageMobile from "./BackImageMobile";
// import Slider from './Slider';
import SliderMobile from "./SliderMobile";
// import CatSlider from './CatSlider';
import CatSliderMobile from "./CatSliderMobile";
// import BestSellBanner from './BestSellBanner';
// import BestOffers from './BestOffers';
import OffersMobile from "./OffersMobile";
import FeaturedProducts from "./FeaturedProducts";


import CrazyDealsBannerMobile from "./CrazyDealsBannerMobile";
// import Blogs from './Blogs';
import BlogMobile from "./BlogMobile";
// import Testimonials from './Testimonials';
import TestimonialsMobile from "./TestimonialsMobile";
import ShippingFootMobile from "./ShippingFootMobile";
// import Footer from './Footer';
import FooterMobile from "./FooterMobile";
import BestSellMobile from "./BestSellMobile";
import HomePageMobile from "./HomepageMobile";
// import HomePage from './HomePage';

const banners = [
  { image: "/assets/product_med.jpg" },
  { image: "/assets/banner2.jpg" },
  { image: "/assets/banner3.jpg" },
  { image: "/assets/banner4.jpg" },
  { image: "/assets/banner5.webp" },
  { image: "/assets/banner6.webp" },
  { image: "/assets/banner7.jpg" },
  { image: "/assets/banner8.jpg" },
  { image: "/assets/banner9.jpg" },
  // Add more banners as needed
];
const HomepageApp = () => {
  return (
    <div>
      {/* <HomePage/> */}
      <HomePageMobile/>
      <BackImageMobile />
   
      {/* <div className="head">
        <h1>Best Seller Products</h1>
        <Slider banners={banners} />
      </div> */}

      {/* <CatSlider /> */}
      <CatSliderMobile />
      <BestSellMobile />
      {/* <BestSellBanner />
      
      <BestOffers /> */}
      <OffersMobile />

      {/* <FeaturedProducts /> */}
      <FeaProductsMobile />
      <CrazyDealsBannerMobile />
      {/* <Blogs /> */}
      <BlogMobile />

      {/* <Testimonials /> */}
      <TestimonialsMobile />

      <ShippingFootMobile />
      <div className="footer">
        <FooterMobile />
      </div>
    </div>
  );
};

export default HomepageApp;
