import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import HomePage from "./HomePage";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  loginInitialValues,
  loginValidationSchema,
} from "../common/Validation";
import { loginUserAction } from "../redux/actions/userActions";
import { sendOtpToMail } from "../redux/actions/otpActions";
import { TheContextApi } from "../contextApi/TheContext";
import Loading from "./Loading";

const Login = () => {
  // const [timer, setTimer] = useState(null);
  // const [timeRemaining, setTimeRemaining] = useState(60);
  const [otpSent, setOTPSent] = useState(false);
  const [seconds, setSeconds] = useState(1);
  const [minutes, setMinutes] = useState(59);
  const [sentOtp2, setSentOtp2] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   if (otpSent && timeRemaining > 0) {
  //     const interval = setInterval(() => {
  //       setTimeRemaining((prevTime) => prevTime - 1);
  //     }, 1000);
  //     setTimer(interval);

  //     return () => clearInterval(interval);
  //   }
  // }, [otpSent, timeRemaining]);

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

  // const handleResendOTP = () => {
  //   setTimeRemaining(60);
  //   setOTPSent(true);
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
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpContainer, setShowOtpContainer] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setEmail(loggedInUser);
      setIsLoggedIn(true);
    }
  }, []);

  const generateRandomOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const handleSendOtp = () => {
    if (email) {
      const generatedOTP = generateRandomOTP();
      alert(`OTP sent to your email: ${generatedOTP}`);
      setOtp(generatedOTP.toString());
      setShowOtpContainer(true);
    } else {
      alert("Invalid email. Please enter a valid Gmail address.");
    }
  };

  const handleLogin = () => {
    if (email.endsWith("@gmail.com") && otp.length === 4 && /^\d+$/.test(otp)) {
      alert("Login successful!");
      setIsLoggedIn(true);
    } else {
      alert("Invalid email or OTP. Please try again.");
    }
  };

  const loginSubmit = () => {
    if (Object.keys(formik.errors).length === 0) {
      dispatch(loginUserAction(formik?.values, setLoginSignUpLoading));
    }
  };

  const formik = useFormik({
    initialValues: loginInitialValues,
    onSubmit: loginSubmit,
    validationSchema: loginValidationSchema,
  });

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
    if (authUser && location.pathname === "/login") {
      navigate("/");
    }
  }, [authUser, location.pathname]);

  console.log(location.pathname, authUser, "location");

  return (
    <div>
      <HomePage />
      <div className="lo-container">
        <div className="welcomelofinfor">
          <h1>Welcome back!</h1>
          <h2>
            New member?{" "}
            <span>
              {" "}
              <Link to="/signup">Sign up</Link>
            </span>
          </h2>
          <div className="wel">
            <div className="login-form">
              <label htmlFor="email">
                Email
                <span className="stsig" style={{ color: "red" }}>
                  *
                </span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="emlof"
                placeholder="Enter your email"
                value={formik?.values?.email}
                onChange={formik.handleChange}
              />
              {!sentOtpAtOnes && (
                <button
                  onClick={sendOtp}
                  // disabled={sentOtpAtOnes}
                  className="botp"
                >
                  {otp1Loading ? <Loading /> : "Send OTP"}
                </button>
              )}
              {formik?.touched?.email && formik?.errors?.email ? (
                <p className="errorsig">{formik?.errors?.email}</p>
              ) : null}
            </div>

            <div className="otp-container">
              <label htmlFor="otp">
                Enter OTP
                <span className="stsig" style={{ color: "red" }}>
                  *
                </span>
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                className="otploginrhd"
                placeholder="Enter OTP"
                value={formik?.values?.otp}
                onChange={formik.handleChange}
              />
              {formik?.touched?.otp && formik?.errors?.otp ? (
                <p className="errorsig">{formik?.errors?.otp}</p>
              ) : null}

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
            <button onClick={formik.handleSubmit} className="log">
              {loginSignUpLoading ? <Loading /> : "Login"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
