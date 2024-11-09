import * as Yup from "yup";

// Shop All Page Validation

export const shopAllPageInitialValues = {
  sliderBannerImageUrl: [],
};

// Shop All Page Validation

export const shopAllPageValidationSchema = Yup.object({
  sliderBannerImageUrl: Yup.array()
    .min(1, "At least 1 image is required.")
    .max(3, "Maximum 3 images you can upload."),
});
