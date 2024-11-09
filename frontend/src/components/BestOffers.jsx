import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBestOffersProducts } from "../redux/actions/products/productActions";
import { useNavigate } from "react-router-dom";
import { addProductInWishlist } from "../redux/actions/wishListActions";

const Carousel = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);

  const [wishlist, setWishlist] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const dispatch = useDispatch();
  const { loading, bestOffersProducts, error } = useSelector(
    (state) => state.bestOffersProducts
  );

  useEffect(() => {
    dispatch(getAllBestOffersProducts());
  }, [dispatch]);

  console.log(bestOffersProducts, "bestOffersProducts...............///");
  const slidesToShow = Math.min(bestOffersProducts.length, 4);
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

  const banner = [
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
  // const handleStarssClick = (starIndex) => {
  //   setRating(starIndex + 1);
  // };

  // const toggleWishlist = (id) => {
  //   setWishlist((prevWishlist) => ({
  //     ...prevWishlist,
  //     [id]: !prevWishlist[id],
  //   }));
  // };

  const addInWishList = (id) => {
    dispatch(addProductInWishlist(id));
  };

  return (
    <div className="bf">
      <h1>Best Offers</h1>
      <div className="container">
        <Slider {...settings}>
          {bestOffersProducts.map((product, index) => (
            <div
              key={product._id}
              className="imagesbestoffers"
              style={{ margin: "10px" }}
            >
              <Link to={`/productPage/${product?._id}`}>
                <img
                  src={
                    hoveredIndex === index || isWishlistHovered === product.id
                      ? product.image
                      : product.image
                  }
                  alt={`Slide ${index + 1}`}
                  className="img-responsive"
                />
              </Link>

              <div className="information">
                <h2>{product?.name}</h2>
                <div className="rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`starss ${
                        i < product?.ratings ? "selected" : ""
                      }`}
                      onClick={() => handleStarssClick(i)}
                    >
                      &#9733;
                    </span>
                  ))}
                  <span className="reviews">{`${product?.ratings} `}</span>

                  {/* <p>ggdsax</p> */}
                </div>
                <span className="noo">$600</span>{" "}
                <p className="pro">{`$${product.price}`}</p>
                <div className="productbest-icons">
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
                <div className="addbuuuy">
                  <button
                    onClick={() => navigate(`/productPage/${product?._id}`)}
                    className="add-to-cart"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
