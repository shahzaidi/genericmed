import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import FooterMobile from "./FooterMobile";
import Footer from "./Footer";
import HomePage from "./HomePage";
import HomePageMobile from "./HomepageMobile";
import { useDispatch, useSelector } from "react-redux";
import { getFaqDetailsAction } from "../redux/actions/faqActions";
import Loading from "./Loading";

const DrugsFaq = () => {
  const dispatch = useDispatch();
  const { faqLoading, faq, faqError } = useSelector(
    (state) => state.getFaqPageDetailsReducer
  );
  const params = useParams();
  const location = useLocation();

  const { id } = params;
  const { name } = location?.state;

  useEffect(() => {
    if (id) {
      dispatch(getFaqDetailsAction(id));
    }
  }, [id]);

  console.log(id, location?.state, name, faq, "location");
  return (
    <div>
      <HomePage />
      <HomePageMobile />
      <DrugNavigation />
      {/* <Link to="/drugs" style={{ textDecoration: "none" }}> */}
      <div className="medcont">
        <h2>{name ? `${name}` : ""} FAQs</h2>
        {faq && (
          <div className="det_faq">
            {faqLoading ? (
              <Loading />
            ) : faqError ? (
              <p>{faqError}</p>
            ) : faq ? (
              <FaqItem question={faq?.question} answer={faq?.answer} />
            ) : (
              <p>No, Faq available</p>
            )}
            {/* <FaqItem
              question="How should I store my medications?"
              answer="Store medications in a cool, dry place away from direct sunlight. Some medications may require refrigeration, so always check the storage instructions on the label."
            />
            <FaqItem
              question="Can I take expired medications?"
              answer="It's not recommended to take expired medications as they may have lost their effectiveness or could be harmful. Always check the expiration date and dispose of expired medications properly."
            />
            <FaqItem
              question="What should I do if I miss a dose of my prescription medication?"
              answer="If you miss a dose, take it as soon as you remember. However, if it's almost time for your next dose, skip the missed dose and continue with your regular schedule. Do not double up on doses to make up for a missed one."
            /> */}
          </div>
        )}
      </div>
      {/* </Link> */}
      <Footer />
      <FooterMobile />
    </div>
  );
};

const FaqItem = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="faq-item">
      <div className="himg" onClick={toggleAnswer}>
        <h3>{question}</h3>
        <img
          src={showAnswer ? "/assets/subfaq.png" : "/assets/addfaq.png"}
          alt=""
        />
      </div>
      {showAnswer && <div dangerouslySetInnerHTML={{ __html: answer }} />}
    </div>
  );
};

const DrugNavigation = () => {
  const imageSrc = "/assets/drus_img.webp";
  const title = "Drugs";

  return (
    <div className="medcont">
      <Link to="/drugs" style={{ textDecoration: "none" }}>
        <img src={imageSrc} alt={title} />
      </Link>
    </div>
  );
};

export { DrugsFaq, DrugNavigation };
