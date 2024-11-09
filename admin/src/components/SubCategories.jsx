import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faEdit, faTrash ,faAngleRight,faUsers,faFile,faBlog,faPhone,faGear,faShoppingBag} from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Layout from './Layout';
import Header from './Header';


const AddSubCategoryPopup = ({ onClose, onAddSubCategory, categories }) => {
  const [subcategoryName, setSubCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [status, setStatus] = useState('Active');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSubCategory = {
      name: subcategoryName,
      image: image ? URL.createObjectURL(image) : null,
      status: status,
      category: selectedCategory,
    };
    onAddSubCategory(newSubCategory);
    setSubCategoryName('');
    setStatus('Active');
    setImage(null);
    setSelectedCategory('');
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>
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
        <h2>Add Subcategory</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-groutp">
            <label htmlFor="subcategoryName">Subcategory Name</label>
            <input
              type="text"
              id="subcategoryName"
              value={subcategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              required
            />
          </div>
          <div className="form-groutp">
            <label htmlFor="category">Select Category</label>
            <select
              id="cateyyhgory"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-groutp">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="form-groutp">
            <label htmlFor="image">Upload Image</label>
            <div className="llpoi">
                <>
                  <div
                    style={{ marginBottom: "20px" }}
                 
                  >
                    <div
                      className="bigimage mentomn"
                      style={{
                        cursor: "pointer",
                        width: "80px",
                        height: "80px",
                      }}
                    >
                      <div className="big-image-placeholder">
                        <img
                        src="/assets/upimgicon.png"
                           
                          style={{ width:"35px", height:"35px" }}
                          alt="Upload Icon"
                        />
                      </div>
                    </div>
                    <input
                      type="file"
                      multiple
                    
                 
                      style={{ display: "none" }}
                    />
                  </div>
                </>
              </div>
          </div>
          <button type="submit"id="catleen">Submit</button>
        </form>
      </div>
    </div>
  );
};

export { AddSubCategoryPopup };

const SubCategories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ProVisibility, setProVisibility] = useState(false);
  const [ecomVisibility, setEcomVisibility] = useState(false);
  const [entriesToShow] = useState(10); 
  const [showAddSubCategoryPopup, setShowAddSubCategoryPopup] = useState(false);
  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
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
      { id: 1, name: 'Subcategory 1', image: './assets/image_7.png', status: 'Active' },
      { id: 2, name: 'Subcategory 2', image: './assets/image_7.png', status: 'Inactive' },
      { id: 3, name: 'Subcategory 3', image: './assets/image_7.png', status: 'Active' },
      { id: 4, name: 'Subcategory 4', image: './assets/image_7.png', status: 'Active' },
      { id: 5, name: 'Subcategory 5', image: './assets/image_7.png', status: 'Active' },
      { id: 6, name: 'Subcategory 6', image: './assets/image_7.png', status: 'Active' },
      { id: 7, name: 'Subcategory 7', image: './assets/image_7.png', status: 'Active' },
    ];
    setCategories(dummyCategories);
  }, []);

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

  const handleAddSubCategory = (newSubCategory) => {
    newSubCategory.id = categories.length + 1; 
    setCategories([...categories, newSubCategory]); 
  };
  useEffect(() => {
    // Check the current path and open the dropdown accordingly
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
      <Layout heading="Subcategories">
   
   </Layout>
        <div className="recent-orders">
          <div className="table-header">
            <p></p>
            <div className="ents-search">
            <div className="eng">
            <button className="add-category-btn" onClick={() => setShowAddSubCategoryPopup(true)}>+ Add Subcategory</button>

{showAddSubCategoryPopup && (
  <AddSubCategoryPopup 
    onClose={() => setShowAddSubCategoryPopup(false)} 
    onAddSubCategory={handleAddSubCategory} 
    categories={categories}
  />
)}
            </div>
              <div className="search">
                Search <input type="search" value={searchQuery} onChange={handleSearchChange} />
              </div>
            </div>
          </div>
          <table className="adminallblog-related">
            <thead className="ablogadminheads">
              <tr>
                <th>SN</th>
                <th>Subcategory Name</th>
                <th>Image</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentCategories.map((category, index) => (
                <tr key={index}className='bl'>
                  <td>{startIndex + index + 1}</td>
                  <td>{category.name}</td>
                  <td><img src={category.image} alt={category.name} style={{ width: '50px', height: '50px' }} /></td>
                  <div className='actdeact'>
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

export default SubCategories;
