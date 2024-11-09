import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faEdit, faTrash,faAngleRight,faEye,faUsers,faFile,faBlog,faPhone,faGear,faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Layout from './Layout';
import Header from './Header';



const AllAdminRole = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ProVisibility, setProVisibility] = useState(false);
  const [ecomVisibility, setEcomVisibility] = useState(false);
  const [entriesToShow, setEntriesToShow] = useState(7);
  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
  const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false);
  


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
        { id: 1, name: 'Rajleen', role: 'Admin' },
        { id: 2, name: 'Rajleen', role: 'Super Admin' },
        { id: 3, name: 'Rajleen',  role: 'Super Admin' },
        { id: 4, name: 'Rajleen', role: 'Admin' },
        { id: 5, name: 'Rajleen',  role: 'Admin' },
      ];
      setCategories(dummyCategories);
    }, []);
  

    const handleEntriesChange = (value) => {
        setEntriesToShow(value);
      };
     
  const toggleProVisibility = () => {
    setProVisibility(! ProVisibility);
  };
  const toggleEcomVisibility = () => {
    setEcomVisibility((prevVisibility) => !prevVisibility);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleOrderVisibility = () => {
    setOrderVisibility(!orderVisibility);
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
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleAddCategory = (newCategory) => {
 
    newCategory.id = categories.length + 1;
    setCategories([...categories, newCategory]);
  };
  useEffect(() => {
 
    if (location.pathname === '/allorders' || location.pathname === '/pendingorders' || location.pathname === '/Delorders' || location.pathname === '/Cancelorders') {
      setOrderVisibility(true);
    } else {
      setOrderVisibility(false);
    }

    if (location.pathname === '/allcategories' || location.pathname === '/subcategories') {
      setCatVisibility(true);
    } else {
      setCatVisibility(false);
    }
  }, [location.pathname]);
  return (
    <div className="admin-dashboard">
       
       <Sidebar/>


      <div className="rightt-panel">
        <Header/>
      <Layout heading="All Admin Role">
   
   </Layout>
        <div className="recent-orders">
          <div className="table-header">
            <p></p>
            <div className="ents-search">
            <div className='pentryadmin'>
                Show&nbsp;
                <select onChange={(e) => handleEntriesChange(parseInt(e.target.value))} value={entriesToShow}>
                <option value="7">7</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                &nbsp;entries
              </div>
              <div className="search">
                Search <input type="search" value={searchQuery} onChange={handleSearchChange} />
              </div>
            </div>
          </div>
          <table className="adminallblog-related">
  <thead className="ablogadminheads">
    <tr className='bl'>
      <th>SN</th>
      <th>Employee Name</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    {currentCategories.map((category, index) => (
      <tr key={index} className="bl">
        <td>{startIndex + index + 1}</td>
        <td>{category.name}</td>
        <td>{category.role}</td>
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

export default AllAdminRole;
