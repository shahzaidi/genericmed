// controllers/blogController.js
const Blog = require("../models/blogsModel");

// create a new blog
const createBlog = async (req, res) => {
  try {
    if (!req.user.permissions[0].createBlogs) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].createBlogs) {
      const blog = await Blog.create(req.body);
      return res
        .status(200)
        .json({ success: true, blog, message: "Blog created successfully" });
    } else {
      return res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    if (!req.user.permissions[0].readBlogs) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].readBlogs) {
      let filter = req.query.category ? { category: req.query.category } : {};
      let page = req.query.page ? Number(req.query.page) : 1;
      let resultPerPage = 10;

      let blogsCount = await Blog.find(filter)
        .sort({ createdAt: -1 })
        .countDocuments();
      let skip = resultPerPage * (page - 1);
      const blogs = await Blog.find(filter)
        .sort({ createdAt: -1 })
        .limit(resultPerPage)
        .skip(skip);
      res.status(200).json({ success: true, blogsCount, blogs });
    } else {
      return res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllBlogsGm = async (req, res) => {
  try {
    let filter = req.query.category ? { category: req.query.category } : {};
    let page = req.query.page ? Number(req.query.page) : 1;
    let resultPerPage = 8;

    let count = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .countDocuments();
    let skip = resultPerPage * (page - 1);
    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .limit(resultPerPage)
      .skip(skip);
    res.status(200).json({ success: true, count, blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Get latest four blog posts
const getLatestFourBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(4);
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

//Get a single blog by ID
const getBlogById = async (req, res) => {
  try {
    if (!req.user.permissions[0].readBlogs) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].readBlogs) {
      const blog = await Blog.findById(req.query.id);
      if (!blog) {
        return res
          .status(404)
          .json({ success: false, message: "Blog not found" });
      }
      res.json({ success: true, blog });
    } else {
      return res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBlogByIdGm = async (req, res) => {
  try {
    const blog = await Blog.findById(req.query.id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Update a blog by ID
const updateBlog = async (req, res) => {
  try {
    if (!req.user.permissions[0].updateBlogs) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].updateBlogs) {
      const blog = await Blog.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!blog) {
        return res
          .status(404)
          .json({ success: false, message: "Blog not found" });
      }
      res.status(200).json({
        success: true,
        data: blog,
        message: "Blog updated successfully",
      });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//Delete a blog by ID
const deleteBlog = async (req, res) => {
  try {
    if (!req.user.permissions[0].deleteBlogs) {
      return res.status(400).json({
        success: false,
        message: "Access Denied",
      });
    }
    if (req.user.permissions[0].deleteBlogs) {
      const blog = await Blog.findByIdAndDelete(req.query.id);
      if (!blog) {
        return res
          .status(404)
          .json({ success: false, message: "Blog not found" });
      }
      res.status(200).json({ success: true, message: "Blog deleted", blog });
    } else {
      res.status(401).json({ success: false, message: "Access Denied" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getLatestFourBlogs,
  getAllBlogsGm,
  getBlogByIdGm,
};
