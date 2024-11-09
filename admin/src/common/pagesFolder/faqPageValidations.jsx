import * as Yup from "yup";

// Pages FAQ page initial state

export const faqPageInitialValues = {
  category: "",
  question: "",
  answer: "",
  status: "",
};

// Pages FAQ page schema

export const faqPageValidationSchema = Yup.object({
  category: Yup.string()
    .max(100, "Category not more than least 100 char..")
    .required("Category is required")
    .min(2, "Category must be at least 2 char.."),

  question: Yup.string()
    .max(200, "Question not more than least 200 char..")
    .required("Question is required")
    .min(2, "Question must be at least 2 char.."),

  answer: Yup.string()
    .max(500, "Answer not more than least 500 char..")
    .required("Answer is required")
    .min(2, "Answer must be at least 2 char.."),

  status: Yup.string()
    .max(20, "Status not more than least 20 char..")
    .required("Status is required")
    .min(2, "Status must be at least 2 char.."),
});
