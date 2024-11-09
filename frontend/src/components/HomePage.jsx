import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllCategory } from "../redux/actions/categoryActions";

import { Link } from "react-router-dom";
import CategoriesHover from "./CategoriesHover";

const HomePage = () => {
  const [showCategoriesHover, setShowCategoriesHover] = useState(false);
  return (
    <div className="nav_contain">
      <nav>
        <ul>
          {/* <li className="dropdown">
            <button className="categories">
              {" "}
              <img src="/assets/three-lineslogo.jpg" alt="Cart" />
              <img
                src="/assets/drop.png"
                style={{ position: "relative", left: "177px", top: "2px" }}
                alt=""
                srcset=""
              />
              Browse Categories
            </button>
          </li> */}
          {/* <div className="dropdown-content">
            <a href="/category1">Category 1</a>
            <a href="/category2">Category 2</a>
            <a href="/category3">Category 3</a>
            <a href="/category3">Category 4</a>
            <a href="/category3">Category 5</a>
            <a href="/category3">Category 6</a>
            <a href="/category3">Category 7</a>
            <a href="/category3">Category 8</a>
            <a href="/category3">Category 9</a>
            <a href="/category3">Category 10</a>
          </div> */}

          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="products">
            {/* <img src="/assets/drop.png"style={{     position:' relative',
    left:' 184px',
    top: '0px',
  zindex:'999',
    width: '22px',
    
    }} alt="" srcset="" /> */}

            <Link
              to="/allcategories"
              className="catnav"
              onMouseEnter={() => setShowCategoriesHover(true)}
              // onMouseLeave={() => setShowCategoriesHover(false)}
            >
              Categories{" "}
            </Link>
            {showCategoriesHover && <CategoriesHover />}
          </li>
          {/* <div className="product-list">
        
       
          <div className="product-item">
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          </div>
          
          <div className="productt-item">
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          </div>
       
          <div className="produccct-item">
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          <p>Product1</p>
          </div>

          <div className='pdt'>
            <img src="/assets/image_10.png" alt="" srcset="" />
          </div>
        </div> */}

          <li>
            <Link to="/blogpage">Blog</Link>
          </li>
          <li>
            <Link to="/shopallproducts" className="everypro">
              Shop All
            </Link>
          </li>
          <li>
            <Link to="/aboutfoot" className="abouccct">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/Contactus" className="contcccact">
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;
