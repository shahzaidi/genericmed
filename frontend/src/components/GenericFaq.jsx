import React, { useState } from "react";
import { Link } from "react-router-dom";
import FooterMobile from "./FooterMobile";
import Footer from "./Footer";
import HomePage from "./HomePage";
import HomePageMobile from "./HomepageMobile";

const GenericFaq = () => {
  return (
    <div>
      <HomePage />
      <HomePageMobile />
      <GenNavigation />
      <Link to="/generic-medicine" style={{ textDecoration: "none" }}>
        <div className="medcont">
          <h2>Generic Medicine FAQs</h2>

          <div className="det_faq">
            <FaqItem
              question="What is the difference between generic and brand-name drugs?"
              answer="Generic drugs are identical to brand-name drugs in dosage, safety, and strength. The main difference is that generic drugs are usually much cheaper."
            />
            <FaqItem
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
            />
            <FaqItem
              question="Are generic drugs as effective as brand-name drugs?"
              answer="Yes, generic drugs are required to have the same active ingredient, strength, and dosage form as brand-name drugs. They undergo rigorous testing to ensure safety and efficacy."
            />
            <FaqItem
              question="Why are generic drugs more affordable than brand-name drugs?"
              answer="Generic drugs are more affordable because they don't require the same level of research, development, and marketing as brand-name drugs. Once a brand-name drug's patent expires, other manufacturers can produce generic versions."
            />
          </div>
        </div>
      </Link>
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
      {showAnswer && <p>{answer}</p>}
    </div>
  );
};

const GenNavigation = () => {
  const imageSrc = "/assets/drgs_img.webp";
  const title = "Generic-Medicine";

  return (
    <div className="medcont">
      <Link to="/generic-medicine">
        <img src={imageSrc} alt={title} />
      </Link>
    </div>
  );
};

export { GenericFaq, GenNavigation };
