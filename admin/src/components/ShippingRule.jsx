import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faEdit, faTrash ,faAngleRight,faUsers,faFile,faBlog,faPhone,faGear,faShoppingBag} from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link } from 'react-router-dom';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Layout from './Layout';
import Sidebar from './Sidebar';
import Header from './Header';

const ShippingRulePopup = ({ onClose }) => {
    const [area, setArea] = useState('');
    const [rule, setRule] = useState('');
    const [ruleType, setRuleType] = useState('');
    const [conditionFrom, setConditionFrom] = useState('');
    const [conditionTo, setConditionTo] = useState('');
    const [shippingFee, setShippingFee] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        
     
        const newErrors = {};
        if (!area) newErrors.area = 'Area is required.';
        if (!rule) newErrors.rule = 'Rule is required.';
        if (!ruleType) newErrors.ruleType = 'Rule Type is required.';
        if (!conditionFrom) newErrors.conditionFrom = 'Condition From is required.';
        if (!shippingFee) newErrors.shippingFee = 'Shipping Fee is required.';
        
   
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

     
        const shippingRuleData = {
            area,
            rule,
            ruleType,
            conditionFrom,
            conditionTo,
            shippingFee
        };

        console.log({
            ...shippingRuleData,
            conditionFrom: conditionFrom.replace('$', ''),
            conditionTo: conditionTo.replace('$', ''),
            shippingFee: shippingFee.replace('$', '')
        });
        console.log({
            ...shippingRuleData,
            conditionFrom: "$" + conditionFrom,
            conditionTo: "$" + conditionTo,
            shippingFee: "$" + shippingFee
        });

   
    };

    const usAreas = [
        'Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Guam', 'Hawaii',
        'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
        'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
        'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon',
        'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
        'Texas', 'U.S. Virgin Islands', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
        'Wisconsin', 'Wyoming'
    ];

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
        <div className="popupship">
            <div className="popup-inner">
                <div className="popup-header">
                    <h2>Create Shipping Rule</h2>
                    <button className="close-btnship" onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <div className="popup-content">
                    <form onSubmit={handleSubmit}>

                        <div className="form-ggroup">
                            <label htmlFor="area">
                                City / Delivery Area <span className="required"style={{ color: 'red' }}>*</span>
                            </label>
                            <select
                                id="area"
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                required
                            >
                                <option value="">Select Area</option>
                                {usAreas.map((area, index) => (
                                    <option key={index} value={area}>{area}</option>
                                ))}
                            </select>
                            {errors.area && <span className="error">{errors.area}</span>}
                        </div>
                        <div className="form-ggroup">
                            <label htmlFor="rule">
                                Shipping Rule <span className="required"style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                type="text"
                                id="rule"
                                value={rule}
                                onChange={(e) => setRule(e.target.value)}
                                required
                            />
                            {errors.rule && <span className="error">{errors.rule}</span>}
                        </div>
                        <div className="form-ggroup">
                            <label htmlFor="ruleType">
                                Type <span className="required"style={{ color: 'red' }}>*</span>
                            </label>
                            <select
                                id="ruleType"
                                value={ruleType}
                                onChange={(e) => setRuleType(e.target.value)}
                                required
                            >
                                <option value="">Select Rule Type</option>
                                <option value="price">Based on Product Price</option>
                                <option value="weight">Based on Product Weight (g)</option>
                                <option value="quantity">Based on Product Quantity</option>
                            </select>
                            {errors.ruleType && <span className="error">{errors.ruleType}</span>}
                        </div>

                        <div className='confto'>
                            <div className="form-ggroup">
                                <label htmlFor="conditionFrom">
                                    Condition From <span className="required"style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="conditionFrom"
                                    value={"$" +conditionFrom}
                                    onChange={(e) => setConditionFrom(e.target.value.slice(1))}
                                    required
                                />
                                {errors.conditionFrom && <span className="error">{errors.conditionFrom}</span>}
                            </div>

                            <div className="form-ggroup">
                                <label htmlFor="conditionTo">Condition To <span className="required"style={{ color: 'red' }}>*</span></label>
                                <input
                                    type="text"
                                    id="conditionTo"
                                    value={"$" +conditionTo}
                                    onChange={(e) => setConditionTo(e.target.value.slice(1))}
                                    required
                                />
                                {errors.conditionTo && <span className="error">{errors.conditionTo}</span>}
                            </div>
                        </div>

                        <div className="form-ggroup">
                            <label htmlFor="shippingFee">
                                Shipping Fee <span className="required"style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                type="text"
                                id="shippingFee"
                                value={"$" +shippingFee}
                                onChange={(e) => setShippingFee(e.target.value.slice(1))}
                                required
                            />
                            {errors.shippingFee && <span className="error">{errors.shippingFee}</span>}
                        </div>

                        <button type="sty"className='ty'>Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
  
  export  {ShippingRulePopup};

