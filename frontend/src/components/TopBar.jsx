import React, { useState, useEffect, useDebugValue } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCouponsAction } from "../redux/actions/couponActions";

const TopBar = () => {
  // const couponCodes = [
  //   "USE code  CMS30upto 40% OFF",
  //   "USE code TMU30 upto 50% OFF",
  //   "USE code LEEN30 upto 60% OFF",
  //   "USE code SPF30 upto 45% OFF",
  // ];

  const [currentCouponIndex, setCurrentCouponIndex] = useState(0);
  const [couponCodes, setCouponCodes] = useState([]);
  const [animationClass, setAnimationClass] = useState("");

  const dispatch = useDispatch();
  const { couponsLoading, coupons, couponsError } = useSelector(
    (state) => state.getAllCouponsReducer
  );

  // useEffect(() => {
  //   const sliderInterval = setInterval(() => {
  //     setCurrentCouponIndex(
  //       (prevIndex) => (prevIndex + 1) % couponCodes.length
  //     );
  //     setAnimationClass("slideUp");
  //   }, 4000);

  //   return () => clearInterval(sliderInterval);
  // }, []);

  const handleArrowClick = (direction) => {
    setAnimationClass("slideUp");
    if (direction === "prev") {
      setCurrentCouponIndex(
        (prevIndex) => (prevIndex - 1 + couponCodes.length) % couponCodes.length
      );
    } else if (direction === "next") {
      setCurrentCouponIndex(
        (prevIndex) => (prevIndex + 1) % couponCodes.length
      );
    }
  };

  const handleAnimationEnd = () => {
    setAnimationClass("");
  };

  useEffect(() => {
    dispatch(getAllCouponsAction());
  }, []);

  useEffect(() => {
    if (coupons) {
      setCouponCodes(coupons);
    }
  }, [coupons]);

  console.log(coupons, couponCodes, "coupons");

  return (
    <div className="top-bar">
      <div className="top-content">Help center</div>
      {coupons?.length >= 1 ? (
        <>
          <div className="centerbutton">
            <button
              onClick={() => handleArrowClick("prev")}
              className="coupprev"
            >
              &lt;
            </button>
          </div>

          <div className="center-content">
            <div
              className={`coupon-line ${animationClass}`}
              onAnimationEnd={handleAnimationEnd}
            >
              {`USE Code ${couponCodes[currentCouponIndex]?.code} upto ${couponCodes[currentCouponIndex]?.discountPercentage}% OFF`}
            </div>
          </div>

          <div className="centerndye">
            <button
              onClick={() => handleArrowClick("next")}
              className="coupnex"
            >
              &gt;
            </button>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="right-content">
        <span>
          <Link to="/Contactus" className="contact">
            Contact{" "}
          </Link>
        </span>{" "}
        <span>
          <Link to="/faq" className="faq">
            FAQ's
          </Link>
        </span>
      </div>
    </div>
  );
};

export default TopBar;
