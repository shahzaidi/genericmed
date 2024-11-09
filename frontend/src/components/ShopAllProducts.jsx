import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slider";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
// import Pagination from "react-js-pagination";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./HomePage";
import Form from "react-bootstrap/Form";
import Footer from "./Footer";
import Categories from "./Categories";

import { Link, useNavigate } from "react-router-dom";
import {
  getAllProducts,
  getShopAllMetaPageDetails,
} from "../redux/actions/products/productActions";
import { addProductInWishlist } from "../redux/actions/wishListActions";
import ShopAllproductsMobile from "./ShopAllProductsMobile";
import Loading from "./Loading";
import HomePageMobile from "./HomepageMobile";
import { Helmet } from "react-helmet";
import { getShopAllPageBannersDetailsAction } from "../redux/actions/shopAllPageImagesActions";

const ShopAllproducts = () => {
  // const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const [price, setPrice] = useState([0, 12000]);
  const [wishlist, setWishlist] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);

  const params = useParams();

  let { keyword } = params;

  const dispatch = useDispatch();
  const {
    loading,
    products,
    error,
    productCount,
    productCountWithApiFeatures,
  } = useSelector((state) => state?.products);

  const { shopAllLoading, shopAll, shopAllError } = useSelector(
    (state) => state.getShopAllMetaPageDetailsReducer
  );

  const { shopAllPageLoading, shopAllPageBanners, shopAllPageError } =
    useSelector((state) => state.getShopAllPageBannersDetailsReducer);

  // const pageAndProducts = useMemo(() => {
  //   return setCurrentPage(0);
  // }, [productCountWithApiFeatures]);

  // setCount(pageAndProducts);

  // console.log(pageAndProducts, "memo");
  const bannersPerPage = 12;
  const MIN = 0;
  const MAX = 12000;
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

  // const handleStarsClick = (starIndex) => {
  //   setRating(starIndex + 1);
  // };
  const paginatedBanners = banners.slice(
    currentPage * bannersPerPage,
    (currentPage + 1) * bannersPerPage
  );

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    // setCurrentPage(e);
  };

  console.log(
    // count,
    currentPage,
    productCount,
    productCountWithApiFeatures,
    Math.ceil(
      Math.max(
        0,
        typeof productCountWithApiFeatures === "number" &&
          productCountWithApiFeatures >= 0
          ? productCountWithApiFeatures
          : typeof productCount === "number" && productCount >= 0
          ? productCount
          : 0
      ) / bannersPerPage
    ),
    "curr"
  );

  let dCount = Math.ceil(
    Math.max(
      0,
      typeof productCountWithApiFeatures === "number" &&
        productCountWithApiFeatures >= 0
        ? productCountWithApiFeatures
        : typeof productCount === "number" && productCount >= 0
        ? productCount
        : 0
    ) / bannersPerPage
  );

  const [currentBanner, setCurrentBanner] = useState(0);
  const ba = [
    "/assets/Categoriesdslider.png",
    "/assets/Categors2.png",
    "/assets/Categors3.png",
  ];

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentBanner((prevIndex) => (prevIndex + 1) % ba.length);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  const [sliderValue, setSliderValue] = useState(50);
  const [prevSliderValue, setPrevSliderValue] = useState(0);

  // const [categories, setCategories] = useState([
  //   { name: "acne11" },
  //   { name: "acneCream12" },
  //   { name: "antivirals" },
  //   { name: "antifungals" },
  //   { name: "antidepressants" },
  //   { name: "diuretics" },
  //   { name: "immunoSuppressants" },
  //   { name: "hormones" },
  //   { name: "muscleRelaxants" },
  //   { name: "avv" },
  //   { name: "av" },
  // ]);
  const [categories, setCategories] = useState([
    "Category 1",
    "Category 2",
    "Category 3",
  ]);
  const [isDiscount, setIsDiscount] = useState(0);
  const [discounts, setDiscounts] = useState([10, 20, 30, 40, 50]);
  const [isRating, setIsRating] = useState(0);
  const [ratings, setRatings] = useState([1, 2, 3, 4]);
  const [category, setCategory] = useState("");

  // const toggleWishlist = (id, num) => {
  //   if (num === 1) {
  //     dispatch(addProductInWishlist(id));
  //   }
  // };
  const [isCategoryChecked, setIsCategoryChecked] = useState("");
  const handleCategoryChange = (category) => {
    // console.log(category, "aaaa", isCategoryChecked, "aaaa");
    // console.log(category === isCategoryChecked ? "" : category, "aaaaaaa//");
    setCurrentPage(0);
    setIsCategoryChecked(category === isCategoryChecked ? "" : category);
    // console.log(isCategoryChecked, "categaroy value");
  };

  const handleDiscountChange = (discount) => {
    setCurrentPage(0);
    setIsDiscount(discount === isDiscount ? 0 : discount);
  };

  const handleRatingChange = (rating) => {
    setCurrentPage(0);
    setIsRating(rating === isRating ? 0 : rating);
  };
  // console.log(isCategoryChecked, "aaaa2");
  const handleSliderChange = (newValues) => {
    setCurrentPage(0);
    setPrice(newValues);
  };

  console.log("Price:", price);

  // useEffect(() => {
  //   if (currentPage > dCount) {
  //     setCurrentPage(0);
  //   }
  // }, [currentPage, keyword, price, isCategoryChecked, isDiscount, isRating]);

  useEffect(() => {
    dispatch(
      getAllProducts(
        keyword,
        price,
        isCategoryChecked,
        isDiscount,
        isRating,
        currentPage
      )
    );
  }, [
    keyword,
    price,
    isCategoryChecked,
    isDiscount,
    isRating,
    currentPage,
    dispatch,
  ]);

  // useEffect(() => {
  // if (products?.length >= 1) {
  // Use a Set to store unique categories
  // const categorySet = new Set();
  // products.forEach((p) => categorySet.add(p.category));

  // Convert the Set back to an array
  // const uniqueCategories = Array.from(categorySet);

  // Set the unique categories
  // setCategories(uniqueCategories);
  // }
  // }, [dispatch, products]);

  console.log(
    // category,
    // products,
    // category,
    // isDiscount,
    // isRating,
    "///////////////////",
    // products.map((p) => console.log(p.category)),
    // categories,
    "catogry............//////////////////////////////.................//////",

    // shopAll,
    shopAllPageBanners
    // products.map((p)=> console.log(p.category))
  );

  const addInWishList = (id) => {
    dispatch(addProductInWishlist(id));
  };

  useEffect(() => {
    dispatch(getShopAllMetaPageDetails());
  }, []);

  useEffect(() => {
    dispatch(getShopAllPageBannersDetailsAction());
  }, []);

  const metaFunction = (shopAll) => {
    if (Object.keys(shopAll).length !== 0) {
      return (
        <Helmet>
          <meta name="description" content={shopAll?.metaDescription} />
          <meta name="title" content={shopAll?.metaTitle} />
          <meta name="keyword" content={shopAll?.metaKeyword} />
          <meta name="slug" content={shopAll?.slug} />
          {/* Other meta tags */}
        </Helmet>
      );
    } else {
      return;
    }
  };

  return (
    <div className="cghvx">
      <HomePage />
      <HomePageMobile />

      <div className="cs">
        {metaFunction(shopAll)}
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
              {shopAllPageLoading ? (
                <Loading />
              ) : (
                shopAllPageBanners?.sliderBannerImageUrl?.map(
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
          <h1 className="hety">Shop All Products</h1>
          <ShopAllproductsMobile />
          <div className="proshop">
            <div className="chki">
              <div className="filters">
                <div className="price">
                  <h1>By Price</h1>

                  <div className="single-track-multi-range">
                    <Slider
                      className="sliiuder"
                      value={price}
                      min={MIN}
                      max={MAX}
                      onChange={handleSliderChange}
                      withBars
                    />
                  </div>

                  <div className="sliyfhder">
                    <div className="sliderr__track" />
                    <div
                      className="slider__range"
                      style={{
                        left: `${(price[0] / MAX) * 100}%`,
                        width: `${((price[1] - price[0]) / MAX) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div id="single-track-multi-range-value" className="mt-3">
                  Range
                  <span className="d-flex flex-column">
                    <div className={"values"}>
                      ${price[0]}-${price[1]}
                    </div>
                  </span>
                </div>
              </div>

              <button className="fil">Filter</button>
              {/* <h1>Discount</h1> */}
              <div className="filcreams">
                {categories &&
                  categories?.map((category, i) => (
                    <div key={i} className="catfilters">
                      <input
                        type="radio"
                        className="rdo"
                        name="category"
                        value={category}
                        checked={category === isCategoryChecked}
                        onClick={(e) => handleCategoryChange(category)}
                      />
                      <label className="ctnme">{category}</label>
                    </div>
                  ))}
              </div>
              <div className="dis">
                <h1>Discount</h1>
                <div className="fillcreams">
                  {discounts &&
                    discounts?.map((discount, i) => (
                      <label key={i}>
                        <input
                          type="radio"
                          name="discount"
                          value={discount}
                          checked={discount === isDiscount}
                          onClick={(e) => handleDiscountChange(discount)}
                        />
                        {discount}% and Above
                      </label>
                    ))}
                </div>
              </div>

              <div className="dist">
                <h1>Avg Customer Rating</h1>
                <div className="filllcreams">
                  {ratings &&
                    ratings?.map((rating, i) => (
                      <label key={i} label>
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={rating === isRating}
                          onClick={(e) => handleRatingChange(rating)}
                        />
                        {rating} Stars and Above
                      </label>
                    ))}
                </div>
              </div>
            </div>

            <div className="shopssallproduct">
              {loading ? (
                <Loading />
              ) : error ? (
                <p>{error}</p>
              ) : products && products.length <= 0 ? (
                <p>No Items Available to show!</p>
              ) : (
                products.map((product, index) => (
                  <div key={product?._id} className="imagesshop">
                    <Link to={`/productPage/${product?._id}`}>
                      <img
                        src={
                          hoveredIndex === index || product?.images.length >= 1
                            ? `https://uploadawsimages.s3.amazonaws.com/${product?.image}`
                            : product?.image
                        }
                        alt={`Slide ${index + 1}`}
                        className="img-responsive"
                      />
                    </Link>

                    <div className="in">
                      <h2>{product?.name}</h2>
                      <div className="rating">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={`stars ${
                              i < product?.ratings ? "selected" : ""
                            }`}
                            // onClick={() => handleStarsClick(i)}
                          >
                            &#9733;
                          </span>
                        ))}
                        <span className="reviews">{`${product?.ratings} `}</span>
                      </div>
                      <p className="praao">{`$${product?.price}`}</p>

                      <div className="productshopall-icons">
                        <button onClick={() => addInWishList(product?._id)}>
                          {wishlist[product.id] ? (
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

                      <div className="addbuyshopall">
                        <button
                          onClick={() =>
                            navigate(`/productPage/${product?._id}`)
                          }
                          className="add-to-cart"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="pagination-container">
          {/* <Pagination
            activePage={currentPage}
            itemsCountPerPage={bannersPerPage}
            totalItemsCount={Math.ceil(
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
            onChange={handlePageClick}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          ></Pagination> */}
          {/* { setCount(
              Math.ceil(
                Math.max(
                  0,
                  typeof productCountWithApiFeatures === "number" &&
                    productCountWithApiFeatures >= 0
                    ? productCountWithApiFeatures
                    : typeof productCount === "number" && productCount >= 0
                    ? productCount
                    : 0
                ) / bannersPerPage
              ))} */}
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
      </div>
      <Footer />
    </div>
  );
};

export default ShopAllproducts;
