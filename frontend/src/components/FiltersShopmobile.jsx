import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slider";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./HomePage";
import Form from "react-bootstrap/Form";
import Footer from "./Footer";
import Categories from "./Categories";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { getAllProducts } from "../redux/actions/products/productActions";
import { addProductInWishlist } from "../redux/actions/wishListActions";
import HomePageMobile from "./HomepageMobile";


const FiltersShopMobile = () => {
  const [priceRange, setPriceRange] = useState([0, 12000]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDiscount, setIsDiscount] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [discounts, setDiscounts] = useState([10, 20, 30, 40, 50]);
  const [isRating, setIsRating] = useState(0);
  const [ratings, setRatings] = useState([1, 2, 3, 4]);
  const [selectedDiscount, setSelectedDiscount] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedTab, setSelectedTab] = useState("price");
    const handleTabChange = (tab) => {
        setSelectedTab(tab);
      };
      const dispatch = useDispatch();
      const { loading, products, error, productCount, productCountWithApiFeatures } = useSelector((state) => state?.products);
    
      const handleToggleFilters = () => {
        setShowFilters(!showFilters);
      };
      const [hoveredIndex, setHoveredIndex] = useState(null);
      const [isWishlistHovered, setIsWishlistHovered] = useState(null);
 
      const [price, setPrice] = useState([0, 12000]);
      const params = useParams();
      const [currentPage, setCurrentPage] = useState(0);
    
      let { keyword } = params;
 
    
      const toggleFilters = () => {
        setShowFilters(!showFilters);
      };
    
     
      const [categories, setCategories] = useState([
        "Category 1",
        "Category 2",
        "Category 3",
      ]);
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
      const MIN = 0;
      const MAX = 12000;
    
    
      const handleSliderChange = (newValues) => {
        setCurrentPage(0);
        setPrice(newValues);
      };
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
      }, [keyword, price, isCategoryChecked, isDiscount, isRating, currentPage]);
    return (
      <div>
      <HomePage/>
      <HomePageMobile/>
<div className="filters-container">
<div className="tabs">
  <button
    className={selectedTab === "price" ? "active" : ""}
    onClick={() => handleTabChange("price")}
  >
    Price
  </button>
  <button
    className={selectedTab === "category" ? "active" : ""}
    onClick={() => handleTabChange("category")}
  >
    Category
  </button>
  <button
    className={selectedTab === "discount" ? "active" : ""}
    onClick={() => handleTabChange("discount")}
  >
    Discount
  </button>
  <button
    className={selectedTab === "rating" ? "active" : ""}
    onClick={() => handleTabChange("rating")}
  >
    Avg Customer Rating
  </button>
</div>

<div className="tab-content">
  {selectedTab === "price" && (
    <div className="price-filter">
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
 
  
  )}

  {selectedTab === "category" && (
    <div className="category-filter">
      <h3>Categories:</h3> <div className="filcreams">
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
    </div>
  )}

  {selectedTab === "discount" && (
    <div className="discount-filter">
      <h3>Discount</h3>
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

  )}

  {selectedTab === "rating" && (
    <div className="rating-filter">
      <h3>Avg Customer Rating:</h3>
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
  )}
</div>
</div>
</div>
 );
}


export default FiltersShopMobile;