import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import Layout from "./Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleRight,
  faUsers,
  faFile,
  faBlog,
  faShoppingBag,
  faPhone,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const location = useLocation();
  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
  const [ProVisibility, setProVisibility] = useState(false);
  const [ecomVisibility, setEcomVisibility] = useState(false);
  const [dmVisibility, setDmVisibility] = useState(false);
  const [userVisibility, setUserVisibility] = useState(false);
  const [guestUsersVisibility, setGuestUsersVisibility] = useState(false);
  const [pagesVisibility, setPagesVisibility] = useState(false);
  const [blogsVisibility, setBlogsVisibility] = useState(false);
  const [orderLogVisibility, setOrderLogVisibility] = useState(false);
  const [adminVisibility, setAdminVisibility] = useState(false);

  const toggleOrderVisibility = () => setOrderVisibility(!orderVisibility);
  const toggleCatVisibility = () => setCatVisibility(!catVisibility);
  const toggleProVisibility = () => setProVisibility(!ProVisibility);
  const toggleEcomVisibility = () => setEcomVisibility(!ecomVisibility);
  const toggleDMVisibility = () => setDmVisibility(!dmVisibility);
  const toggleUserVisibility = () => setUserVisibility(!userVisibility);
  const toggleGuestUsersVisibility = () =>
    setGuestUsersVisibility(!guestUsersVisibility);
  const togglePagesVisibility = () => setPagesVisibility(!pagesVisibility);
  const toggleBlogsVisibility = () => setBlogsVisibility(!blogsVisibility);
  const toggleOrderLogVisibility = () =>
    setOrderLogVisibility(!orderLogVisibility);
  const toggleAdminVisibility = () => setAdminVisibility(!adminVisibility);

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
      location.pathname === "/termscondition" ||
      location.pathname === "/faq"
    ) {
      setDmVisibility(true);
    } else {
      setDmVisibility(false);
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
      location.pathname === "/allreviews" ||
      location.pathname === "/pendingreviews" ||
      location.pathname === "/approvereviews" ||
      location.pathname === "/deletereviews"
    ) {
      setGuestUsersVisibility(true);
      setUserVisibility(true);
    } else {
      setGuestUsersVisibility(false);
    }

    if (
      location.pathname === "/pageaboutus" ||
      location.pathname === "/pagecontactus" ||
      location.pathname === "/pagetermscondition" ||
      location.pathname === "/pageprivacypolicy" ||
      location.pathname === "/pagefaq" ||
      location.pathname === "/pagehomepage" ||
      location.pathname === "/pagecategoriespage" ||
      location.pathname === "/pageshopall"
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

  return (
    <div className="leftt-panel">
      <img src="/assets/Logo.png" className="dashimg" alt="" />
      <div className="dashboard">
        <img src="/assets/Dash.png" alt="" />
        <h3>
          <NavLink to="/dashboard" activeclassname="active">
            Dashboard
          </NavLink>
        </h3>
      </div>

      <div className="orders-dropdown">
        <img src="/assets/ord.png" alt="" />
        <h3 onClick={toggleOrderVisibility}>
          Orders{" "}
          {orderVisibility ? (
            <FontAwesomeIcon icon={faAngleDown} />
          ) : (
            <FontAwesomeIcon icon={faAngleRight} />
          )}
        </h3>
      </div>
      <div
        className="ordef"
        style={{ display: orderVisibility ? "block" : "none" }}
      >
        <ul>
          <li>
            <Link
              to="/allorders"
              className={location.pathname === "/allorders" ? "active" : ""}
            >
              All orders
            </Link>
          </li>
          <li>
            <Link
              to="/pendingorders"
              className={location.pathname === "/pendingorders" ? "active" : ""}
            >
              Pending orders
            </Link>
          </li>
          <li>
            <Link
              to="/Delorders"
              className={location.pathname === "/Delorders" ? "active" : ""}
            >
              Delivered orders
            </Link>
          </li>
          {/* <li><Link to='/Cancelorders' className={location.pathname === '/Cancelorders' ? 'active' : ''}>Cancelled orders</Link></li> */}
        </ul>
      </div>

      <div className="orders-dropdown">
        <img src="/assets/mancat.png" alt="" />
        <h3 onClick={toggleCatVisibility}>
          Manage Categories{" "}
          {catVisibility ? (
            <FontAwesomeIcon icon={faAngleDown} />
          ) : (
            <FontAwesomeIcon icon={faAngleRight} />
          )}
        </h3>
      </div>
      <div
        className="catdef"
        style={{ display: catVisibility ? "block" : "none" }}
      >
        <ul>
          <li>
            <Link
              to="/allcategories"
              className={location.pathname === "/allcategories" ? "active" : ""}
            >
              All Categories
            </Link>
          </li>
          {/* <li>
            <Link
              to="/subcategories"
              className={location.pathname === "/subcategories" ? "active" : ""}
            >
              Subcategories
            </Link>
          </li> */}
        </ul>
      </div>

      <div className="orders-dropdown">
        <img src="/assets/mancat.png" alt="" />
        <h3 onClick={toggleProVisibility}>
          Manage Products{" "}
          {ProVisibility ? (
            <FontAwesomeIcon icon={faAngleDown} />
          ) : (
            <FontAwesomeIcon icon={faAngleRight} />
          )}
        </h3>
      </div>
      <div
        className="catdef"
        style={{ display: ProVisibility ? "block" : "none" }}
      >
        <ul>
          <li>
            <Link
              to="/createproduct"
              className={location.pathname === "/createproduct" ? "active" : ""}
            >
              Create Product
            </Link>
          </li>
          <li>
            <Link
              to="/productlist"
              className={location.pathname === "/productlist" ? "active" : ""}
            >
              Product List
            </Link>
          </li>
          {/* <li>
            <Link
              to="/attributes"
              className={location.pathname === "/attributes" ? "active" : ""}
            >
              Attributes
            </Link>
          </li> */}
          {/* <li>
            <Link
              to="/outofstock"
              className={location.pathname === "/outofstock" ? "active" : ""}
            >
              Out Of Stock
            </Link>
          </li> */}
        </ul>
      </div>

      <div className="orders-dropdown">
        <img src="/assets/mancat.png" alt="" />
        <h3 onClick={toggleEcomVisibility}>
          E-Commerce{" "}
          {ecomVisibility ? (
            <FontAwesomeIcon icon={faAngleDown} />
          ) : (
            <FontAwesomeIcon icon={faAngleRight} />
          )}
        </h3>
      </div>
      <div
        className="ecomdef"
        style={{ display: ecomVisibility ? "block" : "none" }}
      >
        <ul>
          <li>
            <Link
              to="/createcoupon"
              className={location.pathname === "/createcoupon" ? "active" : ""}
            >
              Create Coupon
            </Link>
          </li>
          <li>
            <Link
              to="/couponlist"
              className={location.pathname === "/couponlist" ? "active" : ""}
            >
              Coupon List
            </Link>
          </li>
          {/* <li><Link to='/shippingrule' className={location.pathname === '/shippingrule' ? 'active' : ''}>Shipping Rule</Link></li> */}
          {/* <li><Link to='/paymentmethod' className={location.pathname === '/paymentmethod' ? 'active' : ''}>Payment Method</Link></li> */}
        </ul>
      </div>
      <div className="orders-dropdown">
        <img src="/assets/digmarket.png" alt="" />
        <h3 onClick={toggleDMVisibility}>
          Digital Marketing{" "}
          {dmVisibility ? (
            <FontAwesomeIcon icon={faAngleDown} />
          ) : (
            <FontAwesomeIcon icon={faAngleRight} />
          )}
        </h3>
      </div>
      <div
        className="dmdef"
        style={{ display: dmVisibility ? "block" : "none" }}
      >
        <ul>
          {/* <li>
            <Link
              to="/googleanalytics"
              className={
                location.pathname === "/googleanalytics" ? "active" : ""
              }
            >
              Google Analytics
            </Link>
          </li> */}
          <li>
            <Link
              to="/homepage"
              className={location.pathname === "/homepage" ? "active" : ""}
            >
              Homepage
            </Link>
          </li>
          <li>
            <Link
              to="/categorypage"
              className={location.pathname === "/categorypage" ? "active" : ""}
            >
              Category Page
            </Link>
          </li>
          <li>
            <Link
              to="/shopall"
              className={location.pathname === "/shopall" ? "active" : ""}
            >
              Shop All
            </Link>
          </li>
          <li>
            <Link
              to="/aboutus"
              className={location.pathname === "/aboutus" ? "active" : ""}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/blogpage"
              className={location.pathname === "/blogpage" ? "active" : ""}
            >
              Blog Page
            </Link>
          </li>
          <li>
            <Link
              to="/contactus"
              className={location.pathname === "/contactus" ? "active" : ""}
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="/privacypolicy"
              className={location.pathname === "/privacypolicy" ? "active" : ""}
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              to="/termscondition"
              className={
                location.pathname === "/termscondition" ? "active" : ""
              }
            >
              Packaging & Authenticity
            </Link>
          </li>
          <li>
            <Link
              to="/faq"
              className={location.pathname === "/faq" ? "active" : ""}
            >
              FAQs
            </Link>
          </li>
        </ul>
      </div>

      <div className="orders-dropdown">
        <FontAwesomeIcon icon={faUsers} />
        <h3 onClick={toggleUserVisibility}>
          Users{" "}
          {userVisibility ? (
            <FontAwesomeIcon icon={faAngleDown} />
          ) : (
            <FontAwesomeIcon icon={faAngleRight} />
          )}
        </h3>
      </div>
      <div
        className="userdef"
        style={{ display: userVisibility ? "block" : "none" }}
      >
        <ul>
          <li>
            <Link
              to="/customerlist"
              className={location.pathname === "/customerlist" ? "active" : ""}
            >
              Customer List
            </Link>
          </li>
          {/* <li>
            <Link
              to="/pendingcustomerlist"
              className={
                location.pathname === "/pendingcustomerlist" ? "active" : ""
              }
            >
              Pending Customer List
            </Link>
          </li> */}
          <li>
            <span className="dropdown">
              <h4 onClick={toggleGuestUsersVisibility}>
                Guest Users{" "}
                <FontAwesomeIcon
                  icon={guestUsersVisibility ? faAngleDown : faAngleRight}
                />
              </h4>
              {guestUsersVisibility && (
                <ul className="dropdown-content">
                  <li>
                    <Link
                      to="/allreviews"
                      className={
                        location.pathname === "/allreviews" ? "active" : ""
                      }
                    >
                      All Review
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/pendingreviews"
                      className={
                        location.pathname === "/pendingreviews" ? "active" : ""
                      }
                    >
                      Pending Review
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/approvereviews"
                      className={
                        location.pathname === "/approvereviews" ? "active" : ""
                      }
                    >
                      Approve Review
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      to="/deletereviews"
                      className={
                        location.pathname === "/deletereviews" ? "active" : ""
                      }
                    >
                      Delete Review
                    </Link>
                  </li> */}
                </ul>
              )}
            </span>
          </li>
        </ul>
      </div>

      <div className="orders-dropdown">
        <FontAwesomeIcon icon={faFile} size="lg" />
        <h3 onClick={togglePagesVisibility}>
          Pages{" "}
          {pagesVisibility ? (
            <FontAwesomeIcon icon={faAngleDown} />
          ) : (
            <FontAwesomeIcon icon={faAngleRight} />
          )}
        </h3>
      </div>
      <div
        className="pagesdef"
        style={{ display: pagesVisibility ? "block" : "none" }}
      >
        <ul>
          <li>
            <Link
              to="/pageaboutus"
              className={location.pathname === "/pageaboutus" ? "active" : ""}
            >
              About Us
            </Link>
          </li>
          {/* <li>
            <Link
              to="/pagecontactus"
              className={location.pathname === "/pagecontactus" ? "active" : ""}
            >
              Contact Us
            </Link>
          </li> */}
          <li>
            <Link
              to="/pagetermscondition"
              className={
                location.pathname === "/pagetermscondition" ? "active" : ""
              }
            >
              Packaging & Authenticity
            </Link>
          </li>
          <li>
            <Link
              to="/pageprivacypolicy"
              className={
                location.pathname === "/pageprivacypolicy" ? "active" : ""
              }
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              to="/pagefaq"
              className={location.pathname === "/pagefaq" ? "active" : ""}
            >
              FAQs
            </Link>
          </li>
          <li>
            <Link
              to="/pagehomepage"
              className={location.pathname === "/pagehomepage" ? "active" : ""}
            >
              Homepage
            </Link>
          </li>
          <li>
            <Link
              to="/pagecategoriespage"
              className={
                location.pathname === "/pagecategoriespage" ? "active" : ""
              }
            >
              Categories Page
            </Link>
          </li>
          <li>
            <Link
              to="/pageshopall"
              className={location.pathname === "/pageshopall" ? "active" : ""}
            >
              Shop All
            </Link>
          </li>
        </ul>
      </div>

      <div className="orders-dropdown">
        <FontAwesomeIcon icon={faBlog} />
        <h3 onClick={toggleBlogsVisibility}>
          Blogs{" "}
          {blogsVisibility ? (
            <FontAwesomeIcon icon={faAngleDown} />
          ) : (
            <FontAwesomeIcon icon={faAngleRight} />
          )}
        </h3>
      </div>
      <div
        className="blogsdef"
        style={{ display: blogsVisibility ? "block" : "none" }}
      >
        <ul>
          <li>
            <Link
              to="/blogallblogs"
              className={location.pathname === "/blogallblogs" ? "active" : ""}
            >
              All Blogs
            </Link>
          </li>
          <li>
            <Link
              to="/blogcategorypage"
              className={
                location.pathname === "/blogcategorypage" ? "active" : ""
              }
            >
              Blog Categories
            </Link>
          </li>
          <li>
            <Link
              to="/addnewpost"
              className={location.pathname === "/addnewpost" ? "active" : ""}
            >
              Add New Post
            </Link>
          </li>
        </ul>
      </div>

      {/* <div className="orders-dropdown">
        <FontAwesomeIcon icon={faShoppingBag} />
        <h3 onClick={toggleOrderLogVisibility}>
          Order Log{" "}
          {orderLogVisibility ? (
            <FontAwesomeIcon icon={faAngleDown} />
          ) : (
            <FontAwesomeIcon icon={faAngleRight} />
          )}
        </h3>
      </div> */}
      <div
        className="orderlogdef"
        style={{ display: orderLogVisibility ? "block" : "none" }}
      >
        <ul>
          <li>
            <Link
              to="/orderlist"
              className={location.pathname === "/orderlist" ? "active" : ""}
            >
              Order List
            </Link>
          </li>
          <li>
            <Link
              to="/createanorder"
              className={location.pathname === "/createanorder" ? "active" : ""}
            >
              Create an Order
            </Link>
          </li>
        </ul>
      </div>

      <div className="orders-dropdown">
        <FontAwesomeIcon icon={faPhone} />
        <h3>
          <NavLink to="/contactmessage">Contact Message</NavLink>{" "}
        </h3>
      </div>

      <div className="orders-dropdown">
        <FontAwesomeIcon icon={faGear} />
        <h3 onClick={toggleAdminVisibility}>
          Admin Management{" "}
          {adminVisibility ? (
            <FontAwesomeIcon icon={faAngleDown} />
          ) : (
            <FontAwesomeIcon icon={faAngleRight} />
          )}
        </h3>
      </div>
      <div
        className="admindef"
        style={{ display: adminVisibility ? "block" : "none" }}
      >
        <ul>
          <li>
            <Link
              to="/alladminlist"
              className={location.pathname === "/alladminlist" ? "active" : ""}
            >
              All Admin List
            </Link>
          </li>
          <li>
            <Link
              to="/addnewadmin"
              className={location.pathname === "/addnewadmin" ? "active" : ""}
            >
              Add New Admin
            </Link>
          </li>
          {/* <li>
            <Link
              to="/alladminroles"
              className={location.pathname === "/alladminroles" ? "active" : ""}
            >
              All Admin Roles
            </Link>
          </li> */}
          <li>
            <Link
              to="/userpermissions"
              className={
                location.pathname === "/userpermissions" ? "active" : ""
              }
            >
              User Permissions
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
