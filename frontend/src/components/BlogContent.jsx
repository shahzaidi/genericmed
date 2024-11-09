import React, { useEffect } from "react";
import HomePage from "./HomePage";
import Footer from "./Footer";
import FooterMobile from "./FooterMobile";
import HomePageMobile from "./HomepageMobile";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBlogDetailsAction } from "../redux/actions/blogActions";
import { Helmet } from "react-helmet";

const BlogContent = () => {
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const { blogLoading, blog, blogError } = useSelector(
    (state) => state.getBlogDetailsReducer
  );

  useEffect(() => {
    if (id) {
      dispatch(getBlogDetailsAction(id));
    }
  }, []);

  const metaFunction = (blog) => {
    if (Object.keys(blog).length !== 0) {
      return (
        <Helmet>
          <meta name="description" content={blog?.metaDescription} />
          <meta name="title" content={blog?.metaTitle} />
          <meta name="keyword" content={blog?.metaKeyword} />
          <meta name="slug" content={blog?.slug} />
          {/* Other meta tags */}
        </Helmet>
      );
    } else {
      return;
    }
  };

  console.log(blog, "mnxnmcnxc/./././/././.");
  return (
    <div>
      {metaFunction(blog)}
      <HomePage />
      <HomePageMobile />
      <div className="blog-post">
        <img
          src={
            Object.keys(blog).length !== 0
              ? `https://uploadawsimages.s3.amazonaws.com/${blog?.blogImage}`
              : "/assets/blog2.png"
          }
          alt="Blog Image"
          className="blogtit-image"
        />
        <h1>
          {/* Ever Heard of Tea Tree Oil for Acne? Try This Remedy for an Overnight
          Solution */}
          {blog?.title}
        </h1>
        {/* <img
          src="/assets/blog2.png"
          alt="Tea Tree Oil for Acne"
          className="featured-image"
        /> */}
        <div className="contentabout">
          <div dangerouslySetInnerHTML={{ __html: blog?.content }} />
          {/* <div>
            <p>
              Tea tree oil has been used for centuries for its various health
              benefits, including its effectiveness in treating acne. If you're
              struggling with acne and looking for a natural remedy that works
              overnight, tea tree oil might be the solution you've been
              searching for.
            </p>
            <p>
              Tea tree oil contains powerful antibacterial and anti-inflammatory
              properties that can help reduce the size and redness of pimples
              while also preventing new ones from forming. Additionally, it
              helps to unclog pores and regulate oil production, making it an
              excellent choice for those with oily or acne-prone skin.
            </p>
            <h2>How to Use Tea Tree Oil for Acne</h2>
            <p>
              1. Dilute tea tree oil with a carrier oil such as coconut oil or
              jojoba oil. This helps to prevent irritation and sensitivity,
              especially for those with sensitive skin.
            </p>
            <p>
              2. Cleanse your face thoroughly with a gentle cleanser and pat dry
              with a clean towel.
            </p>
            <p>
              3. Using a cotton swab or cotton pad, apply the diluted tea tree
              oil directly to the affected areas of your skin.
            </p>
            <p>
              4. Leave the tea tree oil on overnight and rinse off in the
              morning with lukewarm water.
            </p>
            <p>5. Follow up with a moisturizer to keep your skin hydrated.</p>
            <h2>Precautions</h2>
            <p>
              While tea tree oil is generally safe for most people, it's
              essential to perform a patch test before using it on your face,
              especially if you have sensitive skin. If you experience any
              irritation or redness, discontinue use immediately.
            </p>
            <p>
              Avoid applying undiluted tea tree oil directly to your skin, as it
              can cause irritation and may even burn your skin.
            </p>
            <p>
              It's also crucial to use tea tree oil as directed and not to
              exceed the recommended dosage, as excessive use can lead to
              dryness and irritation.
            </p>
            <h2>Conclusion</h2>
            <p>
              Tea tree oil can be an effective overnight solution for acne,
              thanks to its antibacterial and anti-inflammatory properties. By
              incorporating tea tree oil into your skincare routine, you can
              help reduce the size and redness of pimples while preventing new
              ones from forming. Just remember to dilute the tea tree oil with a
              carrier oil and perform a patch test before use to avoid any
              potential adverse reactions. With consistent use, you can enjoy
              clearer, healthier-looking skin.
            </p>
          </div> */}
        </div>
      </div>

      <Footer />
      <FooterMobile />
    </div>
  );
};

export default BlogContent;
