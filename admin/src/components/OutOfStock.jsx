import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faEdit, faTrash , faAngleRight,faUsers,faFile,faBlog,faPhone,faGear,faShoppingBag} from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Layout from './Layout';
import Header from './Header';



const OutOfStock = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesToShow, setEntriesToShow] = useState(7);
  const [categories, setCategories] = useState([]);
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ecomVisibility, setEcomVisibility] = useState(false);
  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
  const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false);
  const [ProVisibility, setProVisibility] = useState(false);
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
        { id: 1, name: 'Product 1', image: './assets/image_7.png', status: 'Inactive', price: '$10', sku: 'SKU001', type: 'T1' },
        { id: 2, name: 'Product 2', image: './assets/image_7.png', status: 'Inactive', price: '$15', sku: 'SKU002', type: 'T2' },
        { id: 3, name: 'Product 3', image: './assets/image_7.png', status: 'Inactive', price: '$20', sku: 'SKU003', type: 'T5' },
        { id: 4, name: 'Product 4', image: './assets/image_7.png', status: 'Inactive', price: '$25', sku: 'SKU004', type: 'T2' },
        { id: 5, name: 'Product 5', image: './assets/image_7.png', status: 'Inactive', price: '$30', sku: 'SKU005', type: 'T1' },
        { id: 6, name: 'Product 6', image: './assets/image_7.png', status: 'Inactive', price: '$35', sku: 'SKU006', type: 'T5' },
        { id: 7, name: 'Product 7', image: './assets/image_7.png', status: 'Inactive', price: '$40', sku: 'SKU007', type: 'T1' },
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
  const toggleEcomVisibility = () => {
    setEcomVisibility((prevVisibility) => !prevVisibility);
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
      <Layout heading="Out Of Stock">
   
   </Layout>
        <div className="recent-orders">
          <div className="table-header">
            <p></p>
            <div className="ents-search">
       
              <div className='pentryli'>
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
              <div className="searchtoproducts">
                Search <input type="search" value={searchQuery} onChange={handleSearchChange} />
              </div>
            </div>
          </div>
          <table className="adminallblog-related">
  <thead className="ablogadminheads">
    <tr>
      <th>SN</th>
      <th>Product Name</th>
      <th>Price</th>
      <th>Image</th>
      <th>SKU </th>
      <th>Type</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {currentCategories.map((category, index) => (
      <tr key={index} className="bl">
        <td>{startIndex + index + 1}</td>
        <td>{category.name}</td>
        <td>{category.price}</td> 
        <td><img src={category.image} alt={category.name} style={{ width: '50px', height: '50px' }} /></td>
        <td>{category.sku}</td>
        <td>{category.type}</td>
        <div className='stiks'>
        <td className={`${category.status === 'Active' ? 'active' : 'deactive'} status-cell`}>{category.status}</td>
        </div>
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

export default OutOfStock;
