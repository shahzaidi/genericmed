import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import FooterMobile from './FooterMobile';
import HomePage from './HomePage'; 
import HomePageMobile from './HomepageMobile';

const MedicinePolicy = () => {
  return (
    <div>
    <HomePage />
    <HomePageMobile/>
    <div className="med-policy">
        <div className='pvyy'>
        <h1 style={{ lineHeight: 3.5}}>Medicine Policy</h1>
    
        </div>

        <div className='pyf'>
        <div className='polimage'>
        <img src="/assets/foot_logo.jpg" className='polimg'alt="Logo" height="50" />    
        </div> 

<div className='orvcy-info'>
     
      <p>Medicines play a major role in protecting, maintaining and restoring people’s health. Continuous provision of appropriate medicines of assured quality, in adequate quantities and at affordable prices is a concern for all national governments. 
There is a general need for medicine policies based on universal principles but nevertheless adapted to the national situation of a country, to meet the health needs of different populations.
 <br/>A national medicines policy (NMP) helps to identify strategies to meet these objectives, as it provides a comprehensive framework for the development of all components of the national pharmaceutical sector with a future perspective of 10 years to adapt to the changing environment, combined with monitoring and periodic reviews </p>
      <span>1. Proper Usage of Medicines</span>
<p>
It is crucial to use prescribed medicines according to the instructions provided by healthcare professionals.
          Follow the recommended dosage and frequency for optimal results and to avoid potential side effects.<br/>
</p>

  <span>2. Storage Guidelines</span>
      <p>
      Store medicines in a cool, dry place away from direct sunlight and moisture. Follow specific storage instructions
          provided for each medication to maintain their effectiveness and safety.<br/>
      </p>
    
      

      <span>3. Prescription Requirements</span>
      <p>
      Certain medicines require a valid prescription. It is important to consult a healthcare provider and obtain
          the necessary prescriptions before purchasing and using prescription medications.<br/>
      </p>
     
    

      <span>4. Reporting Side Effects</span><br/>
      <p>
      If you experience any unexpected side effects from a medication, promptly report them to your healthcare provider
          or the appropriate regulatory agency. This helps in ensuring the safety of medications.<br/>
      </p>
    
  
    
     
     

      <span>5. Medication Disposal</span>
      <p>
      Dispose of expired or unused medications responsibly. Follow local guidelines for medication disposal or consult
          with a pharmacist to ensure environmentally friendly and safe disposal practices.<br/>
      </p>
     
    

      <span>6. Medication Interactions</span>
      <p>    Inform your healthcare provider about all medications, including over-the-counter drugs and supplements, to
          prevent potential interactions that could impact their effectiveness or lead to adverse effects.

</p><br/>
<span>7. Accessibility and Affordability</span>
<p> Advocate for policies that promote the accessibility and affordability of essential medications. Collaborate
          with healthcare providers and policymakers to address issues related to medication costs and availability.</p>

<span>8. Continuous Education</span>
<p> Stay informed about your medications and health conditions. Seek continuous education about new medications,
          treatment options, and any updates to existing medicine policies.</p><br/>
         
          <span>9. Contact Information</span>
<p>  If you have any questions or concerns regarding our medicine policies, feel free to contact our customer support
          at support@examplepharmacy.com or call our toll-free number.</p>
     
    </div>
    </div>
    </div>
     <Footer />
     <FooterMobile/>
     </div>
  );
};

export  {MedicinePolicy};
const MedNavigation = () => {
    return (
      <ul className="list-unstyled">
        <li className='med_pol'>
          <Link to="/medpol"></Link>
        </li>

      </ul>
    );
  };
  
  export { MedNavigation };
  