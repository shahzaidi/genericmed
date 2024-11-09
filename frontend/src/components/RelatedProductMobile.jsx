import React, { useState, useRef, useEffect, useContext } from "react";
import HomePage from "./HomePage";
import ProductCartVisible from "./ProductCartVisible";
import Footer from "./Footer";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../redux/actions/products/productActions";
import {
  getProductReviews,
  giveAndUpdateReviewByLoginUser,
} from "../redux/actions/reviewsActions";
import { TheContextApi } from "../contextApi/TheContext";
import { addProductItemInCart } from "../redux/actions/cartActions";
import Loading from "./Loading";

const RelatedProductMobile = () => {
  const [rating, setRating] = useState(0);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const { authUser, cartLoading, setCartLoading } = useContext(TheContextApi);

  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  const { loading, product, error } = useSelector((state) => state.getProduct);
  const { reviewsLoading, reviewsArray, reviewsError } = useSelector(
    (state) => state.productReviews
  );
  const settings = {
    infinite: true,
    slidesToShow: 1,
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
  const images = [
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
    setSelectedImage(imageUrl);
  };

  const handleStarsClick = (starIndex) => {
    setRating(starIndex + 1);
  };

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

//   const handleTabClick = (tab) => {
//     setSelectedTab(tab);
//   };

//   const [selectedTab, setSelectedTab] = useState('description');
  const [showTabs, setShowTabs] = useState(false); // Toggle state for mobile view

  // const handleTabClick = (tabName) => {
  //   setSelectedTab(tabName);
  //   setShowTabs(false); // Close tabs on mobile after selecting one
  // };

  const toggleTabs = () => {
    setShowTabs((prevState) => !prevState); // Toggle showTabs state
  };
  const [isContentVisible, setIsContentVisible] = useState(true);

  const handleTabClick = (tabName) => {
    setSelectedTab((prevTab) => (prevTab === tabName ? null : tabName));
  };

  return (
    <div>

    <div className="product-navigationmob">
      {/* Tabs navigation */}
      <ul>
        <li
          className={selectedTab === 'description' ? 'active' : ''}
          onClick={() => handleTabClick('description')}
        >
          Description {selectedTab === 'description' ? <span>-</span> : <span>+</span>}
          {selectedTab === 'description' && <p>{content[selectedTab]}</p>}
        </li>
        <li
          className={selectedTab === 'manufacturer' ? 'active' : ''}
          onClick={() => handleTabClick('manufacturer')}
        >
          Manufacturer {selectedTab === 'manufacturer' ? <span>-</span> : <span>+</span>}
          {selectedTab === 'manufacturer' &&    <p>{content.manufacturer}</p>}
        
       
        </li>
        <li
          className={selectedTab === 'strength' ? 'active' : ''}
          onClick={() => handleTabClick('strength')}
        >
          Strength {selectedTab === 'strength' ? <span>-</span> : <span>+</span>}
          {selectedTab === 'strength' &&   <p>{content.strength}</p>}
         
        </li>
        <li
          className={selectedTab === 'dosage' ? 'active' : ''}
          onClick={() => handleTabClick('dosage')}
        >
          Dosage {selectedTab === 'dosage' ? <span>-</span> : <span>+</span>}
          {selectedTab === 'dosage' &&  <p>{content.dosage}</p>} 
     
        </li>
      </ul>
      </div>



    
<div className="reouii">
<h1 className="reli">Related Products</h1>
<div className="relatmone_con">
  <div className="container">
    <Slider {...settings}>
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className="imagespropyghage"
          style={{ margin: "10px" }}
        >
          <Link to={"/productpggee"}>
            <img
              src={
                hoveredIndex === index || isWishlistHovered === banner.id
                  ? "/assets/Offer3.png"
                  : banner.image
              }
              alt={`Slide ${index + 1}`}
              className="img-responsive"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            />
          </Link>
          {(hoveredIndex === index ||
            isWishlistHovered === banner.id) && (
            <div
              className={`banner-icons ${
                isWishlistHovered === banner.id ? "wishlist-hover" : ""
              }`}
            >
              <div
                className={`wishlisttt ${
                  isWishlistHovered === banner.id ? "wishlist-hover" : ""
                }`}
                onMouseEnter={() => handleWishlistMouseEnter(banner.id)}
                onMouseLeave={handleWishlistMouseLeave}
              >
                <button onClick={() => toggleWishlist(banner.id)}>
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
            </div>
          )}

          <div className="informat">
            <h2 className="titl">{banner.title}</h2>
            <div className="rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`stars ${i < rating ? "selected" : ""}`}
                  onClick={() => handleStarsClick(i)}
                >
                  &#9733;
                </span>
              ))}
              <span className="reviews">{`${rating} `}</span>
              <span className="helpful">Helpful in Many ways...</span>
            </div>
            <p className="prao">{`$${banner.price}`}</p>

            <div className="addbyyuy">
              <button
                onClick={() => console.log("Add to Cart clicked")}
                className="cut"
              >
                <Link to="/cart" className="lo">
                  Add to Cart
                </Link>
              </button>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  </div>
</div>
</div>
</div>
  );
};


export default RelatedProductMobile;