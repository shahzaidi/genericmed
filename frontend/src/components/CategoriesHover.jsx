import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCategory } from "../redux/actions/categoryActions";

const CategoriesHover = () => {
  const dispatch = useDispatch();
  const [showCategoryImage, setShowCategoryImage] = useState(false);
  const { categoryLoading, categories, categoryCount, categoryError } =
    useSelector((state) => state?.getAllCategoryReducer);
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  console.log(categories, "BCa");

  const products = Array.from(
    { length: 30 },
    (_, index) => `Product${index + 1}`
  );

  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size));
    }
    return chunkedArr;
  };

  const chunkedProducts = chunkArray(products, 3);

  return (
    <div className="product-list">
      {categories.map((category, index) => (
        <Link to={`/categories/${category?.name}`}>
          <div
            key={index}
            className="product-column"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="product-item">
              <p
                onMouseEnter={() => setShowCategoryImage(true)}
                onMouseLeave={() => setShowCategoryImage(false)}
              >
                {category?.name}
              </p>
              {showCategoryImage ? (
                <div className="pdt">
                  <img
                    src={category?.image}
                    alt=""
                    srcSet=""
                    className="cathu"
                  />
                </div>
              ) : (
                <div className="pdt">
                  <img src="/assets/image_10.png" alt="" srcset="" />
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesHover;
