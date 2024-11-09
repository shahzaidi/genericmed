import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import FooterMobile from './FooterMobile';
import HomePage from './HomePage'; 


const TermsCon = () => {
  return (
    <div>
      <HomePage />
   
      <div className="term-policy">
        <div className='pvy'>
          <h1 style={{ lineHeight: 2 }}>Package & Authenticity</h1>
        </div>

        <div className='pyf'>
          <div className='polimage'>
            <img src="/assets/authenticity.png" className='polimg' alt="Logo" height="50" />
          </div> 

          <div className='orvcy-info'>
            <p  className='mt'>
              At GenericMedOnline, we prioritize your privacy and safety when it comes to purchasing healthcare and medicinal products. Our unique packaging and authenticity measures ensure that your products are delivered in discreet packaging, safeguarding your privacy. We maintain strict confidentiality of your personal information and purchases, earning your trust.
        
            </p>
            <br/>
            <h3>100% Authenticity Guaranteed:</h3><br/>
            <div className="fg">
            <p className='ms'>
              At GenericMedOnline, we make sure to put authenticity on a pedestal. You can trust that when you choose us, you will receive the highest quality products. We partner with licensed manufacturers known for their reliability, ensuring every medication you receive is genuine and effective.

</p>

<p className='ms'>
              <br/>We are aware of the serious risks that come with counterfeit drugs, and that is why we have taken strict measures to ensure your well-being. With the help of advanced technologies, such as barcoding and blockchain, we are able to improve traceability and guarantee the authenticity of each product. Our manufacturers have implemented barcoding technology to prevent counterfeit medicines from entering the market.
</p>

<p className='ms'>
              <br/>When you purchase from us, you're not just getting medication – you're getting peace of mind. Our commitment to transparency and quality means you can trust us with your health.
        
            </p>
            </div>
            <br/>
           

            <h3>Discreet and Secure Packaging:</h3>
<p>
  GenericMedOnline’s discreet packaging guarantee features plain boxes with generic labels, offering complete privacy. With no logos or branding to reveal what's inside, rest assured that your purchases remain confidential within our genuine product packaging.
  <br/>
</p>
<ul class='footuu'>
  <li><span class="big-bullet-1">&#8226;</span> <strong>Triple-Layered Protection :</strong>  Sturdy, triple-layered packaging keeps your order safe and intact during transit.</li>
  <li><span class="big-bullet-1">&#8226;</span> <strong>Blister Pack Security :</strong>  Products are placed in blister packs for additional protection and peace of mind.</li>
  <li><span class="big-bullet-1">&#8226;</span> <strong>Sealed and Secure :</strong>  Secure packaging keeps your order confidential from our warehouse to your doorstep.</li>
  <li><span class="big-bullet-1">&#8226;</span> <strong>Recipient Privacy :</strong>  The outer packaging includes only your name & address, along with our address.</li>
  <li><span class="big-bullet-1">&#8226;</span> <strong>Professional Demeanor :</strong>  We prioritize discretion with a professional approach, ensuring your privacy is maintained throughout the process.</li>
</ul>
          </div>
        </div>
      </div>
      <Footer />
      <FooterMobile />
    </div>
  );
};

export { TermsCon };

const TermNavigation = () => {
  return (
    <ul className="list-unstyled">
      <li className='term'>
        <Link to="/Term"></Link>
      </li>
    </ul>
  );
};

export { TermNavigation };
