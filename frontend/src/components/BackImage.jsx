import React, { useState, useEffect, useContext } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageBannersDetailsAction } from "../redux/actions/homePageImagesActions";
import Loading from "./Loading";
import BestSellBanner from "./BestSellBanner";
import CrazyDealsBanner from "./CrazyDealsBanner";
import { TheContextApi } from "../contextApi/TheContext";

const BackImage = () => {
  const { setBestSellerBanner, setCrazyDealBanner } = useContext(TheContextApi);
  const dispatch = useDispatch();
  const { loading, homePageBanners, error } = useSelector(
    (state) => state.getHomePageBannersDetailsReducer
  );
  const banners = [
    "/assets/TopBannerone.png",
    "/assets/TopBannertwo.png",
    "/assets/TopBannerthree.png",
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    dispatch(getHomePageBannersDetailsAction());
  }, []);

  console.log(homePageBanners, "homePageBanners,");

  useEffect(() => {
    if (homePageBanners?.imageUrlOne) {
      setBestSellerBanner(
        `https://uploadawsimages.s3.amazonaws.com/${homePageBanners?.imageUrlOne}`
      );
    }

    if (homePageBanners?.imageUrlTwo) {
      setCrazyDealBanner(
        `https://uploadawsimages.s3.amazonaws.com/${homePageBanners?.imageUrlTwo}`
      );
    }
  }, [homePageBanners]);

  return (
    <div className="medicine-store">
      {Object.keys(homePageBanners).length >= 1 && (
        <div
          className="topbanner"
          style={{
            position: "relative",
            overflow: "hidden",
            height: "560px!important",
            top: "32px",
            left: "119px",
          }}
        >
          {loading ? (
            <Loading />
          ) : error ? (
            <p>{error}</p>
          ) : homePageBanners?.sliderBannerImageUrl?.length <= 0 ? (
            <p>No, Image available to show!</p>
          ) : (
            homePageBanners?.sliderBannerImageUrl.map((banner, index) => (
              <img
                key={index}
                src={`https://uploadawsimages.s3.amazonaws.com/${banner}`}
                alt={`Banner ${index + 1}`}
                className={`top ${index === currentBanner ? "active" : ""}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: index === currentBanner ? 1 : 0,
                  transition: "opacity 0.5s ease-in-out",
                }}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default BackImage;
