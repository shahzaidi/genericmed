import * as Yup from "yup";
import { string, object, number, array, date, boolean, mixed } from "yup";

// otp Validation

export const otpInitialValue = {
  email: "",
  //   otp: undefined,
};

export const otpValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required.."),
  //   otp: Yup.number("Otp should be number").required("Otp is required"),
});

// user register

export const registerInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  mobileNumber: "",
  otp: "",
};

// Register User

export const registerValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  firstName: Yup.string()
    .max(20, "First name not more than least 20 char..")
    .required("First name is required")
    .min(2, "First name must be at least 2 char.."),
  lastName: Yup.string()
    .max(20, "Last name not more than least 20 char..")
    .required("Last Name is required")
    .min(2, "Last name must be at least 2 char.."),
  mobileNumber: Yup.string()
    .required("Phone number is required")
    .min(7, "Phone number must be at least 7 char"),
  otp: Yup.string().required("Otp is required"),
});

// Login User

export const loginInitialValues = {
  email: "",
  otp: "",
};

export const loginValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  otp: Yup.string().required("Otp is required"),
});

// User Address

export const userAddressValidationSchema = Yup.object({
  firstName: Yup.string()
    .max(20, "First name not more than least 20 char..")
    .required("First name is required")
    .min(2, "First name must be at least 2 char.."),
  lastName: Yup.string()
    .max(20, "Last name not more than least 20 char..")
    .required("Last Name is required")
    .min(2, "Last name must be at least 2 char.."),
  phone: Yup.string()
    .required("Phone number is required")
    .min(7, "Phone number must be at least 7 char"),
  street: Yup.string()
    .required("street is required")
    .min(4, "street must be at least 4 char..")
    .max(200, "street not more than least 50 char.."),
  country: Yup.string()
    .required("country is required")
    .min(2, "country must be at least 2 char..")
    .max(50, "country not more than least 50 char.."),
  state: Yup.string()
    .required("state is required")
    .min(2, "state must be at least 2 char..")
    .max(50, "state not more than least 50 char.."),
  city: Yup.string()
    .required("city is required")
    .min(2, "city must be at least 2 char..")
    .max(50, "city not more than least 50 char.."),
  zipCode: Yup.string()
    .required("zip code is required")
    .min(2, "city must be at least 2 char..")
    .max(8, "zip code not more than least 8 char.."),
});

// User Address

export const userAddressInitialValues = {
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  state: "",
  country: "",
  phone: "",
  zipCode: "",
};

// Update User Profile

export const updateProfileValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  firstName: Yup.string()
    .max(20, "First name not more than least 20 char..")
    .required("First name is required")
    .min(2, "First name must be at least 2 char.."),
  lastName: Yup.string()
    .max(20, "Last name not more than least 20 char..")
    .required("Last Name is required")
    .min(2, "Last name must be at least 2 char.."),
  mobileNumber: Yup.string()
    .required("Phone number is required")
    .min(7, "Phone number must be at least 7 char"),
});

// Update User Profile

export const updateProfileInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  mobileNumber: "",
};

// Contact Us

export const contactUsValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  name: Yup.string()
    .max(20, "Name not more than least 20 char..")
    .required("Name is required")
    .min(2, "Name must be at least 2 char.."),
  message: Yup.string()
    .max(200, "Message not more than least 200 char..")
    .required("Message is required")
    .min(20, "Message must be at least 20 char.."),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .min(7, "Phone number must be at least 7 char"),
});

// Update User Profile

export const contactUsInitialValues = {
  email: "",
  name: "",
  message: "",
  phoneNumber: "",
};

// Guest User Order Address
export const guestUserOrderAddressInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  street: "",
  city: "",
  state: "",
  country: "",
  phone: "",
  zipCode: "",
};

// Guest User Order Address
export const guestUserOrderAddressValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  firstName: Yup.string()
    .max(20, "First name not more than least 20 char..")
    .required("First name is required")
    .min(2, "First name must be at least 2 char.."),
  lastName: Yup.string()
    .max(20, "Last name not more than least 20 char..")
    .required("Last Name is required")
    .min(2, "Last name must be at least 2 char.."),
  phone: Yup.string()
    .required("Phone number is required")
    .min(7, "Phone number must be at least 7 char"),
  street: Yup.string()
    .required("street is required")
    .min(4, "street must be at least 4 char..")
    .max(200, "street not more than least 50 char.."),
  country: Yup.string()
    .required("country is required")
    .min(2, "country must be at least 2 char..")
    .max(50, "country not more than least 50 char.."),
  state: Yup.string()
    .required("state is required")
    .min(2, "state must be at least 2 char..")
    .max(50, "state not more than least 50 char.."),
  city: Yup.string()
    .required("city is required")
    .min(2, "city must be at least 2 char..")
    .max(50, "city not more than least 50 char.."),
  zipCode: Yup.string()
    .required("zip code is required")
    .min(2, "city must be at least 2 char..")
    .max(8, "zip code not more than least 8 char.."),
});
