import React, { useEffect, useState } from "react";
import HomePage from "./HomePage";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import FooterMobile from "./FooterMobile";
import HomePageMobile from "./HomepageMobile";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBlogAction,
  getAllBlogCategoryAction,
  getBlogPageDetails,
} from "../redux/actions/blogActions";
import moment from "moment";
import Loading from "./Loading";
import { Helmet } from "react-helmet";

const categories = [
  "Acne",
  "Acne Solution",
  "Alpha Hydroxy Acid",
  "AYURVEDA",
  "Ayurvedic Skincare",
  "Beauty Secret",
  "Beta Hydroxy Acid",
  "Bodycare",
  "Bridal Glow",
  "Bridal Skincare",
  "Bridal Skincare Routine",
  "Cleansing Oil",
  "Dryness",
  "Essential Oils",
  "Eye Care Tips",
  "Face And Body Care",
  "Face Cleanser",
  "Facecare",
  "Festive Tips",
  "Hair Care",
  "Hand And Feet Care",
  "Health Tips",
  "Healthy Skin",
  "Hydrating Cleanser",
  "Kumkumadi Tailam",
  "Lip Care",
  "Makeup Cleanser",
  "Oily Skin",
  "Acne",
  "Acne Solution",
  "Alpha Hydroxy Acid",
  "AYURVEDA",
  "Ayurvedic Skincare",
  "Beauty Secret",
  "Beta Hydroxy Acid",
];

const blogs = [
  {
    title:
      "Every heard of Tea Tree Oil for Acne? Try this remedy for overnight solution",
    date: " On March 9, 2024",
  },
  {
    title:
      "Looking for Last Minute Glow? Here are Awesome Benefits of Vitamin C to Try",
    date: "On March 5, 2024",
  },
  {
    title: "The Truth About Ayurvedic Skincare: Top 5 Products to try now",
    date: "On February 23, 2024",
  },
  {
    title:
      "Every heard of Tea Tree Oil for Acne? Try this remedy for overnight solution",
    date: " On March 9, 2024",
  },
  {
    title:
      "Looking for Last Minute Glow? Here are Awesome Benefits of Vitamin C to Try",
    date: "On March 5, 2024",
  },
  {
    title: "The Truth About Ayurvedic Skincare: Top 5 Products to try now",
    date: "On February 23, 2024",
  },
];

function BlogPage() {
  let [category, setCategory] = useState(null);
  let [index, setIndex] = useState(null);
  let dispatch = useDispatch();
  let { loading, blogs, error } = useSelector(
    (state) => state.getAllBlogReducer
  );

  let { categoryLoading, blogCategories, categoryError } = useSelector(
    (state) => state.getAllBlogCategoryReducer
  );

  let { blogsLoading, blogPage, blogsError } = useSelector(
    (state) => state.getBlogPageDetailsReducer
  );

  useEffect(() => {
    if (category) {
      dispatch(getAllBlogAction(category));
    } else {
      dispatch(getAllBlogAction());
    }
  }, [category]);

  useEffect(() => {
    dispatch(getAllBlogCategoryAction());
  }, []);

  useEffect(() => {
    dispatch(getBlogPageDetails());
  }, []);

  const metaFunction = (blogPage) => {
    if (Object.keys(blogPage).length !== 0) {
      return (
        <Helmet>
          <meta name="description" content={blogPage?.metaDescription} />
          <meta name="title" content={blogPage?.metaTitle} />
          <meta name="keyword" content={blogPage?.metaKeyword} />
          <meta name="slug" content={blogPage?.slug} />
          {/* Other meta tags */}
        </Helmet>
      );
    } else {
      return;
    }
  };

  console.log(blogs, blogCategories, blogPage, "blogs././././././././.");
  return (
    <div>
      <HomePage />
      <HomePageMobile />
      <div className="containerblogss">
        <div className="categoriesblogs">
          {metaFunction(blogPage)}
          <h2>CATEGORIES</h2>
          <ul>
            {categoryLoading ? (
              <Loading />
            ) : categoryError ? (
              <p>{categoryError}</p>
            ) : blogCategories?.length <= 0 ? (
              <p>OOps! No, Blog category available to show!</p>
            ) : (
              blogCategories.map((category, ind) => (
                <li
                  key={ind}
                  className={ind === index ? "iog" : ""}
                  onClick={() => {
                    setCategory(category?.name);
                    setIndex(ind);
                  }}
                >
                  {category?.name}
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="blogs">
          {loading ? (
            <Loading />
          ) : error ? (
            <p>{error}</p>
          ) : blogs?.length <= 0 ? (
            <p>OOps! No, Blog available to show!</p>
          ) : (
            blogs.map((blog, index) => (
              <Link to={`/blogcontent/${blog._id}`}>
                {" "}
                <div key={index} className="blog">
                  <img src={blog?.featuredImage} alt={blog?.title} />
                  <h3>{blog.title}</h3>
                  <p>
                    {" "}
                    <b>On</b> {moment(blog?.createdAt).format("MMMM Do YYYY")}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
      <Footer />
      <FooterMobile />
    </div>
  );
}

export default BlogPage;
