
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import HomePage from './HomePage';


const CanRefundPolicy = () => {
  return (
    <div>
      <HomePage />
      <div className="can-policy">
        <div className='pvy'>
          <h1 style={{ lineHeight: 2 }}>Cancellation and Refund Policy</h1>
        </div>

        <div className='pyf'>
          <div className='polimage'>
            <img src="/assets/Cancellation.png" className='polimg' alt="Logo" height="50" />
          </div>

          <div className='orvcy-info'>
            <div className="section">
             
            <p className='win'>
        <span>1. Cancellation Window:</span>
        We offer a flexible <span style={{ textDecoration: 'underline', fontWeight: 'normal' }}>cancellation policy</span>. Customers can <span style={{ textDecoration: 'underline', fontWeight: 'normal' }}>cancel online orders</span> and receive a full refund within 24 hours of placing the order. However, cancellation requests made after these 24 hours will not be accepted. Please note that a <span style={{ textDecoration: 'underline', fontWeight: 'normal' }}>cancellation fee</span> may apply for orders canceled after the specified timeframe.
      </p>
            </div>

            <div className="section">
            
              <p>  <span>2. Order Dispatch:</span>Once an order is dispatched, it becomes ineligible for cancellation or modification. This includes any changes or updates to the order details. We advise customers to carefully review and confirm their orders before submission to avoid inconvenience.</p>
            </div>

            <div className="section">
           
              <p>   <span>3. Modification of Orders:</span>Customers can modify or adjust their online orders within 24 hours of placing them. Customers can contact us through live chat, email, or phone to request modifications.</p>
            </div>

            <div className="section">
           
              <p>   <span>4. Undelivered or Damaged Orders:</span>In the event that an order remains undelivered, is lost in transit, is incomplete, or arrives damaged, customers are encouraged to contact our customer service executives immediately via live chat or at the provided  <span className="highlight-yellow">(email ID or contact number)</span>.</p>
            </div>

            <div className="section">
          
            <p>
            <span>5. Customer Support:</span>
        Our dedicated customer service team is here to address any questions or concerns regarding orders or transactions. Customers can contact us at [email ID] for assistance regarding{' '}
        <span style={{ textDecoration: 'underline', fontWeight: 'normal' }}>cancellation confirmation</span>,{' '}
        <span style={{ textDecoration: 'underline', fontWeight: 'normal' }}>refund status</span>, or any other inquiries.
      </p>
            </div>

            <p>The content displayed on our website is intended solely for informational purposes and should not be construed as medical advice, diagnosis, or treatment. It is not a substitute for professional medical guidance. Customers are urged to consult a certified healthcare professional for any inquiries or concerns regarding their health or medical condition. For further assistance or inquiries, please do not hesitate to contact us at <span className="highlight-yellow">[insert contact information]</span>.</p>

            <p className='ploj'>We appreciate your understanding and cooperation regarding our <span style={{ textDecoration: 'underline' }}>cancellation and refund policy</span>.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export { CanRefundPolicy };

const CanNavigation = () => {
  return (
    <ul className="list-unstyled">
      <li className='can_pol'>
        <Link to="/canpol">Cancellation and Refund Policy</Link>
      </li>
    </ul>
  );
};

export { CanNavigation };
