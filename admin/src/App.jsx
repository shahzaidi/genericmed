import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import Dashboard from "./components/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AllOrders from "./components/AllOrders";
import PendingOrders from "./components/PendingOrders";
import DeliveredOrders from "./components/DeliveredOrders";
import CancelledOrders from "./components/CancelledOrders";
import AllCategories from "./components/AllCategories";
import SubCategories from "./components/SubCategories";
import CreateProduct from "./components/CreateProduct";
import ProductList from "./components/ProductList";
import OutOfStock from "./components/OutOfStock";
import Attributes from "./components/Attributes";
import CreateCoupon from "./components/CreateCoupon";
import CouponList from "./components/CouponList";
import ShippingRule from "./components/ShippingRule";
import PaymentMethod from "./components/PaymentMethod";
import GoogleAnalytics from "./components/GoogleAnalytics";
import HomePage from "./components/HomePage";
import CategoryPage from "./components/CategoryPage";
import ShopAll from "./components/ShopAll";
import AboutUs from "./components/AboutUs";
import BlogPage from "./components/BlogPage";
import ContactUs from "./components/ContactUs";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsConditions from "./components/TermsConditions";
import Faq from "./components/Faq";
import CustomerList from "./components/CustomerList";
import PendingCustomerList from "./components/PendingCustomerList";
import PageAboutUs from "./components/PageAboutUs";
import PageContactUs from "./components/PageContactUs";
import PagePrivacyPolicy from "./components/PagePrivacyPolicy";
import PageTermsandCond from "./components/PageTermsandCond";
import PageFaq from "./components/PageFaq";
import PageHomePage from "./components/PageHomePage";
import PageCategoriesPage from "./components/PageCategoriesPage";
import PageShopAll from "./components/PageShopAll";
import BlogAllBlogs from "./components/BlogAllBlogs";
import BlogCategoryPage from "./components/BlogCategoryPage";
import AddNewPost from "./components/AddNewPost";
import OrdLogOrderList from "./components/OrdLogOrderList";
import CreateanOrder from "./components/CreateanOrder";
import ContactMessage from "./components/ContactMessage";
import AllAdminList from "./components/AllAdminList";
import AddNewAdmin from "./components/AddNewAdmin";
import AllAdminRole from "./components/AllAdminRole";
import UserPermissions from "./components/UserPermissions";
import AllReviews from "./components/AllReviews";
import PendingReviews from "./components/PendingReviews";
import ApproveReviews from "./components/ApproveReviews";
import DeleteReviews from "./components/DeleteReviews";
import ViewOrders from "./components/ViewOrders";
import ContactMessageView from "./components/ContactMessageView";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Forbidden from "./components/Forbidden";
import NotFound from "./components/NotFound";
import Private from "./components/utils/Private";
import Public from "./components/utils/Public";
// import dotenv from "dotenv";

