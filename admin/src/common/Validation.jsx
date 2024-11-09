import * as Yup from "yup";

// product validation

export const productInitialValues = {
  image: "",
  images: [],
  name: "",
  description: "",
  category: "",
  price: "",
  //   image: "",
  shortDescription: "",
  manufacturer: "",
  strength: "",
  dosage: "",
  slug: "",
  //   discount: "",
  variantsAndPrices: [],
  sku: "",
  status: "",
  metaDescription: "",
  metaTitle: "",
  metaKeyword: "",
  bestSeller: false,
  bestOffer: false,
  featuredProduct: false,
};

// Register User

export const productValidationSchema = Yup.object({
  name: Yup.string()
    .max(100, "Product name not more than least 100 char..")
    .required("Product name is required")
    .min(4, "Product name must be at least 4 char.."),
  variantsAndPrices: Yup.array()
    // .of(
    //   Yup.object().shape({
    //     name: Yup.string().required("Variant is required"),
    //     price: Yup.number().required("Variant Price is required"),
    //   })
    // )
    .min(1, "At least one Variants is required"),
  images: Yup.array().min(1, "At least one image is required"),
  description: Yup.string().required("Product description is required"),
  category: Yup.string()
    .max(20, "Product category not more than least 20 char..")
    .required("Product category is required")
    .min(2, "Product category must be at least 2 char.."),
  shortDescription: Yup.string()
    .required("Product short description is required")
    .min(7, "Product short short description must be at least 7 char")
    .max(2000, "Product description not more than least 2000 char.."),
  price: Yup.number()
    .required("Price is required")
    .typeError("Price must be a number"),
  manufacturer: Yup.string().required("Product  manufacturer is required"),

  strength: Yup.string().required("Product  strength is required"),
  dosage: Yup.string().required("Product  dosage is required"),
  slug: Yup.string()
    .max(200, "Product  slug not more than least 200 char..")
    .required("Product  slug is required")
    .min(2, "Product  slug must be at least 2 char.."),
  sku: Yup.string()
    .max(20, "Product  sku not more than least 20 char..")
    .required("Product  sku is required")
    .min(2, "Product  sku must be at least 2 char.."),
  status: Yup.string().required("Status is required"),
  metaDescription: Yup.string()
    .max(100000, "Product Meta description not more than least 500 char..")
    .min(7, "Product Meta description must be at least 7 char..")
    .required("Product Meta description is required"),
  metaTitle: Yup.string()
    .max(10000, "Product Meta title not more than least 500 char..")
    .required("Product Meta title is required")
    .min(7, "Product Meta title must be at least 7 char.."),
  metaKeyword: Yup.string()
    .max(10000, "Product Meta keyword not more than least 500 char..")
    .required("Product Meta keyword is required")
    .min(7, "Product Meta keyword must be at least 7 char.."),
});

// category validation

export const categoryInitialValues = {
  name: "",
  status: false,
  image: "",
};

export const categoryValidationSchema = Yup.object({
  name: Yup.string()
    .max(20, "Category name not more than least 30 char..")
    .required("Category name is required")
    .min(4, "Category name must be at least 4 char.."),
  //   status: Yup.boolean().required("Status is required"),
});

// category validation

export const adminInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  isAdmin: true,
};

export const adminValidationSchema = Yup.object({
  firstName: Yup.string()
    .max(30, "First Name not more than least 30 char..")
    .required("First Name is required")
    .min(4, "First Name must be at least 4 char.."),
  lastName: Yup.string()
    .max(30, "Last Name not more than least 30 char..")
    .required("Last Name is required")
    .min(4, "Last Name must be at least 4 char.."),
  email: Yup.string().email("Invalid email").required("Email is required"),
  //   status: Yup.boolean().required("Status is required"),
});

// Blog validation and initial state

export const blogInitialValues = {
  title: "",
  content: "",
  author: "",
  slug: "",
  blogImage: "",
  featuredImage: "",
  status: "",
  metaDescription: "",
  metaTitle: "",
  metaKeyword: "",
  category: "",
  blogImage: "",
  featuredImage: "",
};

// Blog

export const blogValidationSchema = Yup.object({
  title: Yup.string()
    .max(20, "Blog title not more than least 30 char..")
    .required("Blog title is required")
    .min(4, "Blog title must be at least 4 char.."),
  content: Yup.string().required("Blog content description is required"),
  category: Yup.string()
    .max(20, "Blog category not more than least 20 char..")
    .required("Blog category is required")
    .min(2, "Blog category must be at least 2 char.."),
  author: Yup.string()
    .max(20, "Blog author not more than least 20 char..")
    .required("Blog author is required")
    .min(2, "Blog author must be at least 2 char.."),
  blogImage: Yup.string().required("Blog image is required"),
  featuredImage: Yup.string().required("Featured image is required"),
  slug: Yup.string()
    .max(20, "Blog slug not more than least 20 char..")
    .required("Blog slug is required")
    .min(2, "Blog slug must be at least 2 char.."),

  status: Yup.string().required("Blog status is required"),
  metaDescription: Yup.string().required("Blog meta description is required"),
  metaTitle: Yup.string().required("Blog meta title is required"),
  metaKeyword: Yup.string().required("Blog meta keyword is required"),
});

// Blog category validation and initial state

export const blogCategoryInitialValues = {
  name: "",
  status: "",
  image: "",
};

// Blog category schema

export const blogCategoryValidationSchema = Yup.object({
  name: Yup.string()
    .max(20, "Blog category not more than least 20 char..")
    .required("Blog category is required")
    .min(4, "Blog category must be at least 4 char.."),

  status: Yup.string()
    .max(20, "Blog category status not more than least 20 char..")
    .required("Blog category status is required")
    .min(2, "Blog category status must be at least 2 char.."),
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Pages

// About Us Page validation and initial state

export const aboutUsPageInitialValues = {
  description: "",
  imageUrl: "",
};

// About Us Page schema

export const aboutUsPageValidationSchema = Yup.object({
  description: Yup.string()
    .required("Description is required")
    .min(15, "At least 8 char.. are required"),
  imageUrl: Yup.string().required("Image is required"),

  // image: Yup.string().required("Image category status is required"),
});

// Package & Authenticity Page validation and initial state

export const packageAuthenticityPageInitialValues = {
  termsAndConditions: "",
};

// Package & Authenticity Page schema

export const packageAuthenticityPageValidationSchema = Yup.object({
  termsAndConditions: Yup.string()
    .required("Terms and conditions is required")
    .min(15, "At least 8 char.. are required"),
});

// Privacy policy Page validation and initial state

export const privacyPolicyPageInitialValues = {
  privacyPolicy: "",
};

// Privacy policy page  schema

export const privacyPolicyPageValidationSchema = Yup.object({
  privacyPolicy: Yup.string()
    .required("Privacy policy is required")
    .min(15, "At least 8 char.. are required"),
});
