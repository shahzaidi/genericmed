import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FooterMobile from "./FooterMobile";
import Footer from "./Footer";
import HomePage from "./HomePage";
import HomePageMobile from "./HomepageMobile";
import { useDispatch, useSelector } from "react-redux";
import { getAllFaqsAction } from "../redux/actions/faqActions";
import Loading from "./Loading";

const Faq = () => {
  const dispatch = useDispatch();
  const { loading, faqs, error } = useSelector(
    (state) => state.getAllFaqsReducer
  );

  useEffect(() => {
    dispatch(getAllFaqsAction());
  }, []);

  console.log(faqs, "faqs....////");

  return (
    <div>
      <HomePage />
      <HomePageMobile />
      <h1 class="hfa">FAQ's</h1>
      <div class="faq_content">
        {loading ? (
          <Loading />
        ) : error ? (
          <p>{error}</p>
        ) : faqs?.length <= 0 ? (
          <p>No, faq available yet!</p>
        ) : (
          faqs?.map((faq, index) => (
            <Container
              imageSrc="/assets/drugs_img.webp"
              title={faq?.category}
              linkTo={`/faq/${faq?._id}`}
            />
          ))
        )}
        {/* <Container
          imageSrc="/assets/genmed.jpg"
          title="Generic Medicine"
          linkTo={`/generic-medicine`}
        />
        <Container
          imageSrc="/assets/famed.png"
          title="Pharmacy Medicine"
          linkTo={`/pharmacy-medicine`}
        /> */}
      </div>

      <Footer />
      <FooterMobile />
    </div>
  );
};

export { Faq };

const Container = ({ imageSrc, title, linkTo }) => {
  const navigate = useNavigate();
  return (
    <div
      className="shah"
      onClick={() => navigate(linkTo, { state: { name: title } })}
      to={linkTo}
    >
      <div>
        <img src={imageSrc} alt={title} class="faqimage" />
        <div>
          <h2>{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default Container;

const FaqNavigation = () => {
  return (
    <ul className="list-unstyled">
      <li className="faq">
        <Link to="/faq"></Link>
      </li>
    </ul>
  );
};

export { FaqNavigation };
