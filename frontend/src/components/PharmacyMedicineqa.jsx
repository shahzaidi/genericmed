
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FooterMobile from './FooterMobile';
import Footer from './Footer';
import HomePage from './HomePage';
import HomePageMobile from './HomepageMobile';

const PharmacyMedicineqa = () => {
  return (
    <div>
      <HomePage />
      <HomePageMobile/>
      <PharmNavigation />
      <Link to="/pharmacy-medicine"style={{ textDecoration: 'none' }}>
        <div className="medcont">
          <h2>Pharmacy Medicine FAQs</h2>

          <div className='det_faq'>
            <FaqItem
              question="What is the difference between Pharmacy Medicine and Prescription Medicine?"
              answer="Pharmacy Medicine can be purchased over-the-counter without a prescription, while Prescription Medicine requires a prescription from a healthcare professional."
            />
            <FaqItem
              question="Can I get advice from the pharmacist when buying Pharmacy Medicine?"
              answer="Yes, pharmacists are trained to provide advice on Pharmacy Medicine. Feel free to ask any questions or seek guidance."
            />
            <FaqItem
              question="Are there any side effects associated with Pharmacy Medicine?"
              answer="Like any medication, Pharmacy Medicine may have potential side effects. It's essential to read the accompanying information or consult with the pharmacist for guidance."
            />
        
          </div>
        </div>
      </Link>
      <Footer />
      <FooterMobile/>
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
      <div className='himg' onClick={toggleAnswer}>
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

const PharmNavigation = () => {
 
  const imageSrc = '/assets/pharmacy_medicine_image.jpg';
  const title = 'Pharmacy Medicine';

  return (
    <div className="medcont">
      <Link to="/pharmacy-medicine"></Link>
    </div>
  );
};

export { PharmacyMedicineqa, PharmNavigation };
