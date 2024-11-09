import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight, faEdit, faTrash,faUsers,faFile,faBlog,faPhone,faGear,faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Layout from './Layout';
import Header from './Header';

const AttributesPopup = ({ onClose, onSave }) => {
    const [key, setKey] = useState('');
    const [status, setStatus] = useState('');

    const handleSave = () => {
    
        console.log('Selected Key:', key);
        console.log('Status:', status);

    
        onSave({ key, status });
        
      
    };

    return (
        <div className="attributes-popup">
             <h2>Add New Attributes</h2>
             <button className="closepoup-btn" onClick={onClose}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
</button>
            <div className="popup-content">
                <label htmlFor="key">Key</label>
                <select
                    id="key"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                >
                    <option value="" disabled>Select Key</option>
                    <option value="color">Color</option>
                    <option value="size">Size</option>
                    <option value="ml">Milliliter</option>
                </select>

<div className='attristatus'>
                <label htmlFor="status">Status</label>
                <select
                    id="statuus"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="" disabled hidden>Select status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                </div>

                <div className="popup-buttons">
               
                    <button onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
};

export { AttributesPopup };

const Attributes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ecomVisibility, setEcomVisibility] = useState(false);
  const [entriesToShow, setEntriesToShow] = useState(7);
  const [orderVisibility, setOrderVisibility] = useState(false);
  const [ProVisibility, setProVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
  const [showAttributesPopup, setShowAttributesPopup] = useState(false);
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
 
    const dummyCategories = [
      { id: 1, name: 'Key 1',  status: 'Active' },
      { id: 2, name: 'Key 2',  status: 'Inactive' },
      { id: 3, name: 'Key 3', status: 'Active' },
      { id: 4, name: 'Key 4', status: 'Active' },
    
    ];
    setCategories(dummyCategories);
  }, []);

 
  const handleEntriesChange = (value) => {
    setEntriesToShow(value);
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
  const toggleEcomVisibility = () => {
    setEcomVisibility((prevVisibility) => !prevVisibility);
  };
  const toggleProVisibility = () => {
    setProVisibility(! ProVisibility);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const handleDeleteCategory = (categoryId) => {
    const updatedCategories = categories.filter((category) => category.id !== categoryId);
    setCategories(updatedCategories);
  };

  const filteredCategories = categories ? 
  categories.filter(category => 
      category.name && category.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) 
  : [];
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
      <Layout heading="Attributes">
   
   </Layout>
        <div className="recent-orders">
          <div className="table-header">
            <p></p>
            <div className="ents-search">
            <div className='engattri'>
            <button className="add-category-btn" onClick={() => setShowAttributesPopup(true)}>+ Add New</button>

{showAttributesPopup && <AttributesPopup onClose={() => setShowAttributesPopup(false)} onSave={handleAddCategory} />}
              </div>
            
              <div className='pentrry'>
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
              <div className="searchproducts">
                Search <input type="search" value={searchQuery} onChange={handleSearchChange} />
              </div>
            </div>
          </div>
          <table className="adminallblog-related">
            <thead className="ablogadminheads">
              <tr>
                <th>SN</th>
                <th>Key</th>
              
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {currentCategories.map((category, index) => (
      <tr key={index} className="bl">
        <td>{startIndex + index + 1}</td>
        <td>{category.name}</td>
 
        <div className='actdeacttt'>
        <td className={`${category.status === 'Active' ? 'active' : 'deactive'} status-cell`}>{category.status}</td></div>
        <td>
          <FontAwesomeIcon icon={faEdit} className="edit-icon" />
          <FontAwesomeIcon icon={faTrash} className="icon" onClick={() => handleDeleteCategory(category.id)} />
        </td>
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

export default Attributes;
