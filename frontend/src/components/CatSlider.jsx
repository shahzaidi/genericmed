import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../redux/actions/categoryActions";

const Carousel = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  const { categories } = useSelector((state) => state.getAllCategoryReducer);
  const slidesToShow = Math.min(categories.length, 6);
  const settings = {
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,

    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="cats">
      <h1>Categories </h1>

      <div className="containerhomect" style={{ height: "366px" }}>
        <Slider {...settings}>
          {categories.map((category, index) => (
            <Link to={`/categories/${category?.name}`} id="dnsj">
              {" "}
              <div
                key={index}
                id={`category_${index}`}
                className="category-slide"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <a href={`#${index + 1}`}>
                  <img
                    src={category?.image}
                    alt={`Slide ${index + 1}`}
                    className="banners"
                  />
                </a>

                <div className="banner-title">
                  <p>{category?.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

const CustomPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button type="button" className={className} onClick={onClick}>
      <i className="glyphicon glyphicon-chevron-left"></i>
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button type="button" className={className} onClick={onClick}>
      <i className="glyphicon glyphicon-chevron-right"></i>
    </button>
  );
};

export default Carousel;
