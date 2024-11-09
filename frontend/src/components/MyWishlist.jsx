import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "react-js-pagination";
import ReactPaginate from "react-paginate";
import {
  FaUser,
  FaAddressCard,
  FaShoppingBag,
  FaHeart,
  FaCreditCard,
  FaSignOutAlt,
} from "react-icons/fa";
import HomePage from "./HomePage";

import Footer from "./Footer";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import SideBar from "./SideBar";
import { TheContextApi } from "../contextApi/TheContext";
import {
  deleteItemFromWishlist,
  getWishlist,
} from "../redux/actions/wishListActions";

const MyWishlist = () => {
  const { loginSignUpLoading, setLoginSignUpLoading } =
    useContext(TheContextApi);
  const [rating, setRating] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const bannersPerPage = 2;

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const dispatch = useDispatch();
  const { wishLoading, wishlistArray, wishlistCount, wishlistError } =
    useSelector((state) => state.getWishlistReducer);

  const banners = [
    {
      image: "/assets/Offer1.png",
      title: "Healthy Heart Capsules",
      price: 200,
    },
    { image: "/assets/Offer2.png", title: "Acme Pain Relief", price: 100 },
    { image: "/assets/Offer3.png", title: "SereniSleep Aid", price: 200 },
  ];
  const handleStarsClick = (starIndex) => {
    setRating(starIndex + 1);
  };

  const handleDeleteWishlistItem = (id) => {
    let confirm = window.confirm("Are you sure want to delete wish list item!");
    if (confirm === true) {
      // setCurrentPage(0);
      dispatch(deleteItemFromWishlist(id, setLoginSignUpLoading));
      handlePageClick(0);
    } else {
      return;
    }
  };

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    // setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(getWishlist(currentPage));
  }, [loginSignUpLoading, currentPage]);

  return (
    <div className="mypi">
      <HomePage />
      <div className="mypii">
        <SideBar />

        <div className="wishproduct">
          <h2>
            {/* <img src="/assets/backarr.png" alt="" className="sdd" /> */}
            My Wishlist
          </h2>
          <div className="shopwishproduct">
            {wishLoading ? (
              <Loading />
            ) : wishlistError ? (
              <p className="noitems">Something went wrong</p>
            ) : wishlistArray?.length <= 0 ? (
              <img src="/assets/emptywish.jpg" alt="" className="nj" />
            ) : (
              wishlistArray
                .filter((item) => item?.item !== null)
                .map((item, index) => (
                  <div className="wishevery">
                    <div key={index} className="ishop">
                      <a href={`#${index + 1}`}>
                        <img
                          src={item?.item?.image}
                          alt={`Slide ${index + 1}`}
                          className="img-responsive"
                        />
                      </a>
                      <div className="inwish">
                        <h2>
                          {item?.item?.name}
                          {/* {item?.item?._id} */}
                        </h2>
                        <div className="ratingw">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={`stars ${
                                i < rating ? "selected" : ""
                              }`}
                              onClick={() => handleStarsClick(i)}
                            >
                              &#9733;
                            </span>
                          ))}
                          <span className="reviews">{`${rating} `}</span>
                          <span className="helpful">
                            {item?.item?.shortDescription}
                          </span>
                        </div>
                        <p className="powish">{`$${item?.item?.price}`}</p>
                        <div className="productbestmywish-icons">
                          {/* buttonnnnnnnnnnnnnnnnnnnnnnn............////   */}
                          <button
                            onClick={() =>
                              handleDeleteWishlistItem(item?.item?._id)
                            }
                          >
                            {loginSignUpLoading ? (
                              <Loading />
                            ) : (
                              <span
                                role="img"
                                aria-label="heart"
                                style={{ color: "white" }}
                              >
                                🤍
                              </span>
                            )}
                          </button>
                        </div>

                        <div className="addbuywish">
                          <button
                            onClick={() => console.log("Add to Cart clicked")}
                            className="add-to-cart"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>

          <div className="wishlistpgi">
            <ReactPaginate
              forcePage={0}
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={Math.ceil(Math.max(0, wishlistCount) / bannersPerPage)}
              marginPagesDisplayed={1}
              pageRangeDisplayed={1}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyWishlist;
