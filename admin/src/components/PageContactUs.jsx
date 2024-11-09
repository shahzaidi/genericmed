import React, { useState,useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown,faAngleRight,faUsers,faFile,faBlog,faPhone,faGear,faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import Layout from './Layout';
import Header from './Header';

const PageContactUs = () => {
  const [isActive, setIsActive] = useState(false);
  const [contactno, setContactno] = useState('');
  const [email, setEmail] = useState('');
  const [Title, setTitle] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [address, setAddress] = useState('');
  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
  
  
  const [ecomVisibility, setEcomVisibility] = useState(false);

  const [dmVisibility, setDMVisibility] = useState(false);
const [userVisibility, setUserVisibility] = useState(false);
const [pagesVisibility, setPagesVisibility] = useState(false);
const [blogsVisibility, setBlogsVisibility] = useState(false);
const [orderLogVisibility, setOrderLogVisibility] = useState(false);
const [adminVisibility, setAdminVisibility] = useState(false);

const [ProVisibility, setProVisibility] = useState(false);
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
  const toggleEcomVisibility = () => {
    setEcomVisibility((prevVisibility) => !prevVisibility);
  };
  const toggleProVisibility = () => {
    setProVisibility(! ProVisibility);
  };

  
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

    if (
      location.pathname === '/googleanalytics' ||
      location.pathname === '/homepage' ||
      location.pathname === '/categorypage' ||
      location.pathname === '/shopall' ||
      location.pathname === '/aboutus' ||
      location.pathname === '/blogpage' ||
      location.pathname === '/contactus' ||
      location.pathname === '/privacypolicy' ||
      location.pathname === '/termsandconditions' ||
      location.pathname === '/faqs'
    ) {
      setDMVisibility(true);
    } else {
      setDMVisibility(false);
    }

    if (
      location.pathname === '/customerlist' ||
      location.pathname === '/pendingcustomerlist'
    ) {
      setUserVisibility(true);
    } else {
      setUserVisibility(false);
    }

    if (
      location.pathname === '/aboutus' ||
      location.pathname === '/contactus' ||
      location.pathname === '/termsandconditions' ||
      location.pathname === '/privacypolicy' ||
      location.pathname === '/faqs' ||
      location.pathname === '/homepage' ||
      location.pathname === '/categoriespage' ||
      location.pathname === '/shopall'
    ) {
      setPagesVisibility(true);
    } else {
      setPagesVisibility(false);
    }
    if (
      location.pathname === '/blogallblogs' ||
      location.pathname === '/blogcategorypage' ||
      location.pathname === '/addnewpost'
    ) {
      setBlogsVisibility(true);
    } else {
      setBlogsVisibility(false);
    }

    if (
      location.pathname === '/orderlist' ||
      location.pathname === '/createanorder'
    ) {
      setOrderLogVisibility(true);
    } else {
      setOrderLogVisibility(false);
    }
    if (
      location.pathname === '/alladminlist' ||
      location.pathname === '/addnewadmin' ||
      location.pathname === '/alladminroles' ||
      location.pathname === '/userpermissions'
    ) {
      setAdminVisibility(true);
    } else {
      setAdminVisibility(false);
    }
  }, [location.pathname]);



  const toggleAdminDropdown = () => {
    setAdminDropdownVisible(!adminDropdownVisible);
  };

  const toggleOrderVisibility = () => {
    setOrderVisibility(!orderVisibility);
  };

  const toggleCatVisibility = () => {
    setCatVisibility(!catVisibility);
  };

  const homsv = () => {
    const newData = {
      Title,
      email,
     contactno,
      whatsappNumber,
      address
    };
    console.log("Saving data:", newData);
    // Perform save operation with newData
  };

  return (
    <div>
      <div className="admin-dashboard">
     <Sidebar/>
        <div className="rightt-panel">
          <Header/>
        <Layout heading="Contact Us">
   
   </Layout>
          <div className='produche'>
            <div className='in'>
              <label>
                Title <span style={{ color: 'red' }}>*</span>
                <input type="text" value={Title} onChange={(e) => setTitle(e.target.value)} />
              </label>
            </div>
            <div className='in'>
              <label>
                Email <span style={{ color: 'red' }}>*</span>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
            </div>
            <div className='in'>
              <label>
                Contact Number <span style={{ color: 'red' }}>*</span>
                <input type="text" value={contactno} onChange={(e) => setContactno(e.target.value)} />
              </label>
            </div>
            <div className='in'>
              <label>
                WhatsApp Number <span style={{ color: 'red' }}>*</span>
                <input type="text" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} />
              </label>
            </div>
            <div className='in'>
              <label>
                Address <span style={{ color: 'red' }}>*</span>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
              </label>
            </div>
            <button className='homesave' onClick={homsv}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageContactUs;
