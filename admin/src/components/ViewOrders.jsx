import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from './Layout';
import {
  faAngleDown,
  faAngleRight,
  faShippingFast,
} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  faEye,
  faTrash,
  faUsers,
  faFile,
  faBlog,
  faPhone,
  faGear,
  faShoppingBag,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrderById,
  updateOrderStatus,
} from "../redux/actions/orderActions";
import { useParams } from "react-router-dom";
import Header from "./Header";

const ViewOrders = () => {
  const { orderId } = useParams();

  const dispatch = useDispatch();
  const { order } = useSelector((state) => state?.getOrder);

  const createdAt = order?.createdAt;
  // Extracting the date part
  const datePart = createdAt ? createdAt.split("T")[0] : "";

  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const [orderVisibility, setOrderVisibility] = useState(false);
  const [ProVisibility, setProVisibility] = useState(false);
  const [ecomVisibility, setEcomVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
  const [dmVisibility, setDMVisibility] = useState(false);
  const [userVisibility, setUserVisibility] = useState(false);
  const [pagesVisibility, setPagesVisibility] = useState(false);
  const [blogsVisibility, setBlogsVisibility] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("PENDING");
  const [orderStatus, setOrderStatus] = useState("PENDING");
  const [orderLogVisibility, setOrderLogVisibility] = useState(false);
  const [adminVisibility, setAdminVisibility] = useState(false);
  const [guestUsersVisibility, setGuestUsersVisibility] = useState(false);

  const toggleGuestUsersVisibility = () => {
    setGuestUsersVisibility(!guestUsersVisibility);
  };
  const toggleAdminVisibility = () => {
    setAdminVisibility(!adminVisibility);
  };
  // const handleUpdateStatus = () => {
  //   console.log("Status updated");
  // };

  const handlePaymentChange = (event) => {
    setPaymentStatus(event.target.value);
  };

  const handleOrderStatusChange = (event) => {
    setOrderStatus(event.target.value);
  };
  const handlePaymentStatusChange = (event) => {
    setPaymentStatus(event.target.value);
  };
  const toggleOrderLogVisibility = () => {
    setOrderLogVisibility(!orderLogVisibility);
  };
  const toggleCatVisibility = () => {
    setCatVisibility(!catVisibility);
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
  const toggleProVisibility = () => {
    setProVisibility(!ProVisibility);
  };
  const toggleEcomVisibility = () => {
    setEcomVisibility((prevVisibility) => !prevVisibility);
  };
  const toggleOrderVisibility = () => {
    setOrderVisibility(!orderVisibility);
  };

  const toggleAdminDropdown = () => {
    setAdminDropdownVisible(!adminDropdownVisible);
  };

  const handlePrint = () => {
    window.print(); // Trigger print dialog
  };
  useEffect(() => {
    dispatch(fetchOrderById(orderId));
  }, [dispatch, orderId]);

  const handleUpdateStatus = () => {
    dispatch(
      updateOrderStatus(orderId, {
        status: orderStatus,
        paymentStatus: paymentStatus,
      })
    );
  };

  return (
    <div className="admin-dashboard">
      <Sidebar />

      <div className="righttview-panel">
        <Header/>
      
      <Layout heading="View Orders">
   
   </Layout>

        <div className="invoice-container">
          <div className="header">
            <div className="logo">
              {" "}
              <img src="/assets/Logo.png" className="dashimg" alt="" />
            </div>
            <div className="order-no">
              <strong>Order ID : {order._id}</strong>
            </div>
          </div>
          <div className="shipping-info">
            <h2>Shipping Information</h2>
            <div className="address-details">
              <p>
                {order?.address?.firstName + " " + order?.address?.lastName}
              </p>
              <p>{order?.address?.phone}</p>
              <p>
                {order?.address?.street +
                  ", " +
                  order?.address?.state +
                  ", " +
                  order?.address?.zipCode +
                  ", " +
                  order?.address?.country}
              </p>
            </div>
          </div>
          <div className="order-info">
            <h2>Order Information</h2>
            <div className="order-details">
              <p>
                <strong>Date:</strong> {datePart}
              </p>
              <p>
                <strong> Shipping:</strong> Free Shipping
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {/* <button className="pending-button">{order?.status}</button> */}
                <button
                  className={
                    order?.status === "COMPLETED"
                      ? "completed-button"
                      : "pending-button"
                  }
                >
                  {order?.status}
                </button>
              </p>
            </div>
          </div>
          <div className="order-summary">
            <h2>Order Summary</h2>
            <table className="summary-table">
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>Product</th>
                  <th>Variant</th>
                  <th>Price ($)</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order &&
                  order.products &&
                  order.products.map((product, index) => (
                    <React.Fragment key={index}>
                      {product.variants.map((variant, vIndex) => (
                        <tr key={vIndex}>
                          <td>{index + 1}</td>
                          <td>{product.productName}</td>
                          <td>{variant.name}</td>
                          <td>{variant.price}</td>
                          <td>{variant.quantity}</td>
                          <td>{variant.variantTotal}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="total-section">
            <div className="subtotal">Subtotal: {order.orderTotal}</div>
            <div className="discount">Discount: -{order.discountAmount}</div>
            <div className="shipping-fee">Shipping Fee: $0</div>
            <div className="total">Total: {order.finalAmount}</div>
          </div>

          <div className="popup-contentorders">
            <h2>Order Status</h2>

            <div className="paymentorder">
              <label htmlFor="paymentSelect">Payment:</label>
              <select
                id="paymentSelect"
                value={paymentStatus}
                onChange={handlePaymentStatusChange}
              >
                <option value="pending">PENDING</option>
                <option value="completed">COMPLETED</option>
              </select>
            </div>

            <div className="orderstat">
              <label htmlFor="orderStatusSelect">Order Status:</label>
              <select
                id="orderStatusSelect"
                value={orderStatus}
                onChange={handleOrderStatusChange}
              >
                <option value="pending">PENDING</option>
                <option value="completed">COMPLETED</option>
              </select>
            </div>

            <div className="updatecloseinvoi">
              <button onClick={handleUpdateStatus} className="updteinvoice">
                Update Status
              </button>
            </div>

            <div class="buttons-container-invoi">
              <button className="print-btn" onClick={handlePrint}>
                <FontAwesomeIcon icon={faPrint} /> Print
              </button>
              {/* <button className="delete-btn">
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrders;
