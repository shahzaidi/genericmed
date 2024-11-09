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
import Sidebar from "./Sidebar";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  homePagePageInitialValues,
  homePagePageValidationSchema,
} from "../common/pagesFolder/homePagePageValidation";
import {
  createHomePageBannersAction,
  getHomePageBannersDetailsAction,
  updateHomePageBannerAction,
} from "../redux/actions/pagesFolder/homePagePageActions";
import { uploadImagesAction } from "../redux/actions/imagesActions";
import Loading from "./Loading";

const PageHomePage = () => {
  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState("");

  const [title3, setTitle3] = useState("");

  const [title5, setTitle5] = useState("");

  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
  const [ProVisibility, setProVisibility] = useState(false);
  const [title4, setTitle4] = useState("");

  const fileInputRefs = useRef(
    Array(2)
      .fill(null)
      .map(() => React.createRef())
  );

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

  const { loading, homePageBanners, error } = useSelector(
    (state) => state.getHomePageBannersDetailsReducer
  );

  const { imagesLoading, imageUrls, type, imagesError } = useSelector(
    (state) => state.uploadImagesReducer
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

  const toggleAdminDropdown = () => {
    setAdminDropdownVisible(!adminDropdownVisible);
  };

  const handleSave = () => {
    // Collect all the field values and save them
    const dataToSave = {
      title1,
      title2,
      title3,
      title4,
      title5,
      images,
    };

    console.log("Data to save:", dataToSave);
  };
  const [images, setImages] = useState([]);
  const [images2, setImages2] = useState([]);
  const [images3, setImages3] = useState([]);
  const fileInputRef = useRef(null);
  const fileInputRefTwo = useRef(null);
  const fileInputRefThree = useRef(null);

  const handleImageBanners = (event) => {
    const newImages = Array.from(event.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages2([...images2, ...newImages]);
  };

  const handleChooseBanners = (event) => {
    const newImages = Array.from(event.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages3([...images3, ...newImages]);
  };
  const handleImageIconClick = () => {
    fileInputRef.current.click();
  };
  const handleImageIconClickTwo = () => {
    fileInputRefTwo.current.click();
  };
  const handleImageIconClickThree = () => {
    fileInputRefThree.current.click();
  };

  const handleHomePageBanners = () => {
    console.log(formik?.values, formik?.errors, "formikValues....//");
    if (Object.keys(formik.errors).length === 0) {
      dispatch(createHomePageBannersAction(formik?.values));
    }
  };

  const updateHomePageBanners = () => {
    console.log(formik?.values, "formikValues....//");
    if (
      Object.keys(homePageBanners).length !== 0 &&
      Object.keys(formik.errors).length === 0
    ) {
      dispatch(
        updateHomePageBannerAction(homePageBanners?._id, formik?.values)
      );
    }
  };

  const handleImageUpload = (e) => {
    const { name, files } = e.target;
    if (name === "sliderBannerImageUrl") {
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
    if (name === "imageUrlOne") {
      if (files.length === 0) {
        return;
      } else {
        let formData = new FormData();

        formData.append("images", files[0]);

        dispatch(uploadImagesAction(formData, name));
      }
    }

    if (name === "imageUrlTwo") {
      if (files.length === 0) {
        return;
      } else {
        let formData = new FormData();

        formData.append("images", files[0]);

        dispatch(uploadImagesAction(formData, name));
      }
    }
  };

  const formik = useFormik({
    initialValues: homePagePageInitialValues,
    // onSubmit: id ? updateProduct : handleHomePage,
    onSubmit: homePageBanners?._id
      ? updateHomePageBanners
      : handleHomePageBanners,
    validationSchema: homePagePageValidationSchema,
  });

  useEffect(() => {
    if (imageUrls && type === "sliderBannerImageUrl") {
      // setImage(imageUrls[0]);
      formik.setFieldValue("sliderBannerImageUrl", imageUrls);
    }

    if (imageUrls && type === "imageUrlOne") {
      // setImage(imageUrls[0]);
      formik.setFieldValue("imageUrlOne", imageUrls[0]);
    }

    if (imageUrls && type === "imageUrlTwo") {
      // setImage(imageUrls[0]);
      formik.setFieldValue("imageUrlTwo", imageUrls[0]);
    }
  }, [imageUrls]);

  useEffect(() => {
    if (homePageBanners && Object.keys(homePageBanners)?.length >= 1) {
      formik.setFieldValue(
        "sliderBannerImageUrl",
        homePageBanners?.sliderBannerImageUrl
      );
      formik.setFieldValue("imageUrlOne", homePageBanners?.imageUrlOne);
      formik.setFieldValue("imageUrlTwo", homePageBanners?.imageUrlTwo);
    }
  }, [homePageBanners]);

  useEffect(() => {
    dispatch(getHomePageBannersDetailsAction());
  }, [dispatch]);

  console.log(formik?.values?.sliderBannerImageUrl, "abcdfffffffffff");
  return (
    <div>
      <div className="admin-dashboard">
        <Sidebar />
        <div className="rightt-panel">
          <Layout heading="Home Page"></Layout>
          {loading ? (
            <div className="produche">
              <Loading />
            </div>
          ) : error ? (
            <p className="produche">{error}</p>
          ) : (
            <div className="produche">
              <div className="ingh">
                <label>Upload Slider's Banner</label>
                <div className="ig">
                  <div className="upload-icon" onClick={handleImageIconClick}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="35"
                      height="35"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path
                        d="M11 4v7H4v2h7v7h2v-7h7v-2h-7V4h-2z"
                        fill="#808080"
                      />
                    </svg>
                  </div>
                  <input
                    type="file"
                    name="sliderBannerImageUrl"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                    multiple
                  />
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
              </div>

              <div className="ingh">
                <label>Upload Banners</label>
                <div className="ig">
                  <div
                    className="upload-icon"
                    onClick={handleImageIconClickTwo}
                  >
                    <img
                      src={
                        formik?.values?.imageUrlOne
                          ? `https://uploadawsimages.s3.amazonaws.com/${formik?.values?.imageUrlOne}`
                          : "/assets/upimgicon.png"
                      }
                      alt="Upload Icon"
                      className="seted-image"
                    />
                  </div>
                  <input
                    type="file"
                    name="imageUrlOne"
                    ref={fileInputRefTwo}
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                    // Set an empty array to allow default selection of multiple files
                  />
                </div>
              </div>
              <div className="ingh">
                <label>Upload Banners</label>
                <div className="ig">
                  <div
                    className="upload-icon"
                    onClick={handleImageIconClickThree}
                  >
                    <img
                      src={
                        formik?.values?.imageUrlTwo
                          ? `https://uploadawsimages.s3.amazonaws.com/${formik?.values?.imageUrlTwo}`
                          : "/assets/upimgicon.png"
                      }
                      alt="Upload Icon"
                      className="seted-image"
                    />
                  </div>
                  <input
                    type="file"
                    name="imageUrlTwo"
                    ref={fileInputRefThree}
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </div>

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
    
      <div className='in'>
        <label>
        Title4 
          <input type="text" value={title4 } onChange={(e) => setTitle4(e.target.value)} />
        </label>
      </div>
      <div className='in'>
        <label>
        Title5 
          <input type="text" value={title5 } onChange={(e) => setTitle5 (e.target.value)} />
        </label>
      </div>
   
      <button className='titlho'>  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="19">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M11 4v7H4v2h7v7h2v-7h7v-2h-7V4h-2z"/>
              </svg>Add Title</button> */}

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
    
      <div className='in'>
        <label>
        Title4 
          <input type="text" value={title4 } onChange={(e) => setTitle4(e.target.value)} />
        </label>
      </div>
      <div className='in'>
        <label>
        Title5 
          <input type="text" value={title5 } onChange={(e) => setTitle5 (e.target.value)} />
        </label>
      </div>
   
      <button className='titlho'>  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="19">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M11 4v7H4v2h7v7h2v-7h7v-2h-7V4h-2z"/>
              </svg>Add Title</button> */}

                <div className="savehomepae">
                  {formik &&
                  homePageBanners &&
                  Object.keys(homePageBanners).length !== 0 ? (
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

export default PageHomePage;
