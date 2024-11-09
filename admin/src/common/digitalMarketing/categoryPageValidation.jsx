import * as Yup from "yup";

// Marketing Contact Us initial state

export const categoryPageInitialValues = {
  metaTitle: "",
  metaDescription: "",
  metaKeyword: "",
  slug: "",
  category: "",
};

// Marketing Contact Us schema

export const categoryPageValidationSchema = Yup.object({
  metaTitle: Yup.string()
    .max(20, "Meta title not more than least 20 char..")
    .required("Meta title is required")
    .min(2, "Meta title must be at least 4 char.."),

  metaDescription: Yup.string()
    .max(20, "Meta description not more than least 20 char..")
    .required("Meta description is required")
    .min(2, "Meta description must be at least 2 char.."),

  metaKeyword: Yup.string()
    .max(20, "Meta keyword not more than least 20 char..")
    .required("Meta keyword is required")
    .min(2, "Meta keyword must be at least 2 char.."),

  slug: Yup.string()
    .max(20, "Slug not more than least 20 char..")
    .required("Slug is required")
    .min(2, "Slug must be at least 2 char.."),

  category: Yup.string()
    .max(20, "Category not more than least 20 char..")
    .required("Category is required")
    .min(2, "Category must be at least 2 char.."),
});