const ShippingRule= () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesToShow, setEntriesToShow] = useState(7);
  const [shippingRules, setShippingRules] = useState([]);
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showShippingRulePopup, setShowShippingRulePopup] = useState(false);
  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
  const [EcomVisibility, setEcomVisibility] = useState(false);
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
    const dummyShippingRules = [
      { id: 1, rules: 'Free Shipping ', condition: '$1-$100', fee: '$10', address: 'New York' },
      { id: 2, rules: ' Limited Offer', condition: '$1-$100', fee: '$10', address: 'New Jersey' },
      { id: 3, rules: 'Product Price(1-2000)', condition: '$1-$100', fee: '$10', address: 'Florida' },
      { id: 4, rules: 'Free Shipping ', condition: '$1-$100', fee: '$10', address: 'New York' },
      { id: 5, rules: ' Limited Offer', condition: '$1-$100', fee: '$10', address: 'New Jersey' },
      { id: 6, rules: 'Product Price(1-2000)', condition: '$1-$100', fee: '$10', address: 'Florida' },
      { id: 7, rules: 'Free Shipping ', condition: '$1-$100', fee: '$10', address: 'New York' },
  
    ];
    setShippingRules(dummyShippingRules);
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
   

  
  const toggleEcomVisibility = () => {
    setEcomVisibility((prevVisibility) => !prevVisibility);
  };

  const toggleCatVisibility = () => {
    setCatVisibility(!catVisibility);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const handleDeleteShippingRule = (ruleId) => {
    const updatedRules = shippingRules.filter((rule) => rule.id !== ruleId);
    setShippingRules(updatedRules);
  };

  const filteredRules = shippingRules.filter((rule) =>
  rule.rules.toLowerCase().includes(searchQuery.toLowerCase())
);
  const startIndex = (currentPage - 1) * entriesToShow;
  const endIndex = Math.min(startIndex + entriesToShow, filteredRules.length);
  const currentRules = filteredRules.slice(startIndex, endIndex);



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
      <Layout heading="Shipping Rule">
   
   </Layout>
        <div className="recent-orders">
          <div className="table-header">
            <p></p>
            <div className="ents-search">
            <div className='engprocoupo'>
          
            <button className="add-neww-btn" onClick={() => setShowShippingRulePopup(true)}>+ Add New</button>
            {showShippingRulePopup && <ShippingRulePopup onClose={() => setShowShippingRulePopup(false)} />} 
           


              </div>
              <div className='pentryy'>
                Show&nbsp;
                <select onChange={(e) => handleEntriesChange(parseInt(e.target.value))} value={entriesToShow}>
                <option value="3">3</option>
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
      <th>Rules</th>
      <th>Condition</th>
      <th>Fee</th>
      <th>Address</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  {currentRules.map((rule, index) => (
            <tr key={index} className="bl">
              <td>{startIndex + index + 1}</td>
              <td>{rule.rules}</td>
              <td>{rule.condition}</td>
              <td>{rule.fee}</td>
              <td>{rule.address}</td>
              <td>
                <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                <FontAwesomeIcon icon={faTrash} className="icon" onClick={() => handleDeleteShippingRule(rule.id)} />
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

export default ShippingRule;
