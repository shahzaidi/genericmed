import React, { useState , useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown,faAngleRight,faUsers,faFile,faBlog,faPhone,faGear,faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Sidebar from './Sidebar';
import Layout from './Layout';
import Header from './Header';


const PaymentMethod = () => {
 
    const [catVisibility, setCatVisibility] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
   const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
    const [orderVisibility, setOrderVisibility] = useState(false);
    const [activeTab, setActiveTab] = useState('paypal');

    const [paypalClientId, setPaypalClientId] = useState('');
    const [ProVisibility, setProVisibility] = useState(false);
    const [EcomVisibility, setEcomVisibility] = useState(false);
   
    const [stripeClientId, setStripeClientId] = useState('');

    const [codStatus, setCodStatus] = useState(''); 

    const [dmVisibility, setDMVisibility] = useState(false);
  const [userVisibility, setUserVisibility] = useState(false);
  const [pagesVisibility, setPagesVisibility] = useState(false);
  const [blogsVisibility, setBlogsVisibility] = useState(false);
  const [orderLogVisibility, setOrderLogVisibility] = useState(false);
  const [adminVisibility, setAdminVisibility] = useState(false);
  const [guestUsersVisibility, setGuestUsersVisibility] = useState(false);

  const toggleGuestUsersVisibility = () => {
    setGuestUsersVisibility(!guestUsersVisibility);
  };
  const toggleAdminVisibility = () => {
    setAdminVisibility(!adminVisibility);
  };


  const toggleOrderLogVisibility = () => {
    setOrderLogVisibility(!orderLogVisibility);
  };

  const togglePagesVisibility = () => {
    setPagesVisibility(!pagesVisibility);
  };

  const toggleBlogsVisibility = () => {
    setBlogsVisibility(!blogsVisibility);
  };

  const toggleUserVisibility = () => {
    setUserVisibility(!userVisibility);
  };

  const toggleDMVisibility = () => {
    setDMVisibility(!dmVisibility);
  };

  
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
  
  
      const handleCodToggle = () => {
        setCodStatus(!codStatus);
      };
    
   

  

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
      };

   
  const toggleOrderVisibility = () => {
    setOrderVisibility(!orderVisibility);
  };

      const toggleAdminDropdown = () => { 
        setAdminDropdownVisible(!adminDropdownVisible);
      };

    
    
     
  const toggleProVisibility = () => {
    setProVisibility((prevVisibility) => !prevVisibility);
  };
  
  const toggleEcomVisibility = () => {
    setEcomVisibility((prevVisibility) => !prevVisibility);
  };

      const toggleCatVisibility = () => {
        setCatVisibility(!catVisibility);
      };
    
    useEffect(() => {
    
        const ordefDiv = document.querySelector('.ordef');
        ordefDiv.style.display = 'block';
      }, []);

      useEffect(() => {
        if (
          location.pathname === '/allorders' ||
          location.pathname === '/pendingorders' ||
          location.pathname === '/Delorders' ||
          location.pathname === '/Cancelorders'
        ) {
          setOrderVisibility(true);
        } else {
          setOrderVisibility(false);
        }
      
        if (
          location.pathname === '/allcategories' ||
          location.pathname === '/subcategories'
        ) {
          setCatVisibility(true);
        } else {
          setCatVisibility(false);
        }
      
        if (
          location.pathname === '/createproduct' ||
          location.pathname === '/productlist' ||
          location.pathname === '/attributes' ||
          location.pathname === '/outofstock'
        ) {
          setProVisibility(true);
        } else {
          setProVisibility(false);
        }
      
        if (
          location.pathname === '/createcoupon' ||
          location.pathname === '/couponlist' ||
          location.pathname === '/shippingrule' ||
          location.pathname === '/paymentmethod'
        ) {
          setEcomVisibility(true);
        } else {
          setEcomVisibility(false);
        }
      }, [location.pathname]);
      return (
        <div className="admin-dashboard">
        
<Sidebar/>

           <div className="rightt-panel">
            <Header/>
           <Layout heading="Payment Method">
   
   </Layout>
    
    
        <div className="payment-container">
      <div className="tabs">
        <div className={`tab ${activeTab === 'paypal' ? 'active' : ''}`} onClick={() => handleTabClick('paypal')}>
          PayPal
        </div>
        <div className={`tab ${activeTab === 'stripe' ? 'active' : ''}`} onClick={() => handleTabClick('stripe')}>
          Stripe
        </div>
        <div className={`tab ${activeTab === 'cashOnDelivery' ? 'active' : ''}`} onClick={() => handleTabClick('cashOnDelivery')}>
          Cash on Delivery
        </div>
      </div>
      <div className="content">
        {activeTab === 'paypal' && (
          <div className="paypal-content">
         
         
          
          
          
            <div className="paypal-client-id">
              <label>Enter User Id</label>
              <input type="rate" value={paypalClientId} onChange={(e) => setPaypalClientId(e.target.value)} />
            </div>
          
      
          </div>
        )}
    
      
        {activeTab === 'stripe' && (
          <div className="stripe-content">
         
            
          
          
         
            <div className="stripe-client-id">
  <label>Enter User Id</label>
  <input type="rate" value={stripeClientId} onChange={(e) => setStripeClientId(e.target.value)} />
</div>

          </div>
        )}
        
        {activeTab === 'cashOnDelivery' && (
  <div className="cod-content">
      <div className="status">
     
     <label htmlFor="stripeStatus">Cash On Delivery Status</label>
<label className="switch">
<input
   type="checkbox"
   id="codStatus"
   checked={codStatus}
   onChange={handleCodToggle}
/>
<span className="slider round"></span>
</label>

   </div>

  </div>
)}


      
     
      </div>
    </div>
    
    
    
    
    
    
    
    
    
    
       </div>
      </div>
   
  );
};

export default PaymentMethod;
