import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchCustomers } from "../redux/actions/customerActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "./Layout";
import {
  faAngleDown,
  faEye,
  faTrash,
  faEnvelope,
  faAngleRight,
  faUsers,
  faFile,
  faBlog,
  faPhone,
  faGear,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Loading from "./Loading";
import ReactPaginate from "react-paginate";

const MailPopup = ({ onClose, onSendMail }) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailData = {
      subject: subject,
      message: message,
    };
    onSendMail(mailData);
    setSubject("");
    setMessage("");
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
        <h2>Send Mail to All Users</h2>
        <form onSubmit={handleSubmit} className="sendemail">
          <div className="form-group">
            <label>
              Subject <span style={{ color: "red" }}>*</span>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="subj"
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Message <span style={{ color: "red" }}>*</span>
            </label>
            <ReactQuill
              className="mes"
              value={message}
              onChange={setMessage}
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  ["link", "image", "video"],
                  ["clean"],
                ],
              }}
              formats={[
                "header",
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "strike",
                "blockquote",
                "list",
                "bullet",
                "indent",
                "link",
                "image",
                "video",
              ]}
            />
          </div>
          <button type="submit" className="sm">
            Send Mail
          </button>
        </form>
      </div>
    </div>
  );
};

export { MailPopup };

const CustomerList = () => {
  const dispatch = useDispatch();
  const { loading, customers, customersCount, error } = useSelector(
    (state) => state.customer
  );

  let customersPerPage = Number(10);
  console.log(`component`, customers);

  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [entriesToShow, setEntriesToShow] = useState(7);
  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
  const [showMailPopup, setShowMailPopup] = useState(false);
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
  const toggleProVisibility = () => {
    setProVisibility(!ProVisibility);
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

  const handleSendMail = (mailData) => {
    console.log("Mail Data:", mailData);
  };

  useEffect(() => {
    const dummyCategories = [
      { id: 1, name: "Sanju", email: "Sanju@example.com", status: "Active" },
      { id: 2, name: "Ronika", email: "Ronika@example.com", status: "Active" },
      { id: 3, name: "Faizal", email: "Faizal@example.com", status: "Active" },
      { id: 4, name: "Shweta", email: "Shweta@example.com", status: "Active" },
      { id: 5, name: "Rupali", email: "Rupali@example.com", status: "Active" },
      { id: 6, name: "Aman", email: "Aman@example.com", status: "Active" },
      { id: 7, name: "Sneha", email: "Sneha@example.com", status: "Active" },
    ];
    setCategories(dummyCategories);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleEntriesChange = (value) => {
    setEntriesToShow(value);
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

  const handleDeleteCategory = (id, email) => {
    let confirm = window.confirm(
      `Are you sure, want to delete user with this email:- ${email}`
    );
    if (confirm) {
      dispatch(deleteUser(id));
    } else {
      return;
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
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

  const handleAddCategory = (newCategory) => {
    newCategory.id = categories.length + 1;
    setCategories([...categories, newCategory]);
  };

  useEffect(() => {
    dispatch(fetchCustomers(currentPage));
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
        <Layout heading="Customer List"></Layout>
        <div className="recent-orders">
          <div className="table-header">
            <p></p>
            <div className="enttts-search">
              {/* <div className='maildiv'> */}
              {/* <button className="add-mail-btn" onClick={() => setShowMailPopup(true)}>+ Send Mail to all Users</button> */}

              {/* {showMailPopup && <MailPopup onClose={() => setShowMailPopup(false)} onSendMail={handleSendMail} />}
              </div> */}
              {/* <div className="pentrry-valcus">
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
              {/* <div className="search">
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
            <thead className="ablogadminheads">
              <tr>
                <th>SN</th>
                <th>Name</th>
                <th>E-mail</th>
                <th>Contact No</th>
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
              ) : customers?.length <= 0 ? (
                <tr>
                  <td colSpan="9" className="contentt">
                    No customers available to show!
                  </td>
                </tr>
              ) : (
                customers.map((customer, index) => (
                  <tr key={index} className="bl">
                    <td>{index + 1}</td>
                    <td>{customer.firstName + " " + customer.lastName}</td>
                    <td>{customer.email}</td>

                    <td>
                      {customer?.mobileNumber
                        ? customer?.mobileNumber
                        : "Not Available"}
                    </td>

                    {/* <div className="activecus"> */}
                    {/* <td
                      className={`${
                        category.status === "Active" ? "active" : "deactive"
                      } status-cell`}
                    >
                      {category.status}
                    </td> */}
                    {/* </div> */}
                    <td>
                      {/* <FontAwesomeIcon icon={faEye} className="icon" /> */}
                      {/* <FontAwesomeIcon icon={faEnvelope} className="icon" /> */}
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="icon"
                        onClick={() =>
                          handleDeleteCategory(customer?._id, customer?.email)
                        }
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {customers?.length >= 1 && (
            <div className="pagination-innfo">
              <ReactPaginate
                forcePage={0}
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={Math.ceil(
                  Math.max(0, customersCount) / customersPerPage
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
    // </div>
  );
};

export default CustomerList;
