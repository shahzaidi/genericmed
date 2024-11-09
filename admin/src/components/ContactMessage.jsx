import React, { useState, useEffect } from "react";
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
import { NavLink, Link, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContactUsDetails,
  getAllContactUs,
} from "../redux/actions/contactUsActions";
import Header from "./Header";
import Loading from "./Loading";

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

const ContactMessage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, contactUsMessages, contactUsCount, error } = useSelector(
    (state) => state.getAllContactUsReducer
  );
  const contactUsPerPageCount = Number(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ProVisibility, setProVisibility] = useState(false);
  const [entriesToShow, setEntriesToShow] = useState(7);
  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
  const [showMailPopup, setShowMailPopup] = useState(false);
  const [ecomVisibility, setEcomVisibility] = useState(false);

  const [dmVisibility, setDMVisibility] = useState(false);
  const [userVisibility, setUserVisibility] = useState(false);
  const [pagesVisibility, setPagesVisibility] = useState(false);
  const [blogsVisibility, setBlogsVisibility] = useState(false);
  const [orderLogVisibility, setOrderLogVisibility] = useState(false);
  const [adminVisibility, setAdminVisibility] = useState(false);

  const [guestUsersVisibility, setGuestUsersVisibility] = useState(false);

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

  const handleDeleteContactUsMessage = (id) => {
    let confirm = window.confirm(`Are you sure, want to delete message!`);

    if (confirm) {
      dispatch(deleteContactUsDetails(id));
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
    dispatch(getAllContactUs(currentPage));
  }, [currentPage]);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    // setCurrentPage(e);
  };

  console.log(contactUsMessages, "messages..././././././././");

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="rightt-panel">
        <Header />
        <Layout heading="Contact Message"></Layout>
        <div className="recent-orders">
          <div className="table-header">
            <p></p>
            <div className="enttts-search">
              {/* <div className='maildiv'> */}
              {/* <button className="add-mail-btn" onClick={() => setShowMailPopup(true)}>+ Send Mail to all Users</button> */}
              {/* 
{showMailPopup && <MailPopup onClose={() => setShowMailPopup(false)} onSendMail={handleSendMail} />}
              </div> */}
              {/* <div className="pentrrcoy-val">
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
              <div className="search">
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
                <th>Phone Number</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <Loading />
              ) : error ? (
                <p>{error}</p>
              ) : contactUsMessages?.length <= 0 ? (
                <p>No, contact message available to show!</p>
              ) : (
                contactUsMessages.map((details, index) => (
                  <tr key={index} className="bl">
                    <td>{index + 1}</td>
                    <td>{details?.name}</td>
                    <td>{details?.email}</td>
                    <td>{details?.phoneNumber}</td>
                    <td>{details?.message}</td>

                    <td>
                      {/* <Link to="/viewcontact"> */}{" "}
                      <FontAwesomeIcon
                        icon={faEye}
                        className="icon"
                        onClick={() =>
                          navigate("/viewcontact", {
                            state: { id: details?._id },
                          })
                        }
                      />
                      {/* </Link> */}
                      {/* <FontAwesomeIcon icon={faEnvelope} className="icon" /> */}
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="icon"
                        onClick={() =>
                          handleDeleteContactUsMessage(details?._id)
                        }
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {contactUsMessages?.length >= 10 && (
            <div className="pagination-innfo">
              <ReactPaginate
                forcePage={0}
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={Math.ceil(
                  Math.max(0, contactUsCount) / contactUsPerPageCount
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

export default ContactMessage;
