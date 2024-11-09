import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../redux/actions/orderActions";
import Layout from "./Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleRight,
  faUsers,
  faFile,
  faBlog,
  faPhone,
  faGear,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import {
  faEye,
  faTrash,
  faShippingFast,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Loading from "./Loading";

const AllOrders = () => {
  const dispatch = useDispatch();
  const { orders, allOrdersCount, error, loading } = useSelector(
    (state) => state.order
  );

  const allOrdersPerPageCount = Number(10);

  const [entriesToShow, setEntriesToShow] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
  const [ProVisibility, setProVisibility] = useState(false);
  const [ecomVisibility, setEcomVisibility] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const tableHeaders = [
    "SN",
    "Customer",
    "Order ID",
    "Date",
    "Quantity",
    "Amount",
    "Order Status",
    "Payment",
    "Action",
  ];

  console.log(allOrdersCount, orders, "vvvvvvvvvv");
  const [recentOrders, setRecentOrders] = useState([]);
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const [dmVisibility, setDMVisibility] = useState(false);
  const [userVisibility, setUserVisibility] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [orderStatus, setOrderStatus] = useState("pending");

  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
  };
  const handleUpdateStatus = () => {
    console.log("Status updated");
  };

  const handlePaymentChange = (event) => {
    setPaymentStatus(event.target.value);
  };

  const handleOrderStatusChange = (event) => {
    setOrderStatus(event.target.value);
  };
  const handleShow = () => setShowModal(true);
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
    {
      sn: 1,
      customer: "Toshi Maxwell",
      orderID: "82736518",
      date: "03.02.2024",
      quantity: 1,
      amount: "$10",
      orderStatus: "Pending",
      payment: "Pending",
    },
    {
      sn: 2,
      customer: "Toshi Maxwell",
      orderID: "82736518",
      date: "03.02.2024",
      quantity: 1,
      amount: "$10",
      orderStatus: "Completed",
      payment: "Completed",
    },
    {
      sn: 3,
      customer: "Toshi Maxwell",
      orderID: "82736518",
      date: "03.02.2024",
      quantity: 1,
      amount: "$10",
      orderStatus: "Completed",
      payment: "Completed",
    },
    {
      sn: 4,
      customer: "Toshi Maxwell",
      orderID: "82736518",
      date: "03.02.2024",
      quantity: 1,
      amount: "$10",
      orderStatus: "Pending",
      payment: "Completed",
    },
    {
      sn: 5,
      customer: "Toshi Maxwell",
      orderID: "82736518",
      date: "03.02.2024",
      quantity: 1,
      amount: "$10",
      orderStatus: "Pending",
      payment: "Pending",
    },
    {
      sn: 6,
      customer: "Toshi Maxwell",
      orderID: "82736518",
      date: "03.02.2024",
      quantity: 1,
      amount: "$10",
      orderStatus: "Completed",
      payment: "Completed",
    },
    {
      sn: 7,
      customer: "Toshi Maxwell",
      orderID: "82736518",
      date: "03.02.2024",
      quantity: 1,
      amount: "$10",
      orderStatus: "Pending",
      payment: "Pending",
    },
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

  const toggleOrderVisibility = () => {
    setOrderVisibility((prevVisibility) => !prevVisibility);
  };

  const toggleCatVisibility = () => {
    setCatVisibility((prevVisibility) => !prevVisibility);
  };

  const toggleProVisibility = () => {
    setProVisibility((prevVisibility) => !prevVisibility);
  };

  const toggleEcomVisibility = () => {
    setEcomVisibility((prevVisibility) => !prevVisibility);
  };

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
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredOrders = recentOrders.filter(
    (order) =>
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.quantity.toString().includes(searchQuery) ||
      order.amount.toString().includes(searchQuery) ||
      order.orderStatus.toLowerCase().includes(searchQuery) ||
      order.payment.toLowerCase().includes(searchQuery)
  );
  const handleEntriesChange = (value) => {
    setEntriesToShow(value);
  };

  const handleDeleteOrder = (orderId) => {
    const index = filteredOrders.findIndex(
      (order) => order.orderId === orderId
    );
    if (index !== -1) {
      const updatedOrders = [
        ...filteredOrders.slice(0, index),
        ...filteredOrders.slice(index + 1),
      ];

      setFilteredOrders(updatedOrders);
    }
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
  }, [location.pathname]);

  // let totalQuantity = 0;
  // for (let i = 0; i < orders?.length; i++) {
  //   // Calculate total quantity for the order
  //   totalQuantity = orders[i].products[i].reduce((acc, product) => {
  //     return (
  //       acc +
  //       product.variants.reduce(
  //         (variantAcc, variant) => variantAcc + variant.quantity,
  //         0
  //       )
  //     );
  //   }, 0);
  // }

  useEffect(() => {
    dispatch(fetchOrders("", currentPage));
  }, [currentPage]);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    // setCurrentPage(e);
  };
  let totalQuantity = 0;
  let totalAmount = 0;
  return (
    <div className="admin-dashboard">
      <Sidebar />

      <div className="rightt-panel">
        <Header />
        <Layout heading="All Orders"></Layout>
        <div className="recent-orders">
          <div className="table-header">
            {/* <div className="entries-search">
              <div className="enn">
                Show&nbsp;
                <select
                  onChange={(e) =>
                    handleEntriesChange(parseInt(e.target.value))
                  }
                  value={entriesToShow}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                &nbsp;entries
              </div>
              <div className="se">
                Search{" "}
                <input
                  type="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div> */}
          </div>
          <table className="adminallorders-related">
            <thead className="ablogadminheads">
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
              {loading ? (
                <Loading />
              ) : error ? (
                <p>{error}</p>
              ) : orders?.length <= 0 ? (
                <p>No, order available to show!</p>
              ) : (
                orders.map((order, index) => (
                  <tr key={index} className="bl">
                    <td>{index + 1}</td>
                    <td>
                      {order?.address?.firstName +
                        " " +
                        order.address?.lastName}
                    </td>
                    <td>{order._id}</td>
                    <td>
                      {new Date(order.createdAt).toISOString().split("T")[0]}
                    </td>
                    <td>
                      {(totalQuantity = 0)}
                      {order.products.forEach((product) => {
                        product.variants.forEach((variant) => {
                          totalQuantity += variant.quantity;
                        });
                      })}
                      {totalQuantity}
                    </td>
                    <td>{order.orderTotal}</td>
                    <td>
                      <button
                        className={
                          order?.status === "COMPLETED"
                            ? "completed-button"
                            : "pending-button"
                        }
                      >
                        {order.status}
                      </button>
                    </td>
                    <td>
                      <button
                        className={
                          order?.paymentStatus === "COMPLETED"
                            ? "completed-button"
                            : "pending-button"
                        }
                      >
                        {order.paymentStatus}
                      </button>
                    </td>
                    <td>
                      <Link to={`/vieworders/${order._id}`}>
                        {" "}
                        <FontAwesomeIcon icon={faEye} className="icon" />
                      </Link>
                      {/* <FontAwesomeIcon icon={faTrash} className="icon" />
                    <FontAwesomeIcon
                      icon={faShippingFast}
                      onClick={handlePopupToggle}
                    /> */}
                      {showPopup && (
                        <div className="popup">
                          <div className="popup-contentorders">
                            <h2>Order Status</h2>

                            <div className="paymentorder">
                              <label htmlFor="paymentSelect">Payment:</label>
                              <select
                                id="paymentSelect"
                                value={paymentStatus}
                                onChange={handlePaymentChange}
                              >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                              </select>
                            </div>

                            <div className="orderstat">
                              <label htmlFor="orderStatusSelect">
                                Order Status:
                              </label>
                              <select
                                id="orderStatusSelect"
                                value={orderStatus}
                                onChange={handleOrderStatusChange}
                              >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                              </select>
                            </div>

                            <div className="updatecloseordera">
                              <button
                                onClick={handleUpdateStatus}
                                className="updteord"
                              >
                                Update Status
                              </button>
                              <button
                                onClick={handlePopupToggle}
                                className="closeord"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {orders?.length >= 1 && (
            <div className="pagination-innfo">
              <ReactPaginate
                forcePage={0}
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={Math.ceil(
                  Math.max(0, allOrdersCount) / allOrdersPerPageCount
                )}
                marginPagesDisplayed={1}
                pageRangeDisplayed={1}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
