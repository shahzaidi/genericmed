import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleRight,
  fas,
  faUsers,
  faFile,
  faBlog,
  faPhone,
  faGear,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Layout from "./Layout";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersCountAndRecentOrdersAction } from "../redux/actions/orderActions";
import Loading from "./Loading";
import moment from "moment";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, allKindOfOrdersCountAndRecentOrders, error } = useSelector(
    (state) => state.getAllOrdersCountAndRecentOrdersReducer
  );
  const allRecentOrdersPerPageCount = Number(10);
  const [totalOrders, setTotalOrders] = useState(100);
  const [pendingOrders, setPendingOrders] = useState(20);
  const [completedOrders, setCompletedOrders] = useState(80);
  const [totalEarnings, setTotalEarnings] = useState(2000);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [recentOrders, setRecentOrders] = useState([]);
  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
  const [proVisibility, setProVisibility] = useState(false);
  const [ecomVisibility, setEcomVisibility] = useState(false);
  const [totalOrdersCounter, setTotalOrdersCounter] = useState(0);
  const [pendingOrdersCounter, setPendingOrdersCounter] = useState(0);
  const [completedOrdersCounter, setCompletedOrdersCounter] = useState(0);
  const [totalEarningsCounter, setTotalEarningsCounter] = useState(0);
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
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

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleAdminDropdown = () => {
    setAdminDropdownVisible(!adminDropdownVisible);
  };

  const toggleFilterDropdown = () => {
    setFilterDropdownVisible(!filterDropdownVisible);
  };

  const handleTotalOrdersCounterClick = () => {
    setTotalOrdersCounter(totalOrdersCounter + 1);
  };

  const handlePendingOrdersCounterClick = () => {
    setPendingOrdersCounter(pendingOrdersCounter + 1);
  };

  const handleCompletedOrdersCounterClick = () => {
    setCompletedOrdersCounter(completedOrdersCounter + 1);
  };

  const handleTotalEarningsCounterClick = () => {
    setTotalEarningsCounter(totalEarningsCounter + 1);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleEntriesChange = (value) => {
    setEntriesToShow(value);
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
  }, [location.pathname]);

  useEffect(() => {
    dispatch(getAllOrdersCountAndRecentOrdersAction(currentPage));
  }, [currentPage]);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    // setCurrentPage(e);
  };

  console.log(
    allKindOfOrdersCountAndRecentOrders,
    "allKindOfOrdersCountAndRecentOrders./././..//.//"
  );
  return (
    <div className="admin-dashboard">
      <Sidebar />

      <div className="right-panel">
        <Header />
        <Layout heading="Dashboard"></Layout>
        {/* <div className="filters" onClick={toggleFilterDropdown}>
          <h3>Filters</h3>
          <img src="/assets/Filter.png" alt="" />
        </div>
        <div className="addfildropdown">
          {filterDropdownVisible && (
            <ul>
              <p>All</p>
              <p>Today</p>
              <p>This Week</p>
              <p>This Month</p>
            </ul>
          )}
        </div> */}
        <div className="dashboard-info">
          <div className="total-orders">
            <h3>Total Orders</h3>
            <div className="counter" onClick={handleTotalOrdersCounterClick}>
              {/* {totalOrdersCounter
                ? totalOrders + totalOrdersCounter
                : totalOrders} */}
              {loading ? (
                <Loading />
              ) : allKindOfOrdersCountAndRecentOrders?.allOrdersCount ? (
                allKindOfOrdersCountAndRecentOrders?.allOrdersCount
              ) : (
                Number(0)
              )}
            </div>
          </div>
          <div className="pending-orders">
            <h3>Pending Orders</h3>
            <div className="counter" onClick={handlePendingOrdersCounterClick}>
              {/* {pendingOrdersCounter
                ? pendingOrders + pendingOrdersCounter
                : pendingOrders} */}
              {loading ? (
                <Loading />
              ) : allKindOfOrdersCountAndRecentOrders?.allPendingOrdersCount ? (
                allKindOfOrdersCountAndRecentOrders?.allPendingOrdersCount
              ) : (
                Number(0)
              )}
            </div>
          </div>
          <div className="completed-orders">
            <h3>Completed Orders</h3>
            <div
              className="counter"
              onClick={handleCompletedOrdersCounterClick}
            >
              {/* {completedOrdersCounter
                ? completedOrders + completedOrdersCounter
                : completedOrders} */}
              {loading ? (
                <Loading />
              ) : allKindOfOrdersCountAndRecentOrders?.allCompletedOrdersCount ? (
                allKindOfOrdersCountAndRecentOrders?.allCompletedOrdersCount
              ) : (
                Number(0)
              )}
            </div>
          </div>
          {/* <div className="total-earnings">
            <h3>Total Earnings</h3>
            <div className="counter" onClick={handleTotalEarningsCounterClick}>
              ${totalEarningsCounter ? totalEarnings + totalEarningsCounter : totalEarnings}
            </div>
          </div> */}
        </div>

        <div className="recentt-orders">
          {/* <div className="table-header">
            <p>Recent Orders</p>
            <div className="entries-search">
              <div className="en">
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
            </div>
          </div> */}
          <table className="adminallorders-relatedpr">
            <thead className="ablogadminheads">
              <tr>
                <th>SN</th>
                <th>Customer</th>
                <th>Order ID</th>
                <th>Date</th>

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
                <tr>
                  <td colSpan="9" className="contentt">
                    {error}
                  </td>
                </tr>
              ) : allKindOfOrdersCountAndRecentOrders?.allRecentOrders
                  ?.length <= 0 ? (
                <tr>
                  <td colSpan="9" className="contentt">
                    No recent order available to show!
                  </td>
                </tr>
              ) : (
                allKindOfOrdersCountAndRecentOrders?.allRecentOrders?.map(
                  (order, index) => (
                    <tr key={index} className="bl">
                      <td className="serial">{index + 1}</td>
                      <td>
                        {order?.address?.firstName} {order?.address?.lastName}
                      </td>
                      <td>{order?._id}</td>
                      <td>
                        {moment(order?.createdAt).format("DD, MMM, YYYY")}
                      </td>

                      <td>{order?.finalAmount}</td>
                      <td>{order?.paymentStatus}</td>
                      <td>{order?.paymentGateway}</td>
                      <td>
                        {" "}
                        <Link to={`/vieworders/${order?._id}`}>
                          {" "}
                          <FontAwesomeIcon icon={faEye} className="icon" />
                        </Link>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>

          {allKindOfOrdersCountAndRecentOrders?.allRecentOrders >= 1 && (
            <div className="pagination-innfo">
              <ReactPaginate
                forcePage={0}
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={Math.ceil(
                  Math.max(
                    0,
                    allKindOfOrdersCountAndRecentOrders?.allRecentOrdersCount
                  ) / allRecentOrdersPerPageCount
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

export default Dashboard;
