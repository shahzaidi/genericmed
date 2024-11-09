import React, { useContext, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaEnvelope, FaDollarSign } from "react-icons/fa";
import HomePage from "./HomePage";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import FooterMobile from "./FooterMobile";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../redux/actions/orderActions";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import HomePageMobile from "./HomepageMobile";
import { TheContextApi } from "../contextApi/TheContext";

const ThankYouPage = () => {
  // const orderNumber = "#GMO1234-1234-1234";

  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setCartPageDone, setCheckOutPageDone, setPaymentReviewOutPageDone } =
    useContext(TheContextApi);

  const { orderLoading, order, orderError } = useSelector(
    (state) => state.getOrderDetailsReducer
  );

  const handleVerifyNumber = () => {
    console.log("Verifying phone number...");
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [orderId]);

  // useEffect(() => {
  //   if (order === null || Object.keys(order).length <= 0) {
  //     navigate("/");
  //   }
  // }, [order, orderId]);

  console.log(order, "order");

  return (
    <div>
      <HomePage />
      <HomePageMobile />
      {order ? (
        <div className="abc">
          <div className="caution-banner">
            <div className="fraudimg">
              <img src="/assets/fraud.png" className="fraud" alt="" srcset="" />
            </div>
            <p> Caution: Be aware of fraud!</p>
          </div>

          <div className="flexthankyou">
            <img
              src="/assets/ordertick.png"
              className="tick"
              alt=""
              srcset=""
            />
            <div className="order-confirmed-section">
              <h2>Order Confirmed</h2>
              <p>We are pleased to confirm your order no</p>
              <p> {orderId}</p>

              <Link to="/">
                <div className="continue-shopping-section">
                  <button
                    onClick={() => {
                      setCartPageDone(false),
                        setCheckOutPageDone(false),
                        setPaymentReviewOutPageDone(false);
                    }}
                  >
                    Continue Shopping <FaArrowRight />
                  </button>
                </div>
              </Link>
            </div>

            {/* <div className="verify-phone-section">
        <p>For security reasons, we recommend you verify your phone number</p>
        <button onClick={handleVerifyNumber}>Verify Your Number</button>
      </div> */}

            <div className="flexthankyou">
              <div className="twocontain">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ flex: 1, marginRight: "20px" }}>
                    <div className="thnkhsu">
                      <label>You will receive updates on:</label>

                      <div class="emph">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src="/assets/email.png"
                            alt="Email Icon"
                            style={{
                              marginRight: "10px",
                              marginLeft: "6px",
                              width: "30px",
                            }}
                          />
                          <p className="tgh">{order?.address?.email}</p>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              borderLeft: "2px solid lightgrey",
                            }}
                          >
                            <img
                              src="/assets/tele.png"
                              alt="tlr Icon"
                              style={{
                                marginRight: "10px",
                                marginLeft: "11px",
                                width: "18px",
                              }}
                            />
                            <p>{order?.address?.phone}</p>
                          </div>
                        </div>
                      </div>
                      <div className="prodethed">
                        <h2>Payment details</h2>

                        <div className="flejf">
                          <p className="wid">Payment method </p>
                          <p className="dig">{order?.paymentGateway}</p>
                        </div>

                        <div className="flejf">
                          <p className="wid">Total (Inclusive Tax) </p>
                          <p className="dig">${order?.orderTotal}</p>
                        </div>
                        {order?.discountAmount ? (
                          <div className="flejf">
                            <p className="wid">Discount</p>

                            <p className="dig"> -${order?.discountAmount}</p>
                          </div>
                        ) : (
                          ""
                        )}

                        {/* <div className="flejf">
                          <p className="wid">Shipping charges</p>
                          <p className="digg">$0</p>
                        </div> */}
                        <div className="flejf">
                          <p className="yuuu">Total</p>
                          <p className="dol">${order?.finalAmount}</p>
                        </div>
                        {order?.discountAmount ? (
                          <div className="shhffff">
                            <p> Total savings:</p>{" "}
                            <span className="sde">
                              {" "}
                              ${order?.discountAmount}
                            </span>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
            <FooterMobile />
          </div>
        </div>
      ) : orderLoading ? (
        <Loading />
      ) : (
        <p>{orderError}</p>
      )}
    </div>
  );
};

export default ThankYouPage;
