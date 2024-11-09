import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { createCoupon } from "../redux/actions/couponActions";
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
import { NavLink, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const CreateCoupon = () => {
  const dispatch = useDispatch();
  const { loading, error, coupon } = useSelector((state) => state.coupon);
  const [couponData, setCouponData] = useState({
    couponName: "",
    code: "",
    minimumPurchasePrice: "",
    discountPercentage: "",
    maxDiscountAmount: "",
    expirationDate: "",
    startDate: "",
    status: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCouponData({ ...couponData, [name]: value });
  };

  const [isActive, setIsActive] = useState(false);
  const [CouponName, setCouponName] = useState("");
  const [Code, setCode] = useState("");

  const [expireDate, setExpireDate] = useState("");
  const [minimumPurchasePrice, setMinimumPurchasePrice] = useState("");

  const [status, setStatus] = useState("");
  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
  const [ProVisibility, setProVisibility] = useState(false);
  const [EcomVisibility, setEcomVisibility] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);

  const [percentage, setPercentage] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
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

  const handlePercentageChange = (e) => {
    const selectedPercentage = parseInt(e.target.value);
    setPercentage(selectedPercentage);
    setDiscountAmount("");
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

  const toggleEcomVisibility = () => {
    setEcomVisibility((prevVisibility) => !prevVisibility);
  };

  const toggleProVisibility = () => {
    setProVisibility(!ProVisibility);
  };
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const errors = {};

    if (!couponData.couponName.trim()) {
      errors.couponName = "Coupon Name is required";
    }
    if (!couponData.code.trim()) {
      errors.Code = "Code is required";
    }
    if (!couponData.startDate.trim()) {
      errors.StartDate = "Start Date is required";
    }
    if (!couponData.expirationDate.trim()) {
      errors.ExpireDate = "Expire Date is required";
    }
    if (!couponData.minimumPurchasePrice.trim()) {
      errors.MinimumPurchasePrice = "Minimum Purchase Price is required";
    }
    if (!couponData.status.trim()) {
      errors.status = "Status is required";
    }
    if (!couponData.discountPercentage || percentage === "") {
      errors.percentage = "Percentage is required";
    }
    if (!couponData.maxDiscountAmount.trim()) {
      errors.discountAmount = "Discount Amount is required";
    }
    if (!couponData.status.trim()) {
      errors.discountAmount = "Status is required";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log({
        CouponName,
        Code,
        startDate,
        expireDate,
        minimumPurchasePrice,
        status,
        percentage,
        discountAmount,
      });
    }
    dispatch(createCoupon(couponData));
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
  }, [location.pathname]);
  return (
    <div>
      <div className="admin-dashboard">
        <Sidebar />
        <div className="rightt-panel">
          <Header/>
        <Layout heading="Create Coupon">
   
   </Layout>

            <div className="produche">
              <div className="in">
                <label>
                  Coupon Name <span style={{ color: "red" }}>*</span>
                  <input
                    type="text"
                    name="couponName"
                    value={couponData.couponName}
                    onChange={handleChange}
                    placeholder="Coupon Name"
                  />
                  {errors.CouponName && (
                    <span style={{ color: "red", fontSize: "13px" }}>
                      {errors.CouponName}
                    </span>
                  )}
                  x
                </label>
              </div>

              <div className="in">
                <label>
                  Code <span style={{ color: "red" }}>*</span>
                  <input
                    type="text"
                    name="code"
                    value={couponData.code}
                    onChange={handleChange}
                    placeholder="Coupon Code"
                  />
                  {errors.Code && (
                    <span style={{ color: "red", fontSize: "13px" }}>
                      {errors.Code}
                    </span>
                  )}
                </label>
              </div>

              <div className="flexdate">
                <div className="starex">
                  <label>
                    Start Date <span style={{ color: "red" }}>*</span>
                    <input
                      type="date"
                      name="startDate"
                      value={couponData.startDate}
                      onChange={handleChange}
                      placeholder="Start Date"
                      required
                    />
                    {errors.StartDate && (
                      <span style={{ color: "red", fontSize: "13px" }}>
                        {errors.StartDate}
                      </span>
                    )}
                  </label>
                </div>

                <div className="starexx">
                  <label>
                    Expire Date <span style={{ color: "red" }}>*</span>
                    <input
                      type="date"
                      name="expirationDate"
                      value={couponData.expirationDate}
                      onChange={handleChange}
                      placeholder="Expire Date"
                      required
                    />
                    {errors.ExpireDate && (
                      <span style={{ color: "red", fontSize: "13px" }}>
                        {errors.ExpireDate}
                      </span>
                    )}
                  </label>
                </div>
              </div>

              <div className="in">
                <label>
                  Minimum Purchase Price<span style={{ color: "red" }}>*</span>
                  <input
                    type="text"
                    name="minimumPurchasePrice"
                    value={couponData.minimumPurchasePrice}
                    onChange={handleChange}
                    placeholder="Minimum Purchase Price"
                    required
                  />
                  {errors.MinimumPurchasePrice && (
                    <span
                      style={{ color: "red", fontSize: "13px" }}
                      className="err"
                    >
                      {errors.MinimumPurchasePrice}
                    </span>
                  )}
                </label>
              </div>

              <div className="in">
                <label>
                  Discount Percentage<span style={{ color: "red" }}>*</span>
                  <input
                    type="text"
                    name="discountPercentage"
                    value={couponData.discountPercentage}
                    onChange={handleChange}
                    placeholder="Discount Percentage"
                    required
                  />
                  {errors.DiscountPercentage && (
                    <span
                      style={{ color: "red", fontSize: "13px" }}
                      className="err"
                    >
                      {errors.DiscountPercentage}
                    </span>
                  )}
                </label>
              </div>

              <div className="in">
                <label>
                  Maximum Discount Amount<span style={{ color: "red" }}>*</span>
                  <input
                    type="text"
                    name="maxDiscountAmount"
                    value={couponData.maxDiscountAmount}
                    onChange={handleChange}
                    placeholder="Maximum Discount Amount"
                    required
                  />
                  {errors.DiscountAmount && (
                    <span
                      style={{ color: "red", fontSize: "13px" }}
                      className="err"
                    >
                      {errors.DiscountAmount}
                    </span>
                  )}
                </label>
              </div>
              {/* <div className="coupper">
                <label htmlFor="Discount">Discount</label>
                <span style={{ color: "red" }}>*</span>
                <div className="dropper">
                  <select
                    id="percentage"
                    onChange={handlePercentageChange}
                    placeholder="Discount Percentage"
                    name="discountPercentage"
                    required
                  >
                    <option value="" disabled selected>
                      {" "}
                      Percentage %
                    </option>
                    <option value="10">10%</option>
                    <option value="20">20%</option>
                    <option value="30">30%</option>
                    <option value="40">40%</option>
                    <option value="50">50%</option>
                    <option value="60">60%</option>
                    <option value="70">70%</option>
                    <option value="80">80%</option>
                  </select>
                  <div className="amountft">
                    <input
                      type="text"
                      name="maxDiscountAmount"
                      placeholder={"Discount Amount"}
                      value={couponData.maxDiscountAmount}
                      onChange={handleChange}
                      required
                    />
                    {errors.discountAmount && (
                      <span
                        style={{
                          color: "red",
                          fontSize: "13px",
                          position: "relative",
                          right: "398px",
                          top: "42px",
                        }}
                      >
                        {errors.discountAmount}
                      </span>
                    )}
                  </div>
                </div>
              </div> */}

              <div className="in">
                <label>
                  Status <span style={{ color: "red" }}>*</span>
                  <select
                    type="text"
                    name="status"
                    value={couponData.status}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  {errors.status && (
                    <span style={{ color: "red", fontSize: "13px" }}>
                      {errors.status}
                    </span>
                  )}
                </label>
              </div>
              <button className="savecoupon" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

  );
};
export default CreateCoupon;
