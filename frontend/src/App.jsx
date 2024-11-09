import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
// import HomePageMobile from "./components/HomePageMobile";
import BackImage from "./components/BackImage";
import BestSeller from "./components/BestSeller";
import Slider from "./components/Slider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CatSlider from "./components/CatSlider";

import BestSellBanner from "./components/BestSellBanner";
import BestOffers from "./components/BestOffers";

import FeaturedProducts from "./components/FeaturedProducts";

import CategoriesHover from "./components/CategoriesHover";

import CrazyDealsBanner from "./components/CrazyDealsBanner";
// import Footer from "./components/Footer";
import PaymentReview from "./components/PaymentReview";
import ShippingFoot from "./components/ShippingFoot";
import Blogs from "./components/Blogs";

import Testimonials from "./components/Testimonials";

import { AboutUs, Navigation } from "./components/AboutUs";
import { PrivacyPolicy, PriNavigation } from "./components/PrivacyPolicy";
import { PaymentPolicy, PayNavigation } from "./components/PaymentPolicy";
import { MedicinePolicy, MedNavigation } from "./components/MedicinePolicy";
import { CanNavigation, CanRefundPolicy } from "./components/CanRefundPolicy";
import { TermNavigation, TermsCon } from "./components/TermsCon";
import { FaqNavigation, Faq } from "./components/Faq";
import {
  PharmNavigation,
  PharmacyMedicineqa,
} from "./components/PharmacyMedicineqa";
import { DrugNavigation, DrugsFaq } from "./components/DrugsFaq";
import { GenNavigation, GenericFaq } from "./components/GenericFaq";
import { ContactForm, ContactNavigation } from "./components/ContactUs";
import SignUp from "./components/SignUp";
import Login from "./components/LogIn";
import AddtoCart from "./components/AddtoCart";

import Thankyou from "./components/Thankyou";
import CheckOut from "./components/CheckOut";
import MyProfile from "./components/MyProfile";
import AddtoCartMobile from "./components/MyProfile";
import Categories from "./components/Categories";
import HomeApp from "./components/HomeApp";
import OrderDetails from "./components/OrderDetails";
import MyOrders from "./components/MyOrders";
// import HomeAppMobile from './components/HomeAppMobile';
import ShopAllProducts from "./components/ShopAllProducts";
import ProductPage from "./components/ProductPage";
import AddToCartPage from "./components/AddtoCart";
import MyAddress from "./components/MyAddress";
import MyWishlist from "./components/MyWishlist";
import TheContext, { TheContextApi } from "./contextApi/TheContext";
import MyProfileEdit from "./components/MyProfileEdit";
import BlogPage from "./components/BlogPage";
import BlogContent from "./components/BlogContent";
import FiltersShopMobile from "./components/FiltersShopmobile";
import HeaderWishlist from "./components/HeaderWishlist";
import MyProfileMobile from "./components/MyProfileMobile";
import Subcategory from "./components/Subcategory";
import RelatedProductMobile from "./components/RelatedProductMobile";
import Private from "./components/utils/Private";
import Whatsapp from "./components/Whatsapp";
import Forbidden from "./components/Forbidden";
import ScrollToTop from "./components/Scroll";
import Scroll from "./components/Scroll";
import NotFound from "./components/NotFound";

const banners = [
  { image: "src/assets/product_med.jpg" },
  { image: "src/assets/banner2.jpg" },
  { image: "src/assets/banner3.jpg" },
  { image: "src/assets/banner4.jpg" },
  { image: "src/assets/banner5.webp" },
  { image: "src/assets/banner6.webp" },
  { image: "src/assets/banner7.jpg" },
  { image: "src/assets/banner8.jpg" },
  { image: "src/assets/banner9.jpg" },
];

