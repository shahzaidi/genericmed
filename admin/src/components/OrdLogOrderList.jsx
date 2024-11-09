import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../redux/actions/orderActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from './Layout';
import {
  faAngleDown,
  faEdit,
  faTrash,
  faAngleRight,
  faUsers,
  faFile,
  faBlog,
  faPhone,
  faGear,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const OrdLogOrderList = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  console.log("OrdLogOrderList", orders);
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(7);
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
      location.pathname === "/allorders" ||
      location.pathname === "/pendingorders" ||
      location.pathname === "/Delorders" ||
      location.pathname === "/Cancelorders"
    ) {
      setOrderVisibility(true);
    } else {
      setOrderVisibility(false);
    }

    if (
      location.pathname === "/allcategories" ||
      location.pathname === "/subcategories"
    ) {
      setCatVisibility(true);
    } else {
      setCatVisibility(false);
    }

    if (
      location.pathname === "/createproduct" ||
      location.pathname === "/productlist" ||
      location.pathname === "/attributes" ||
      location.pathname === "/outofstock"
    ) {
      setProVisibility(true);
    } else {
      setProVisibility(false);
    }

    if (
      location.pathname === "/createcoupon" ||
      location.pathname === "/couponlist" ||
      location.pathname === "/shippingrule" ||
      location.pathname === "/paymentmethod"
    ) {
      setEcomVisibility(true);
    } else {
      setEcomVisibility(false);
    }

    if (
      location.pathname === "/googleanalytics" ||
      location.pathname === "/homepage" ||
      location.pathname === "/categorypage" ||
      location.pathname === "/shopall" ||
      location.pathname === "/aboutus" ||
      location.pathname === "/blogpage" ||
      location.pathname === "/contactus" ||
      location.pathname === "/privacypolicy" ||
      location.pathname === "/termsandconditions" ||
      location.pathname === "/faqs"
    ) {
      setDMVisibility(true);
    } else {
      setDMVisibility(false);
    }

    if (
      location.pathname === "/customerlist" ||
      location.pathname === "/pendingcustomerlist"
    ) {
      setUserVisibility(true);
    } else {
      setUserVisibility(false);
    }

    if (
      location.pathname === "/aboutus" ||
      location.pathname === "/contactus" ||
      location.pathname === "/termsandconditions" ||
      location.pathname === "/privacypolicy" ||
      location.pathname === "/faqs" ||
      location.pathname === "/homepage" ||
      location.pathname === "/categoriespage" ||
      location.pathname === "/shopall"
    ) {
      setPagesVisibility(true);
    } else {
      setPagesVisibility(false);
    }
    if (
      location.pathname === "/blogallblogs" ||
      location.pathname === "/blogcategorypage" ||
      location.pathname === "/addnewpost"
    ) {
      setBlogsVisibility(true);
    } else {
      setBlogsVisibility(false);
    }

    if (
      location.pathname === "/orderlist" ||
      location.pathname === "/createanorder"
    ) {
      setOrderLogVisibility(true);
    } else {
      setOrderLogVisibility(false);
    }
    if (
      location.pathname === "/alladminlist" ||
      location.pathname === "/addnewadmin" ||
      location.pathname === "/alladminroles" ||
      location.pathname === "/userpermissions"
    ) {
      setAdminVisibility(true);
    } else {
      setAdminVisibility(false);
    }
  }, [location.pathname]);

  const [currentOrders, setCurrentOrders] = useState([
    {
      orderId: "12345",
      date: "03-02-2024",
      productName: " Product 1",
      customerName: "John Doe",
      email: "john@example.com",
      contactNumber: "1234567890",
      amount: 50,
      paymentMethod: "PayPal",
      paymentStatus: "Completed",
    },
    {
      orderId: "54321",
      date: "03-02-2024",
      productName: " Product 2",
      customerName: "Jane Doe",
      email: "jane@example.com",
      contactNumber: "9876543210",
      amount: 75,
      paymentMethod: "Stripe",
      paymentStatus: "Pending",
    },

    {
      orderId: "54321",
      date: "03-02-2024",
      productName: "Product 2",
      customerName: "Jane Doe",
      email: "jane@example.com",
      contactNumber: "9876543210",
      amount: 75,
      paymentMethod: "C.O.D",
      paymentStatus: "Shipped",
    },

    {
      orderId: "54321",
      date: "03-02-2024",
      productName: " Product 2",
      customerName: "Jane Doe",
      email: "jane@example.com",
      contactNumber: "9876543210",
      amount: 75,
      paymentMethod: "Stripe",
      paymentStatus: "Cancel",
    },
    {
      orderId: "54321",
      date: "03-02-2024",
      productName: "Product 2",
      customerName: "Jane Doe",
      email: "jane@example.com",
      contactNumber: "9876543210",
      amount: 75,
      paymentMethod: "C.O.D",
      paymentStatus: "Shipped",
    },
    {
      orderId: "54321",
      date: "03-02-2024",
      productName: "Product 2",
      customerName: "Jane Doe",
      email: "jane@example.com",
      contactNumber: "9876543210",
      amount: 75,
      paymentMethod: "Paypal",
      paymentStatus: "Pending",
    },

    {
      orderId: "98765",
      date: "03-02-2024",
      productName: " Product 3",
      customerName: "Alice Smith",
      email: "alice@example.com",
      contactNumber: "5555555555",
      amount: 100,
      paymentMethod: "C.O.D",
      paymentStatus: "In Progress",
    },
  ]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleOrderVisibility = () => {
    setOrderVisibility(!orderVisibility);
  };
  const toggleProVisibility = () => {
    setProVisibility(!ProVisibility);
  };
  const toggleCatVisibility = () => {
    setCatVisibility(!catVisibility);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.title &&
      category.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const startIndex = (currentPage - 1) * entriesToShow;
  const endIndex = Math.min(
    startIndex + entriesToShow,
    filteredCategories.length
  );
  const currentCategories = filteredCategories.slice(startIndex, endIndex);

  const totalPages = 20;
  const pagesToShow = 5;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? "active" : ""}
        >
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
      <Sidebar />

      <div className="rightt-panel">
        <Header/>
      <Layout heading="Order List">
   
    </Layout>
        <div className="recent-orders">
          <div className="table-header">
            <p></p>
            <div className="ents-search">
              <div className="engpro">
                <Link to="/createanorder">
                  {" "}
                  <button className="add-category-btn">
                    + Create an Order
                  </button>
                </Link>
              </div>
              <div className="pentryorder">
                Show&nbsp;
                <select
                  onChange={(e) =>
                    handleEntriesChange(parseInt(e.target.value))
                  }
                  value={entriesToShow}
                >
                  <option value="7">7</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                &nbsp;entries
              </div>
              <div className="searchproducts">
                Search{" "}
                <input
                  type="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
          <table className="adminallblog-relatedorders">
            <thead className="ablogadminheads">
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Product Name</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Amount ($)</th>
                <th>Payment Method</th>
                <th>Payment Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order, index) => (
                <tr key={index} className="bl">
                  <td>{order.orderId}</td>
                  <td className="datecell">{order.date}</td>
                  <td className="proty">{order.productName}</td>
                  <td>{order.customerName}</td>
                  <td>{order.email}</td>
                  <td>{order.contactNumber}</td>
                  <td>${order.amount}</td>
                  <td>{order.paymentMethod}</td>
                  <td className={`status-cell ${order.paymentStatus}`}>
                    {order.paymentStatus === "Pending" && (
                      <button> Pending</button>
                    )}
                    {order.paymentStatus === "Completed" && (
                      <button> Completed</button>
                    )}
                    {order.paymentStatus === "Shipped" && (
                      <button> Shipped</button>
                    )}
                    {order.paymentStatus === "Cancel" && (
                      <button> Cancel</button>
                    )}
                    {order.paymentStatus === "In Progress" && (
                      <button> In Progress</button>
                    )}
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faEdit} className="edit-icon" />
                    <FontAwesomeIcon icon={faTrash} className="icon" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-innfo">
            <p>Showing 0 to 0 of 0 entries</p>
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

export default OrdLogOrderList;
