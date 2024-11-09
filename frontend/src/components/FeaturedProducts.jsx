import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllFeaturedProducts } from "../redux/actions/products/productActions";
import Loading from "./Loading";
import { addProductInWishlist } from "../redux/actions/wishListActions";

const Carousel = () => {
  const [rating, setRating] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isWishlistHovered, setIsWishlistHovered] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, featuredProducts, error } = useSelector(
    (state) => state.getAllFeaturedProductsReducer
  );

  useEffect(() => {
    dispatch(getAllFeaturedProducts());
  }, [dispatch]);

  const addInWishList = (id) => {
    dispatch(addProductInWishlist(id));
  };

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

  const slidesToShow = Math.min(featuredProducts.length, 4);

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

  return (
    <div className="fp">
      <h1>Featured Products</h1>
      <div className="container">
        {loading ? (
          <Loading />
        ) : error ? (
          <p>{error}</p>
        ) : featuredProducts.length === 0 ? (
          <p>Sorry! No featured product available to show!</p>
        ) : (
          <Slider {...settings}>
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                className="imagesfeati"
                style={{ margin: "10px" }}
              >
                <Link to={`/productPage/${product._id}`}>
                  <img
                    src={
                      hoveredIndex === product._id ||
                      isWishlistHovered === product._id
                        ? "/assets/Offer3.png"
                        : product.image
                    }
                    alt={`Slide ${product._id}`}
                    className="img-responsive"
                    // onMouseEnter={() => handleMouseEnter(product._id)}
                    // onMouseLeave={handleMouseLeave}
                  />
                </Link>

                <div className="information">
                  <h2>{product.name}</h2>
                  <div className="rating">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`stars ${i < rating ? "selected" : ""}`}
                        // onClick={() => setRating(i + 1)}
                      >
                        &#9733;
                      </span>
                    ))}
                    <span className="reviews">{`${rating} `}</span>
                    <span className="helpful">Helpful in Many ways...</span>
                  </div>
                  <p className="prao">{`$${product.price}`}</p>
                  <div className="productbest-icons">
                    <button onClick={() => addInWishList(product._id)}>
                      {wishlist[product._id] ? (
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
                  <div className="addbuyfeatured">
                    <button
                      className="add-to-cart"
                      onClick={() => navigate(`/productPage/${product._id}`)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default Carousel;