const App = () => {
  const { cartPageDone, checkOutPageDone, paymentReviewOutPageDone } =
    useContext(TheContextApi);
  return (
    <Router>
      <Scroll />
      <div>
        <TopBar />
        <LoginPage />
        <Whatsapp />
        {/* 
        <HomePageMobile /> */}
        <Routes>
          <Route exact path="/" element={<HomeApp />} />
          <Route
            exact
            path="/bestseller"
            element={<BestSeller banners={banners} />}
          />
          <Route exact path="./components/AboutUs" element={<AboutUs />} />
          <Route exact path="/aboutfoot" element={<AboutUs />} />
          <Route exact path="/orderdet" element={<OrderDetails />} />
          <Route exact path="/productpggee" element={<ProductPage />} />
          <Route exact path="/productPage/:id" element={<ProductPage />} />
          <Route exact path="/cart" element={<AddtoCart />} />
          <Route
            exact
            path="/mywishlist"
            element={
              <Private>
                <MyWishlist />
              </Private>
            }
          />
          {paymentReviewOutPageDone && (
            <Route exact path="/Thankyou/:orderId" element={<Thankyou />} />
          )}
          <Route exact path="/myorders" element={<MyOrders />} />
          <Route
            exact
            path="/my-profile"
            element={
              <Private>
                <MyProfile />
              </Private>
            }
          />
          {checkOutPageDone && (
            <Route exact path="/paymentreview" element={<PaymentReview />} />
          )}
          {cartPageDone && (
            <Route exact path="/checkout" element={<CheckOut />} />
          )}
          <Route
            exact
            path="/myaddress"
            element={
              <Private>
                <MyAddress />
              </Private>
            }
          />
          <Route
            exact
            path="/myaddress/:id"
            element={
              <Private>
                <MyAddress />
              </Private>
            }
          />
          <Route exact path="/shopallProducts" element={<ShopAllProducts />} />
          <Route
            exact
            path="/shopallProducts/:keyword"
            element={<ShopAllProducts />}
          />
          <Route exact path="/aboutprivacy" element={<PrivacyPolicy />} />
          <Route exact path="/paypol" element={<PaymentPolicy />} />
          <Route exact path="/medpol" element={<MedicinePolicy />} />
          <Route exact path="/canpol" element={<CanRefundPolicy />} />
          <Route exact path="/Term" element={<TermsCon />} />
          <Route exact path="/faq" element={<Faq />} />
          <Route exact path="/allcategories" element={<Categories />} />
          <Route
            exact
            path="/pharmacy-medicine"
            element={<PharmacyMedicineqa />}
          />
          <Route exact path="/faq/:id" element={<DrugsFaq />} />
          <Route exact path="/generic-medicine" element={<GenericFaq />} />
          <Route exact path="/Contactus" element={<ContactForm />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/blogs" element={<Blogs />} />
          <Route exact path="/blogpage" element={<BlogPage />} />
          <Route exact path="/blogcontent/:id" element={<BlogContent />} />
          <Route
            exact
            path="/myprofileedit"
            element={
              <Private>
                <MyProfileEdit />
              </Private>
            }
          />
          <Route exact path="/filters" element={<FiltersShopMobile />} />
          <Route exact path="/wishlist" element={<HeaderWishlist />} />
          <Route exact path="/profilemob" element={<MyProfileMobile />} />
          <Route exact path="/categories/:category" element={<Subcategory />} />
          <Route exact path="/addcartmob" element={<AddtoCartMobile />} />
          <Route exact path="/hover" element={<CategoriesHover />} />

          <Route exact path="/forbidden" element={<Forbidden />} />
          <Route exact path="/notfound" element={<NotFound />} />
          <Route exact path="/*" element={<NotFound />} />

          <Route exact path="/forbidden" element={<Forbidden />} />
          {/* <Route exact path="/*" element={<Forbidden />} /> */}

          <Route
            exact
            path="/relatedpromon"
            element={<RelatedProductMobile />}
          />
        </Routes>
        {/* <BackImage />
        <div className="head">
          <h1>Best Seller Products</h1>
          <Slider banners={banners} />
        </div>
        <CatSlider />
        <BestSellBanner />
        <BestOffers />
        <FeaturedProducts />
        <CrazyDealsBanner />
        <Blogs />
        <Testimonials />
        <ShippingFoot />
        <div className="footer">
          <Footer /> */}

        {/* <HomeAppMobile/> */}

        <Navigation />
        <PriNavigation />
        <PayNavigation />
        <MedNavigation />
        <CanNavigation />
        <TermNavigation />
        <FaqNavigation />
        <PharmNavigation />
        <DrugNavigation />
        <GenNavigation />
        <ContactNavigation />
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
