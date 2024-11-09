import React, { useState, useEffect  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown,faAngleRight } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import Layout from './Layout';
import { NavLink } from 'react-router-dom';
import { Link, useLocation  } from 'react-router-dom';
import { faEye, faTrash,faUsers,faFile,faBlog,faPhone,faGear,faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import Sidebar from './Sidebar';
import Header from './Header';

const CancelledOrders = () => {
    const [entriesToShow, setEntriesToShow] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [catVisibility, setCatVisibility] = useState(false);
    const tableHeaders = ['SN', 'Customer', 'Order ID', 'Date', 'Quantity', 'Amount', 'Order Status', 'Payment', 'Action'];
    const [recentOrders, setRecentOrders] = useState([]);
    const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
    const [orderVisibility, setOrderVisibility] = useState(false);
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

  const categories = [
    { sn: 1, customer: 'Toshi Maxwell', orderID: '82736518', date: '03.02.2024', quantity: 1, amount: '$10', orderStatus: 'Cancelled', payment: 'Pending' },
    { sn: 2, customer: 'Toshi Maxwell', orderID: '82736518', date: '03.02.2024', quantity: 1, amount: '$10', orderStatus: 'Cancelled', payment: 'Completed' },
    { sn: 3, customer: 'Toshi Maxwell', orderID: '82736518', date: '03.02.2024', quantity: 1, amount: '$10', orderStatus: 'Cancelled', payment: 'Completed' },
    { sn: 4, customer: 'Toshi Maxwell', orderID: '82736518', date: '03.02.2024', quantity: 1, amount: '$10', orderStatus: 'Cancelled', payment: 'Pending' },
    { sn: 5, customer: 'Toshi Maxwell', orderID: '82736518', date: '03.02.2024', quantity: 1, amount: '$10', orderStatus: 'Cancelled', payment: 'Completed' },
    { sn: 6, customer: 'Toshi Maxwell', orderID: '82736518', date: '03.02.2024', quantity: 1, amount: '$10', orderStatus: 'Cancelled', payment: 'Pending' },
    { sn: 7, customer: 'Toshi Maxwell', orderID: '82736518', date: '03.02.2024', quantity: 1, amount: '$10', orderStatus: 'Cancelled', payment: 'Pending' },  
  ];

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

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
      };

      const handleEntriesChange = (value) => {
        setEntriesToShow(value);
      };
      const location = useLocation();
    
  const toggleOrderVisibility = () => {
    setOrderVisibility(!orderVisibility);
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


      const toggleAdminDropdown = () => { 
        setAdminDropdownVisible(!adminDropdownVisible);
      };

      const [currentPage, setCurrentPage] = useState(1); 
      const totalPages = 20;
      const pagesToShow = 5; 
    
      const handlePageChange = (page) => {
        setCurrentPage(page);
      };
    
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
      const toggleProVisibility = () => {
        setProVisibility(! ProVisibility);
      };
      const toggleEcomVisibility = () => {
        setEcomVisibility((prevVisibility) => !prevVisibility);
      };
      const handleNext = () => {
        if (currentPage < totalPages) {
          handlePageChange(currentPage + 1);
        }
      };
      const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
      };
      const filteredOrders = recentOrders.filter((order) =>
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.quantity.toString().includes(searchQuery) ||
      order.amount.toString().includes(searchQuery) ||
      order.orderStatus.toLowerCase().includes(searchQuery) ||
      order.payment.toLowerCase().includes(searchQuery)
    );

    const handleDeleteOrder = (orderId) => {
 
        const index = filteredOrders.findIndex(order => order.orderId === orderId);
        if (index !== -1) {
     
            const updatedOrders = [...filteredOrders.slice(0, index), ...filteredOrders.slice(index + 1)];

            setFilteredOrders(updatedOrders);
        }
    };
    const toggleCatVisibility = () => {
      setCatVisibility(!catVisibility);
    };
      return (
        <div className="admin-dashboard">
  <Sidebar/>

           <div className="rightt-panel">
       <Header/>
       <Layout heading="Cancelled Orders">
   
   </Layout>
        <div className="recent-orders">
          <div className="table-header">
            <p>Recent Orders</p>
            <div className="entries-search">
              <div className='enn'>
                Show&nbsp;
                <select onChange={(e) => handleEntriesChange(parseInt(e.target.value))} value={entriesToShow}>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                &nbsp;entries
              </div>
              <div className='se'>
                Search <input type="search" value={searchQuery} onChange={handleSearchChange} />
              </div>
            </div>
          </div>
          <table className='adminallblog-related'>
  <thead className='ablogadminheads'>
    <tr>
      <th>SN</th>
      <th>Customer</th>
      <th>Order ID</th>
      <th>Date</th>
      <th>Quantity</th>
      <th>Amount</th>
      <th>Order Status</th>
      <th>Payment</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {categories.map((category, index) => (
      <tr key={index}className='bl'>
        <td>{category.sn}</td>
        <td>{category.customer}</td>
        <td>{category.orderID}</td>
        <td>{category.date}</td>
        <td>{category.quantity}</td>
        <td>{category.amount}</td>
        <td>
          <button className={category.orderStatus === 'Pending' ? 'pending-btn' : 'completed-btn'}>{category.orderStatus}</button>
        </td>
        <td>
          <button className={category.payment === 'Pending' ? 'pending-btn' : 'completed-btn'}>{category.payment}</button>
        </td>
        <td>
          <FontAwesomeIcon icon={faEye} className="icon" />
          <FontAwesomeIcon icon={faTrash} className="icon" />
        </td>
      </tr>
    ))}
  </tbody>
</table>

          <div className="pagination-innfo">
            <p>
              Showing 0 to 0 of 0 entries
            </p>
        
            <div className="adminpg">
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

export default CancelledOrders;
    