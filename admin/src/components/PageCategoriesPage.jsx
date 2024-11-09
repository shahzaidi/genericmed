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
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { getAllCategory } from "../redux/actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";
import {
  categoriesPageInitialValues,
  categoriesPolicyPageValidationSchema,
} from "../common/pagesFolder/categoryPageValidations";
import {
  createCategoryPageAction,
  getCategoryPageDetails,
  updateCategoryPageAction,
} from "../redux/actions/pagesFolder/categoryPageActions";
import { useFormik } from "formik";
import { uploadImagesAction } from "../redux/actions/imagesActions";
import Loading from "./Loading";

const PageCategoriesPage = () => {
  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState("");
  const [category, setCategory] = useState("");
  const [title3, setTitle3] = useState("");

  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
  const [ProVisibility, setProVisibility] = useState(false);

  const [images, setImages] = useState([]);

  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);

  const [ecomVisibility, setEcomVisibility] = useState(false);

  const [dmVisibility, setDMVisibility] = useState(false);
  const [userVisibility, setUserVisibility] = useState(false);
  const [pagesVisibility, setPagesVisibility] = useState(false);
  const [blogsVisibility, setBlogsVisibility] = useState(false);
  const [orderLogVisibility, setOrderLogVisibility] = useState(false);
  const [adminVisibility, setAdminVisibility] = useState(false);
  const [guestUsersVisibility, setGuestUsersVisibility] = useState(false);

  const dispatch = useDispatch();

  const fileInputRef = useRef();

  const navigate = useNavigate();

  const { loading, categories, error } = useSelector(
    (state) => state.categories
  );

  const { categoriesLoading, categoriesPagePage, categoriesError } =
    useSelector((state) => state.getCategoryPagePageDetailsReducer);

  const { imagesLoading, imageUrls, type, imagesError } = useSelector(
    (state) => state.uploadImagesReducer
  );

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

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const toggleAdminDropdown = () => {
    setAdminDropdownVisible(!adminDropdownVisible);
  };

  const handleImageUpload = (e) => {
    let { name, files } = e.target;
    if (name === "images") {
      if (files.length === 0) {
        return;
      } else {
        let formData = new FormData();

        for (let i = 0; i < files.length; i++) {
          formData.append("images", files[i]);
        }
        dispatch(uploadImagesAction(formData, name));
      }
    }
  };

  const handleSave = () => {
    const dataToSave = {
      title1,
      title2,
      title3,
      category,
      images,
    };

    console.log("Data to save:", dataToSave);
  };
  const handleImageIconClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  useEffect(() => {
    dispatch(getCategoryPageDetails());
  }, [dispatch]);

  useEffect(() => {
    if (categoriesPagePage && Object.keys(categoriesPagePage).length >= 1) {
      formik?.setFieldValue("category", categoriesPagePage?.category);
      formik.setFieldValue(
        "sliderBannerImageUrl",
        categoriesPagePage?.sliderBannerImageUrl
      );
    }
  }, [categoriesPagePage]);

  console.log(categoriesPagePage, categories, "categories..///././././");

  const handleCategoriesPage = () => {
    // console.log(formik?.values, formik?.errors, "formikValues....//");
    if (Object.keys(formik.errors).length === 0) {
      dispatch(createCategoryPageAction(formik?.values));
    }
  };

  const handleCategoriesPageUpdate = () => {
    // console.log(formik?.values, "formikValues....//");
    if (
      Object.keys(formik.errors).length === 0 &&
      Object.keys(categoriesPagePage).length !== 0
    ) {
      dispatch(
        updateCategoryPageAction(categoriesPagePage?._id, formik?.values)
      );
    }
  };

  const formik = useFormik({
    initialValues: categoriesPageInitialValues,
    // onSubmit: id ? updateProduct : handleHomePage,
    onSubmit: categoriesPagePage?._id
      ? handleCategoriesPageUpdate
      : handleCategoriesPage,
    validationSchema: categoriesPolicyPageValidationSchema,
  });

  useEffect(() => {
    if (imageUrls && type === "images") {
      // setImage(imageUrls[0]);
      formik.setFieldValue("sliderBannerImageUrl", imageUrls);
    }
  }, [imageUrls]);

  return (
    <div>
      <div className="admin-dashboard">
        <Sidebar />

        <div className="rightt-panel">
          <Header />
          <Layout heading="Categories Page"></Layout>
          {loading ? (
            <div className="produche">
              <Loading />
            </div>
          ) : error ? (
            <p className="produche">{error}</p>
          ) : (
            <div className="produche">
              <div className="in">
                <div className="ingh">
                  <label>Upload Slider's Banner</label>
                  <div className="ig">
                    <div className="upload-icon" onClick={handleImageIconClick}>
                      <img
                        src={
                          formik?.values?.imageUrl
                            ? `https://uploadawsimages.s3.amazonaws.com/${formik?.values?.imageUrl}`
                            : "/assets/upimgicon.png"
                        }
                        alt="Selected"
                        className="catted-image"
                      />
                    </div>
                    <input
                      type="file"
                      name="images"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      style={{ display: "none" }}
                      multiple
                    />
                  </div>
                  {formik?.touched?.sliderBannerImageUrl &&
                  formik?.errors?.sliderBannerImageUrl ? (
                    <p className="errorsig">
                      {formik?.errors?.sliderBannerImageUrl}
                    </p>
                  ) : null}
                </div>
                {formik?.values?.sliderBannerImageUrl?.length !== 0 && (
                  <div className="igg">
                    {formik?.values?.sliderBannerImageUrl?.length <= 0
                      ? ""
                      : formik?.values?.sliderBannerImageUrl.map(
                          (imag, index) => (
                            <div key={index} style={{ margin: "20px" }}>
                              <div
                                className="bigimage mentomn"
                                style={{
                                  cursor: "pointer",
                                  width: "150px",
                                  height: "150px",
                                }}
                              >
                                {imag ? (
                                  <img
                                    src={`https://uploadawsimages.s3.amazonaws.com/${imag}`}
                                    alt={`Uploaded Image ${index + 1}`}
                                    style={{ width: "150px", height: "150px" }}
                                  />
                                ) : (
                                  <div className="big-image-placeholder">
                                    <img
                                      src="/assets/upimgicon.png"
                                      alt="Upload Icon"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        )}
                  </div>
                )}
                {/* <div className="in">
                <label htmlFor="category">Category</label>
                <select
                  id="categorypageinputdro"
                  // onChange={handleCategoryChange}
                  name="category"
                  placeholder="Select category"
                  value={formik?.values?.category}
                  onChange={formik.handleChange}
                >
                  <option value="">Select category</option>
                  {categories &&
                    categories.map((category, index) => (
                      <option key={index} value={category?.name}>
                        {category?.name}
                      </option>
                    ))}
                </select>
                {formik?.touched?.category && formik?.errors?.category ? (
                  <p className="errorsig">{formik?.errors?.category}</p>
                ) : null}
              </div> */}
                {/* 
      <div className='in'>
        <label>
       Title1 
          <input type="text" value={  title1 } onChange={(e) => setTitle1 (e.target.value)} />
        </label>
      </div>
      <div className='in'>
        <label>
        Title2  
          <input type="text" value={   title2  } onChange={(e) => setTitle2  (e.target.value)} />
        </label>
      </div>
    
      <div className='in'>
        <label>
        Title3  
          <input type="text" value={title3} onChange={(e) => setTitle3(e.target.value)} />
        </label>
      </div>
    
    
      <button className='titlho'>  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="19">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M11 4v7H4v2h7v7h2v-7h7v-2h-7V4h-2z"/>
              </svg>Add Title</button> */}

                <div className="savehomepae">
                  {formik &&
                  categoriesPagePage &&
                  Object.keys(categoriesPagePage).length !== 0 ? (
                    <button className="homesave" onClick={formik?.handleSubmit}>
                      Update
                    </button>
                  ) : (
                    <button className="homesave" onClick={formik?.handleSubmit}>
                      Save
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default PageCategoriesPage;
