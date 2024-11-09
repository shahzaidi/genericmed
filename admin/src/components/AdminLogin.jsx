// // components/AdminLogin.js
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { sendOtp } from "../redux/actions/otpActions";

// const AdminLogin = () => {
//   const [email, setEmail] = useState("");

//   const dispatch = useDispatch();
//   const { sendingOtp, error } = useSelector((state) => state.otp);

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handleSendOtp = () => {
//     dispatch(sendOtp(email));
//   };

//   return (
//     <div className="admin__form">
//       <div className="heading">
//         <img src="./assets/Logo.png" alt="" srcSet="" />
//         <h2 className="ad">Admin Login</h2>
//         <p>Hello there, Sign in and start managing your website</p>
//       </div>
//       <form className="form">
//         <div className="nmeuse">
//           <label htmlFor="username">Email</label>
//           <div className="flexcg">
//             <input
//               type="text"
//               id="username"
//               value={email}
//               onChange={handleEmailChange}
//             />
//             <button
//               className="sendadminotp"
//               onClick={handleSendOtp}
//               disabled={sendingOtp}
//             >
//               {sendingOtp ? "Sending..." : "Send OTP"}
//             </button>
//           </div>
//         </div>

//         <div className="nmeuse">
//           <label htmlFor="password">Enter Otp</label>
//           <input type="password" id="password" />
//         </div>

//         <span className="resotp">Resend OTP</span>
//         <button type="submit" className="loginsub">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { sendOtp } from "../redux/actions/otpActions";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const AdminLogin = () => {
//   // State variables
//   const [email, setEmail] = useState("");

//   // Redux hooks
//   const dispatch = useDispatch();
//   const { sendingOtp, error } = useSelector((state) => state.otp);

//   // Function to handle email input change
//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   // Function to handle sending OTP
//   const handleSendOtp = () => {
//     // Dispatch sendOtp action with the entered email
//     dispatch(sendOtp(email));
//   };

//   // Show toast notification
//   const notify = (message, type) => {
//     toast[type](message);
//   };

//   // Effect to show notification based on state changes
//   React.useEffect(() => {
//     if (sendingOtp) {
//       notify("Sending OTP...", "info");
//     } else if (error) {
//       notify(error, "error");
//     } else {
//       notify("OTP sent successfully to your email", "success");
//     }
//   }, [sendingOtp, error]);

//   return (
//     <div className="admin__form">
//       <div className="heading">
//         <img src="./assets/Logo.png" alt="" srcSet="" />
//         <h2 className="ad">Admin Login</h2>
//         <p>Hello there, Sign in and start managing your website</p>
//       </div>
//       <form className="form">
//         <div className="nmeuse">
//           <label htmlFor="username">Email</label>
//           <div className="flexcg">
//             {/* Input field for email */}
//             <input
//               type="text"
//               id="username"
//               value={email}
//               onChange={handleEmailChange}
//             />
//             {/* Button to send OTP */}
//             <button
//               className="sendadminotp"
//               onClick={handleSendOtp}
//               disabled={sendingOtp}
//             >
//               Send OTP
//             </button>
//           </div>
//         </div>

//         <div className="nmeuse">
//           <label htmlFor="password">Enter Otp</label>
//           {/* Input field for OTP */}
//           <input type="password" id="password" />
//         </div>

//         {/* Option to resend OTP */}
//         <span className="resotp">Resend OTP</span>

//         {/* Button to submit login form */}
//         <button type="submit" className="loginsub">
//           Login
//         </button>
//       </form>

//       {/* Toast container for notifications */}
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </div>
//   );
// };

// export default AdminLogin;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { sendOtp } from "../redux/actions/otpActions";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { loginUser } from "../redux/actions/adminUserActions";

// const AdminLogin = () => {
//   const [email, setEmail] = useState(""); // State to store the email input value
//   const [otpSent, setOtpSent] = useState(false); // State to track if OTP is sent
//   const [resendDisabled, setResendDisabled] = useState(false); // State to track if the "Resend OTP" span should be disabled
//   const [timer, setTimer] = useState(120); // State to store the timer value (in seconds)

//   const dispatch = useDispatch(); // Redux dispatch function
//   const { sendingOtp, error } = useSelector((state) => state.otp); // Selecting sendingOtp and error from Redux state
//   const { loggingIn, error: loginError } = useSelector((state) => state.auth);

//   // Function to handle changes in the email input field
//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   // Function to handle sending OTP
//   const handleSendOtp = () => {
//     if (!email) {
//       notify("Please enter an email address.", "error");
//       return;
//     }
//     if (!validateEmail(email)) {
//       notify("Please enter a valid email address.", "error");
//       return;
//     }
//     setOtpSent(true); // Set otpSent to true to hide the "Send OTP" button
//     dispatch(sendOtp(email)); // Dispatch sendOtp action

//     // Disable the "Resend OTP" span and start the timer
//     setResendDisabled(true);
//     startTimer();
//   };

//   // Function to validate email format using regex
//   const validateEmail = (email) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };

//   // Function to display toast notifications
//   const notify = (message, type) => {
//     toast[type](message);
//   };

//   // Function to start the timer
//   const startTimer = () => {
//     let seconds = 120;
//     const interval = setInterval(() => {
//       seconds--;
//       setTimer(seconds);
//       if (seconds === 0) {
//         clearInterval(interval);
//         setResendDisabled(false); // Enable the "Resend OTP" span after the timer expires
//       }
//     }, 1000);
//   };

//   // Function to handle resending OTP
//   const handleResendOtp = () => {
//     handleSendOtp(); // Call handleSendOtp to resend OTP
//   };

//   const handleLogin = () => {
//     dispatch(loginUser(email, otp));
//   };

//   // Effect to handle sending OTP, displaying notifications, and updating states
//   useEffect(() => {
//     if (sendingOtp) {
//       notify("Sending OTP...", "info");
//     } else if (error) {
//       notify(error, "error");
//     } else if (otpSent) {
//       notify("OTP sent successfully to your email.", "success");
//     }
//   }, [sendingOtp, error, otpSent]);

//   return (
//     <div className="admin__form">
//       <div className="heading">
//         <img src="./assets/Logo.png" alt="" srcSet="" />
//         <h2 className="ad">Admin Login</h2>
//         <p>Hello there, Sign in and start managing your website</p>
//       </div>
//       <form className="form">
//         <div className="nmeuse">
//           <label htmlFor="username">Email</label>
//           <div className="flexcg">
//             <input
//               type="text"
//               id="username"
//               value={email}
//               onChange={handleEmailChange}
//             />
//             {/* Render the "Send OTP" button only if OTP is not sent */}
//             {!otpSent && (
//               <button
//                 type="button"
//                 className="sendadminotp"
//                 onClick={handleSendOtp}
//                 disabled={sendingOtp}
//               >
//                 {sendingOtp ? "Sending..." : "Send OTP"}
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="nmeuse">
//           <label htmlFor="password">Enter Otp</label>
//           <input type="password" id="password" />
//         </div>

//         {/* Render the "Resend OTP" span */}
//         {resendDisabled ? (
//           <span className="resotp disabled">{`Resend OTP (${timer}s)`}</span>
//         ) : (
//           <span className="resotp" onClick={handleResendOtp}>
//             Resend OTP
//           </span>
//         )}

//         {/* Button to submit login form */}
//         <button type="submit" className="loginsub">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "../redux/actions/otpActions";
import { loginUser } from "../redux/actions/adminUserActions";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [email, setEmail] = useState(""); // State to store the email input value
  const [otp, setOtp] = useState(""); // State to store the OTP input value
  const [otpSent, setOtpSent] = useState(false); // State to track if OTP is sent
  const [resendDisabled, setResendDisabled] = useState(false); // State to track if the "Resend OTP" span should be disabled
  const [timer, setTimer] = useState(120); // State to store the timer value (in seconds)

  const dispatch = useDispatch(); // Redux dispatch function
  const { sendingOtp, error: otpError } = useSelector((state) => state.otp); // Selecting sendingOtp and error from OTP Redux state
  const { loggingIn, error: loginError } = useSelector((state) => state.auth); // Selecting loggingIn and error from login Redux state

  // Function to handle changes in the email input field
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Function to handle changes in the OTP input field
  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  // Function to handle sending OTP
  const handleSendOtp = () => {
    if (!email) {
      notify("Please enter an email address.", "error");
      return;
    }
    if (!validateEmail(email)) {
      notify("Please enter a valid email address.", "error");
      return;
    }
    setOtpSent(false); // Set otpSent to true to hide the "Send OTP" button
    dispatch(sendOtp(email)); // Dispatch sendOtp action

    // Disable the "Resend OTP" span and start the timer
    setResendDisabled(true);
    startTimer();
  };

  // Function to validate email format using regex
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Function to display toast notifications
  const notify = (message, type) => {
    toast[type](message);
  };

  // Function to start the timer
  const startTimer = () => {
    let seconds = 120;
    const interval = setInterval(() => {
      seconds--;
      setTimer(seconds);
      if (seconds === 0) {
        clearInterval(interval);
        setResendDisabled(false); // Enable the "Resend OTP" span after the timer expires
      }
    }, 1000);
  };

  // Function to handle resending OTP
  const handleResendOtp = () => {
    handleSendOtp(); // Call handleSendOtp to resend OTP
  };

  // Function to handle login
  const handleLogin = () => {
    dispatch(loginUser(email, otp))
      .then(() => {
        // Redirect to dashboard after successful login
        navigate("/dashboard"); // Use navigate function to redirect
      })
      .catch((error) => {
        // Handle login error
        notify(error, "error");
      });
  };

  // Effect to handle sending OTP, displaying notifications, and updating states
  useEffect(() => {
    if (sendingOtp) {
      notify("Sending OTP...", "info");
    } else if (otpError) {
      notify(otpError, "error");
    } else if (otpSent) {
      notify("OTP sent successfully to your email.", "success");
    }
  }, [sendingOtp, otpError, otpSent]);

  // Effect to handle login errors
  useEffect(() => {
    if (loginError) {
      notify(loginError, "error");
    }
  }, [loginError]);

  return (
    <div className="admin__form">
      <div className="heading">
        <img src="/assets/Logo.png" alt="" srcSet="" />
        <h2 className="ad">Admin Login</h2>
        <p>Hello there, Sign in and start managing your website</p>
      </div>
      <form className="form">
        <div className="nmeuse">
          <label htmlFor="username">Email</label>
          <div className="flexcg">
            <input
              type="text"
              id="username"
              value={email}
              onChange={handleEmailChange}
            />
         
            {!otpSent && (
              <button
                type="button"
                className="sendadminotp"
                onClick={handleSendOtp}
                disabled={sendingOtp}
              >
                {sendingOtp ? "Sending..." : "Send OTP"}
              </button>
            )}
          </div>
        </div>

        <div className="nmeuse">
          <label htmlFor="password">Enter Otp</label>
          <input
            type="text" 
            id="password"
            value={otp}
            onChange={handleOtpChange}
          />
        </div>

        {/* Render the "Resend OTP" span */}
        {resendDisabled ? (
          <span className="resotp disabled">{`Resend OTP (${timer}s)`}</span>
        ) : (
          <span className="resotp" onClick={handleResendOtp}>
            Resend OTP
          </span>
        )}

        {/* Button to submit login form */}
        <button
          type="button" // Change the button type to "button" to prevent form submission
          className="loginsub"
          onClick={handleLogin} // Call handleLogin function on button click
        >
          {loggingIn ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
