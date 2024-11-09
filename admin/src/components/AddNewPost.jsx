import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import Layout from "./Layout";
import "react-quill/dist/quill.snow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleRight,
  faUsers,
  faFile,
  faBlog,
  faPhone,
  faGear,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useParams } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { blogInitialValues, blogValidationSchema } from "../common/Validation";
import {
  createBlogAction,
  getBlogDetails,
  updateBlogAction,
} from "../redux/actions/blogActions";
import Header from "./Header";
import { getAllBlogCategory } from "../redux/actions/blogCategoryActions";
import { uploadImagesAction } from "../redux/actions/imagesActions";

const AddNewPost = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const blogRef = useRef();
  const featuredRef = useRef();
  const { blogLoading, blog, blogError } = useSelector(
    (state) => state.getBlogDetailsReducer
  );
  const { loading, categories, error } = useSelector(
    (state) => state.getAllBlogCategoryReducer
  );

  const { imagesLoading, imageUrls, type, imagesError } = useSelector(
    (state) => state.uploadImagesReducer
  );

  const [title, setTitle] = useState("");
  const [contenteditor, setContentEditor] = useState("");
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [metaKeyword, setMetaKeyword] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [status, setStatus] = useState("");
  const [orderVisibility, setOrderVisibility] = useState(false);
  const [catVisibility, setCatVisibility] = useState(false);
  const [ProVisibility, setProVisibility] = useState(false);
  const [blogImage, setBlogImage] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);

  const [adminDropdownVisible, setAdminDropdownVisible] = useState(false);
  const [ecomVisibility, setEcomVisibility] = useState(false);

  const [dmVisibility, setDMVisibility] = useState(false);
  const [userVisibility, setUserVisibility] = useState(false);
  const [pagesVisibility, setPagesVisibility] = useState(false);
  const [blogsVisibility, setBlogsVisibility] = useState(false);
  const [orderLogVisibility, setOrderLogVisibility] = useState(false);
  const [adminVisibility, setAdminVisibility] = useState(false);

  const [guestUsersVisibility, setGuestUsersVisibility] = useState(false);

  const toggleGuestUsersVisibility = () => {
    setGuestUsersVisibility(!guestUsersVisibility);
  };

  const toggleAdminVisibility = () => {
    setAdminVisibility(!adminVisibility);
  };

  const toggleOrderLogVisibility = () => {
    setOrderLogVisibility(!orderLogVisibility);
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
  const toggleEcomVisibility = () => {
    setEcomVisibility((prevVisibility) => !prevVisibility);
  };
  useEffect(() => {
    if (
      location.pathname === "/allorders" ||
      location.pathname === "/pendingorders" ||
      location.pathname === "/Delorders" ||
      location.pathname === "/Cancelorders"
    ) {
      setOrderVisibility(true);
    } else {
      setOrderVisibility(false);
    }

    if (
      location.pathname === "/allcategories" ||
      location.pathname === "/subcategories"
    ) {
      setCatVisibility(true);
    } else {
      setCatVisibility(false);
    }

    if (
      location.pathname === "/createproduct" ||
      location.pathname === "/productlist" ||
      location.pathname === "/attributes" ||
      location.pathname === "/outofstock"
    ) {
      setProVisibility(true);
    } else {
      setProVisibility(false);
    }

    if (
      location.pathname === "/createcoupon" ||
      location.pathname === "/couponlist" ||
      location.pathname === "/shippingrule" ||
      location.pathname === "/paymentmethod"
    ) {
      setEcomVisibility(true);
    } else {
      setEcomVisibility(false);
    }

    if (
      location.pathname === "/googleanalytics" ||
      location.pathname === "/homepage" ||
      location.pathname === "/categorypage" ||
      location.pathname === "/shopall" ||
      location.pathname === "/aboutus" ||
      location.pathname === "/blogpage" ||
      location.pathname === "/contactus" ||
      location.pathname === "/privacypolicy" ||
      location.pathname === "/termsandconditions" ||
      location.pathname === "/faqs"
    ) {
      setDMVisibility(true);
    } else {
      setDMVisibility(false);
    }

    if (
      location.pathname === "/customerlist" ||
      location.pathname === "/pendingcustomerlist"
    ) {
      setUserVisibility(true);
    } else {
      setUserVisibility(false);
    }

    if (
      location.pathname === "/aboutus" ||
      location.pathname === "/contactus" ||
      location.pathname === "/termsandconditions" ||
      location.pathname === "/privacypolicy" ||
      location.pathname === "/faqs" ||
      location.pathname === "/homepage" ||
      location.pathname === "/categoriespage" ||
      location.pathname === "/shopall"
    ) {
      setPagesVisibility(true);
    } else {
      setPagesVisibility(false);
    }
    if (
      location.pathname === "/blogallblogs" ||
      location.pathname === "/blogcategorypage" ||
      location.pathname === "/addnewpost"
    ) {
      setBlogsVisibility(true);
    } else {
      setBlogsVisibility(false);
    }

    if (
      location.pathname === "/orderlist" ||
      location.pathname === "/createanorder"
    ) {
      setOrderLogVisibility(true);
    } else {
      setOrderLogVisibility(false);
    }
    if (
      location.pathname === "/alladminlist" ||
      location.pathname === "/addnewadmin" ||
      location.pathname === "/alladminroles" ||
      location.pathname === "/userpermissions"
    ) {
      setAdminVisibility(true);
    } else {
      setAdminVisibility(false);
    }
  }, [location.pathname]);

  const toggleAdminDropdown = () => {
    setAdminDropdownVisible(!adminDropdownVisible);
  };

  const toggleOrderVisibility = () => {
    setOrderVisibility(!orderVisibility);
  };
  const toggleCatVisibility = () => {
    setCatVisibility(!catVisibility);
  };
  const toggleProVisibility = () => {
    setProVisibility(!ProVisibility);
  };

  const handleImageChange = (event) => {
    const { name, files } = event.target;

    if (name === "blogImage") {
      if (files.length === 0) {
        return;
      } else {
        let formData = new FormData();

        formData.append("images", files[0]);

        dispatch(uploadImagesAction(formData, name));
      }
    }

    if (name === "featuredImage") {
      if (files.length === 0) {
        return;
      } else {
        let formData = new FormData();

        formData.append("images", files[0]);

        dispatch(uploadImagesAction(formData, name));
      }
    }
  };

  const handleSave = () => {
    console.log({
      title,
      contenteditor,
      author,
      slug,
      metaTitle,
      metaDescription,
      metaKeyword,
      blogImage,
      featuredImage,
      status,
      category,
    });
  };

  const handleChange = (value) => {
    console.log(value, "valueMeta");
    setMetaDescription(value);
  };

  console.log(metaDescription, "valueMeta.....//");

  const handleEditorChange = (value, name) => {
    console.log(value, name, "metaPD");
    if (name === "content") {
      formik.setFieldValue("content", value);
    }

    if (name === "metaDescription") {
      formik.setFieldValue("metaDescription", value);
    }
  };

  const handleBlog = () => {
    console.log(formik?.values, "formikValues....//");
    if (Object.keys(formik.errors).length === 0) {
      dispatch(createBlogAction(formik?.values));
    }
  };

  const updateBlog = () => {
    console.log(formik?.values, "abc formikValues....//");
    if (Object.keys(formik.errors).length === 0 && id) {
      dispatch(updateBlogAction(id, formik?.values));
    }
  };

  const formik = useFormik({
    initialValues: blogInitialValues,
    onSubmit: id ? updateBlog : handleBlog,
    validationSchema: blogValidationSchema,
  });

  console.log(formik?.values, formik?.errors, "fields");

  useEffect(() => {
    if (id) {
      dispatch(getBlogDetails(id));
    }
  }, [id]);

  useEffect(() => {
    if (id && blog && Object.keys(blog).length >= 1) {
      formik.setFieldValue("title", blog?.title);
      formik.setFieldValue("slug", blog?.slug);
      formik.setFieldValue("category", blog?.category);
      formik.setFieldValue("author", blog?.author);
      formik.setFieldValue("content", blog?.content);
      formik.setFieldValue("metaKeyword", blog?.metaKeyword);
      formik.setFieldValue("metaTitle", blog?.metaTitle);
      formik.setFieldValue("metaDescription", blog?.metaDescription);
      formik.setFieldValue("status", blog?.status);
      formik.setFieldValue("blogImage", blog?.blogImage);
      formik.setFieldValue("featuredImage", blog?.featuredImage);
    }
    console.log(id, "productAdmin11");
  }, [id, blog]);

  useEffect(() => {
    dispatch(getAllBlogCategory());
  }, []);

  console.log(
    id,
    blog,
    formik?.errors,
    formik?.values,
    "blogDetails././././././././././/"
  );

  useEffect(() => {
    if (imageUrls && type === "blogImage") {
      // setImage(imageUrls[0]);
      formik.setFieldValue("blogImage", imageUrls[0]);
    }
  }, [imageUrls]);

  useEffect(() => {
    if (imageUrls && type === "featuredImage") {
      // setImage(imageUrls[0]);
      formik.setFieldValue("featuredImage", imageUrls[0]);
    }
  }, [imageUrls]);

  return (
    <div>
      <div className="admin-dashboard">
        <Sidebar />

        <Header />
        <div className="rightt-panel">
          <Layout heading="Add New Post"></Layout>

          <div className="produche">
            <div className="in">
              <label>
                Title
                <input
                  type="text"
                  name="title"
                  value={formik?.values?.title}
                  onChange={formik.handleChange}
                />
              </label>
              {formik?.touched?.title && formik?.errors?.title ? (
                <p className="errorsig">{formik?.errors?.title}</p>
              ) : null}
            </div>
            <div className="in">
              <label>
                Content Editor
                <ReactQuill
                  name="content"
                  value={formik?.values?.content}
                  onChange={(value) => handleEditorChange(value, "content")}
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }],

                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      ["link", "image", "video"],
                      ["clean"],
                    ],
                  }}
                  formats={[
                    "header",
                    "font",
                    "size",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                    "video",
                  ]}
                />
              </label>
              {formik?.touched?.content && formik?.errors?.content ? (
                <p className="errorsig">{formik?.errors?.content}</p>
              ) : null}
            </div>
            <div className="inflex">
              <div>
                <label>
                  Author
                  <input
                    type="text"
                    name="author"
                    className="suh"
                    value={formik?.values?.author}
                    onChange={formik.handleChange}
                  />
                </label>
                {formik?.touched?.author && formik?.errors?.author ? (
                  <p className="errorsig">{formik?.errors?.author}</p>
                ) : null}
              </div>
              <div>
                <label>
                  Slug
                  <input
                    type="text"
                    name="slug"
                    className="suh"
                    value={formik?.values?.slug}
                    onChange={formik.handleChange}
                  />
                </label>
                {formik?.touched?.slug && formik?.errors?.slug ? (
                  <p className="errorsig">{formik?.errors?.slug}</p>
                ) : null}
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: metaDescription }} />
            <div className="in">
              <label>
                Meta Title
                <input
                  type="text"
                  name="metaTitle"
                  value={formik?.values?.metaTitle}
                  onChange={formik.handleChange}
                />
              </label>
              {formik?.touched?.metaTitle && formik?.errors?.metaTitle ? (
                <p className="errorsig">{formik?.errors?.metaTitle}</p>
              ) : null}
            </div>

            <div className="in">
              <label>
                Meta Description
                <ReactQuill
                  name="metaDescription"
                  value={formik?.values?.metaDescription}
                  onChange={(value) =>
                    handleEditorChange(value, "metaDescription")
                  }
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }],

                      ["bold", "italic", "underline", "strike", "blockquote"],
                      [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                      ],
                      ["link", "image", "video"],
                      ["clean"],
                    ],
                  }}
                  formats={[
                    "header",
                    "font",
                    "size",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                    "video",
                  ]}
                />
              </label>
              {formik?.touched?.metaDescription &&
              formik?.errors?.metaDescription ? (
                <p className="errorsig">{formik?.errors?.metaDescription}</p>
              ) : null}
            </div>

            <div className="in">
              <label>
                Meta Keyword
                <input
                  type="text"
                  name="metaKeyword"
                  value={formik?.values?.metaKeyword}
                  onChange={formik.handleChange}
                />
              </label>
              {formik?.touched?.metaKeyword && formik?.errors?.metaKeyword ? (
                <p className="errorsig">{formik?.errors?.metaKeyword}</p>
              ) : null}
            </div>

            <div className="in" onClick={() => blogRef.current.click()}>
              <label htmlFor="blog-image-upload">Blog Image</label>

              <div className="flexft">
                <div className="uploadcon">
                  <img
                    src={
                      formik?.values?.blogImage
                        ? `https://uploadawsimages.s3.amazonaws.com/${formik?.values?.blogImage}`
                        : "/assets/upimgicon.png"
                    }
                    alt="Blog"
                  />
                </div>
                <input
                  type="file"
                  id="blog-image-upload"
                  name="blogImage"
                  ref={blogRef}
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
              {formik?.touched?.blogImage && formik?.errors?.blogImage ? (
                <p className="errorsig">{formik?.errors?.blogImage}</p>
              ) : null}
            </div>

            <div className="in" onClick={() => featuredRef.current.click()}>
              <label htmlFor="featured-image-upload">Featured Image</label>

              <div className="flexft">
                <div className="uploadcon">
                  <img
                    src={
                      formik?.values?.featuredImage
                        ? `https://uploadawsimages.s3.amazonaws.com/${formik?.values?.featuredImage}`
                        : "/assets/upimgicon.png"
                    }
                    alt="Featured"
                  />
                </div>

                <input
                  type="file"
                  id="featured-image-upload"
                  name="featuredImage"
                  ref={featuredRef}
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
              {formik?.touched?.featuredImage &&
              formik?.errors?.featuredImage ? (
                <p className="errorsig">{formik?.errors?.featuredImage}</p>
              ) : null}
            </div>

            <div className="in">
              <label>
                Status
                <select
                  name="status"
                  value={formik?.values?.status}
                  onChange={formik.handleChange}
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>
              {formik?.touched?.status && formik?.errors?.status ? (
                <p className="errorsig">{formik?.errors?.status}</p>
              ) : null}
            </div>

            <div className="in">
              <label>
                Select Category <span style={{ color: "red" }}>*</span>
                <select
                  name="category"
                  value={formik?.values?.category}
                  onChange={formik.handleChange}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories &&
                    categories?.map((category) => (
                      <option value={category?.name}>{category?.name}</option>
                    ))}
                </select>
              </label>
              {formik?.touched?.category && formik?.errors?.category ? (
                <p className="errorsig">{formik?.errors?.category}</p>
              ) : null}
            </div>
            {id ? (
              <button className="savepagepost" onClick={formik?.handleSubmit}>
                Update
              </button>
            ) : (
              <button className="savepagepost" onClick={formik?.handleSubmit}>
                Save
              </button>
            )}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default AddNewPost;
