// import React, { useState } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// const Carousel = () => {
//   const [rating, setRating] = useState(0);

//   const settings = {
//     infinite: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     prevArrow: <button type="button" className="slick-prev"><i className="glyphicon glyphicon-chevron-left"></i></button>,
//     nextArrow: <button type="button" className="slick-next"><i className="glyphicon glyphicon-chevron-right"></i></button>,
//   };

//   const handleStarClick = (starIndex) => {
//     setRating(starIndex + 1);
//   };
//   const banners = [  {  image: '/assets/Offer1.png', title: 'Healthy Heart Capsules', price: 200 },
//   { image: '/assets/Offer2.png' , title: 'Acme Pain Relief', price:100},
//   {  image: '/assets/Offer3.png' , title: 'SereniSleep Aid', price:200},
//   { image: '/assets/Offer4.png', title: 'Revitalize Energy Tonic', price: 70},
//   { image: '/assets/Offer1.png', title: 'Healthy Heart Capsules', price: 80 },
//   {  image: '/assets/Offer2.png' , title: 'Acme Pain Relief', price: 20},
//   {  image: '/assets/Offer3.png',title: 'SereniSleep Aid', price: 100},
//   { image: '/assets/Offer4.png',title: 'Revitalize Energy Tonic', price: 500},
//   { image: '/assets/Offer1.png',title: 'Healthy Heart Capsules', price: 40 },
//   { image: '/assets/Offer2.png',title: 'Acme Pain Relief', price: 65 },
//   {  image: '/assets/Offer3.png',title: 'SereniSleep Aid', price: 55 },
//   { image: '/assets/Offer4.png',title: 'Revitalize Energy Tonic', price: 25},
//   { image: '/assets/Offer1.png',title: 'Healthy Heart Capsules', price: 30 },
//   {  image: '/assets/Offer2.png',title: 'Acme Pain Relief', price: 60},
//   { image: '/assets/Offer3.png',title: 'SereniSleep Aid', price: 50},
//   { image: '/assets/Offer4.png' ,title: 'Revitalize Energy Tonic', price: 30},

//   ];
//   return (

//           <div className="hd">
//     <h1>Best Seller Products</h1>
//     <div className="container">
//     <Slider banners={banners} />
//   </div>
//       <Slider {...settings}>
//         {banners.map((banner, index) => (
//           <div key={index} className="images" style={{ margin: '10px' }}>
//             <a href={`#${index + 1}`}>
//               <img src={banner.image} alt={`Slide ${index + 1}`} className="img-responsive" />
//             </a>
//             <div className="information">
//               <h2>{banner.title}</h2>
//               <div className="rating">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <span
//                     key={i}
//                     className={`star ${i < rating ? 'selected' : ''}`}
//                     onClick={() => handleStarClick(i)}
//                   >
//                     &#9733;
//                   </span>
//                 ))}
//                 <span className="reviews">{`${rating} `}</span>
//                 <span className="helpful">Helpful in Many ways...</span>
//               </div>
//               <p className="prooo">{`$${banner.price}`}</p>
//               <div className="addbuy">
//                 <button onClick={() => console.log('Add to Cart clicked')} className="add-to-cart">
//                   Add to Cart
//                 </button>
//                 <button onClick={() => console.log('Buy now clicked')} className="bu">
//                   Buy Now
//                 </button>
//               </div>
//             </div>
//           </div>

//         ))}
//       </Slider>

//     </div>

//   );
// };

// export default Carousel;

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBestSellerProducts } from "../redux/actions/products/productActions";

const Carousel = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);

  const [wishlist, setWishlist] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const dispatch = useDispatch();
  const { loading, bestSellerProducts, error } = useSelector(
    (state) => state.bestSellersProducts
  );
  // const { loadingBestSellers, products, errorBestSellers } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllBestSellerProducts());
  }, []);

  // let bestSellingProducts = [];
  // let bestSellingProductTemp = {};

  // const getBestSeller = () => {
  //   for (let i = 0; i < products.length; i++) {
  //     for (let j = 0; j < products.length; j++) {
  //       if (products[j]?.sellingCounter <= products[j + 1]?.sellingCounter) {
  //         bestSellingProductTemp = products[j];
  //         products[j] = products[j + 1];
  //         products[j + 1] = bestSellingProductTemp;
  //       }
  //     }
  //   }
  //   bestSellingProducts = products;
  //   return bestSellingProducts;
  // };

  // console.log(
  //   getBestSeller().slice(0, 4),
  //   "bestSellingProducts......................./////"
  // );

  const settings = {
    infinite: true,
    arrows: true,
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

  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1);
  };
  const toggleWishlist = (id) => {
    setWishlist((prevWishlist) => ({
      ...prevWishlist,
      [id]: !prevWishlist[id],
    }));
  };

  return (
    <div className="containerr">
      <h1>Best Seller Products</h1>
      <Slider {...settings}>
        {bestSellerProducts &&
          bestSellerProducts?.map((product, index) => (
            <div key={product.id} className="images" style={{ margin: "10px" }}>
              <Link to={`/productPage/${product?._id}`}>
                <img
                  src={hoveredIndex === index ? product?.image : product.image}
                  alt={`Slide ${index + 1}`}
                  className="img-responsive"
                />
              </Link>
              {hoveredIndex === index && (
                <div className="product-icons">
                  <button onClick={() => toggleWishlist(product.id)}>
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
              )}

              <div className="information">
                <h2>{product?.name}</h2>

                <div className="rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`star ${
                        i < product?.ratings ? "selected" : ""
                      }`}
                      // onClick={() => handleStarClick(i)}
                    >
                      &#9733;
                    </span>
                  ))}
                  <span className="reviews">{`${product?.ratings} `}</span>
              
                </div>
                <p className="prooo">{`$${product.price}`}</p>

                <div className="product-icons">
                  <button onClick={() => toggleWishlist(product.id)}>
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

                <div className="addbuy">
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
  );
};

export default Carousel;