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
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import {
  createPrivacyPolicyPageAction,
  getPrivacyPolicyPageDetails,
  updatePrivacyPolicyPageAction,
} from "../redux/actions/pagesFolder/privacyPolicyPageActions";
import { useFormik } from "formik";
import {
  privacyPolicyPageInitialValues,
  privacyPolicyPageValidationSchema,
} from "../common/Validation";
import Loading from "./Loading";

const PagePrivacyPolicy = () => {
  const [privacypolicy, setPrivacyPolicy] = useState("");

  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
  const [ProVisibility, setProVisibility] = useState(false);
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
  const { loading, privacyPolicyPage, error } = useSelector(
    (state) => state.getPrivacyAndPolicyDetailsPageReducer
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const toggleAdminDropdown = () => {
    setAdminDropdownVisible(!adminDropdownVisible);
  };

  const toggleOrderVisibility = () => {
    setOrderVisibility(!orderVisibility);
  };
  const toggleCatVisibility = () => {
    setCatVisibility(!catVisibility);
  };
  const handleSavePage = () => {
    console.log("Privacy Policy:", privacypolicy);
  };

  const handleChange = (value, name) => {
    if (name === "privacyPolicy") {
      formik?.setFieldValue("privacyPolicy", value);
    }
  };

  const updatePrivacyPolicyPagePageData = () => {
    if (
      Object.keys(formik?.errors).length === 0 &&
      Object.keys(privacyPolicyPage).length !== 0
    ) {
      dispatch(
        updatePrivacyPolicyPageAction(privacyPolicyPage?._id, formik?.values)
      );
    }
  };

  const handlePrivacyPolicyPage = () => {
    if (Object.keys(formik?.errors).length === 0) {
      dispatch(createPrivacyPolicyPageAction(formik?.values));
    }
  };

  useEffect(() => {
    dispatch(getPrivacyPolicyPageDetails());
  }, [dispatch]);

  useEffect(() => {
    if (privacyPolicyPage && Object.keys(privacyPolicyPage).length >= 1) {
      formik?.setFieldValue("privacyPolicy", privacyPolicyPage?.privacyPolicy);
    }
  }, [privacyPolicyPage]);

  const formik = useFormik({
    initialValues: privacyPolicyPageInitialValues,
    // onSubmit: id ? updateProduct : handleHomePage,
    onSubmit: privacyPolicyPage?._id
      ? updatePrivacyPolicyPagePageData
      : handlePrivacyPolicyPage,
    validationSchema: privacyPolicyPageValidationSchema,
  });

  return (
    <div>
      <div className="admin-dashboard">
        <Sidebar />

        <div className="rightt-panel">
          <Header />
          <Layout heading="Privacy Policy"></Layout>
          {loading ? (
            <div className="pagau">
              <Loading />
            </div>
          ) : error ? (
            <p className="pagau">{error}</p>
          ) : (
            <div className="pagau">
              <div className="deptio">
                <label>
                  Privacy Policy
                  <ReactQuill
                    value={formik?.values?.privacyPolicy}
                    name="privacyPolicy"
                    onChange={(value) => handleChange(value, "privacyPolicy")}
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
                {formik?.touched?.privacyPolicy &&
                formik?.errors?.privacyPolicy ? (
                  <p className="errorsig">{formik?.errors?.privacyPolicy}</p>
                ) : null}
              </div>

              {formik && Object.keys(privacyPolicyPage).length !== 0 ? (
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
  );
};

export default PagePrivacyPolicy;
