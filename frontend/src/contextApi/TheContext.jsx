import React, { createContext, useState } from "react";

export const TheContextApi = createContext();

const TheContext = ({ children }) => {
  const [otp1Loading, setOtp1Loading] = useState(false);
  const [userCLoading, setUserCLoading] = useState(false);
  const [loginSignUpLoading, setLoginSignUpLoading] = useState(false);
  const [sentOtpAtOnes, setSentOtpAtOnes] = useState(false);
  const [resentOtp, setResentOtp] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [contactLoading, setContactLoading] = useState(false);
  const [contacted, setContacted] = useState(false);
  const [couponObject, setCouponObject] = useState({});
  const [subTotal2, setSubTotal2] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);
  const [addressState, setAddressState] = useState(false);
  const [bestSellerBanner, setBestSellerBanner] = useState(null);
  const [crazyDealBanner, setCrazyDealBanner] = useState(null);
  const [cartPageDone, setCartPageDone] = useState(false);
  const [checkOutPageDone, setCheckOutPageDone] = useState(false);
  const [paymentReviewPageDone, setPaymentReviewOutPageDone] = useState(false);
  return (
    <>
      <TheContextApi.Provider
        value={{
          otp1Loading,
          setOtp1Loading,
          loginSignUpLoading,
          setLoginSignUpLoading,
          sentOtpAtOnes,
          setSentOtpAtOnes,
          resentOtp,
          setResentOtp,
          authUser,
          setAuthUser,
          userCLoading,
          setUserCLoading,
          cartLoading,
          setCartLoading,
          cartItemCount,
          setCartItemCount,
          contacted,
          setContacted,
          contactLoading,
          setContactLoading,
          couponObject,
          setCouponObject,
          subTotal2,
          setSubTotal2,
          orderNumber,
          setOrderNumber,
          addressState,
          setAddressState,
          bestSellerBanner,
          setBestSellerBanner,
          crazyDealBanner,
          setCrazyDealBanner,
          cartPageDone,
          setCartPageDone,
          checkOutPageDone,
          setCheckOutPageDone,
          paymentReviewPageDone,
          setPaymentReviewOutPageDone,
        }}
      >
        {children}
      </TheContextApi.Provider>
    </>
  );
};

export default TheContext;
