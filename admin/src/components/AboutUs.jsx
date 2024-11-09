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

import { useFormik } from "formik";
import {
  aboutUsInitialValues,
  aboutUsValidationSchema,
} from "../common/digitalMarketing/aboutUsValidation";
import {
  aboutUsPageAction,
  getAboutUsPageDetails,
  updateAboutUsPageAction,
} from "../redux/actions/digitalMarketing/aboutUsActions";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "./Sidebar";
import Layout from "./Layout";
import Header from "./Header";
import Loading from "./Loading";

const AboutUs = () => {
  const [isActive, setIsActive] = useState(false);

  const [slug, setSlug] = useState("");

  const [metaKeyword, setMetaKeyword] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
  const [ProVisibility, setProVisibility] = useState(false);
  const [ecomVisibility, setEcomVisibility] = useState(false);

  const [dmVisibility, setDmVisibility] = useState(false);
  const [userVisibility, setUserVisibility] = useState(false);
  const [pagesVisibility, setPagesVisibility] = useState(false);
  const [blogsVisibility, setBlogsVisibility] = useState(false);
  const [orderLogVisibility, setOrderLogVisibility] = useState(false);
  const [adminVisibility, setAdminVisibility] = useState(false);
  const [guestUsersVisibility, setGuestUsersVisibility] = useState(false);

  const dispatch = useDispatch();

  const { loading, aboutUs, error } = useSelector(
    (state) => state.getAboutUsPageDetailsReducer
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
    setDmVisibility(!dmVisibility);
  };
  const toggleEcomVisibility = () => {
    setEcomVisibility((prevVisibility) => !prevVisibility);
  };
  const toggleProVisibility = () => {
    setProVisibility(!ProVisibility);
  };

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

  const handleAboutUsPage = () => {
    console.log(formik?.values, formik?.errors, "formikValues....//");
    if (Object.keys(formik.errors).length === 0) {
      dispatch(aboutUsPageAction(formik?.values));
    }
  };

  const updateAboutUsPage = () => {
    console.log(formik?.values, "formikValues....//");
    if (
      Object.keys(aboutUs).length !== 0 &&
      Object.keys(formik.errors).length === 0
    ) {
      dispatch(updateAboutUsPageAction(aboutUs?._id, formik?.values));
    }
  };

  useEffect(() => {
    dispatch(getAboutUsPageDetails());
  }, [dispatch]);

  useEffect(() => {
    if (aboutUs && Object.keys(aboutUs).length >= 1) {
      formik?.setFieldValue("slug", aboutUs?.slug);
      formik?.setFieldValue("metaDescription", aboutUs?.metaDescription);
      formik?.setFieldValue("metaTitle", aboutUs?.metaTitle);
      formik?.setFieldValue("metaKeyword", aboutUs?.metaKeyword);
    }
  }, [aboutUs]);

  const formik = useFormik({
    initialValues: aboutUsInitialValues,
    // onSubmit: id ? updateProduct : handleHomePage,
    onSubmit: aboutUs?._id ? updateAboutUsPage : handleAboutUsPage,
    validationSchema: aboutUsValidationSchema,
  });

  return (
    <div>
      <div className="admin-dashboard">
        {/* <div className="leftt-panel">
        <img src="./assets/Logo.png" className="dashimg" alt="" />
        <div className="dashboard">
          <img src="./assets/Dash.png" alt="" />
          <h3><NavLink to='/dashboard' activeClassName="active">Dashboard</NavLink></h3>
        </div>

        <div className="orders-dropdown">
          <img src="./assets/ord.png" alt="" />
          <h3 onClick={toggleOrderVisibility}>Orders {orderVisibility ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleRight} />}</h3>
        </div>
        <div className='ordef' style={{ display: orderVisibility ? 'block' : 'none' }}>
          <ul>
            <li><Link to='/allorders' className={location.pathname === '/allorders' ? 'active' : ''}>All orders</Link></li>
            <li><Link to='/pendingorders' className={location.pathname === '/pendingorders' ? 'active' : ''}>Pending orders</Link></li>
            <li><Link to='/Delorders' className={location.pathname === '/Delorders' ? 'active' : ''}>Delivered orders</Link></li> */}
        {/* <li><Link to='/Cancelorders' className={location.pathname === '/Cancelorders' ? 'active' : ''}>Cancelled orders</Link></li> */}
        {/* </ul>
        </div>

        <div className="orders-dropdown">
        <img src="./assets/mancat.png" alt="" />
        <h3 onClick={toggleCatVisibility}>Manage Categories {catVisibility ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleRight} />}</h3>
      </div>
      <div className='catdef' style={{ display: catVisibility ? 'block' : 'none' }}>
        <ul>
          <li><Link to='/allcategories' className={location.pathname === '/allcategories' ? 'active' : ''}>All Categories</Link></li>
          <li><Link to='/subcategories' className={location.pathname === '/subcategories' ? 'active' : ''}>Subcategories</Link></li>
        </ul>
      </div>

      <div className="orders-dropdown">
        <img src="./assets/mancat.png" alt="" />
        <h3 onClick={toggleProVisibility}>Manage Products {ProVisibility ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleRight} />}</h3>
      </div>
      <div className='catdef' style={{ display: ProVisibility ? 'block' : 'none' }}>
        <ul>
          <li><Link to='/createproduct' className={location.pathname === '/createproduct' ? 'active' : ''}>Create Product</Link></li>
          <li><Link to='/productlist' className={location.pathname === '/productlist' ? 'active' : ''}>Product List</Link></li>
          <li><Link to='/attributes' className={location.pathname === '/attributes' ? 'active' : ''}>Attributes</Link></li>
          <li><Link to='/outofstock' className={location.pathname === '/outofstock' ? 'active' : ''}>Out Of Stock</Link></li>
        </ul>
      </div>

      <div className="orders-dropdown">
        <img src="./assets/mancat.png" alt="" />
        <h3 onClick={toggleEcomVisibility}>E-Commerce {ecomVisibility ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleRight} />}</h3>
      </div>
      <div className='ecomdef' style={{ display: ecomVisibility ? 'block' : 'none' }}>
        <ul>
          <li><Link to='/createcoupon' className={location.pathname === '/createcoupon' ? 'active' : ''}>Create Coupon</Link></li>
          <li><Link to='/couponlist' className={location.pathname === '/couponlist' ? 'active' : ''}>Coupon List</Link></li> */}
        {/* <li><Link to='/shippingrule' className={location.pathname === '/shippingrule' ? 'active' : ''}>Shipping Rule</Link></li> */}
        {/* <li><Link to='/paymentmethod' className={location.pathname === '/paymentmethod' ? 'active' : ''}>Payment Method</Link></li> */}
        {/* </ul>
      </div>
      <div className="orders-dropdown">
  <img src="./assets/digmarket.png" alt="" />
  <h3 onClick={toggleDMVisibility}>Digital Marketing {dmVisibility ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleRight} />}</h3>
</div>
<div className='dmdef' style={{ display: dmVisibility ? 'block' : 'none' }}>
  <ul>
  <li><Link to='/googleanalytics' className={location.pathname === '/googleanalytics' ? 'active' : ''}>Google Analytics</Link></li>
    <li><Link to='/homepage' className={location.pathname === '/homepage' ? 'active' : ''}>Homepage</Link></li>
    <li><Link to='/categorypage' className={location.pathname === '/categorypage' ? 'active' : ''}>Category Page</Link></li>
    <li><Link to='/shopall' className={location.pathname === '/shopall' ? 'active' : ''}>Shop All</Link></li>
    <li><Link to='/aboutus' className={location.pathname === '/aboutus' ? 'active' : ''}>About Us</Link></li>
    <li><Link to='/blogpage' className={location.pathname === '/blogpage' ? 'active' : ''}>Blog Page</Link></li>
    <li><Link to='/contactus' className={location.pathname === '/contactus' ? 'active' : ''}>Contact Us</Link></li>
    <li><Link to='/privacypolicy' className={location.pathname === '/privacypolicy' ? 'active' : ''}>Privacy Policy</Link></li>
    <li><Link to='/termscondition' className={location.pathname === '/termscondition' ? 'active' : ''}>Terms and Conditions</Link></li>
    <li><Link to='/faq' className={location.pathname === '/faq' ? 'active' : ''}>FAQs</Link></li>
  </ul>
</div>

<div className="orders-dropdown">
<FontAwesomeIcon icon={faUsers} />
  <h3 onClick={toggleUserVisibility}>Users {userVisibility ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleRight} />}</h3>
</div>
<div className='userdef' style={{ display: userVisibility ? 'block' : 'none' }}>
  <ul>
    <li><Link to='/customerlist' className={location.pathname === '/customerlist' ? 'active' : ''}>Customer List</Link></li>
    <li><Link to='/pendingcustomerlist' className={location.pathname === '/pendingcustomerlist' ? 'active' : ''}>Pending Customer List</Link></li>
    <li>
    <span className="dropdown">
        <h4 onClick={toggleGuestUsersVisibility}>Guest Users <FontAwesomeIcon icon={guestUsersVisibility ? faAngleDown : faAngleRight} /></h4>
        {guestUsersVisibility && (
          <ul className="dropdown-content">
            <li><Link to='/allreviews' className={location.pathname === '/allreviews' ? 'active' : ''}>All Review</Link></li>
            <li><Link to='/pendingreviews' className={location.pathname === '/pendingreviews' ? 'active' : ''}>Pending Review</Link></li>
            <li><Link to='/approvereviews' className={location.pathname === '/approvereviews' ? 'active' : ''}>Approve Review</Link></li>
            <li><Link to='/deletereviews' className={location.pathname === '/deletereviews' ? 'active' : ''}>Delete Review</Link></li>
          </ul>
        )}
      </span>
    </li>
  </ul>
</div>

<div className="orders-dropdown">
<FontAwesomeIcon icon={faFile} size="lg" /> 
  <h3 onClick={togglePagesVisibility}>Pages {pagesVisibility ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleRight} />}</h3>
</div>
<div className='pagesdef' style={{ display: pagesVisibility ? 'block' : 'none' }}>
  <ul>
    <li><Link to='/pageaboutus' className={location.pathname === '/pageaboutus' ? 'active' : ''}>About Us</Link></li>
    <li><Link to='/pagecontactus' className={location.pathname === '/pagecontactus' ? 'active' : ''}>Contact Us</Link></li>
    <li><Link to='/pagetermscondition' className={location.pathname === '/pagetermscondition' ? 'active' : ''}>Terms and Conditions</Link></li>
    <li><Link to='/pageprivacypolicy' className={location.pathname === '/pageprivacypolicy' ? 'active' : ''}>Privacy Policy</Link></li>
    <li><Link to='/pagefaq' className={location.pathname === '/pagefaq' ? 'active' : ''}>FAQs</Link></li>
    <li><Link to='/pagehomepage' className={location.pathname === '/paehomepage' ? 'active' : ''}>Homepage</Link></li>
    <li><Link to='/pagecategoriespage' className={location.pathname === '/pagecategoriespage' ? 'active' : ''}>Categories Page</Link></li>
    <li><Link to='/pageshopall' className={location.pathname === '/pageshopall' ? 'active' : ''}>Shop All</Link></li>
  </ul>
</div>

<div className="orders-dropdown">
<FontAwesomeIcon icon={faBlog} />
  <h3 onClick={toggleBlogsVisibility}>Blogs {blogsVisibility ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleRight} />}</h3>
</div>
<div className='blogsdef' style={{ display: blogsVisibility ? 'block' : 'none' }}>
  <ul>
    <li><Link to='/blogallblogs' className={location.pathname === '/blogallblogs' ? 'active' : ''}>All Blogs</Link></li>
    <li><Link to='/blogcategorypage' className={location.pathname === '/blogcategorypage' ? 'active' : ''}>Category Page</Link></li>
    <li><Link to='/addnewpost' className={location.pathname === '/addnewpost' ? 'active' : ''}>Add New Post</Link></li>
  </ul>
</div>
   
<div className="orders-dropdown">
<FontAwesomeIcon icon={faShoppingBag} />
  <h3 onClick={toggleOrderLogVisibility}>Order Log {orderLogVisibility ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleRight} />}</h3>
</div>
<div className='orderlogdef' style={{ display: orderLogVisibility ? 'block' : 'none' }}>
  <ul>
    <li><Link to='/orderlist' className={location.pathname === '/orderlist' ? 'active' : ''}>Order List</Link></li>
    <li><Link to='/createanorder' className={location.pathname === '/createanorder' ? 'active' : ''}>Create an Order</Link></li>
  </ul>
</div>

<div className="orders-dropdown">
<FontAwesomeIcon icon={faPhone} />
  <h3 ><NavLink to='/contactmessage'>Contact Message</NavLink> </h3>
</div>


<div className="orders-dropdown">
<FontAwesomeIcon icon={faGear} />
  <h3 onClick={toggleAdminVisibility}>Admin Management {adminVisibility ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleRight} />}</h3>
</div>
<div className='admindef' style={{ display: adminVisibility ? 'block' : 'none' }}>
  <ul>
    <li><Link to='/alladminlist' className={location.pathname === '/alladminlist' ? 'active' : ''}>All Admin List</Link></li>
    <li><Link to='/addnewadmin' className={location.pathname === '/addnewadmin' ? 'active' : ''}>Add New Admin</Link></li>
    <li><Link to='/alladminroles' className={location.pathname === '/alladminroles' ? 'active' : ''}>All Admin Roles</Link></li>
    <li><Link to='/userpermissions' className={location.pathname === '/userpermissions' ? 'active' : ''}>User Permissions</Link></li>
  </ul>
</div>
  
 */}
        <Sidebar />

        {/* </div> */}
        <div className="rightt-panel">
          <div className="header-admin">
            <nav className="navbar navbar-light bg-light">
              <div className="container-fluid">
                <h2>About Us</h2>
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
            {loading ? (
              <div className="produche">
                <Loading />
              </div>
            ) : error ? (
              <p className="produche">{error}</p>
            ) : (
              <div className="produche">
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

                {formik && aboutUs && Object.keys(aboutUs).length !== 0 ? (
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
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
