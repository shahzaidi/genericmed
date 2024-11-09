import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import ReactPaginate from "react-paginate";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./HomePage";
import Footer from "./Footer";
import CattopMobile from "./CattopMobile";
import ShippingFootMobile from "./ShippingFootMobile";
import FooterMobile from "./FooterMobile";
import OthersubcatMobile from "./OthersubcatMobile";
import LoadmoreCatMobile from "./LoadmoreCatMobile";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/products/productActions";
import {
  getAllCategory,
  getCategoryMetaPageDetails,
} from "../redux/actions/categoryActions";
import Loading from "./Loading";
import HomePageMobile from "./HomepageMobile";
import { addProductInWishlist } from "../redux/actions/wishListActions";
import { Helmet } from "react-helmet";
import { getCategoriesPageBannersDetailsAction } from "../redux/actions/categoriesPageImagesActions";

const Categories = () => {
  const [rating, setRating] = useState(0);

  const [wishlist, setWishlist] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const bannersPerPage = 12;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading,
    products,
    error,
    productCount,
    productCountWithApiFeatures,
  } = useSelector((state) => state?.products);

  const { categoriesPageLoading, categoriesPageBanners, categoriesPageError } =
    useSelector((state) => state.getCategoriesPageBannersDetailsReducer);

  const { categoryLoading, categories, categoryCount, categoryError } =
    useSelector((state) => state?.getAllCategoryReducer);
  const slidesToShow = Math.min(categories.length, 4);

  const { categoryMetaLoading, categoryPage, categoryMetaError } = useSelector(
    (state) => state.getCategoryMetaPageDetailsReducer
  );

  const settings = {
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    prevArrow: (
      <button type="button" className="slick-prev">
        <i className="glyphicon glyphicon-chevron-left"></i>
      </button>
    ),
    nextArrow: (
      <button type="button" className="slick-next">
        <i className="glyphicon glyphicon-chevron-right"></i>
      </button>
    ),
  };

  const setti = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    prevArrow: (
      <button type="button" className="slick-prev">
        <i className="glyphicon glyphicon-chevron-left"></i>
      </button>
    ),
    nextArrow: (
      <button type="button" className="slick-next">
        <i className="glyphicon glyphicon-chevron-right"></i>
      </button>
    ),
  };
  const banners = [
    {
      id: 1,
      image: "/assets/Offer1.png",
      title: "Healthy Heart Capsules",
      price: 200,
    },
    {
      id: 2,
      image: "/assets/Offer2.png",
      title: "Acme Pain Relief",
      price: 100,
    },
    {
      id: 3,
      image: "/assets/Offer3.png",
      title: "SereniSleep Aid",
      price: 200,
    },
    {
      id: 4,
      image: "/assets/Offer4.png",
      title: "Revitalize Energy Tonic",
      price: 70,
    },
    {
      id: 5,
      image: "/assets/Offer1.png",
      title: "Healthy Heart Capsules",
      price: 80,
    },
    {
      id: 6,
      image: "/assets/Offer2.png",
      title: "Acme Pain Relief",
      price: 20,
    },
    {
      id: 7,
      image: "/assets/Offer3.png",
      title: "SereniSleep Aid",
      price: 100,
    },
    {
      id: 8,
      image: "/assets/Offer4.png",
      title: "Revitalize Energy Tonic",
      price: 500,
    },
    {
      id: 9,
      image: "/assets/Offer1.png",
      title: "Healthy Heart Capsules",
      price: 40,
    },
    {
      id: 10,
      image: "/assets/Offer2.png",
      title: "Acme Pain Relief",
      price: 65,
    },
    {
      id: 11,
      image: "/assets/Offer3.png",
      title: "SereniSleep Aid",
      price: 55,
    },
    {
      id: 12,
      image: "/assets/Offer4.png",
      title: "Revitalize Energy Tonic",
      price: 25,
    },
    {
      id: 13,
      image: "/assets/Offer1.png",
      title: "Healthy Heart Capsules",
      price: 30,
    },
    {
      id: 14,
      image: "/assets/Offer2.png",
      title: "Acme Pain Relief",
      price: 60,
    },
    {
      id: 15,
      image: "/assets/Offer3.png",
      title: "SereniSleep Aid",
      price: 50,
    },
    {
      id: 16,
      image: "/assets/Offer4.png",
      title: "Revitalize Energy Tonic",
      price: 30,
    },
  ];

  // const handleStarsClick = (starIndex) => {
  //   setRating(starIndex + 1);
  // };
  const paginatedBanners = banners.slice(
    currentPage * bannersPerPage,
    (currentPage + 1) * bannersPerPage
  );

  // const handlePageClick = (selectedPage) => {
  //   setCurrentPage(selectedPage.selected);
  // };

  const [currentBanner, setCurrentBanner] = useState(0);
  const ba = [
    "/assets/Categoriesdslider.png",
    "/assets/Categors2.png",
    "/assets/Categors3.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prevIndex) => (prevIndex + 1) % ba.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isWishlistHovered, setIsWishlistHovered] = useState(null);
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    setIsWishlistHovered(null);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  const handleWishlistMouseEnter = (id) => {
    setIsWishlistHovered(id);
  };

  const handleWishlistMouseLeave = () => {
    setIsWishlistHovered(null);
  };

  // const toggleWishlist = (id) => {
  //   setWishlist((prevWishlist) => ({
  //     ...prevWishlist,
  //     [id]: !prevWishlist[id],
  //   }));
  // };

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    // setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(getAllProducts("", [0, 500000000], "", "", 0, currentPage));
    dispatch(getAllCategory());
  }, [currentPage]);

  const addInWishList = (id) => {
    dispatch(addProductInWishlist(id));
  };

  useEffect(() => {
    dispatch(getCategoryMetaPageDetails());
  }, []);

  useEffect(() => {
    dispatch(getCategoriesPageBannersDetailsAction());
  }, []);

  console.log(categoriesPageBanners, "categoriesPageBanners");

  const metaFunction = (categoryPage) => {
    if (Object.keys(categoryPage).length !== 0) {
      return (
        <Helmet>
          <meta name="description" content={categoryPage?.metaDescription} />
          <meta name="title" content={categoryPage?.metaTitle} />
          <meta name="keyword" content={categoryPage?.metaKeyword} />
          <meta name="slug" content={categoryPage?.slug} />
          {/* Other meta tags */}
        </Helmet>
      );
    } else {
      return;
    }
  };

  // console.log(categoryPage, "categoryPage././../..//./././//");
  return (
    <div className="cghvx">
      <HomePage />
      <HomePageMobile />
      <div className="cs">
        {metaFunction(categoryPage)}
        <div>
          {" "}
          <div className="medicine-st">
            <div
              className="topbanner"
              style={{
                position: "relative",
                overflow: "hidden",
                height: "568px",
                top: "32px",
              }}
            >
              {categoriesPageLoading ? (
                <Loading />
              ) : (
                categoriesPageBanners?.sliderBannerImageUrl?.map(
                  (banner, index) => (
                    <img
                      key={index}
                      src={`https://uploadawsimages.s3.amazonaws.com/${banner}`}
                      alt={`Banner ${index + 1}`}
                      className={`tops ${
                        index === currentBanner ? "active" : ""
                      }`}
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
                  )
                )
              )}
            </div>
          </div>
          <div className="containehvnvnr">
            <h1 className="sx">Explore Our Top Categories</h1>
            <Slider {...settings}>
              {categoryLoading ? (
                <Loading />
              ) : categoryError ? (
                <p>{categoryError}</p>
              ) : categories.length <= 0 ? (
                <p>No Items Available to show!</p>
              ) : (
                categories.map((category, index) => (
                  <Link to="/subcategories" id="dnsj">
                    <div
                      key={index}
                      className="imagessubcategory"
                      style={{ margin: "10px" }}
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      <a href={`#${index + 1}`}>
                        <img
                          src={category?.image}
                          alt={`Slide ${index + 1}`}
                          className="img-responsive"
                        />
                      </a>
                      <div className="information_in">
                        <h2 className="h">{category?.name}</h2>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </Slider>
          </div>
          <CattopMobile />
          {/* <div className="othersub">
            <h1>Other Subcategories</h1>
            <div
              className="containezcsr"
              style={{ height: "255px" }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Slider {...setti}>
                {banners.map((banner, index) => (
                  <Link to="/subcategories" id="dnsj">
                    {" "}
                    <div key={index} className="category-slide">
                      <a href={`#${index + 1}`}>
                        <img
                          src={banner.image}
                          alt={`Slid ${index + 1}`}
                          className="banners"
                        />
                      </a>

                      <div className="banner-title">
                        <p>{banner.title}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </Slider>
            </div>
          </div> */}
          <OthersubcatMobile />
          <div className="proshopcateg">
            <h1 className="hety">Shop All Products</h1>
            <div className="shopallproduct">
              {loading ? (
                <Loading />
              ) : error ? (
                <p>{error}</p>
              ) : products && products.length <= 0 ? (
                <p className="noitem">No Items Available to show!</p>
              ) : (
                products.map((banner, index) => (
                  <div className="everyall">
                    <div key={banner._id} className="imagesshopto">
                      <Link to={`/productPage/${banner?._id}`}>
                        <img
                          src={
                            hoveredIndex === index || banner?.images.length >= 1
                              ? `https://uploadawsimages.s3.amazonaws.com/${banner?.image}`
                              : banner?.image
                          }
                          alt={`Slide ${index + 1}`}
                          className="img-responsive"
                        />
                      </Link>

                      <div className="in">
                        <h2>{banner?.name}</h2>
                        <div className="rating">
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

                          {/* <span className="helpful">Helpful in Many ways...</span> */}
                        </div>
                        <p className="praao">{`$${banner?.price}`}</p>
                        <div className="productcategory-icons">
                          <button onClick={() => addInWishList(banner?._id)}>
                            {wishlist[banner.id] ? (
                              <span
                                role="img"
                                aria-label="heart"
                                style={{ color: "red" }}
                              >
                                ❤️
                              </span>
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

                        <div className="addbuycategor">
                          <button
                            onClick={() =>
                              navigate(`/productPage/${banner?._id}`)
                            }
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
            <LoadmoreCatMobile />
            {/* <div className='prooshop'>
      <h1>Shop All Products</h1>
      <div className="shopssallproduct">
        {banners.slice(0, visibleProducts).map((banner, index) => (
          <div className='everyall' key={index}>
            <div className='imagesshop'>
              <a href={`#${index + 1}`}>
                <img src={banner.image} alt={`Slide ${index + 1}`} className="img-responsive" />
              </a>
              <div className='in'>
                <h2>{banner.title}</h2>
                <div className="rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={`stars ${i < rating ? 'selected' : ''}`} onClick={() => handleStarsClick(i)}>&#9733;</span>
                  ))}
                  <span className="reviews">{`${rating} `}</span>
                  <span className="helpful">Helpful in Many ways...</span>
                </div>
                <p className='praao'>{`$${banner.price}`}</p>
                <div className='addbuy'>
                  <button onClick={() => console.log('Add to Cart clicked')} className='add-to-cart'>Add to Cart</button>
                  <button onClick={() => console.log('Buy now clicked')} className='bu'>Buy Now</button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {loading && <p>Load More..</p>}
      </div>
    </div> */}

            {/* Pagination */}
            <ReactPaginate
              forcePage={0}
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              // pageCount={Math.ceil(
              //   (productCountWithApiFeatures >= 1
              //     ? productCountWithApiFeatures
              //     : productCount) / bannersPerPage
              // )}
              pageCount={Math.ceil(
                Math.max(
                  0,
                  typeof productCountWithApiFeatures === "number" &&
                    productCountWithApiFeatures >= 0
                    ? productCountWithApiFeatures
                    : typeof productCount === "number" && productCount >= 0
                    ? productCount
                    : 0
                ) / bannersPerPage
              )}
              marginPagesDisplayed={1}
              pageRangeDisplayed={1}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
          <LoadmoreCatMobile />
        </div>
      </div>
      <Footer />
      <ShippingFootMobile />
      <FooterMobile />
    </div>
  );
};

export default Categories;
