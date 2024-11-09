import React, { useEffect } from "react";
import BackImage from "./BackImage";
import Slider from "./Slider";
import BackImageMobile from "./BackImageMobile";
import CrazyDealsBannerMobile from "./CrazyDealsBannerMobile";
import SliderMobile from "./SliderMobile";
import CatSlider from "./CatSlider";
import CatSliderMobile from "./CatSliderMobile";
import BestSellBanner from "./BestSellBanner";
import BestOffers from "./BestOffers";
import OffersMobile from "./OffersMobile";
import FeaturedProducts from "./FeaturedProducts";
import FeaproductsMobile from "./FeaproductsMobile";
import BestSellMobile from "./BestSellMobile";
import CrazyDealsBanner from "./CrazyDealsBanner";
import Blogs from "./Blogs";
import BlogMobile from "./BlogMobile";
import Testimonials from "./Testimonials";
import TestimonialsMobile from "./TestimonialsMobile";
import ShippingFoot from "./ShippingFoot";
import ShippingFootMobile from "./ShippingFootMobile";
import Footer from "./Footer";
import FeaProductsMobile from "./FeaproductsMobile";
import FooterMobile from "./FooterMobile";
import HomePage from "./HomePage";
import HomePageMobile from "./HomepageMobile";
import { getHomePageDetails } from "../redux/actions/homePageActions";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";

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
];
const HomepageApp = () => {
  const dispatch = useDispatch();
  const { homePageLoading, homePage, homePageError } = useSelector(
    (state) => state.getHomePageMetaDetailsReducer
  );
  useEffect(() => {
    dispatch(getHomePageDetails());
  }, []);

  const metaFunction = (homePage) => {
    if (Object.keys(homePage).length !== 0) {
      return (
        <Helmet>
          <meta name="description" content={homePage?.metaDescription} />
          <meta name="title" content={homePage?.metaTitle} />
          <meta name="keyword" content={homePage?.metaKeyword} />
          <meta name="slug" content={homePage?.slug} />
          {/* Other meta tags */}
        </Helmet>
      );
    } else {
      return;
    }
  };

  console.log(homePage, "./././././homePage././././.");
  return (
    <div>
      {metaFunction(homePage)}
      <HomePage />
      <HomePageMobile />
      <BackImage />
      <BackImageMobile />

      <SliderMobile />

      <div className="head">
        <h1>Best Seller Products</h1>
        <Slider banners={banners} />
      </div>

      <CatSlider />
      <CatSliderMobile />

      <BestSellBanner />
      <BestSellMobile />
      <BestOffers />
      <OffersMobile />

      <FeaturedProducts />
      <FeaproductsMobile />

      <CrazyDealsBanner />
      <CrazyDealsBannerMobile />
      <Blogs />
      <BlogMobile />

      {/* <Testimonials />
      <TestimonialsMobile/> */}

      <ShippingFoot />
      <ShippingFootMobile />
      <div className="footer">
        <Footer />
      </div>
      <FooterMobile />
    </div>
  );
};

export default HomepageApp;
