import React, { useEffect, useState, useMemo, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer";
import HomePage from "./HomePage";
import { useFormik } from "formik";
import {
  registerInitialValues,
  registerValidationSchema,
} from "../common/Validation";
import { sendOtpToMail } from "../redux/actions/otpActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError, registerUserAction } from "../redux/actions/userActions";
import { debounce } from "lodash";
import Loading from "./Loading";
import { TheContextApi } from "../contextApi/TheContext";

const SignUp = () => {
  // const [timeRemaining, setTimeRemaining] = useState(120);
  const [otpSent, setOTPSent] = useState(false);
  const [seconds, setSeconds] = useState(1);
  const [minutes, setMinutes] = useState(59);
  // const [sentOtpAtOnes, setSentOtpAtOnes] = useState(false);
  const [sentOtp2, setSentOtp2] = useState(false);
  const navigate = useNavigate();

  let timer;
  useEffect(() => {
    if (otpSent) {
      timer = setInterval(() => {
        // decrease seconds if grater than 0
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }

        // when seconds reach 0, decrease minutes if grater than 0
        if (seconds === 0) {
          if (minutes === 0 && seconds === 0) {
            setOTPSent(false);
            setSentOtp2(false);
            setResentOtp(false);
            clearInterval(timer);
          } else {
            setSeconds(59);
            setMinutes(minutes - 1);
          }
        }
      }, 1000);
    }
    return () => {
      // Cleanup: stop the interval when the component unmount

      clearInterval(timer);
    };
  }, [seconds]);

  // useEffect(() => {
  //   let timer;
  //   if (otpSent && timeRemaining > 0) {
  //     timer = setInterval(() => {
  //       setTimeRemaining((prevTime) => prevTime - 1);
  //     }, 1000);
  //   } else {
  //     clearInterval(timer);
  //   }
  //   return () => clearInterval(timer);
  // }, [otpSent, timeRemaining]);

  // const handleResendOTP = () => {
  //   setTimeRemaining(60);
  //   dispatch(sendOtpToMail(formik.values.email, setOtp1Loading));
  // };

  const {
    otp1Loading,
    setOtp1Loading,
    loginSignUpLoading,
    setLoginSignUpLoading,
    sentOtpAtOnes,
    setSentOtpAtOnes,
    resentOtp,
    setResentOtp,
    authUser,
    setAuthUser,
  } = useContext(TheContextApi);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState(null);

  const dispatch = useDispatch();
  const location = useLocation();

  let { otpLoading, otpMessage, otpError } = useSelector(
    (state) => state.sendOtpReducer
  );

  let { loading, message, error } = useSelector((state) => state.registerUser);

  const countryCodes = ["+1", "+44", "+91", "+81", "+86", "+61"];

  // const handleSendOtp = async () => {
  //   const generatedOtp = Math.floor(1000 + Math.random() * 9000);

  //   await new Promise((resolve) => setTimeout(resolve, 1000));

  //   alert(`OTP sent to ${email}: ${generatedOtp}`);
  //   setOtp(generatedOtp);
  //   setOtpSent(true);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (otpSent) {
  //     console.log("Submitted Data:", {
  //       firstName,
  //       lastName,
  //       countryCode,
  //       contactNo,
  //       email,
  //       otp,
  //     });
  //     setSubmitted(true);
  //   } else {
  //   }
  // };

  // const otpErrorCheck = () => {
  //   console.log(otp, "messageError......................////");
  //   if (!otp) {
  //     otpErrors.otp = "Otp is required";
  //   } else {
  //     return true;
  //   }
  // };

  const registerSubmit = () => {
    // e.preventDefault();
    // let otpErrors = {};
    // console.log(formik.values, formik?.values, "register submit");
    // if (!otp) {
    //   otpErrors.otp = "Otp is required";
    // }
    // console.log(otpErrors.otp, "messageError......................////");
    // setErrors(otpErrors);

    if (
      Object.keys(formik.errors).length === 0
      // &&
      // Object.keys(otpErrors).length === 0
    ) {
      dispatch(registerUserAction(formik?.values, setLoginSignUpLoading));
    }
  };

  const formik = useFormik({
    initialValues: registerInitialValues,
    onSubmit: registerSubmit,
    validationSchema: registerValidationSchema,
  });
  // let debounceHandleChange = debounce(formik.handleChange, 300);
  // useEffect(() => {
  //   console.log(formik?.errors, formik?.values, "formik.........//////");
  // }, [formik]);

  // if (Object.keys(formik.errors).length === 0 && formik.values.firstName) {
  var sendOtp = () => {
    dispatch(
      sendOtpToMail(
        formik.values.email,
        setOtp1Loading,
        setSentOtpAtOnes,
        setResentOtp,
        true
      )
    );
    setMinutes(1);
    setSeconds(59);
    setOTPSent(true);
    setSentOtp2(true);
    // setOTPSent(true);
  };
  // }

  // resendOtp

  const resendOtp = () => {
    setMinutes(1);
    setSeconds(59);
    setOTPSent(true);
    setSentOtp2(true);
    dispatch(
      sendOtpToMail(
        formik.values.email,
        setOtp1Loading,
        setSentOtpAtOnes,
        setResentOtp,
        true
      )
    );
  };

  console.log(
    errors,
    otp1Loading,
    loginSignUpLoading,
    loading,
    "loading otpppppp//////"
  );

  const otpChange = (e) => {
    setOtp(e.target.value);
  };

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      setOTPSent(false);
      setSentOtp2(true);
    }
  }, [minutes, seconds]);

  useEffect(() => {
    setResentOtp(false);
    setSentOtpAtOnes(false);
  }, []);

  useEffect(() => {
    if (authUser && location.pathname === "/signup") {
      navigate("/");
    }
  }, [authUser, location.pathname]);

  return (
    <div>
      <HomePage />
      <div className="signup-popup">
        <form onSubmit={(e) => e.preventDefault()} className="signform">
          <h1>Create a New Account</h1>
          <h2>
            Already A Member?
            <span>
              {" "}
              <Link to="/login">Log In</Link>
            </span>
          </h2>
          <div className="signcontent">
            <div className="firlas">
              <div className="firstsignj">
                <label htmlFor="first">
                  First Name{" "}
                  <span className="stsig" style={{ color: "red" }}>
                    *
                  </span>
                </label>
                <input
                  type="fir"
                  id="firstName"
                  placeholder="Enter your first name"
                  name="firstName"
                  value={formik?.values?.firstName}
                  onChange={formik.handleChange}
                />
                {formik?.touched?.firstName && formik?.errors?.firstName ? (
                  <p className="errorsig">{formik?.errors?.firstName}</p>
                ) : null}
              </div>

              <div className="last">
                <label htmlFor="lastName">
                  Last Name
                  <span className="stsig" style={{ color: "red" }}>
                    *
                  </span>
                </label>
                <input
                  type="las"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formik?.values?.lastName}
                  onChange={formik.handleChange}
                />
                {formik?.touched?.lastName && formik?.errors?.lastName ? (
                  <p className="errorsig">{formik?.errors?.lastName}</p>
                ) : null}
              </div>
            </div>
            <div className="contactnosignup">
              <label htmlFor="contactNo">
                Contact No
                <span className="stsig" style={{ color: "red" }}>
                  *
                </span>
              </label>
              <div className="inputscon">
                <select
                  id="countryCode"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  {countryCodes.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  className="conatctnolog"
                  name="mobileNumber"
                  placeholder="Enter your contact number"
                  value={formik?.values?.mobileNumber}
                  onChange={formik.handleChange}
                />
              </div>
              {formik?.touched?.mobileNumber && formik?.errors?.mobileNumber ? (
                <p className="errorsig">{formik?.errors?.mobileNumber}</p>
              ) : null}
            </div>

            <div className="emailsignup">
              <label htmlFor="email">
                Email
                <span className="stsig" style={{ color: "red" }}>
                  *
                </span>
              </label>
              <div className="inotp">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formik?.values?.email}
                  onChange={formik.handleChange}
                />
                {!sentOtpAtOnes && (
                  <button
                    onClick={sendOtp}
                    // disabled={otpSent || submitted}
                    className="sndo"
                    // disabled={sentOtpAtOnes}
                  >
                    {otp1Loading ? <Loading /> : "Send OTP"}
                  </button>
                )}
              </div>
              {formik?.touched?.email && formik?.errors?.email ? (
                <p className="errorsig">{formik?.errors?.email}</p>
              ) : null}
            </div>

            {/* {otpSent && (
              <p className="em">
                OTP sent to your email address. Check your inbox!
              </p>
            )} */}
            <div className="otpsignuppa">
              <label htmlFor="otp">
                Enter OTP
                <span className="stsig" style={{ color: "red" }}>
                  *
                </span>
              </label>
              <input
                type="text"
                name="otp"
                className="otpfign"
                placeholder="Enter the OTP received"
                value={formik?.values?.otp}
                onChange={formik.handleChange}
              />
              {formik?.touched?.otp && formik?.errors?.otp ? (
                <p className="errorsig">{formik?.errors?.otp}</p>
              ) : null}

              {/* {sentOtpAtOnes && otp1Loading && <Loading />} */}

              {otpSent && sentOtp2 && resentOtp ? (
                // <p className="time">Resend OTP in: {timeRemaining} seconds</p>

                <p className="time">
                  Resend OTP in: {minutes < 10 ? `0${minutes}` : minutes}:{" "}
                  {seconds < 10 ? `0${seconds}` : seconds}
                </p>
              ) : (
                sentOtpAtOnes &&
                (otp1Loading ? (
                  <Loading />
                ) : (
                  <span className="resotp" onClick={resendOtp}>
                    Resend OTP
                  </span>
                ))
              )}
            </div>
            <button
              type="submit"
              // disabled={!otpSent || submitted}
              className="signsubmit"
              onClick={formik?.handleSubmit}
            >
              {loginSignUpLoading ? <Loading /> : "Submit"}
            </button>
            {/* {submitted && (
              <p className="success">Data submitted successfully!</p>
            )} */}
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
