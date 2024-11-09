const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/db");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const blogCategoryRoutes = require("./routes/blogCategoryRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const couponRoutes = require("./routes/couponRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const errorMiddleware = require("./middlewares/error");
const reviewRoutes = require("./routes/reviewRoutes");
const contactUsRoutes = require("./routes/contactUsRoutes");
const blogRoutes = require("./routes/blogRoutes");
const shippingAddressRoutes = require("./routes/shippingAddressRoutes");
const aboutUsRoutes = require("./routes/marketingRoutes/aboutUsRoutes");
const blogPageRoutes = require("./routes/marketingRoutes/blogPageRoutes");
const categoryPageRoutes = require("./routes/marketingRoutes/categoryPageRoutes");
const contactUsDmRoutes = require("./routes/marketingRoutes/contactUsDmRoutes");
const faqRoutes = require("./routes/marketingRoutes/faqRoutes");
const homePageRoutes = require("./routes/marketingRoutes/homePageRoutes");
const packagingAndAuthenticityRoutes = require("./routes/marketingRoutes/packagingAndAuthenticityRoutes");
const privacyPolicyRoutes = require("./routes/marketingRoutes/privacyPolicyRoutes");
const shopAllRoutes = require("./routes/marketingRoutes/shopAllRoutes");
const aboutUsPageRoutes = require("./routes/pageRoutes/aboutUsPageRoutes");
const categoriespagePageRoutes = require("./routes/pageRoutes/categoriespagePageRoutes");
const faqsPageRoutes = require("./routes/pageRoutes/faqsPageRoutes");
const homepagePageRoutes = require("./routes/pageRoutes/homepagePageRoutes");
const packageAndAuthenticityPageRoutes = require("./routes/pageRoutes/packageAndAuthenticityPageRoutes");
const privacyPolicyPageRoutes = require("./routes/pageRoutes/privacyPolicyPageRoutes");
const shopAllPageRoutes = require("./routes/pageRoutes/shopAllPageRoutes");
const uploadImageRoutes = require("./routes/uploadImageRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const blockIndianIps = require("./middlewares/blockIndianIps");
// Handling Uncaught Exception

process.on("uncaughtException", (err) => {
  console.log(`Error:- ${err.message} ${err.stack}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

dotenv.config({path: "config/.env"});
dbConnect();

const app = express();

// Apply middleware globally or to specific routes as needed
app.use(blockIndianIps);

// Increase request body size limit
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// app.use(express.json());
// app.use(cors());
app.use(cookieParser());

// Configure session middleware
// app.use(
//   session({
//     secret: "mySecret", // Replace with your actual secret
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false, maxAge: 36000000 }, // Session expiration time set to 10 hour (36000000 milliseconds)
//   })
// );

// Configure session middleware with MongoDB store

// // Use express-session middleware
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "mySecret", // Change this to a secret key
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       secure: true, // Set to true if your server is using HTTPS
//       maxAge: 60000, // Set the expiration time of the cookie in milliseconds
//     },
//   })
// );

// app.use("/api/v1", [cors()]);
app.use(
  cors({
    origin: true,
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
  })
);
app.use("/api/v1", productRoutes);
app.use("/api/v1", uploadImageRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", categoryRoutes);
app.use("/api/v1", blogCategoryRoutes);
app.use("/api/v1", wishlistRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", couponRoutes);
app.use("/api/v1", checkoutRoutes);
app.use("/api/v1", contactUsRoutes);
app.use("/api/v1", blogRoutes);
app.use("/api/v1", reviewRoutes);
app.use("/api/v1", shippingAddressRoutes);
app.use("/api/v1", aboutUsRoutes);
app.use("/api/v1", blogPageRoutes);
app.use("/api/v1", categoryPageRoutes);
app.use("/api/v1", contactUsDmRoutes);
app.use("/api/v1", faqRoutes);
app.use("/api/v1", homePageRoutes);
app.use("/api/v1", packagingAndAuthenticityRoutes);
app.use("/api/v1", privacyPolicyRoutes);
app.use("/api/v1", shopAllRoutes);
app.use("/api/v1", aboutUsPageRoutes);
app.use("/api/v1", categoriespagePageRoutes);
app.use("/api/v1", faqsPageRoutes);
app.use("/api/v1", homepagePageRoutes);
app.use("/api/v1", packageAndAuthenticityPageRoutes);
app.use("/api/v1", privacyPolicyPageRoutes);
app.use("/api/v1", shopAllPageRoutes);

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "mySecret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false, maxAge: 36000000 }, // Session expiration time set to 10 hours (36000000 milliseconds)
//     store: MongoStore.create({
//       mongoUrl: process.env.MONGODBURI, // Corrected environment variable name
//       // dbName: "development", // Specify your database name
//       // collectionName: "GMO_development", // Specify your collection name
//     }),
//   })
// );
app.use("/api/v1", cartRoutes);

// Error Middleware

app.use(errorMiddleware);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Unhandled Promise Rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error:- ${err.message} ${err.stack}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
