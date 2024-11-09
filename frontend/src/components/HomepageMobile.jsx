import React, { useState } from "react";

const HomePageMobile = () => {
  const [showCategories, setsShowCategories] = useState(false);
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);

  const toggleProductsDropdown = () => {
    setShowProductsDropdown(!showProductsDropdown);
  };

  const toggleCategoriesDropdown = () => {
    setShowCategoriesDropdown(!showCategoriesDropdown);
  };

  const products = [
    { id: 1, name: "Product 1" },

    { id: 28, name: "Product 28" },
  ];

  const medicineCategories = ["Category 1", "Category 2", "Category 3"];

  return (
    <div className="nav_containnn">
      <nagvv>
        <ul>
          <li className="dropdooown">
            <a
              href="#"
              className="categories"
              onClick={() => setsShowCategories(!showCategories)}
            >
              <img src="/assets/three-lineslogo.jpg" alt="Cart" />
            </a>
            {showCategories && (
              <div className="dropdown-clkjontent">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/blogpage">Blog</a>
                </li>
                <li>
                  <a href="/shopallProducts">Shop All</a>
                </li>
                <li>
                  <a href="/aboutfoot">About Us</a>
                </li>
                <li>
                  <a href="/Contactus">Contact Us</a>
                </li>
                <li className="dropppdown" onClick={toggleProductsDropdown}>
                  {/* <img
                    src="/assets/drop.png"
                    style={{
                      position: " relative",
                      left: " 167px",
                      top: "0px",
                      zindex: "999",
                      width: "22px",
                    }}
                    alt=""
                    srcset=""
                  /> */}
                  Categories
                  {/* {showProductsDropdown && (
                    <div className="dropdsqdown-content">
                      {products.map((product) => (
                        <div key={product.id} className="product-item">
                          {product.name}
                        </div>
                      ))}
                    </div>
                  )} */}
                </li>
                <li className="dropdownnnnn" onClick={toggleCategoriesDropdown}>
                  <img
                    src="/assets/drop.png"
                    style={{
                      position: " relative",
                      left: " 167px",
                      top: "0px",
                      zindex: "999",
                      width: "22px",
                    }}
                    alt=""
                    srcset=""
                  />{" "}
                  Browse categories
                  {showCategoriesDropdown && (
                    <div className="dropdowwwn-content">
                      {medicineCategories.map((category) => (
                        <div key={category} className="category-item">
                          {category}
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              </div>
            )}
          </li>
        </ul>
      </nagvv>
    </div>
  );
};

export default HomePageMobile;
