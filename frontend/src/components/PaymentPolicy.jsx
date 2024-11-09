import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import FooterMobile from './FooterMobile';
import HomePage from './HomePage'; 
import HomePageMobile from './HomepageMobile';

const PaymentPolicy = () => {
  return (
    <div>
    <HomePage />
    <HomePageMobile/>
    <div className="pay-policy">
        <div className='pvy'>
        <h1 style={{ lineHeight: 2 }}>Payment Policy</h1>
    
        </div>
<div className='pyf'>

        <div className='polimage'>
        <img src="/assets/foot_logo.jpg" className='polimg'alt="Logo" height="50" />    
        </div> 

<div className='orvcy-info'>
     
      <p>
      Our payment policy outlines the various payment options available for purchasing products from our website. We aim to provide flexible and secure payment methods to enhance your shopping experience. Please review the following guidelines to understand the payment options we offer.<br/>

      </p>
      <span>1. Advance Payment:</span>
<p>
1.1. We accept advance payments through various secure online payment gateways. These payments are processed in real-time, ensuring a seamless transaction.<br/>
</p>
<p>   1.2. Your order will be confirmed and processed once the advance payment is successfully received.</p>
  <span>2. Cash on Delivery (COD)</span>
      <p>
      2.1. Cash on Delivery is available as a payment option for orders within India in certain cases.<br/>
      </p>
      <p>
      2.2. Please note that COD availability may vary based on location and order value.<br/>
      </p>
      <p>
      2.3. Orders placed using COD will be confirmed, and the product will be shipped to you. Payment will be collected upon delivery.<br/>
      </p>
      

      <span>3. International Payments - Telegraphic Transfer (TT) and Letter of Credit (LC) at Sight:</span>
      <p>
      3.1. For international orders, we offer payment through Telegraphic Transfer (TT) and Letter of Credit (LC) at sight.<br/>
      </p>
      <p>
      3.2. TT payments involve transferring the total order amount to our bank account. Bank details will be provided upon confirmation of your order.<br/>
      </p>
      <p>
      3.3. LC at sight involves establishing a Letter of Credit, and payment will be processed upon presentation of compliant shipping documents.<br/>
      </p>
    

      <span>4. Security and Privacy:</span><br/>
      <p>
      4.1. We prioritize the security of your payment information. Our website uses encryption and secure protocols to protect your sensitive data.<br/>
      </p>
      <p>
      4.2. Your payment details are never stored on our servers, ensuring the confidentiality of your information.

<br/>
      </p>
  
    
     
     

      <span>5. Order Confirmation:</span>
      <p>
      5.1. After placing an order, you will receive an order confirmation via email.<br/>
      </p>
      <p>
      5.2. If you select an advance payment option, payment instructions and details will be provided in the confirmation email.

<br/>
      </p>

    

      <span>6.Contact Information:</span>
      <p>   For any payment-related queries or assistance, please reach out to our customer service at info@rawpharmabiz.com or Call on +91-8320310672. We are here to help you navigate the payment process and address your concerns.

</p><br/>
<p>Please note that our payment policy is subject to change without prior notice. We recommend reviewing the policy periodically for any updates or modifications. Our goal is to offer convenient and secure payment options, ensuring a smooth and reliable shopping experience for our valued customers.</p>

</div>
     
    </div>
    </div>
     <Footer />
     <FooterMobile/>
     </div>
  );
};

export  {PaymentPolicy};
const PayNavigation = () => {
    return (
      <ul className="list-unstyled">
        <li className='pay'>
          <Link to="/paypol"></Link>
        </li>
     
      </ul>
    );
  };
  
  export { PayNavigation };
  