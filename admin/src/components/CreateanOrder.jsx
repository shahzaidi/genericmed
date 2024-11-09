import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAdminOrder } from "../redux/actions/orderActions";
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
import Header from "./Header";

const CreateanOrder = () => {
  const dispatch = useDispatch();
  const { loading, error, createOrder } = useSelector(
    (state) => state.createOrder
  );
  const [orderData, setOrderData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    address: "",
    paymentGateway: "",
    status: "",
    orderNotes: "",
    products: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };
  const [errors, setErrors] = useState({});
  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
  const [ProVisibility, setProVisibility] = useState(false);
  const [fullName, setFullName] = useState("");
  const [products, setProducts] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [paymentGateway, setPaymentGateway] = useState("");
  const [status, setStatus] = useState("active");
  const [orderNotes, setOrderNotes] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

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
      location.pathname === "/createorder" ||
      location.pathname === "/orderlist" ||
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
      fullName,
      phoneNumber,
      email,
      country,
      state,
      city,
      zipCode,
      address,
      paymentGateway,
      status,
      orderNotes,
      selectedProduct,
    };

    console.log("Saving data:", newData);
  };

  const handleSave = () => {
    const errors = {};

    if (!orderData.fullName.trim()) {
      errors.fullName = "Full Name is required";
    }
    if (!orderData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone Number is required";
    }
    if (!orderData.email.trim()) {
      errors.email = "Email is required";
    }
    if (!orderData.country.trim()) {
      errors.country = "Country is required";
    }
    if (!orderData.state.trim()) {
      errors.state = "State is required";
    }
    if (!orderData.city.trim()) {
      errors.city = "City is required";
    }
    if (!orderData.zip.trim()) {
      errors.zip = "Zip Code is required";
    }
    if (!orderData.address.trim()) {
      errors.address = "Address Amount is required";
    }
    if (!orderData.paymentGateway.trim()) {
      errors.paymentGateway = "Payment Gateway is required";
    }
    if (!orderData.status.trim()) {
      errors.status = "Status is required";
    }
    if (!orderData.orderNotes.trim()) {
      errors.orderNotes = "Order Note is required";
    }
    if (!orderData.products.trim()) {
      errors.products = "paymentGateway is required";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log({
        fullName,
        phoneNumber,
        email,
        country,
        state,
        city,
        zip,
        address,
        paymentGateway,
        status,
        orderNotes,
        products,
      });
    }
    dispatch(createAdminOrder(orderData));
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

  return (
    <div>
      <div className="admin-dashboard">
        <Sidebar />
        <div className="rightt-panel">
        <Header/>
        <Layout heading="Create An Order">
   
   </Layout>

            <div className="produche">
              <div className="in">
                <label>
                  Full Name
                  <input
                    type="text"
                    name="fullName"
                    value={orderData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                  />
                  {errors.fullName && (
                    <span style={{ color: "red", fontSize: "13px" }}>
                      {errors.fullName}
                    </span>
                  )}
                </label>
              </div>
              <div
                className="ingy"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <div style={{ marginRight: "10px" }}>
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <br />
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={orderData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                  />
                  {errors.phoneNumber && (
                    <span style={{ color: "red", fontSize: "13px" }}>
                      {errors.phoneNumber}
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <br />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={orderData.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                  {errors.email && (
                    <span style={{ color: "red", fontSize: "13px" }}>
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div
                className="ingy"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <div style={{ marginRight: "10px" }}>
                  <label htmlFor="country">Country</label>
                  <br />
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={orderData.country}
                    onChange={handleChange}
                    placeholder="Country"
                  />
                  {errors.country && (
                    <span style={{ color: "red", fontSize: "13px" }}>
                      {errors.country}
                    </span>
                  )}
                </div>
                <div>
                  <label htmlFor="state">State</label>
                  <br />
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={orderData.state}
                    onChange={handleChange}
                    placeholder="State"
                  />
                  {errors.state && (
                    <span style={{ color: "red", fontSize: "13px" }}>
                      {errors.state}
                    </span>
                  )}
                </div>
              </div>

              <div
                className="ingy"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <div style={{ marginRight: "10px" }}>
                  <label htmlFor="city">City</label>
                  <br />
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={orderData.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </div>
                <div style={{ marginRight: "10px" }}>
                  <label htmlFor="zipCode">Zip Code</label>
                  <br />
                  <input
                    type="text"
                    id="zipCode"
                    name="zip"
                    value={orderData.zip}
                    onChange={handleChange}
                    placeholder="Zip Code"
                  />
                </div>
              </div>

              <div className="in">
                <label>
                  Address
                  <input
                    type="text"
                    name="address"
                    value={orderData.address}
                    onChange={handleChange}
                    placeholder="Address"
                  />
                </label>
              </div>

              <div
                className="ingy"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <div style={{ marginRight: "10px" }}>
                  <label htmlFor="paymentGateway">Payment Gateway</label>
                  <br />
                  <select
                    id="paymentGateway"
                    type="text"
                    name="paymentGateway"
                    value={orderData.paymentGateway}
                    onChange={handleChange}
                    required
                    // placeholder="Payment Gateway"
                  >
                    <option value="" disabled>
                      Select Payment Gateway
                    </option>
                    <option value="paypal">Paypal</option>
                    <option value="stripe">Stripe</option>
                    <option value="cod">Cash on Delivery (COD)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="status">Status</label>
                  <br />
                  <select
                    id="statusorde"
                    name="status"
                    type="text"
                    value={orderData.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="PENDING">PENDING</option>
                    <option value="DELIVERED">DELIVERED</option>
                  </select>
                </div>
              </div>

              <div className="in">
                <label>
                  Order Notes
                  <input
                    type="text"
                    name="orderNotes"
                    value={orderData.orderNotes}
                    onChange={handleChange}
                    placeholder="Order Notes"
                  />
                </label>
              </div>
              <div className="in">
                <label>
                  Select Product
                  <select
                    name="products"
                    type="text"
                    value={orderData.products}
                    onChange={handleChange}
                    required
                    // placeholder="Products"
                  >
                    <option value="" disabled>
                      Select Products
                    </option>
                    <option value="product1">Product 1</option>
                    <option value="product2">Product 2</option>
                  </select>
                </label>
              </div>

              <button className="homesave" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </div>

  );
};

export default CreateanOrder;
