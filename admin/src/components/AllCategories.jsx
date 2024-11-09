import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "./Layout";
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
import {
  NavLink,
  Link,
  useNavigate,
  useParams,
  useNavigation,
} from "react-router-dom";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryDetails,
  updateCategoryDetailsAction,
} from "../redux/actions/categoryActions";
import { useFormik } from "formik";
import {
  categoryInitialValues,
  categoryValidationSchema,
} from "../common/Validation";
import Header from "./Header";
import { uploadImagesAction } from "../redux/actions/imagesActions";
import Loading from "./Loading";
import ReactPaginate from "react-paginate";

const AddCategoryPopup = ({ onClose, onAddCategory }) => {
  const [categoryName, setCategoryName] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const { loading, category, error } = useSelector(
    (state) => state.getCategoryDetailsReducer
  );

  const { imagesLoading, imageUrls, type, imagesError } = useSelector(
    (state) => state.uploadImagesReducer
  );

  const params = useParams();

  const { id } = params;
  const imageRef = useRef();
  const navigate = useNavigate();

  const errors = {};

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleToggle = () => {
    setIsActive(!isActive);
    console.log(isActive, "is Avtive");
  };

  console.log(isActive, "is Avtive");

  const handleChange = (e) => {
    const { name, files } = e.target;
    const checked = e.target.checked;

    if (name === "categoryName") {
      setCategoryName(e.target.value);
    }

    if (name === "status") {
      setStatus(e.target.value);
    }

    if (name === "image") {
      if (files.length === 0) {
        return;
      } else {
        let formData = new FormData();

        formData.append("images", files[0]);

        dispatch(uploadImagesAction(formData, name));
      }
    }
  };
  // if (formData) {
  //   console.log(formData, "ascs");
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      categoryName: categoryName,
      image: image,
      // ? image
      // : "https://t4.ftcdn.net/jpg/02/81/42/77/360_F_281427785_gfahY8bX4VYCGo6jlfO8St38wS9cJQop.jpg",
      status: status,
    };

    setFormErrors(validate(newCategory));
    setIsSubmit(true);
    // onAddCategory(newCategory);
    // setCategoryName("");
    // setStatus(false);
    // setImage(null);
    // onClose();
  };

  const updateCategoryHandle = (e) => {
    e.preventDefault();
    const newCategory = {
      categoryName: categoryName,
      image: image,
      // ? image
      // : "https://t4.ftcdn.net/jpg/02/81/42/77/360_F_281427785_gfahY8bX4VYCGo6jlfO8St38wS9cJQop.jpg",
      status: status,
    };

    setFormErrors(validate(newCategory));
    setIsSubmit(true);
  };

  let validate = (values) => {
    if (!values?.categoryName) {
      errors.categoryName = "Category name is required";
    }

    if (values?.categoryName?.length <= 4) {
      errors.categoryName = "Category name should be in 5 char.!";
    }

    if (!values?.status) {
      errors.status = "Category status is required";
    }

    if (!values?.image) {
      errors.image = "Image is required";
    }

    return errors;
  };

  useEffect(() => {
    if (
      Object.keys(formErrors).length === 0 &&
      isSubmit &&
      id === (null || undefined)
    ) {
      dispatch(createCategory({ categoryName, status, image, onClose }));
    }
    if (Object.keys(formErrors).length === 0 && isSubmit && id) {
      dispatch(
        updateCategoryDetailsAction({
          id,
          image,
          status,
          categoryName,
          onClose,
          navigate,
        })
      );
    }
  }, [formErrors, id]);

  useEffect(() => {
    if (id) {
      dispatch(getCategoryDetails(id));
    }
  }, [id]);

  useEffect(() => {
    if (id && Object.keys(category).length >= 1) {
      setCategoryName(category?.name);
      setImage(category?.image);
      setStatus(category?.status);
    }
  }, [id, category, dispatch]);

  useEffect(() => {
    if (imageUrls && type === "image") {
      setImage(imageUrls[0]);
    }
  }, [imageUrls, image]);

  console.log(image, "imgeCat");

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
        <h2>Add Category</h2>
        <form className="twel">
          <div className="form-groutyp">
            <label htmlFor="categoryName">Category Name</label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={categoryName}
              onChange={handleChange}
              required
            />
            {formErrors?.categoryName ? (
              <p className="errorsigio">{formErrors?.categoryName}</p>
            ) : null}
          </div>
          <div className="form-groutyp">
            <label htmlFor="status">Status</label>
            <select
              id="stufy"
              name="status"
              value={status}
              onChange={handleChange}
            >
              {/* <option value="" disabled hidden>
                Select status
              </option> */}
              <option value="Choose Status">Choose Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {formErrors?.status ? (
              <p className="errorsig">{formErrors?.status}</p>
            ) : null}
          </div>
          <div className="form-groutyp">
            <label htmlFor="image">Upload Image</label>
            {imagesLoading ? (
              <Loading />
            ) : (
              <div className="lpoi">
                <>
                  <div style={{ marginBottom: "20px" }}>
                    <div
                      className="bigimage mentomn"
                      style={{
                        cursor: "pointer",
                        width: "80px",
                        height: "80px",
                      }}
                    >
                      <div
                        className="big-image-placeholder"
                        onClick={() => imageRef.current.click()}
                      >
                        <img
                          src={
                            image
                              ? `https://uploadawsimages.s3.amazonaws.com/${image}`
                              : "/assets/upimgicon.png"
                          }
                          style={{ width: "80px", height: "80px" }}
                          alt="Upload Icon"
                        />
                      </div>
                    </div>
                    <input
                      type="file"
                      name="image"
                      onChange={handleChange}
                      ref={imageRef}
                      style={{ display: "none" }}
                    />
                  </div>
                </>
              </div>
            )}
            {formErrors?.image ? (
              <p className="errorsig">{formErrors?.image}</p>
            ) : null}
          </div>
          {id && Object.keys(category).length >= 1 ? (
            <button onClick={updateCategoryHandle} type="submit" id="catleen">
              Update
            </button>
          ) : (
            <button onClick={handleSubmit} type="submit" id="catleen">
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export { AddCategoryPopup };

const AllCategories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [categories, setCategories] = useState([]);
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ProVisibility, setProVisibility] = useState(false);
  const [ecomVisibility, setEcomVisibility] = useState(false);
  const [entriesToShow] = useState(10);
  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
  const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false);
  const [dmVisibility, setDMVisibility] = useState(false);
  const [userVisibility, setUserVisibility] = useState(false);
  const [pagesVisibility, setPagesVisibility] = useState(false);
  const [blogsVisibility, setBlogsVisibility] = useState(false);
  const [orderLogVisibility, setOrderLogVisibility] = useState(false);
  const [adminVisibility, setAdminVisibility] = useState(false);
  const [guestUsersVisibility, setGuestUsersVisibility] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { loading, categories, categoriesCount, error } = useSelector(
    (state) => state.categories
  );

  const categoriesPerPage = Number(10);

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

  // useEffect(() => {
  //   const dummyCategories = [
  //     {
  //       id: 1,
  //       name: "Category 1",
  //       image: "./assets/image_7.png",
  //       status: "Active",
  //     },
  //     {
  //       id: 2,
  //       name: "Category 2",
  //       image: "./assets/image_7.png",
  //       status: "Inactive",
  //     },
  //     {
  //       id: 3,
  //       name: "Category 3",
  //       image: "./assets/image_7.png",
  //       status: "Active",
  //     },
  //     {
  //       id: 4,
  //       name: "Category 3",
  //       image: "./assets/image_7.png",
  //       status: "Active",
  //     },
  //     {
  //       id: 5,
  //       name: "Category 3",
  //       image: "./assets/image_7.png",
  //       status: "Active",
  //     },
  //     {
  //       id: 6,
  //       name: "Category 3",
  //       image: "./assets/image_7.png",
  //       status: "Active",
  //     },
  //     {
  //       id: 7,
  //       name: "Category 3",
  //       image: "./assets/image_7.png",
  //       status: "Active",
  //     },
  //   ];
  //   setCategories(dummyCategories);
  // }, []);

  const toggleProVisibility = () => {
    setProVisibility(!ProVisibility);
  };
  const toggleEcomVisibility = () => {
    setEcomVisibility((prevVisibility) => !prevVisibility);
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
    let confirm = window.confirm("Are you sure, want to delete category!");
    if (confirm) {
      dispatch(deleteCategory(categoryId));
    } else {
      return;
    }

    // setCategories(updatedCategories);
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
    // setCategories([...categories, newCategory]);
  };
  // useEffect(() => {
  //   if (
  //     location.pathname === "/allorders" ||
  //     location.pathname === "/pendingorders" ||
  //     location.pathname === "/Delorders" ||
  //     location.pathname === "/Cancelorders"
  //   ) {
  //     setOrderVisibility(true);
  //   } else {
  //     setOrderVisibility(false);
  //   }

  //   if (
  //     location.pathname === "/allcategories" ||
  //     location.pathname === "/subcategories"
  //   ) {
  //     setCatVisibility(true);
  //   } else {
  //     setCatVisibility(false);
  //   }
  // }, [location.pathname]);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
    // setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(getAllCategory(currentPage));
  }, [currentPage]);
  console.log(categories, categoriesCount, "categories..........//count");
  const params = useParams();

  const { id } = params;

  useEffect(() => {
    if (id) {
      setShowAddCategoryPopup(true);
    }
  }, [id]);

  return (
    <div className="admin-dashboard">
      <Sidebar />

      <div className="rightt-panel">
        <Header />
        <Layout heading="All Categories"></Layout>
        <div className="recent-orders">
          <div className="table-header">
            <p></p>
            <div className="entts-search">
              <div className="eng">
                <button
                  className="add-category-btn"
                  onClick={() => setShowAddCategoryPopup(true)}
                >
                  + Add Category
                </button>

                {showAddCategoryPopup && (
                  <AddCategoryPopup
                    onClose={() => {
                      setShowAddCategoryPopup(false);
                      window.location.href = "/allcategories";
                    }}
                    onAddCategory={handleAddCategory}
                  />
                )}
              </div>
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
                <th>Category Name</th>
                <th>Image</th>
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
              ) : categories?.length <= 0 ? (
                <tr>
                  <td colSpan="9" className="contentt">
                    No category available to show!
                  </td>
                </tr>
              ) : (
                categories.map((category, index) => (
                  <tr key={index} className="bl">
                    {/* <td>{startIndex + index + 1}</td> */}
                    <td>{index + 1}</td>
                    <td>{category.name}</td>
                    <td>
                      <img
                        src={category?.image}
                        alt={category.name}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>
                    <div className="actdeact">
                      <td
                        className={`${
                          category.status ? "active" : "deactive"
                        } status-cell`}
                      >
                        {category.status ? "Active" : "Deactive"}
                      </td>
                    </div>
                    <td>
                      <FontAwesomeIcon
                        icon={faEdit}
                        onClick={() =>
                          navigate(`/allcategories/${category._id}`)
                        }
                        className="edit-icon"
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="icon"
                        onClick={() => handleDeleteCategory(category._id)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {categories?.length >= 1 && (
            <div className="pagination-innfo">
              <ReactPaginate
                forcePage={0}
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={Math.ceil(
                  Math.max(0, categoriesCount) / categoriesPerPage
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

export default AllCategories;
