import * as Yup from "yup";

// Pages category Page validation and initial state

export const categoriesPageInitialValues = {
  category: "",
  sliderBannerImageUrl: [],
};

// Pages category policy page  schema

export const categoriesPolicyPageValidationSchema = Yup.object({
  category: Yup.string().required("Category is required"),
  sliderBannerImageUrl: Yup.array().min(1, "At least one image is required"),
});
