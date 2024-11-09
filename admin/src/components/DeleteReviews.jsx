import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faStar, faCheckCircle, faClock, faTrash ,faAngleRight,faUsers,faFile,faBlog,faPhone,faGear,faShoppingBag} from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Layout from './Layout';
import Header from './Header';



const  DeleteReviews = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesToShow, setEntriesToShow] = useState(5);
  const [categories, setCategories] = useState([]);
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);

  const [ProVisibility, setProVisibility] = useState(false);
  const [ecomVisibility, setEcomVisibility] = useState(false);

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
  const toggleEcomVisibility = () => {
    setEcomVisibility((prevVisibility) => !prevVisibility);
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




  useEffect(() => {
 
    const dummyCategories = [
        { id: 1, date: '01-02-2024', title: 'Title 1', image: '/assets/image_7.png', review: 'Good product', status: 'Delete' },
        { id: 2, date: '02-02-2024', title: 'Title 2', image: '/assets/image_7.png', review: 'Superb', status: 'Delete' },
        { id: 3, date: '03-02-2024', title: 'Title 3', image: '/assets/image_7.png', review: 'Nice', status: 'Delete' },
        { id: 4, date: '04-02-2024', title: 'Title 4', image: '/assets/image_7.png', review: 'Great', status: 'Delete' },
        { id: 5, date: '05-02-2024', title: 'Title 5', image: '/assets/image_7.png', review: 'Excellent', status: 'Delete' },
    ];
      
      setCategories(dummyCategories);
      
  }, []);

 

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleOrderVisibility = () => {
    setOrderVisibility(!orderVisibility);
  };
  const toggleProVisibility = () => {
    setProVisibility(! ProVisibility);
  };
  const toggleCatVisibility = () => {
    setCatVisibility(!catVisibility);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const handleDeleteCategory = (categoryId) => {
    const updatedCategories = categories.filter((category) => category.id !== categoryId);
    setCategories(updatedCategories);
  };

  const filteredCategories = categories.filter((category) =>
  category.title && category.title.toLowerCase().includes(searchQuery.toLowerCase())
);
  const startIndex = (currentPage - 1) * entriesToShow;
  const endIndex = Math.min(startIndex + entriesToShow, filteredCategories.length);
  const currentCategories = filteredCategories.slice(startIndex, endIndex);



  const totalPages = 20;
  const pagesToShow = 5; 


  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button key={i} onClick={() => handlePageChange(i)} className={currentPage === i ? 'active' : ''}>
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };
 
  const toggleAdminDropdown = () => { 
    setAdminDropdownVisible(!adminDropdownVisible);
  };

  const handleEntriesChange = (value) => {
    setEntriesToShow(value);
  };
  
  return (
    <div className="admin-dashboard">
   
<Sidebar/>

      <div className="rightt-panel">
        <Header/>
      <Layout heading="Delete Reviews">
   
   </Layout>
        <div className="recent-orders">
          <div className="table-header">
            <p></p>
            <div className="ents-search">
        
              <div className='pentryreview'>
                Show&nbsp;
                <select onChange={(e) => handleEntriesChange(parseInt(e.target.value))} value={entriesToShow}>
                <option value="10">5</option>
                <option value="7">7</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                &nbsp;entries
              </div>
              <div className="searchproducts">
                Search <input type="search" value={searchQuery} onChange={handleSearchChange} />
              </div>
            </div>
          </div>
          <table className="adminallblog-related">
      <thead className="ablogadminheads">
        <tr>
          <th>SN</th>
          <th>Name</th>
          <th>Image</th>
          <th>Rating</th>
          <th>Review</th>
          <th>Status</th>
          {/* <th>Action</th> */}
        </tr>
      </thead>
      <tbody>
        {categories.map((category, index) => (
          <tr key={index} className="bl">
            <td>{index + 1}</td>
            <td>{category.title}</td>
            <td><img src={category.image} alt={category.title} style={{ width: '50px', height: '50px' }} /></td>
            <td>
              {/* Displaying 5 stars for rating */}
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon icon={faStar} key={i} />
              ))}
            </td>
            <td>{category.review}</td>
            <td className={`${category.status === 'Pending' ? 'pending' : (category.status === 'Approved' ? 'approved' : 'deleted')} status-cell`}>
              {/* Displaying appropriate status button */}
              {category.status === 'Pending' ? (
                <button className="pending-button" onClick={() => handleStatusChange(category.id, 'Approved')}>
                  Pending
                </button>
              ) : category.status === 'Approved' ? (
                <button className="approved-button" onClick={() => handleStatusChange(category.id, 'Pending')}>
                  Approve
                </button>
              ) : (
                <button className="deleted-status">Delete</button>
              )}
            </td>
            {/* <td>
        
              
             
              <FontAwesomeIcon icon={faTrash} className="icon" onClick={() => handleDeleteCategory(category.id)} />
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
          <div className="pagination-innfo">
            <p>
            Showing 0 to 0 of 0 entries
            </p>
            <div className="admin-pg">
            <span onClick={handlePrev} disabled={currentPage === 1}>
        Previous
      </span>
      {renderPageNumbers()}
      <span onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteReviews;
