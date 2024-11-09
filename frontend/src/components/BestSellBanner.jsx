import React, { useContext } from "react";
import { TheContextApi } from "../contextApi/TheContext";

const BestSellBanner = () => {
  const { bestSellerBanner } = useContext(TheContextApi);
  return (
    // <div className="Best-Sell">
    <div className="crazy-deals-banner">
      {/* <div className="banner-content">
        <h2>CRAZY DEALS</h2>
        <p className='upto'>Upto </p>
        <p className='per'>40% </p>
        <p className='offf'>Off</p>
        <button>Shop Now</button>
      </div> */}
      <img
        src={bestSellerBanner ? `${bestSellerBanner}` : "/assets/banner3.jpg"}
        alt=""
        srcset=""
      />

      {/* </div> */}
    </div>
  );
};

export default BestSellBanner;
