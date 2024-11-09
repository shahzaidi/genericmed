import React, { useState } from 'react';
import { FaUser, FaAddressCard, FaShoppingBag, FaHeart, FaCreditCard, FaSignOutAlt } from 'react-icons/fa';
import HomePage from './HomePage';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const [showMyOrderss, setShowMyOrderss] = useState(false);

  const handleLoadMore = () => {
    setShowMyOrderss(true);
  };
  
 
  return (
    <div className='mypi'>
      <HomePage />
      <div className='mypii'>
        <div style={{ display: 'flex', width:'24%',flexDirection: 'column', alignItems: 'flex-start', padding: '15px' }}className='detailspro'>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}className='tfd'>
            <FaUser style={{ marginRight: '10px' }} />
            <Link to="/my-profile">
            <span>My Profile</span>
            </Link>
          </div>


          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }} className='tfd'>
            <FaAddressCard style={{ marginRight: '10px' }} />
            <Link to="/myaddress">
            <span> My Address</span>
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}className='tfd'>
            <FaShoppingBag style={{ marginRight: '10px' }} />
            <Link to="/myorders">
            <span>My Orders</span>
            </Link>
          </div>


          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}className='tfd'>
            <FaHeart style={{ marginRight: '10px' }} />
            <Link to="/mywishlist">
            <span>My Wishlist</span>
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}className='tfd'>
            <FaCreditCard style={{ marginRight: '10px' }} />
            <span>Saved Payments</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px'  ,   width: '100%',
          padding: '5.5px',}}>
            <FaSignOutAlt style={{ marginRight: '10px' }} />
            <span>Logout</span>
          </div>
        </div>


       
       
       <div className='orderproducts'>
        <h2><img src="/assets/backarr.png" alt="" className='sdd' />My Orders</h2>
        <div className='myorders'>
     
      <p>Order No    </p>
        <p className='orderno'> #GMO1234-1234-1234-1234</p>
        <span> <Link to="/orderdet">Order details</Link></span>
      <div className='imagesorders'>
        <img src="/assets/Cart1.png" alt="Image 1" style={{ width: '100px', height: '100px' }} />
        <img src="/assets/Cart2.png" alt="Image 2" style={{ width: '100px', height: '100px' }} />
        <img src="/assets/Cart3.png" alt="Image 3" style={{ width: '100px', height: '100px' }} />
      </div>
   
        </div>

        <div className='myorders'>
      
     
      <p>Order No</p>
        <p className='orderno'> #GMO1234-1234-1234-1234</p>
        <span>       <Link to="/orderdet">Order details</Link></span>
      <div className='imagesorders'>
        <img src="/assets/Cart1.png" alt="Image 1" style={{ width: '100px', height: '100px' }} />
        <img src="/assets/Cart2.png" alt="Image 2" style={{ width: '100px', height: '100px' }} />
        <img src="/assets/Cart3.png" alt="Image 3" style={{ width: '100px', height: '100px' }} />
      </div>
   
     
        </div>
        <div className={`myordersss ${showMyOrderss ? 'show' : 'hide'}`}>
     
     <p>Order No    </p>
       <p className='ordernooo'> #GMO1234-1234-1234-1234</p>
       <span> <Link to="/orderdet">Order details</Link></span>
     <div className='imagesorders'>
       <img src="/assets/Cart1.png" alt="Image 1" style={{ width: '100px', height: '100px' }} />
       <img src="/assets/Cart2.png" alt="Image 2" style={{ width: '100px', height: '100px' }} />
       <img src="/assets/Cart3.png" alt="Image 3" style={{ width: '100px', height: '100px' }} />
     </div>
  
       </div>

       <div className={`myordersss ${showMyOrderss ? 'show' : 'hide'}`}>
     
     <p>Order No    </p>
       <p className='ordernooo'> #GMO1234-1234-1234-1234</p>
       <span> <Link to="/orderdet">Order details</Link></span>
     <div className='imagesorders'>
       <img src="/assets/Cart1.png" alt="Image 1" style={{ width: '100px', height: '100px' }} />
       <img src="/assets/Cart2.png" alt="Image 2" style={{ width: '100px', height: '100px' }} />
       <img src="/assets/Cart3.png" alt="Image 3" style={{ width: '100px', height: '100px' }} />
     </div>
  
       </div>


        </div>
       
      </div>
      <span className='lda'onClick={handleLoadMore}>
            Load More
        </span>
        
      <Footer />
    </div>
  );
};

export default MyOrders;
