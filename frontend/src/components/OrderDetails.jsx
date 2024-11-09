import React, { useState } from 'react';
import { FaUser, FaAddressCard, FaShoppingBag, FaHeart, FaCreditCard, FaSignOutAlt } from 'react-icons/fa';
import HomePage from './HomePage';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const OrderDetails = () => {
  
  const [products, setProducts] = useState([
    { id: 1,  image: '/assets/Cart1.png', title: 'CalmEase Capsules',info: 'Esential Nutrients for Daily Vitality', price: 50, quantity: 1 },
    { id: 2, image: '/assets/Cart2.png', title: 'VitalVibes Multivitamins',info:'Fuel your day with essential nutrients', price: 40, quantity: 2 },
    { id: 3, image: '/assets/Cart3.png', title: 'PainRelief Max Tablets', info:'PainRelief Max Tablets',price: 30, quantity: 3 },
  ]);

    return (
        <div className='mypi'>
          <HomePage />
          <div className='mypiiii'>
            <div style={{ display: 'flex', width:'22%',flexDirection: 'column', alignItems: 'flex-start', padding: '15px' }}className='detailspro'>
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
            <div className='orderdetproducts'>
            <h2><img src="/assets/backarr.png" alt="" className='sdd' />My Orders</h2>
            <div className='myorderdets'>
         
          <p>Order No    </p><p className='totaldet'>TOTAL:</p>
            <p className='oorderno'> #GMO1234-1234-1234-1234</p><p className='priecdeta'>$26</p>
         
       
       
            </div>

            <div className='d_address'>
      <h2>Delivery Address</h2>
      <p>
        John Doe
        <br />
      +1 (123) 456-7890
        <br />
   Marcus Aloe, Shaded Streets,front of denim garden, lane04, New York, Ny1004, USA.
      </p>
    </div>

    <div className="orderdetails-summary">
        
        <div className='alldetailsorder'>
        <fieldset>
 <h2>Orders</h2>
          <table className='or_det'>
            
            <tbody>
              {products.map((product) => (
                <tr key={product.id}className='trd-d'>
                  <td className='ristb'>
                  
                    <div className="product-information_det">
                      <img src={product.image} alt={product.title} />
                      <div className='titetbutton'>
                        <h2>{product.title}</h2>
                        <p>{product.info}</p>
  
                    <p>Qty:1</p>
                      
                      </div>
                      <td className='hgprice'>${product.price}</td>
                  <td className='tydetails'>Delivery by Monday, 29th</td>
                     </div>
                 
                 
                   </td>
                </tr>
              ))}
            </tbody>
            
          </table>
          </fieldset>
        </div>



        
        </div>
        <div className='proddetus'>
        <h2>Payment details</h2>
      
        <div className='flejjf'>
          <p className='wid'>Payment method </p>
          <p className='digdet'>COD</p>
          </div>

      <div className='flejjf'>
        <p className='wid'>Subtotal (Inclusive Tax) </p>
        <p className='digdet'>$26</p>
        </div>

         <div className='flejjf'>
        <p className='wid'>Discount</p>
        <p className='digdet'> -$0</p>
        </div>

        <div className='flejjf'>
        <p className='wid'>Shipping charges</p>
<p className='diggdet'>$0</p>
</div>
        <div className='flejjf'>
        <p className='yuuu'>Total</p>
        <p className='doldet'>$26</p>
        </div>


        <p className='shhffff_det'>Total savings:<span className='totaldetails'> $6</span></p>
       
      </div>






    
            </div>
            


            </div>
    
    
           
           
          
    
         

            <Footer />
    </div>
    
  );
};

export default OrderDetails;