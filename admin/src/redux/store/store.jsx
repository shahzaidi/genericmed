// store/store.jsx
import { configureStore } from "@reduxjs/toolkit";
import otpReducer from "../reducers/otpReducers";
import adminUserReducer from "../reducers/adminUserReducers";
import {
  orderReducer,
  createOrderReducer,
  pendingOrderReducer,
  completedOrderReducer,
  getOrderReducer,
  updateOrderStatusReducer,
  getAllOrdersCountAndRecentOrdersReducer,
} from "../reducers/orderReducers";
import { customerReducer } from "../reducers/customerReducers";
import { couponReducer, getCouponsReducer } from "../reducers/couponReducers";
import {
  getAllProductReducer,
  getProductDetailsReducer,
} from "../reducers/productReducers";
import {
  getAllCategoryReducer,
  getCategoryDetailsReducer,
} from "../reducers/categoryReducers";
import { getAllAdminReducer } from "../reducers/adminsReducers";
import { getAdminPermissionsReducer } from "../reducers/adminPermissionsReducers";
import {
  getAllGuestUsersApprovedReviewsReducer,
  getAllGuestUsersPendingReviewsReducer,
  getAllGuestUsersReviewsReducer,
} from "../reducers/guestUsersReviewsReducers";
import {
  getAllContactUsReducer,
  getContactUsDetailsReducer,
} from "../reducers/contactUsReducers";
import {
  getAllBlogReducer,
  getBlogDetailsReducer,
} from "../reducers/blogReducers";
import {
  getAllBlogCategoryReducer,
  getBlogCategoryDetailsReducer,
} from "../reducers/blogCategoryReducers";
import { getCategoryPageDetailsReducer } from "../reducers/digitalMarketing/categoryPageReducers";
import { getHomePageDetailsReducer } from "../reducers/digitalMarketing/homePageReducers";
import { getShopAllPageDetailsReducer } from "../reducers/digitalMarketing/shopAllPageReducers";
import { getAboutUsPageDetailsReducer } from "../reducers/digitalMarketing/aboutUsPageReducers";
import { getBlogPageDetailsReducer } from "../reducers/digitalMarketing/blogPageReducers";
import { getContactUsPageDetailsReducer } from "../reducers/digitalMarketing/contactUsReducers";
import { getPackageAndAuthenticityDetailsReducer } from "../reducers/digitalMarketing/packageAndAuthenticityReducers";
import { getPrivacyAndPolicyDetailsReducer } from "../reducers/digitalMarketing/privacyPolicyPageReducers";
import { getFaqDetailsReducer } from "../reducers/digitalMarketing/faqReducers";
import { getAboutUsDetailsReducer } from "../reducers/pagesFolder/aboutUsPageReducers";
import { getPackageAndAuthenticityPageDetailsReducer } from "../reducers/pagesFolder/packageAndAuthenticityPageReducers";
import { getPrivacyAndPolicyDetailsPageReducer } from "../reducers/pagesFolder/privacyPolicyPageReducers";
import { getCategoryPagePageDetailsReducer } from "../reducers/pagesFolder/categoryPageReducers";
import {
  getAllFaqsReducer,
  getFaqPageDetailsReducer,
} from "../reducers/pagesFolder/faqPageReducers";
import { uploadImagesReducer } from "../reducers/uploadImagesReducers";
import { getShopAllPagePageDetailsReducer } from "../reducers/pagesFolder/shopAllPageReducers";
import { getHomePageBannersDetailsReducer } from "../reducers/pagesFolder/homePagePageReducers";

const store = configureStore({
  reducer: {
    otp: otpReducer,
    auth: adminUserReducer,
    order: orderReducer,
    createOrder: createOrderReducer,
    customer: customerReducer,
    pendingOrder: pendingOrderReducer,
    completedOrder: completedOrderReducer,
    getOrder: getOrderReducer,
    updateOrderStatus: updateOrderStatusReducer,
    coupon: couponReducer,
    allCoupons: getCouponsReducer,
    products: getAllProductReducer,
    categories: getAllCategoryReducer,
    getCategoryDetailsReducer,
    getProductDetailsReducer,
    getAllAdminReducer,
    getAdminPermissionsReducer,
    getAllGuestUsersReviewsReducer,
    getAllGuestUsersPendingReviewsReducer,
    getAllGuestUsersApprovedReviewsReducer,
    getAllContactUsReducer,
    getContactUsDetailsReducer,
    getAllBlogReducer,
    getBlogDetailsReducer,
    getAllBlogCategoryReducer,
    getBlogCategoryDetailsReducer,
    getCategoryPageDetailsReducer,
    getHomePageDetailsReducer,
    getShopAllPageDetailsReducer,
    getAboutUsPageDetailsReducer,
    getBlogPageDetailsReducer,
    getContactUsPageDetailsReducer,
    getPackageAndAuthenticityDetailsReducer,
    getPrivacyAndPolicyDetailsReducer,
    getFaqDetailsReducer,
    getAboutUsDetailsReducer,
    getPackageAndAuthenticityPageDetailsReducer,
    getPrivacyAndPolicyDetailsPageReducer,
    getCategoryPagePageDetailsReducer,
    getFaqPageDetailsReducer,
    getAllFaqsReducer,
    uploadImagesReducer,
    getShopAllPagePageDetailsReducer,
    getHomePageBannersDetailsReducer,
    getAllOrdersCountAndRecentOrdersReducer,
  },
});

export default store; // Add a name to the default export
