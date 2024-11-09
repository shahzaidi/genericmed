const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
let session = require("express-session");
const MongoStore = require("connect-mongo");
const uuid = require("uuid");
const { v4: uuidv4 } = require("uuid");
const sessionId = uuid.v4();

const protect = async (req, res, next) => {
  let token;
  // Check if the request contains a valid JWT token
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Missing token" });
  }
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Add user from payload
      req.user = await User.findById(decoded.id);
      // console.log(req.user);
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, No token" });
  }
};

// const sessionMiddleware = async (req, res, next) => {
//   try {
//     // req.sessionId = sessionId;
//     console.log(`middlware session `, req.sessionId);
//     if (!req.sessionId) {
//       // res.cookie("sessionID", sessionId, { maxAge: 36000000 });
//       req.sessionId = sessionId;
//       console.log(req.sessionId, `new date and date now`, new Date());
//     }
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(401).json({ message: error });
//   }
// };
// const sessionMiddleware = async (req, res, next) => {
//   if (!req.sessionID) {
//     try {
//       console.log(`sessionId inside middleware called 1`, req.sessionID);
//       // Initialize session middleware
//       const middle = session({
//         secret: process.env.SESSION_SECRET || "mySecret",
//         resave: false,
//         saveUninitialized: true,
//         httpOnly: true,
//         cookie: { secure: false, maxAge: 36000000, httpOnly: true },
//         store: new MongoStore({
//           mongoUrl: process.env.MONGODBURI,
//         }),
//       });
//       middle(req, res, next);

//       console.log(
//         `After session sessionId inside middleware called 1`,
//         req.sessionID
//       );
//       console.log("Request URL:", req.originalUrl);
//       console.log("Request Method:", req.method);
//       console.log("Request Headers:", req.headers);
//     } catch (error) {
//       console.error(error);
//       res.status(401).json({ message: error });
//     }
//   } else if (req.sessionID) {
//     console.log(`sessionId inside middleware else called`, req.sessionID);
//   } else {
//     res.status(401).json({ message: "Guest user" });
//   }
// };

const sessionMiddleware = async (req, res, next) => {
  try {
    // Log request details and headers
    console.log("Request URL:", req.originalUrl);
    console.log("Request Method:", req.method);
    console.log("Request Headers:", req.headers);

    // If session already exists
    if (req.cookies.sessionId) {
      console.log(`Session ID inside middleware:`, req.sessionID);
    }
    if (!req.cookies.sessionId) {
      console.log(`generating session`);
      // Generate a unique session ID
      const sessionId = uuid.v4();

      // Set the "Access-Control-Allow-Credentials" header
      res.setHeader("Access-Control-Allow-Credentials", "true");

      // Set the session ID as a cookie
      res.cookie("sessionId", sessionId, { httpOnly: false, maxAge: 36000000 });

      console.log(`Generated Session ID:`, sessionId);
    }
    console.log(`req.cookies: --------------------_>`, req.cookies);
    // Call next middleware or route handler
    // Set the "Access-Control-Allow-Credentials" header
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Middleware to generate and send unique ID to client
const sendUniqueId = (req, res, next) => {
  // let userId = req.cookies.userId;
  // console.log(userId, "userIdSessionId//////////");
  // if (!userId) {
  let sessionId = req.cookies.sessionId;
  if (!sessionId) {
    console.log(`generating unique id`);
    // If not, generate a new unique ID
    sessionId = uuidv4();
    // Set the unique ID as a cookie
    res.cookie("sessionId", sessionId, {
      maxAge: 9000000,
      httpOnly: false,
      // domain: "http://mygmobucket.s3-website.ap-south-1.amazonaws.com",
      // path: "/",
      // sameSite: "None",
      // secure: false,
      domain: "developertesting.in",
      path: "/",
      sameSite: "None",
      secure: true,
    });
  }

  // Attach the generated or retrieved userId to the request object
  // req.cookies.userId = userId;
  req.cookies.sessionId = sessionId;
  console.log(`assigned generating unique`, req.cookies);
  next();
};

// const getUniqueId = (req, res, next) => {
//   console.log(
//     `uniqueId is here================================>`,
//    
//  req.cookies.userId
//   );
//   res.json({ userId: req.cookies.userId });

//   next();
// };

// Middleware to check for admin role
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res
      .status(401)
      .json({ success: false, message: "Not authorized as an admin" });
  }
};

// Middleware to check for Super Admin role
const superAdmin = (req, res, next) => {
  if (req.user && req.user.isSuperAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as super admin" });
  }
};

// Middleware to check for marketing role
const marketer = (req, res, next) => {
  if (req.user && req.user.isMarketer) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as Marketer" });
  }
};

// Middleware to check for marketing role
const support = (req, res, next) => {
  if (req.user && req.user.isSupport) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as Support" });
  }
};

module.exports = {
  protect,
  sessionMiddleware,
  admin,
  sendUniqueId,
  superAdmin,
  marketer,
  support,
};
