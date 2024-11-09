import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Layout from './Layout';
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
import { useFormik } from "formik";
import {
  adminInitialValues,
  adminValidationSchema,
} from "../common/Validation";
import { createAdmin } from "../redux/actions/adminsActions";
import { useDispatch } from "react-redux";
import Header from "./Header";

const AddNewAdmin = () => {
  const dispatch = useDispatch();
  const handleAdmin = () => {
    console.log(formik?.values, "fields..");
    if (Object.keys(formik.errors).length === 0) {
      dispatch(createAdmin(formik?.values));
    }
  };

  const formik = useFormik({
    initialValues: adminInitialValues,
    onSubmit: handleAdmin,
    validationSchema: adminValidationSchema,
  });

  console.log(formik?.values, formik?.errors, "fields");

  const [name, setName] = useState("");

  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
  const [ProVisibility, setProVisibility] = useState(false);

  const [ChooseImage, setChooseImage] = useState(null);
  const [isOn, setIsOn] = useState(false);

  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);

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

  const handleSwitchToggle = () => {
    setIsOn(!isOn);
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

  //   if (
  //     location.pathname === "/createproduct" ||
  //     location.pathname === "/productlist" ||
  //     location.pathname === "/attributes" ||
  //     location.pathname === "/outofstock"
  //   ) {
  //     setProVisibility(true);
  //   } else {
  //     setProVisibility(false);
  //   }

  //   if (
  //     location.pathname === "/createcoupon" ||
  //     location.pathname === "/couponlist" ||
  //     location.pathname === "/shippingrule" ||
  //     location.pathname === "/paymentmethod"
  //   ) {
  //     setEcomVisibility(true);
  //   } else {
  //     setEcomVisibility(false);
  //   }

  //   if (
  //     location.pathname === "/googleanalytics" ||
  //     location.pathname === "/homepage" ||
  //     location.pathname === "/categorypage" ||
  //     location.pathname === "/shopall" ||
  //     location.pathname === "/aboutus" ||
  //     location.pathname === "/blogpage" ||
  //     location.pathname === "/contactus" ||
  //     location.pathname === "/privacypolicy" ||
  //     location.pathname === "/termsandconditions" ||
  //     location.pathname === "/faqs"
  //   ) {
  //     setDMVisibility(true);
  //   } else {
  //     setDMVisibility(false);
  //   }

  //   if (
  //     location.pathname === "/customerlist" ||
  //     location.pathname === "/pendingcustomerlist"
  //   ) {
  //     setUserVisibility(true);
  //   } else {
  //     setUserVisibility(false);
  //   }

  //   if (
  //     location.pathname === "/aboutus" ||
  //     location.pathname === "/contactus" ||
  //     location.pathname === "/termsandconditions" ||
  //     location.pathname === "/privacypolicy" ||
  //     location.pathname === "/faqs" ||
  //     location.pathname === "/homepage" ||
  //     location.pathname === "/categoriespage" ||
  //     location.pathname === "/shopall"
  //   ) {
  //     setPagesVisibility(true);
  //   } else {
  //     setPagesVisibility(false);
  //   }
  //   if (
  //     location.pathname === "/blogallblogs" ||
  //     location.pathname === "/blogcategorypage" ||
  //     location.pathname === "/addnewpost"
  //   ) {
  //     setBlogsVisibility(true);
  //   } else {
  //     setBlogsVisibility(false);
  //   }

  //   if (
  //     location.pathname === "/orderlist" ||
  //     location.pathname === "/createanorder"
  //   ) {
  //     setOrderLogVisibility(true);
  //   } else {
  //     setOrderLogVisibility(false);
  //   }
  //   if (
  //     location.pathname === "/alladminlist" ||
  //     location.pathname === "/addnewadmin" ||
  //     location.pathname === "/alladminroles" ||
  //     location.pathname === "/userpermissions"
  //   ) {
  //     setAdminVisibility(true);
  //   } else {
  //     setAdminVisibility(false);
  //   }
  // }, [location.pathname]);

  const toggleAdminDropdown = () => {
    setAdminDropdownVisible(!adminDropdownVisible);
  };

  const toggleOrderVisibility = () => {
    setOrderVisibility(!orderVisibility);
  };
  const toggleCatVisibility = () => {
    setCatVisibility(!catVisibility);
  };
  const toggleProVisibility = () => {
    setProVisibility(!ProVisibility);
  };

  const handleChooseImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setChooseImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log({
      name,
      username,
      email,
      password,
      confirmPassword,
      role,
      ChooseImage,
    });
  };

  return (
    <div>
      <div className="admin-dashboard">
        <Sidebar />
        <div className="rightt-panel">

          <Header/>
        <Layout heading="Add New Admin">
   
   </Layout>


            <div className="produche">
              <div className="in">
                <label>
                  First Name
                  <input
                    type="text"
                    name="firstName"
                    value={formik?.values?.firstName}
                    onChange={formik.handleChange}
                  />
                </label>
                {formik?.touched?.firstName && formik?.errors?.firstName ? (
                  <p className="errorsig">{formik?.errors?.firstName}</p>
                ) : null}
              </div>
              <div className="in">
                <label>
                  Last Name
                  <input
                    type="text"
                    name="lastName"
                    value={formik?.values?.lastName}
                    onChange={formik.handleChange}
                  />
                </label>
                {formik?.touched?.lastName && formik?.errors?.lastName ? (
                  <p className="errorsig">{formik?.errors?.lastName}</p>
                ) : null}
              </div>
              <div className="in">
                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    value={formik?.values?.email}
                    onChange={formik.handleChange}
                  />
                </label>
                {formik?.touched?.email && formik?.errors?.email ? (
                  <p className="errorsig">{formik?.errors?.email}</p>
                ) : null}
              </div>
              {/* 
<div className='in'>
  <label>
    Password
    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
  </label>
</div>

<div className='in'>
  <label>
    Confirm Password
    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
  </label>
</div> */}
              {/* <div className='in'>
  <label>
    Role <span style={{ color: 'red' }}>*</span>
    <select value={role} onChange={(e) => setRole(e.target.value)}>
      <option value="" disabled>Select Role</option>
      <option value="Admin<">Admin</option>
      <option value="SuperAdmin">SuperAdmin</option>
 
    </select>
  </label>
</div> */}
              {/* //////////////////////////////////////////////////////////
              <div className="in">
                <label>
                  Admin <span style={{ color: "red" }}>*</span>
                  <input
                    type="checkbox"
                    id="specSwitch"
                    checked={isOn}
                    onChange={handleSwitchToggle}
                    className="switch-input"
                  />
                  <label
                    htmlFor="specSwitch"
                    className="switch-label"
                    id="onoff"
                  >
                    <span className="switch-inner"></span>
                    <span className="switch-swittch" id="roll"></span>
                    <span className="switch-on-text">True</span>
                    <span className="switch-off-text">False</span>
                  </label>
                </label>
              </div>
              //////////////////////////////////////////////////// */}
              {/* <div className='in'>
        <label htmlFor='featured-image-upload'>Choose Image</label>

        <div className='flexft'>
        <div className='uploadconchoos'>
       
        {ChooseImage && <img src={ChooseImage} alt='Featured' />}
        </div>
    
        <input type='file' id='featured-image-upload' onChange={handleChooseImageChange} />
        </div>

      </div> */}
              <button className="savepagepost" onClick={formik?.handleSubmit}>
                Add New
              </button>
            </div>
            <div></div>
          </div>
        </div>
      </div>
 
  );
};

export default AddNewAdmin;
