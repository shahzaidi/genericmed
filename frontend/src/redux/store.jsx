import { combineReducers } from "redux";

import { createStore, applyMiddleware } from "redux";

import { thunk } from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import {
  getAllBestOffersProductReducer,
  getAllBestSellerProductReducer,
  getAllFeaturedProductsReducer,
  getAllProductReducer,
  getProductDetailsReducer,
  getShopAllMetaPageDetailsReducer,
} from "./reducers/productReducer";
import { sendOtpToMailReducer } from "./reducers/otpReducers";
import {
  userRegisterReducer,
  getUserDetailsReducer,
  getUserAddressReducer,
} from "./reducers/userReducers";
import { getProductReviewsReducer } from "./reducers/reviewsReducers";
import { getWishlistReducer } from "./reducers/wishListReducer";
import {
  getAllCategoryReducer,
  getCategoryMetaPageDetailsReducer,
} from "./reducers/categoryReducers";
import { getCartItemsReducer } from "./reducers/cartReducers";
import { couponReducer, getAllCouponsReducer } from "./reducers/couponReducer";
import { getSelectedSippingAddressForLoginUserReducer } from "./reducers/shippingAddressReducer";
import { getOrderDetailsReducer } from "./reducers/orderReducers";
import {
  getAllBlogCategoryReducer,
  getAllBlogReducer,
  getBlogDetailsReducer,
  getBlogPageDetailsReducer,
  // getBlogsMetaPageDetailsReducer,
  getHomePageBlogsReducer,
} from "./reducers/blogReducers";
import {
  getAllFaqsReducer,
  getFaqPageDetailsReducer,
} from "./reducers/faqReducers";
import {
  getAboutUsDetailsReducer,
  getAboutUsPageMetaDetailsReducer,
} from "./reducers/aboutUsPageReducers";
import { getHomePageBannersDetailsReducer } from "./reducers/homePageImagesReducers";
import { getHomePageMetaDetailsReducer } from "./reducers/homePageReducers";
import { getContactUsMetaPageDetailsReducer } from "./reducers/contactUsReducers";
import { getCategoriesPageBannersDetailsReducer } from "./reducers/categoriesPageImagesReducers";
import { getShopAllPageBannersDetailsReducer } from "./reducers/shopAllPageImagesReducers";

const finalReducer = combineReducers({
  products: getAllProductReducer,
  getProduct: getProductDetailsReducer,
  bestSellersProducts: getAllBestSellerProductReducer,
  bestOffersProducts: getAllBestOffersProductReducer,
  sendOtpReducer: sendOtpToMailReducer,
  registerUser: userRegisterReducer,
  productReviews: getProductReviewsReducer,
  getUserDetailsReducer,
  getWishlistReducer,
  getUserAddressReducer,
  getAllCategoryReducer,
  getCartItemsReducer,
  couponReducer,
  getSelectedSippingAddressForLoginUserReducer,
  getOrderDetailsReducer,
  getAllBlogReducer,
  getAllBlogCategoryReducer,
  getAllFeaturedProductsReducer,
  getAllCouponsReducer,
  getAllFaqsReducer,
  getFaqPageDetailsReducer,
  getAboutUsDetailsReducer,
  getHomePageBannersDetailsReducer,
  getBlogPageDetailsReducer,
  getHomePageMetaDetailsReducer,
  getCategoryMetaPageDetailsReducer,
  getShopAllMetaPageDetailsReducer,
  getAboutUsPageMetaDetailsReducer,
  getContactUsMetaPageDetailsReducer,
  getBlogDetailsReducer,
  getHomePageBlogsReducer,
  getCategoriesPageBannersDetailsReducer,
  getShopAllPageBannersDetailsReducer,
  // getBlogsMetaPageDetailsReducer,
});

const initialState = {};

const composeEnhancers = composeWithDevTools({});

export const store = createStore(
  finalReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
