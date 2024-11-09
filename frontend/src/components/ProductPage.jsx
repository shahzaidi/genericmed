import React, { useState, useRef, useEffect, useContext } from "react";
import HomePage from "./HomePage";
import ProductCartVisible from "./ProductCartVisible";
import Footer from "./Footer";
import { Link, useParams, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getProductDetails,
} from "../redux/actions/products/productActions";
import {
  getProductReviews,
  giveAndUpdateReviewByLoginUser,
} from "../redux/actions/reviewsActions";
import { TheContextApi } from "../contextApi/TheContext";
import { addProductItemInCart } from "../redux/actions/cartActions";
import Loading from "./Loading";
import RelatedProductMobile from "./RelatedProductMobile";
import { Helmet } from "react-helmet";
import { addProductInWishlist } from "../redux/actions/wishListActions";

const ProductPage = () => {
  const [rating, setRating] = useState(0);
  const [loadingIndex, setLoadingIndex] = useState(null);

  const [price, setPrice] = useState([0, 12000]);

  const [currentPage, setCurrentPage] = useState(0);
  const [count, setCount] = useState(null);

  const { authUser, cartLoading, setCartLoading } = useContext(TheContextApi);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const {
    products,

    productCount,
    productCountWithApiFeatures,
  } = useSelector((state) => state?.products);

  const { loading, product, error } = useSelector((state) => state.getProduct);
  const { reviewsLoading, reviewsArray, reviewsError } = useSelector(
    (state) => state.productReviews
  );
  const settings = {
    infinite: true,
    slidesToShow: 5,
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
      mage: "/assets/Offer2.png",
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
  const [selectedImage, setSelectedImage] = useState("/assets/Offer1.png");
  const images =
    id && product?.images?.length >= 1
      ? product?.images
      : [
          "/assets/Offer1.png",
          "/assets/Offer2.png",
          "/assets/Offer3.png",
          "/assets/Offer4.png",
        ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [quantities, setQuantities] = useState([]);

  // {
  //   product?.variantsAndPrices.map((vp, i) => {
  //     setQuantities(quantities, (quantities[i] = 0));
  //   });
  // }

  const handleQuantityChange = (packSize, value) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [packSize]: value,
    }));
  };
  const [cartVisible, setCartVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [couponVisible, setCouponVisible] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [userName, setUserName] = useState("");

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      handleQuantityChange(index, -1);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const increaseQuantity = (index) => {
    const currentQuantity = cartItems[index].quantity;

    const updatedQuantity = currentQuantity + 1;

    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = updatedQuantity;

    setCartItems(updatedCartItems);

    handleQuantityChange(index, updatedQuantity);
  };
  const toggleCouponInput = () => {
    setCouponVisible(!couponVisible);
  };
  const couponInputRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      couponInputRef.current &&
      !couponInputRef.current.contains(event.target)
    ) {
      setCouponVisible(false);
    }
  };
  // useEffect(() => {
  //   if (cartVisible) {
  //     document.body.classList.add('cart-open');
  //   } else {
  //     document.body.classList.remove('cart-open');
  //   }
  // }, [cartVisible]);

  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
  };

  const handleAddToCart = (vp, i) => {
    setLoadingIndex(i);
    let quantity = quantities[i]?.count;
    let productId = id;
    let productName = product?.name;
    console.log(123, "vpppp");
    let variants = [
      {
        name: vp?.name,
        price: vp?.price,
        quantity,
        variantTotal: Number(vp?.price * quantity),
      },
    ];

    console.log(variants, 234, "vpppp");

    if (quantity > 0) {
      dispatch(
        addProductItemInCart(productId, productName, variants, setCartLoading)
      );
      setCartVisible(true);
    } else {
      return window.alert("Please select at least one quantity");
    }

    // const newItem = {
    //   name: `Product C - ${packSize} Tablet/s`,
    //   price: packSize === "30" ? 8.99 : packSize === "60" ? 25.33 : 8.99,
    //   quantity: 1,
    //   packSize: packSize,
    // };
    // setCartItems([...cartItems, newItem]);
    // setCartVisible(true);
  };

  const handleRemoveFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal();
  };
  const handleImageClick = (imageUrl) => {
    imageUrl =
      product?.images?.length >= 1
        ? `https://uploadawsimages.s3.amazonaws.com/${imageUrl}`
        : imageUrl;
    setSelectedImage(imageUrl);
  };

  // const handleStarsClick = (starIndex) => {
  //   setRating(starIndex + 1);
  // };

  const [productData, setProductData] = useState({
    id: 1,
    name: "Healthy Heart Capsules",
    price: "$19",
    rating: 4.8,
    totalRatings: 100,
    totalReviews: 45,
    variants: [
      { type: "Standard (30 Capsule)", quantity: 30 },
      { type: "Economy Pack (100 Capsule)", quantity: 60 },
    ],
  });

  const [selectedVariant, setSelectedVariant] = useState(
    productData.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false);

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
  const toggleWishlist = (id) => {
    setWishlist((prevWishlist) => ({
      ...prevWishlist,
      [id]: !prevWishlist[id],
    }));
  };
  const [selectedTab, setSelectedTab] = useState("description");
  useEffect(() => {
    handleTabClick("description");
  }, []);

  const content = {
    description: product?.description,
    // "Healthy Heart Capsules contain analgesic, anti-inflammatory, anti-arthritic, and anti-diabetic properties. The constituents of Arjuna present in them work in harmony with nature and help in maintaining a healthy heart. Arjuna is a natural blood purifier that helps control the sugar levels in the blood.",
    manufacturer: product?.manufacturer,
    // "Keva Herbals - Offering Healthy Heart Capsules, Packaging Type: Plastic Bottle at Rs 445/bottle in Amritsar, Punjab. Also find Herbal Heart Capsule Tablet ...",
    strength: product?.strength,
    // "Promotes cardiac muscle strength and healthy heart-pumping activity. Helps to maintain healthy cholesterol levels. ",
    dosage: product?.dosage,
    // "TrueBasics Heart Omega-3 is made from India’s first clinically researched Superba Krill Oil, making it the ultimate cholesterol specialist you can rely on. With the power of 4 heart-strengthening ingredients, Superba Krill oil is also clinically proven to reduce cholesterol and reduce triglyceride levels by up to 33%, after 26 weeks of daily dosage.",
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const [overallRating, setOverallRating] = useState(4);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [reviews, setReviews] = useState(getStoredReviews());

  function getStoredReviews() {
    const storedReviews = localStorage.getItem("reviews");
    return storedReviews ? JSON.parse(storedReviews) : getDummyReviews();
  }

  function getDummyReviews() {
    return [
      {
        userName: "User1",
        userRating: 5,
        userReview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        userProfilePicture: "/assets/dummyprofile.png",
        isLiked: false,
        likeCount: 10,
        className: "ton",
      },
      {
        userName: "Rozy",
        userRating: 5,
        userReview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        userProfilePicture: "/assets/dummyprofile.png",
        isLiked: false,
        likeCount: 10,
      },
      {
        userName: "david",
        userRating: 5,
        userReview: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        userProfilePicture: "/assets/dummyprofile.png",
        isLiked: false,
        likeCount: 15,
      },
    ];
  }

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const handleUserRatingChange = (rating) => {
    setUserRating(rating);
  };

  const handleReviewChange = (event) => {
    setUserReview(event.target.value);
  };

  const submitReview = () => {
    console.log(userRating, userReview, "avacsc");
    // const newReview = {
    //   userName: "John Doe",
    //   userRating,
    //   userReview,
    //   userProfilePicture: "/assets/dummyprofile.png",
    //   isLiked: false,
    //   likeCount: 0,
    //   isNew: true,
    // };
    // setReviews([...reviews, newReview]);

    dispatch(
      giveAndUpdateReviewByLoginUser(id, userRating, userReview, userName)
    );

    setUserRating(0);
    setUserReview("");
    setUserName("");
    // dispatch(getProductReviews(id));
  };

  const handleLikeClick = (index) => {
    const updatedReviews = [...reviews];
    const updatedReview = { ...updatedReviews[index] };
    updatedReview.isLiked = !updatedReview.isLiked;
    updatedReview.likeCount = updatedReview.isLiked
      ? updatedReview.likeCount + 1
      : updatedReview.likeCount - 1;
    updatedReviews[index] = updatedReview;
    setReviews(updatedReviews);
  };

  const [showMoreReviews, setShowMoreReviews] = useState(false);

  const handleSeeMoreClick = () => {
    setShowMoreReviews(true);
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
    dispatch(getProductReviews(id));
  }, [id]);

  useEffect(() => {
    if (product && product?.variantsAndPrices) {
      // Initialize quantities array with the same length as variantsAndPrices
      setQuantities(
        Array(product.variantsAndPrices?.length).fill({ count: 1 })
      );
    }
  }, [product, userReview]);

  console.log(
    product,
    reviewsArray,
    quantities,
    "productDetails................................................///////////////"
  );

  useEffect(() => {
    if (
      id &&
      Object.keys(product).length >= 1 &&
      product?.images?.length >= 1
    ) {
      setSelectedImage(
        `https://uploadawsimages.s3.amazonaws.com/${product?.images[0]}`
      );
    } else {
      setSelectedImage("/assets/Offer1.png");
    }
  }, [id, product]);

  useEffect(() => {
    if (id && product?.category) {
      getAllProducts(price, product?.category, 0, 0, currentPage);
    }
  }, [id]);

  console.log(
    products,
    productCount,
    productCountWithApiFeatures,
    "productCountWithApiFeatures,"
  );

  const metaFunction = (product) => {
    return (
      <Helmet>
        <title>Page Title</title>
        <meta name="description" content={product?.metaDescription} />
        <meta name="title" content={product?.metaTitle} />
        <meta name="keyword" content={product?.metaKeyword} />
        {/* Other meta tags */}
      </Helmet>
    );
  };

  // useEffect(() => {
  //   if (product && Object.keys(product).length >= 1) {
  //     metaFunction(product);
  //   }
  // }, [product]);

  const addInWishList = (aid) => {
    dispatch(addProductInWishlist(aid));
  };

  return (
    <div className="product-page">
      <HomePage />

      <div className="product-details-container">
        {product && (
          <div className="product-details">
            {product &&
              Object.keys(product).length >= 1 &&
              metaFunction(product)}
            <div className="product-details">
              <div className="small-images">
                {images.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={
                      product?.images?.length >= 1
                        ? `https://uploadawsimages.s3.amazonaws.com/${imageUrl}`
                        : imageUrl
                    }
                    alt="Product"
                    onClick={() => handleImageClick(imageUrl)}
                  />
                ))}
              </div>

              <div className="productumage">
                <img
                  src={selectedImage}
                  className="product-image"
                  alt="Product"
                />
              </div>
            </div>
            <div className="productsinformatun">
              <h1>{product?.name}</h1>
              <p>
                {" "}
                {product?.shortDescription}
                {/* Support and maintain a healthy heart, artery cleanse and
                protection. */}
              </p>
              <p className="ice">${product?.price}</p>
              <div className="ratings">
                <p className="stoy">
                  <span role="img" aria-label="star" style={{ color: "white" }}>
                    ⭐
                  </span>
                  {product?.ratings}
                </p>
                <p className="sau">
                  {product?.ratings} ratings and {product?.reviews?.length}{" "}
                  reviews
                </p>
              </div>

              <table className="product-table">
                <thead>
                  <tr>
                    <th>Pack Size</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {product && product?.variantsAndPrices?.length <= 0 ? (
                    <p>No Variants available to show!</p>
                  ) : (
                    product?.variantsAndPrices?.map((vp, i) => (
                      <tr>
                        <td>{vp?.name}</td>
                        <td>${vp?.price}</td>
                        <td>
                          <div className="quantity-controls">
                            <button
                              onClick={() =>
                                setQuantities((prevQuantities) =>
                                  prevQuantities.map((quantity, index) =>
                                    index === i
                                      ? {
                                          ...quantity,
                                          count:
                                            quantity.count === 1
                                              ? 1
                                              : quantity.count - 1,
                                        }
                                      : quantity
                                  )
                                )
                              }
                            >
                              -
                            </button>
                            {quantities[i]?.count}
                            <button
                              onClick={() =>
                                setQuantities((prevQuantities) =>
                                  prevQuantities.map((quantity, index) =>
                                    index === i
                                      ? {
                                          ...quantity,
                                          count: quantity.count + 1,
                                        }
                                      : quantity
                                  )
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>
                          <button onClick={() => handleAddToCart(vp, i)}>
                            {cartLoading && loadingIndex === i ? (
                              <Loading />
                            ) : (
                              "Add to Cart"
                            )}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* {cartVisible && (
                <div>
                  <div
                    className="overlay"
                    onClick={() => setCartVisible(false)}
                  ></div>
                  <div className="cartslide">
                    <div className="head_crt">
                      <button
                        onClick={() => setCartVisible(false)}
                        class="close-cart-button"
                      >
                        <i class="fas fa-times"></i>
                      </button>

                      <div className="hrt">
                        <img
                          src="/assets/cart.png"
                          className="cart_img"
                          alt=""
                          srcset=""
                        />
                        <h2>Cart</h2>
                      </div>
                    </div>

                    {cartItems.map((item, index) => (
                      <div key={index} className="cart-item">
                        <div className="crtity">
                          <img
                            src="/assets/Offer1.png"
                            alt={item.name}
                            className="cart-item-image"
                          />
                          <p>{item.name}</p>
                          <p>${item.price}</p>
                        </div>
                        <div className="cart-item-quantity">
                          <div className="vrint">
                            <button onClick={() => decreaseQuantity(index)}>
                              -
                            </button>
                            <p>{item.quantity}</p>
                            <button onClick={() => increaseQuantity(index)}>
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => handleRemoveFromCart(index)}
                            className="trh"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                            >
                              <path d="M0 0h24v24H0z" fill="none" />
                              <path d="M8 3h8a2 2 0 0 1 2 2v2h4a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9H4a1 1 0 0 1 0-2h4V5a2 2 0 0 1 2-2zM6 9v10h12V9H6zm5 2h2v6h-2V11zm-4 0h2v6H7V11zm8 0h2v6h-2V11z" />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="coupon-section">
                      {couponVisible ? (
                        <input
                          type="text"
                          id="ycty"
                          placeholder="Coupon code"
                          value={couponCode}
                          onChange={handleCouponCodeChange}
                          ref={couponInputRef}
                        />
                      ) : (
                        <p onClick={toggleCouponInput} className="appi">
                          Apply coupon
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="dropdown-icon"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                          >
                            <path d="M7 10l5 5 5-5z" />
                          </svg>
                        </p>
                      )}
                    </div>
                    <p className="subcrt">
                      Subtotal: <span>${calculateSubtotal()}</span>
                    </p>
                    <p className="totcrt">
                      Total:<span className="totgy"> ${calculateTotal()}</span>
                    </p>
                    <Link to="/checkout">
                      {" "}
                      <button className="proceed">Proceed to checkout</button>
                    </Link>
                    <Link to="/cart">
                      {" "}
                      <button
                        onClick={() => setCartVisible(false)}
                        className="cartviw"
                      >
                        View cart
                      </button>
                    </Link>
                  </div>
                </div>
              )} */}

              <ProductCartVisible
                cartItems={cartItems}
                cartVisible={cartVisible}
                setCartVisible={setCartVisible}
                handleRemoveFromCart={handleRemoveFromCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
              />
            </div>
          </div>
        )}

        <div className="productdats">
          <div className="product-navigation">
            <ul>
              <li
                className={selectedTab === "description" ? "active" : ""}
                onClick={() => handleTabClick("description")}
              >
                Description
              </li>
              <li
                className={selectedTab === "manufacturer" ? "active" : ""}
                onClick={() => handleTabClick("manufacturer")}
              >
                Manufacturer
              </li>
              <li
                className={selectedTab === "strength" ? "active" : ""}
                onClick={() => handleTabClick("strength")}
              >
                Strength
              </li>
              <li
                className={selectedTab === "dosage" ? "active" : ""}
                onClick={() => handleTabClick("dosage")}
              >
                Dosage
              </li>
            </ul>
          </div>
          <div className="product-content">
            <div dangerouslySetInnerHTML={{ __html: content[selectedTab] }} />
            {/* <p>{content[selectedTab]}</p> */}
          </div>
        </div>
      </div>

      <RelatedProductMobile />

      <div className="relate_con">
        <h1 className="reli">Related Products</h1>
        <div className="container">
          <Slider {...settings}>
            {loading ? (
              <Loading />
            ) : error ? (
              <p>{error}</p>
            ) : products?.length <= 0 ? (
              <p>No, related product available to show!</p>
            ) : (
              products.map((banner, index) => (
                <div
                  key={banner.id}
                  className="imagespropage"
                  style={{ margin: "10px" }}
                >
                  <Link to={`/productPage/${banner?._id}`}>
                    <img
                      src={
                        banner?.images?.length >= 1
                          ? `https://uploadawsimages.s3.amazonaws.com/${banner?.image}`
                          : banner.image
                      }
                      alt={`Slide ${index + 1}`}
                      className="img-responsive"
                      // onMouseEnter={() => handleMouseEnter(index)}
                      // onMouseLeave={handleMouseLeave}
                    />
                  </Link>

                  <div className="informat">
                    <h2 className="titl">{banner?.name}</h2>
                    <div className="rating">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`stars ${
                            i < banner?.ratings ? "selected" : ""
                          }`}
                          // onClick={() => handleStarsClick(i)}
                        >
                          &#9733;
                        </span>
                      ))}
                      {/* <span className="reviews">{`${rating} `}</span> */}
                      {/* <span className="helpful">Helpful in Many ways...</span> */}
                    </div>
                    <p className="prao">{`$${banner?.price}`}</p>

                    <div className="product-icons">
                      <button onClick={() => addInWishList(banner?._id)}>
                        {wishlist[banner?._id] ? (
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

                    <div className="addbyyuy ">
                      <button
                        onClick={() => navigate(`/productPage/${banner?._id}`)}
                        className="add-to-cart"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </Slider>
        </div>
      </div>

      <h1 className="rr">Rating & Reviews</h1>
      <div className="rating-and-review-container">
        <div className="ras">
          <div className="overrall-rating">
            <p>
              {Math.floor(product?.ratings)}/5{" "}
              <span className="ate">Overall Rating</span>{" "}
            </p>
            <div className="user-rating">
              <label>Your Rating:</label>
              <div>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`star ${i < userRating ? "selected" : ""}`}
                    onClick={() => handleUserRatingChange(i + 1)}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="user-review">
            {authUser && authUser !== null ? (
              ""
            ) : (
              <div className="nameguest">
                <label htmlFor="user-name">Your Name</label>
                <input
                  type="text"
                  id="user-name"
                  value={userName}
                  onChange={handleNameChange}
                  placeholder="Enter your name"
                />
              </div>
            )}

            <div className="reviewuserss">
              <label>Write a Review:</label>
              <textarea
                value={userReview}
                className="textreview"
                onChange={handleReviewChange}
                placeholder="Write your review here..."
              />
            </div>
            <button onClick={submitReview} className="submitreft">
              Submit Review
            </button>
          </div>
        </div>

        <div className="most-useful-reviews">
          {/* {reviewsArray.map((review, index) => (
            <div
              key={index}
              className={`review ${review.isNew ? "new-review" : ""}`}
            >
              <div className="review-header">
                <div className="conta">
                  <img
                    src="/assets/dummyprofile.png"
                    alt=""
                    className="profile-picture"
                  />
                  <span className="user-name">{review?.name}</span>
                  <span className="userr-rating">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`starss ${
                          i < review?.rating ? "selected" : ""
                        } ${
                          review.isNew
                            ? "new-review-star"
                            : "default-review-star"
                        }`}
                      >
                        &#9733;
                      </span>
                    ))}
                  </span>
                </div>

                <p className="user-review-text">{review?.comment}</p>

                <div className="hpl">
                  <button
                    className={`like-button ${review.isLiked ? "liked" : ""}`}
                    onClick={() => handleLikeClick(index)}
                  >
                    {review.isLiked ? "❤️" : "🤍"}Helpful
                  </button>
                  <span
                    className={`like-count ${review.isLiked ? "liked" : ""}`}
                  >
                    {review.likeCount}{" "}
                    {review.likeCount === 1 ? "person" : "people"} found it
                    helpful
                  </span>
                </div>
              </div>
            </div>
          ))} */}
          {reviewsArray?.length <= 0 ? (
            ""
          ) : (
            <div className="toggle">
              <h3>Most Useful Reviews</h3>
              {reviewsArray ? (
                <>
                  {reviewsLoading ? (
                    <Loading />
                  ) : reviewsError ? (
                    <p>{reviewsError}</p>
                  ) : reviewsArray?.length <= 0 ? (
                    <p>No review yet to show!</p>
                  ) : (
                    reviewsArray.map((review, index) => (
                      <div key={index} className="reviewss">
                        <div className="review-header">
                          <div className="conta">
                            <img
                              src="/assets/dummyprofile.png"
                              alt=""
                              className="profile-picture"
                            />
                            <span className="user-name">{review?.name}</span>
                            <span className="userr-rating">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span
                                  key={i}
                                  className={`starss ${
                                    i < review?.rating ? "selected" : ""
                                  }`}
                                >
                                  &#9733;
                                </span>
                              ))}
                            </span>
                          </div>
                          <p className="user-review-text">{review?.comment}</p>
                        </div>
                      </div>
                    ))
                  )}
                </>
              ) : null}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
