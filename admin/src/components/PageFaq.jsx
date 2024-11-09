import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
import { NavLink, Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Layout from "./Layout";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  faqPageInitialValues,
  faqPageValidationSchema,
} from "../common/pagesFolder/faqPageValidations";
import {
  createFaqAction,
  deleteFaqAction,
  getAllFaqsAction,
  getFaqDetailsAction,
  updateFaqAction,
} from "../redux/actions/pagesFolder/faqPageActions";
import Loading from "./Loading";

const PageFAQPopup = ({ onClose, onSave }) => {
  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState("");

  const [answer, setAnswer] = useState("");
  const categories = [
    "About the Company",
    "Medicine-related questions",
    "Account and Order-related questions",
    "Payment and Shipping related questions",
  ];

  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  const { faqLoading, faq, faqError } = useSelector(
    (state) => state.getFaqPageDetailsReducer
  );

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSave = () => {
    console.log("Category:", category);
    console.log("Question:", question);
    console.log("Answer:", answer);
    console.log("Status:", status);
  };

  const onChange = (values, name) => {
    if (name === "answer") {
      formik?.setFieldValue("answer", values);
    }
  };

  const updateFaqHandle = () => {
    if (
      Object.keys(formik?.errors).length === 0 &&
      Object.keys(faq).length !== 0
    ) {
      dispatch(updateFaqAction(faq?._id, formik?.values));
    }
    console.log("Faq created successfully");
  };

  const createFaqHandle = () => {
    if (Object.keys(formik?.errors).length === 0) {
      dispatch(createFaqAction(formik?.values, onClose));
    }
    console.log("Faq created successfully");
  };

  const formik = useFormik({
    initialValues: faqPageInitialValues,
    onSubmit: faq?._id ? updateFaqHandle : createFaqHandle,
    validationSchema: faqPageValidationSchema,
  });

  useEffect(() => {
    if (id) {
      dispatch(getFaqDetailsAction(id));
    }
  }, [id]);

  useEffect(() => {
    if (id && Object.keys(faq).length >= 1) {
      formik?.setFieldValue("category", faq?.category);
      formik?.setFieldValue("question", faq?.question);
      formik?.setFieldValue("answer", faq?.answer);
      formik?.setFieldValue("status", faq?.status);
    }
  }, [id, dispatch, faq]);

  console.log(faq, "faq");

  return (
    <div>
      {faqLoading ? (
        <div className="faq-popup">
          <Loading />
        </div>
      ) : faqError ? (
        <p className="faq-popup">{faqError}</p>
      ) : (
        <div className="faq-popup">
          <h2>Add New </h2>
          <button className="closepoup-btn" onClick={onClose}>
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
          <div className="catfaq">
            <label htmlFor="category">Category</label>
            <select
              id="categoryfaq"
              name="category"
              value={formik?.values?.category}
              onChange={formik.handleChange}
              placeholder="Select category"
            >
              <option value="">Select category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {formik?.touched?.category && formik?.errors?.category ? (
              <p className="errorsig">{formik?.errors?.category}</p>
            ) : null}
          </div>

          <div className="quefaq">
            <label htmlFor="question">Question</label>
            <input
              type="text"
              id="question"
              name="question"
              value={formik?.values?.question}
              onChange={formik.handleChange}
              placeholder="Enter your question"
            />
            {formik?.touched?.question && formik?.errors?.question ? (
              <p className="errorsig">{formik?.errors?.question}</p>
            ) : null}
          </div>

          <div className="ansfaq">
            <label>
              Answer
              <ReactQuill
                className="faqfrt"
                name="answer"
                value={formik?.values?.answer}
                onChange={(values) => onChange(values, "answer")}
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
            </label>
            {formik?.touched?.answer && formik?.errors?.answer ? (
              <p className="errorsig">{formik?.errors?.answer}</p>
            ) : null}
          </div>

          <div className="statusfq">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={formik?.values?.status}
              onChange={formik.handleChange}
              placeholder="Select status"
            >
              <option value="">Select status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {formik?.touched?.status && formik?.errors?.status ? (
              <p className="errorsig">{formik?.errors?.status}</p>
            ) : null}
          </div>

          {formik && faq && id && Object.keys(faq).length !== 0 ? (
            <button className="homesave" onClick={formik?.handleSubmit}>
              Update
            </button>
          ) : (
            <button className="homesave" onClick={formik?.handleSubmit}>
              Save
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export { PageFAQPopup };

const PageFaq = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPageFAQPopup, setShowPageFAQPopup] = useState(false);
  const [entriesToShow, setEntriesToShow] = useState(7);

  const [ecomVisibility, setEcomVisibility] = useState(false);

  const [dmVisibility, setDMVisibility] = useState(false);
  const [userVisibility, setUserVisibility] = useState(false);
  const [pagesVisibility, setPagesVisibility] = useState(false);
  const [blogsVisibility, setBlogsVisibility] = useState(false);
  const [orderLogVisibility, setOrderLogVisibility] = useState(false);
  const [adminVisibility, setAdminVisibility] = useState(false);

  const [ProVisibility, setProVisibility] = useState(false);
  const [guestUsersVisibility, setGuestUsersVisibility] = useState(false);
  const [deletePopUp, setDeletePopup] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const { loading, faqs, error } = useSelector(
    (state) => state.getAllFaqsReducer
  );

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

  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
  const [showAttributesPopup, setShowAttributesPopup] = useState(false);

  useEffect(() => {
    const dummyCategories = [
      {
        id: 1,
        name: "Product 1",
        status: "Active",
        question: "What is the recommended dosage for Product 1?",
        answer:
          "The recommended dosage for Product 1 is 1 tablet daily with water.",
      },
      {
        id: 2,
        name: "Product 2",
        status: "Inactive",
        question: "What are the side effects of Product 2?",
        answer: "Common side effects of Product 2 include nausea and headache.",
      },
      {
        id: 3,
        name: "Product 3",
        status: "Active",
        question: "Is Product 3 suitable for children?",
        answer: "Product 3 is not recommended for children under 12 years old.",
      },
      {
        id: 4,
        name: "Product 4",
        status: "Active",
        question: "Can Product 4 be taken with food?",
        answer: "Yes, Product 4 can be taken with or without food.",
      },
      {
        id: 5,
        name: "Product 5",
        status: "Inactive",
        question: "What are the side effects of Product 5?",
        answer: "Common side effects of Product 5 include nausea and headache.",
      },
      {
        id: 6,
        name: "Product 6",
        status: "Active",
        question: "Is Product 6 suitable for children?",
        answer: "Product 6 is not recommended for children under 12 years old.",
      },
      {
        id: 7,
        name: "Product 7",
        status: "Active",
        question: "Can Product 7 be taken with food?",
        answer: "Yes, Product 7 can be taken with or without food.",
      },
    ];

    setCategories(dummyCategories);
  }, []);

  const handleEntriesChange = (value) => {
    setEntriesToShow(value);
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
    const updatedCategories = categories.filter(
      (category) => category.id !== categoryId
    );
    setCategories(updatedCategories);
  };

  const filteredCategories = categories
    ? categories.filter(
        (category) =>
          category.name &&
          category.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
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
    dispatch(getAllFaqsAction());
  }, []);

  useEffect(() => {
    if (id) {
      setShowPageFAQPopup(true);
    }
  }, [id]);

  // {
  //   id && setShowPageFAQPopup(true);
  // }

  console.log(faqs, "faqsssssss././././././././././././");

  const deleteFaq = (id = null, confirmed) => {
    if (confirmed === true) {
      console.log("faq", confirmed, id);
      setDeletePopup(false);
      dispatch(deleteFaqAction(id));
    } else {
      setDeletePopup(false);
      return false;
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="rightt-panel">
        <Header />
        <Layout heading="Faq"></Layout>
        <div className="recent-orders">
          <div className="table-header">
            <p></p>
            <div className="enttts-search">
              <div className="engattri">
                <button
                  className="add-category-btn"
                  onClick={() => setShowPageFAQPopup(true)}
                >
                  + Add New
                </button>

                {showPageFAQPopup && (
                  <PageFAQPopup
                    onClose={() => {
                      setShowPageFAQPopup(false);
                      navigate("/pagefaq");
                    }}
                  />
                )}
              </div>

              {/* <div className="pentrryfaqq">
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
              </div> */}
            </div>
          </div>
          <table className="adminfaq-related">
            <thead className="aadminheads">
              <tr>
                <th>SN</th>
                <th>Category</th>
                <th>Question</th>
                {/* <th>Editor for Answer</th> */}
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <Loading />
              ) : error ? (
                <p>{error}</p>
              ) : faqs?.length <= 0 ? (
                <p>No faq available to show!</p>
              ) : (
                faqs.map((category, index) => (
                  <tr key={index} className="ft">
                    <td>{index + 1}</td>
                    <td>{category?.category}</td>
                    <td>{category?.question}</td>

                    {/* <td>
                      <p
                        dangerouslySetInnerHTML={{ __html: category?.answer }}
                      />
                    </td> */}

                    <td
                      className={
                        category.status === "Active"
                          ? "active-cell"
                          : "inactive-cell"
                      }
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <button
                          style={{
                            width:
                              category.status === "Active" ? "96px" : "auto",
                            backgroundColor:
                              category.status === "Active"
                                ? "#5ebc00"
                                : "#ce3e3e",
                            color: "white",
                          }}
                        >
                          {category.status === "Active"
                            ? "Active "
                            : "Inactive "}
                        </button>
                      </div>
                    </td>

                    <td>
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() => navigate(`/pagefaq/${category?._id}`)}
                        className="editfaq-icon"
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="icon"
                        onClick={() => setDeletePopup(true)}
                      />
                    </td>

                    {deletePopUp && (
                      <div className="popupd">
                        <div className="popup-inner">
                          <button
                            className="close-btn"
                            onClick={() => deleteFaq(0, false)}
                          >
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
                          <h2 className="hedytu">Delete</h2>
                          <form>
                            <div className="fyousure">
                              Are you Sure, want to delete?{" "}
                            </div>

                            <div className="butonfd">
                              <button
                                type="submit"
                                onClick={() => deleteFaq(category?._id, true)}
                                className="coupondel"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => deleteFaq(category?._id, false)}
                                type="submit"
                                className="couponcancel"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </tr>
                ))
              )}
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

export default PageFaq;
