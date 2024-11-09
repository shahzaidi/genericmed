import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { getHomePageBlogsAction } from "../redux/actions/blogActions";

const BlogContainer = ({ title, content, imageSrc }) => (
  <div className="blog-container">
    <img src={imageSrc} alt={title} className="blog-image" />
    <h3>{title}</h3>
    <p>{content}</p>
    {/* <span>Read More..</span> */}
  </div>
);

const LatestBlogs = () => {
  const dispatch = useDispatch();

  const { homeBlogsLoading, homeBlogs, homeBlogsError } = useSelector(
    (state) => state.getHomePageBlogsReducer
  );

  useEffect(() => {
    dispatch(getHomePageBlogsAction());
  }, []);

  console.log(homeBlogs, "homeBlogs");
  return (
    <div className="latest-blogs">
      <h1>Latest Blogs</h1>
      <div className="blog-row">
        {homeBlogsLoading ? (
          <Loading />
        ) : homeBlogsError ? (
          <p>{homeBlogsError}</p>
        ) : homeBlogs?.length >= 1 ? (
          homeBlogs?.map((blog) => (
            <Link to={`blogcontent/${blog?._id}`} id="blogtext">
              {" "}
              <BlogContainer
                title={blog?.title}
                // content="Information about the top medicines in the market....."
                imageSrc={`https://uploadawsimages.s3.amazonaws.com/${blog?.blogImage}`}
              />
            </Link>
          ))
        ) : (
          <div> </div>
        )}
        {/* <BlogContainer
          title="Welness Wonders Unveiled"
          content="Exploring the mechanisms of action of various medicines......"
          imageSrc="/assets/blog2.png"
        /> */}
      </div>
      {/* <div className="blog-row">
        <BlogContainer
          title="Navigating the Wealthness Frontier"
          content="Information about the top medicines in the market....."
          imageSrc="/assets/blog3.png"
        />
        <BlogContainer
          title="Wellness Wonders Unveiled"
          content="Exploring the mechanisms of action of various medicines......"
          imageSrc="/assets/blog4.png"
        />
      </div> */}
      <div className="readm">
        <Link to="/blogpage">
          <span className="vieblogh">View All</span>
        </Link>
      </div>
    </div>
  );
};

export default LatestBlogs;
