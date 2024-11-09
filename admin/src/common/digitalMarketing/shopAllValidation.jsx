import * as Yup from "yup";

// Marketing Shop All initial state

export const shopAllInitialValues = {
  metaTitle: "",
  metaDescription: "",
  metaKeyword: "",
  slug: "",
};

// Marketing Shop All schema

export const shopAllValidationSchema = Yup.object({
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
});
