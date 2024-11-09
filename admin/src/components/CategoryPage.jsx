import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../redux/actions/categoryActions";
import { useFormik } from "formik";
import {
  categoryPageInitialValues,
  categoryPageValidationSchema,
} from "../common/digitalMarketing/categoryPageValidation";
import {
  createCategoryPageAction,
  getCategoryPageDetails,
  updateCategoryPageAction,
} from "../redux/actions/digitalMarketing/categoryPageActions";
import Header from "./Header";
import Loading from "./Loading";

const CategoryPage = () => {
  const [isActive, setIsActive] = useState(false);

  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [metaKeyword, setMetaKeyword] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
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

  const dispatch = useDispatch();

  const { categoryPageLoading, categoryPage, categoryPageError } = useSelector(
    (state) => state.getCategoryPageDetailsReducer
  );

  const { loading, categories, error } = useSelector(
    (state) => state.categories
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

  const toggleAdminDropdown = () => {
    setAdminDropdownVisible(!adminDropdownVisible);
  };

  const homsv = () => {
    const newData = {
      metaTitle,
      metaDescription,
      metaKeyword,
      slug,
    };

    console.log("Saving data:", newData);
  };

  const toggleOrderVisibility = () => {
    setOrderVisibility(!orderVisibility);
  };
  const toggleCatVisibility = () => {
    setCatVisibility(!catVisibility);
  };

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  useEffect(() => {
    dispatch(getCategoryPageDetails());
    if (categoryPage && Object.keys(categoryPage).length >= 1) {
      formik?.setFieldValue("category", categoryPage?.category);
      formik?.setFieldValue("slug", categoryPage?.slug);
      formik?.setFieldValue("metaDescription", categoryPage?.metaDescription);
      formik?.setFieldValue("metaTitle", categoryPage?.metaTitle);
      formik?.setFieldValue("metaKeyword", categoryPage?.metaKeyword);
    }
  }, [categories]);

  console.log(categories, "categories..///././././");

  const handleCategoryPage = () => {
    // console.log(formik?.values, formik?.errors, "formikValues....//");
    if (Object.keys(formik.errors).length === 0) {
      dispatch(createCategoryPageAction(formik?.values));
    }
  };

  const handleCategoryPageUpdate = () => {
    // console.log(formik?.values, "formikValues....//");
    if (
      Object.keys(formik.errors).length === 0 &&
      Object.keys(categoryPage).length !== 0
    ) {
      dispatch(updateCategoryPageAction(categoryPage?._id, formik?.values));
    }
  };

  const formik = useFormik({
    initialValues: categoryPageInitialValues,
    // onSubmit: id ? updateProduct : handleHomePage,
    onSubmit: categoryPage?._id ? handleCategoryPageUpdate : handleCategoryPage,
    validationSchema: categoryPageValidationSchema,
  });

  return (
    <div>
      <div className="admin-dashboard">
        <Sidebar />
        <div className="rightt-panel">
          <div className="header-admin">
            <nav className="navbar navbar-light bg-light">
              <div className="container-fluid">
                <h2>Category Page</h2>
                <div className="visit">
                  <img src="/assets/visitweb.png" alt="Visit Website" />
                  <p>Visit Website</p>
                </div>
                <div className="d-flex align-items-center">
                  <img
                    src="/assets/profileimg.png"
                    alt="Profile"
                    width="40"
                    height="40"
                    className="rounded-circle me-2"
                  />
                  <div className="admin-drop">
                    <p
                      className="btn btn-light dropdown-toggle"
                      type="button"
                      onClick={toggleAdminDropdown}
                      aria-expanded="false"
                    >
                      Admin <FontAwesomeIcon icon={faAngleDown} />
                    </p>
                  </div>
                </div>
              </div>
              <div className="adminform">
                {adminDropdownVisible && (
                  <ul>
                    <p>Profile</p>
                    <p>Logout</p>
                  </ul>
                )}
              </div>
            </nav>
            {categoryPageLoading ? (
              <div className="produche">
                <Loading />
              </div>
            ) : categoryPageError ? (
              <p className="produche">{categoryPageError}</p>
            ) : (
              <div className="produche">
                <div className="in">
                  <label>
                    Select Category <span style={{ color: "red" }}>*</span>
                    <select
                      name="category"
                      value={formik?.values?.category}
                      onChange={formik.handleChange}
                    >
                      {categories
                        ? categories?.map((category) => (
                            <option value={category?.name}>
                              {category?.name}
                            </option>
                          ))
                        : ""}
                    </select>
                  </label>
                  {formik?.touched?.category && formik?.errors?.category ? (
                    <p className="errorsig">{formik?.errors?.category}</p>
                  ) : null}
                </div>

                <div className="in">
                  <label>
                    Meta Title <span style={{ color: "red" }}>*</span>
                    <input
                      type="text"
                      name="metaTitle"
                      value={formik?.values?.metaTitle}
                      onChange={formik.handleChange}
                    />
                  </label>
                  {formik?.touched?.metaTitle && formik?.errors?.metaTitle ? (
                    <p className="errorsig">{formik?.errors?.metaTitle}</p>
                  ) : null}
                </div>
                <div className="in">
                  <label>
                    Meta Description <span style={{ color: "red" }}>*</span>
                    <input
                      type="text"
                      name="metaDescription"
                      value={formik?.values?.metaDescription}
                      onChange={formik.handleChange}
                    />
                  </label>
                  {formik?.touched?.metaDescription &&
                  formik?.errors?.metaDescription ? (
                    <p className="errorsig">
                      {formik?.errors?.metaDescription}
                    </p>
                  ) : null}
                </div>

                <div className="in">
                  <label>
                    Meta Keyword <span style={{ color: "red" }}>*</span>
                    <input
                      type="text"
                      name="metaKeyword"
                      value={formik?.values?.metaKeyword}
                      onChange={formik.handleChange}
                    />
                  </label>
                  {formik?.touched?.metaKeyword &&
                  formik?.errors?.metaKeyword ? (
                    <p className="errorsig">{formik?.errors?.metaKeyword}</p>
                  ) : null}
                </div>

                <div className="in">
                  <label>
                    Slug <span style={{ color: "red" }}>*</span>
                    <input
                      type="text"
                      name="slug"
                      value={formik?.values?.slug}
                      onChange={formik.handleChange}
                    />
                  </label>
                  {formik?.touched?.slug && formik?.errors?.slug ? (
                    <p className="errorsig">{formik?.errors?.slug}</p>
                  ) : null}
                </div>

                {formik && Object.keys(categoryPage).length !== 0 ? (
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
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
