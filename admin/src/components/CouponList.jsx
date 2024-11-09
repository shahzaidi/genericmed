import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCoupons } from "../redux/actions/couponActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "./Layout";
import { deleteCoupon } from "../redux/actions/couponActions";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  faEdit,
  faTrash,
  faUsers,
  faFile,
  faBlog,
  faPhone,
  faGear,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Loading from "./Loading";

const AddEditCouponPopup = ({ onClose, onAddEditCoupon }) => {
  const [subcategoryName, setSubCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [status, setStatus] = useState("Active");
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
    setSubCategoryName("");
    setStatus("active");
    setImage(null);
    setSelectedCategory("");
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
        <h2 className="hedytu">Edit Coupon</h2>
        <form onSubmit={handleSubmit}>
          <div className="formyuu">
            <label htmlFor="status">Status</label>
            <select
              id="styr"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <button type="submit" className="couponbutton">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export { AddEditCouponPopup };

const CouponList = () => {
  const dispatch = useDispatch();
  const { loading, coupons, couponsCount, error } = useSelector(
    (state) => state.allCoupons
  );
  const [showAddEditCouponPopup, setShowAddEditCouponPopup] = useState(false);
  const [entriesToShow, setEntriesToShow] = useState(7);
  const [searchQuery, setSearchQuery] = useState("");
  const [catVisibility, setCatVisibility] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [ProVisibility, setProVisibility] = useState(false);
  const [EcomVisibility, setEcomVisibility] = useState(false);
  const [recentOrders, setRecentOrders] = useState([]);
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const [orderVisibility, setOrderVisibility] = useState(false);
  const [dmVisibility, setDMVisibility] = useState(false);
  const [userVisibility, setUserVisibility] = useState(false);
  const [pagesVisibility, setPagesVisibility] = useState(false);
  const [blogsVisibility, setBlogsVisibility] = useState(false);
  const [orderLogVisibility, setOrderLogVisibility] = useState(false);
  const [adminVisibility, setAdminVisibility] = useState(false);
  const [guestUsersVisibility, setGuestUsersVisibility] = useState(false);

  const couponsCountPerPage = Number(10);

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

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDeleteCoupon = (id) => {
    dispatch(deleteCoupon(id));
  };

  const [dummyData, setDummyData] = useState([
    {
      id: "1.",
      couponName: "SuperSaver",
      code: "CODE1",
      startDate: "03.02.2024",
      expireDate: "03.02.2025",
      mrp: "$100",
      discount: "$10",
      status: "Pending",
    },
    {
      id: "2.",
      couponName: "Coupon 2",
      code: "CODE2",
      startDate: "03.02.2024",
      expireDate: "03.02.2025",
      mrp: "$200",
      discount: "$20",
      status: "Completed",
    },

    {
      id: "3.",
      couponName: "Coupon 3",
      code: "CODE3",
      startDate: "03.02.2024",
      expireDate: "03.02.2025",
      mrp: "$100",
      discount: "$10",
      status: "Pending",
    },
    {
      id: "4.",
      couponName: "Coupon 4",
      code: "CODE4",
      startDate: "03.02.2024",
      expireDate: "03.02.2025",
      mrp: "$200",
      discount: "$20",
      status: "Completed",
    },

    {
      id: "5.",
      couponName: "Coupon 5",
      code: "CODE5",
      startDate: "03.02.2024",
      expireDate: "03.02.2025",
      mrp: "$100",
      discount: "$10",
      status: "Pending",
    },
    {
      id: "6.",
      couponName: "Coupon 6",
      code: "CODE6",
      startDate: "03.02.2024",
      expireDate: "03.02.2025",
      mrp: "$200",
      discount: "$20",
      status: "Completed",
    },

    {
      id: "7.",
      couponName: "Coupon 7",
      code: "CODE7",
      startDate: "03.02.2024",
      expireDate: "03.02.2025",
      mrp: "$100",
      discount: "$10",
      status: "Pending",
    },
  ]);
  const toggleOrderVisibility = () => {
    setOrderVisibility(!orderVisibility);
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

  const handleAddEditCoupon = (couponData) => {
    // Handle adding/editing coupon data (e.g., dispatch Redux action)
    console.log("Submitted coupon data:", couponData);
  };

  const handleEditCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    setShowAddEditCouponPopup(true);
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
          className={currentPage === i ? "Active" : ""}
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
  const toggleCatVisibility = () => {
    setCatVisibility(!catVisibility);
  };
  const handleDeleteOrder = (orderId) => {
    const updatedOrders = dummyData.filter((order) => order.id !== orderId);

    setDummyData(updatedOrders);
  };
  useEffect(() => {
    const ordefDiv = document.querySelector(".ordef");
    ordefDiv.style.display = "block";
  }, []);

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
    dispatch(getAllCoupons(currentPage));
  }, [currentPage]);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    // setCurrentPage(e);
  };

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="rightt-panel">
        <Header />
        <Layout heading="Coupon List"></Layout>

        <div className="recent-orders">
          <div className="table-header">
            <p></p>
            <div className="entitty-search">
              <div className="engattri">
                <Link to="/createcoupon" className="add-new-btn">
                  <button className="add-category-btn"> + Add New</button>
                </Link>
              </div>

              {/* <div className="pentrry">
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
              </div> */}
              {/* <div className="searchproducts">
                Search{" "}
                <input
                  type="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div> */}
            </div>
          </div>
          <table className="adminallblog-related">
            <thead className="blogadminheads">
              <tr className="headiiad">
                <th>SN</th>
                <th>Coupon Name</th>
                <th>Code</th>
                <th>Start Date</th>
                <th>Expired Date</th>
                <th>MRP</th>
                <th>Discount</th>
                <th>Status</th>
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
              ) : coupons?.length <= 0 ? (
                <tr>
                  <td colSpan="9" className="contentt">
                    No coupon available to show!
                  </td>
                </tr>
              ) : (
                coupons.map((coupon, index) => (
                  <tr key={index} className="bl">
                    <td>{index + 1}</td>
                    <td>{coupon?.couponName}</td>
                    <td>{coupon?.code}</td>
                    <td>{coupon?.startDate}</td>
                    <td>{coupon?.expirationDate}</td>
                    <td>{coupon?.minimumPurchasePrice}</td>
                    <td>{coupon?.maxDiscountAmount}</td>
                    <td
                      className={
                        coupon?.status === "Active" ? "completed" : "pending"
                      }
                    >
                      <div>{coupon?.status}</div>
                    </td>

                    <td>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="edit-icon"
                        onClick={() => setShowAddEditCouponPopup(true)}
                      />
                      {showAddEditCouponPopup && (
                        <AddEditCouponPopup
                          onClose={() => setShowAddEditCouponPopup(false)}
                          onAddEditCoupon={handleAddEditCoupon}
                        />
                      )}
                      {console.log(`coupon is here only`, coupon)}
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="icdelon"
                        onClick={() => handleDeleteCoupon(coupon._id)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {coupons?.length >= 1 && (
            <div className="pagination-innfo">
              <ReactPaginate
                forcePage={0}
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={Math.ceil(
                  Math.max(0, couponsCount) / couponsCountPerPage
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

export default CouponList;
