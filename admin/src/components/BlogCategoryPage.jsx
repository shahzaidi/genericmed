import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "./Layout";
import {
  faAngleDown,
  faEye,
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
import {
  NavLink,
  Link,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Sidebar from "./Sidebar";
import { useFormik } from "formik";
import {
  blogCategoryInitialValues,
  blogCategoryValidationSchema,
} from "../common/Validation";
import {
  createBlogCategory,
  deleteBlogCategory,
  getAllBlogCategory,
  getBlogCategoryDetails,
  updateBlogCategoryDetailsAction,
} from "../redux/actions/blogCategoryActions";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import Loading from "./Loading";
import ReactPaginate from "react-paginate";

const BlogsPopup = ({ onClose, onSave }) => {
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  const { blogLoading, blogCategory, blogError } = useSelector(
    (state) => state?.getBlogCategoryDetailsReducer
  );

  const handleSave = () => {
    console.log("Category:", category);
    console.log("Status:", status);
    onSave({ category, status });
  };

  // const formik = useFormik();

  const handleBlogCategory = () => {
    console.log(formik?.values, "formikValues....//");
    if (Object.keys(formik.errors).length === 0) {
      dispatch(createBlogCategory(formik?.values, onClose));
    }
  };

  const updateBlogCategory = () => {
    console.log(formik?.values, "abc formikValues....//");
    if (Object.keys(formik.errors).length === 0 && id) {
      dispatch(updateBlogCategoryDetailsAction(id, formik?.values, onClose));
    }
  };

  const formik = useFormik({
    initialValues: blogCategoryInitialValues,
    onSubmit: id ? updateBlogCategory : handleBlogCategory,
    validationSchema: blogCategoryValidationSchema,
  });

  console.log(formik?.values, formik?.errors, "fields");

  useEffect(() => {
    if (id) {
      dispatch(getBlogCategoryDetails(id));
    }
  }, [id]);

  useEffect(() => {
    if (id && Object.keys(blogCategory).length >= 1) {
      formik.setFieldValue("name", blogCategory?.name);
      formik.setFieldValue("status", blogCategory?.status);
    }
  }, [id, blogCategory, dispatch]);

  console.log(
    formik?.errors,
    formik?.values,
    "blogDetails././././././././././/"
  );

  return (
    <div className="attributes-popup">
      <h2>Add New</h2>
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
      {blogLoading ? (
        <div className="popup-content">
          <Loading />
        </div>
      ) : blogError ? (
        <p>{blogError}</p>
      ) : (
        <div className="popup-content">
          <label htmlFor="catname">Category Name</label>
          <input
            type="text"
            id="catname"
            name="name"
            value={formik?.values?.name}
            onChange={formik.handleChange}
          />
          {formik?.touched?.name && formik?.errors?.name ? (
            <p className="errorsig">{formik?.errors?.name}</p>
          ) : null}

          <div className="attristatus">
            <label htmlFor="status">Status</label>
            <select
              id="statuus"
              name="status"
              value={formik?.values?.status}
              onChange={formik.handleChange}
            >
              <option value="" disabled hidden>
                Select status
              </option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {formik?.touched?.status && formik?.errors?.status ? (
              <p className="errorsig">{formik?.errors?.status}</p>
            ) : null}
          </div>

          <div className="popup-buttons">
            {id ? (
              <button onClick={formik?.handleSubmit}>Update</button>
            ) : (
              <button onClick={formik?.handleSubmit}>Save</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export { BlogsPopup };

const BlogCategoryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showBlogsPopup, setShowBlogsPopup] = useState(false);
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
  const [ecomVisibility, setEcomVisibility] = useState(false);
  const [ProVisibility, setProVisibility] = useState(false);
  const [dmVisibility, setDMVisibility] = useState(false);
  const [userVisibility, setUserVisibility] = useState(false);
  const [pagesVisibility, setPagesVisibility] = useState(false);
  const [blogsVisibility, setBlogsVisibility] = useState(false);
  const [orderLogVisibility, setOrderLogVisibility] = useState(false);
  const [adminVisibility, setAdminVisibility] = useState(false);

  const location = useLocation();
  const params = useParams();

  const { id } = params;

  console.log(location, "idBlogCate");

  const [guestUsersVisibility, setGuestUsersVisibility] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogCategoriesCountPerPage = Number(10);

  const { loading, categories, blogCategoriesCount, error } = useSelector(
    (state) => state.getAllBlogCategoryReducer
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

  useEffect(() => {
    const dummyCategories = [
      { id: 1, name: "Category 1", status: "Published" },
      { id: 2, name: "Category 2", status: "draft" },
      { id: 3, name: "Category 3", status: "Published" },
      { id: 4, name: "Category 4", status: "Published" },
    ];
  }, []);

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
  const handleEntriesChange = (value) => {
    setEntriesToShow(value);
  };

  const handleDeleteBlogCategory = (categoryId) => {
    let confirm = window.confirm(`Are you sure, want to delete blog category!`);
    if (confirm) {
      dispatch(deleteBlogCategory(categoryId));
    } else {
      return;
    }
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.name &&
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
  const toggleProVisibility = () => {
    setProVisibility(!ProVisibility);
  };

  useEffect(() => {
    dispatch(getAllBlogCategory(currentPage));
  }, [currentPage]);

  useEffect(() => {
    if (id) {
      setShowBlogsPopup(true);
    }
  }, [id]);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    // setCurrentPage(e);
  };

  return (
    <div className="admin-dashboard">
      <Sidebar />

      <div className="rightt-panel">
        <Header />
        <Layout heading="Category Page"></Layout>
        <div className="recent-orders">
          <div className="table-header">
            <p></p>
            <div className="enttts-search">
              <div className="engpro">
                <button
                  className="add-category-btn"
                  onClick={() => setShowBlogsPopup(true)}
                >
                  + Add New
                </button>

                {showBlogsPopup && (
                  <BlogsPopup
                    onClose={() => {
                      setShowBlogsPopup(false);
                      window.location.href = "/blogcategorypage";
                    }}
                    onSave={handleAddCategory}
                  />
                )}
              </div>
              {/* <div className="pentry">
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
          <table className="adminallblog-related">
            <thead className="ablogadminheads">
              <tr>
                <th>SN</th>
                <th>Category Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <Loading />
              ) : error ? (
                <p>{error}</p>
              ) : categories?.length <= 0 ? (
                <p>No, blog category available to show!</p>
              ) : (
                categories &&
                categories.map((category, index) => (
                  <tr key={index} className="bl">
                    <td>{index + 1}</td>
                    <td>{category?.name}</td>
                    <td
                      className={`${
                        category?.status === "Inactive" ? "draft" : "published"
                      } status-cell`}
                    >
                      <button
                        className={`${
                          category?.status === "Inactive"
                            ? "draft-button"
                            : "published-button"
                        }`}
                      >
                        {category?.status}
                      </button>
                    </td>
                    <td>
                      {/* <FontAwesomeIcon icon={faEye} className="eye-icon" /> */}
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="edit-icon"
                        onClick={() =>
                          navigate(`/blogcategorypage/${category?._id}`)
                        }
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="icon"
                        onClick={() => handleDeleteBlogCategory(category?._id)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {categories?.length >= 10 && (
            <div className="pagination-innfo">
              <ReactPaginate
                forcePage={0}
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={Math.ceil(
                  Math.max(0, blogCategoriesCount) / blogCategoriesCountPerPage
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

export default BlogCategoryPage;