// Call dotenv.config() to load environment variables
// dotenv.config();

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Public>
                <AdminLogin />
              </Public>
            }
            index
          />
          <Route
            path="/dashboard"
            element={
              <Private>
                <Dashboard />
              </Private>
            }
            index
          />
          <Route
            path="/allorders"
            element={
              <Private>
                <AllOrders />
              </Private>
            }
            index
          />
          <Route
            path="/pendingorders"
            element={
              <Private>
                <PendingOrders />
              </Private>
            }
            index
          />
          <Route
            path="/Delorders"
            element={
              <Private>
                <DeliveredOrders />
              </Private>
            }
            index
          />
          <Route
            path="/Cancelorders"
            element={
              <Private>
                <CancelledOrders />
              </Private>
            }
            index
          />
          <Route
            path="/allcategories"
            element={
              <Private>
                <AllCategories />
              </Private>
            }
            index
          />
          <Route
            path="/allcategories/:id"
            element={
              <Private>
                <AllCategories />
              </Private>
            }
            index
          />
          {/* <Route path="/subcategories" element={<SubCategories />} index /> */}
          <Route
            path="/createproduct"
            element={
              <Private>
                <CreateProduct />
              </Private>
            }
            index
          />
          <Route
            path="/createproduct/:id"
            element={
              <Private>
                <CreateProduct />
              </Private>
            }
            index
          />
          <Route
            path="/productlist"
            element={
              <Private>
                <ProductList />
              </Private>
            }
            index
          />
          <Route
            path="/outofstock"
            element={
              <Private>
                <OutOfStock />
              </Private>
            }
            index
          />
          <Route
            path="/attributes"
            element={
              <Private>
                <Attributes />
              </Private>
            }
            index
          />
          <Route
            path="/createcoupon"
            element={
              <Private>
                <CreateCoupon />
              </Private>
            }
            index
          />
          <Route
            path="/couponlist"
            element={
              <Private>
                <CouponList />
              </Private>
            }
            index
          />
          <Route
            path="/shippingrule"
            element={
              <Private>
                <ShippingRule />
              </Private>
            }
            index
          />
          <Route
            path="/paymentmethod"
            element={
              <Private>
                <PaymentMethod />
              </Private>
            }
            index
          />
          <Route
            path="/googleanalytics"
            element={
              <Private>
                <GoogleAnalytics />
              </Private>
            }
            index
          />
          <Route
            path="/homepage"
            element={
              <Private>
                <HomePage />
              </Private>
            }
            index
          />
          <Route
            path="/categorypage"
            element={
              <Private>
                <CategoryPage />
              </Private>
            }
            index
          />
          <Route
            path="/shopall"
            element={
              <Private>
                <ShopAll />
              </Private>
            }
            index
          />
          <Route
            path="/aboutus"
            element={
              <Private>
                <AboutUs />
              </Private>
            }
            index
          />
          <Route
            path="/blogpage"
            element={
              <Private>
                <BlogPage />
              </Private>
            }
            index
          />
          <Route
            path="/contactus"
            element={
              <Private>
                <ContactUs />
              </Private>
            }
            index
          />
          <Route
            path="/privacypolicy"
            element={
              <Private>
                <PrivacyPolicy />
              </Private>
            }
            index
          />
          <Route
            path="/termscondition"
            element={
              <Private>
                <TermsConditions />
              </Private>
            }
            index
          />
          <Route
            path="/faq"
            element={
              <Private>
                <Faq />
              </Private>
            }
            index
          />
          <Route
            path="/customerlist"
            element={
              <Private>
                <CustomerList />
              </Private>
            }
            index
          />
          <Route
            path="/pendingcustomerlist"
            element={
              <Private>
                <PendingCustomerList />
              </Private>
            }
            index
          />
          <Route
            path="/pageaboutus"
            element={
              <Private>
                <PageAboutUs />
              </Private>
            }
            index
          />
          <Route
            path="/pagecontactus"
            element={
              <Private>
                <PageContactUs />
              </Private>
            }
            index
          />
          <Route
            path="/pageprivacypolicy"
            element={
              <Private>
                <PagePrivacyPolicy />
              </Private>
            }
            index
          />
          <Route
            path="/pagetermscondition"
            element={
              <Private>
                <PageTermsandCond />
              </Private>
            }
            index
          />
          <Route
            path="/pagefaq"
            element={
              <Private>
                <PageFaq />
              </Private>
            }
            index
          />
          <Route
            path="/pagefaq/:id"
            element={
              <Private>
                <PageFaq />
              </Private>
            }
            index
          />
          <Route
            path="/pagehomepage"
            element={
              <Private>
                <PageHomePage />
              </Private>
            }
            index
          />
          <Route
            path="/pagecategoriespage"
            element={
              <Private>
                <PageCategoriesPage />
              </Private>
            }
            index
          />
          <Route
            path="/pageshopall"
            element={
              <Private>
                <PageShopAll />
              </Private>
            }
            index
          />
          <Route
            path="/blogallblogs"
            element={
              <Private>
                <BlogAllBlogs />
              </Private>
            }
            index
          />
          <Route
            path="/blogcategorypage"
            element={
              <Private>
                <BlogCategoryPage />
              </Private>
            }
            index
          />
          <Route
            path="/blogcategorypage/:id"
            element={
              <Private>
                <BlogCategoryPage />
              </Private>
            }
            index
          />
          <Route
            path="/addnewpost"
            element={
              <Private>
                <AddNewPost />
              </Private>
            }
            index
          />
          <Route
            path="/edit/blog/:id"
            element={
              <Private>
                <AddNewPost />
              </Private>
            }
            index
          />
          <Route
            path="/orderlist"
            element={
              <Private>
                <OrdLogOrderList />
              </Private>
            }
            index
          />
          <Route
            path="/createanorder"
            element={
              <Private>
                <CreateanOrder />
              </Private>
            }
            index
          />
          <Route
            path="/contactmessage"
            element={
              <Private>
                <ContactMessage />
              </Private>
            }
            index
          />
          <Route
            path="/alladminlist"
            element={
              <Private>
                <AllAdminList />
              </Private>
            }
            index
          />
          <Route
            path="/addnewadmin"
            element={
              <Private>
                <AddNewAdmin />
              </Private>
            }
            index
          />
          <Route
            path="/alladminroles"
            element={
              <Private>
                <AllAdminRole />
              </Private>
            }
            index
          />
          <Route
            path="/userpermissions"
            element={
              <Private>
                <UserPermissions />
              </Private>
            }
            index
          />
          <Route
            path="/allreviews"
            element={
              <Private>
                <AllReviews />
              </Private>
            }
            index
          />
          <Route
            path="/pendingreviews"
            element={
              <Private>
                <PendingReviews />
              </Private>
            }
            index
          />
          <Route
            path="/approvereviews"
            element={
              <Private>
                <ApproveReviews />
              </Private>
            }
            index
          />
          <Route
            path="/deletereviews"
            element={
              <Private>
                <DeleteReviews />
              </Private>
            }
            index
          />
          <Route
            path="/vieworders/:orderId"
            element={
              <Private>
                <ViewOrders />
              </Private>
            }
            index
          />
          <Route
            path="/viewcontact"
            element={
              <Private>
                <ContactMessageView />
              </Private>
            }
            index
          />
          {/* <Route path="/*" element={<Forbidden />} index /> */}
          <Route path="/*" element={<NotFound />} index />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
