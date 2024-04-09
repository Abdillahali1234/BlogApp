import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  fName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 char"),
  lName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 char"),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email address is required"),
  password: Yup.string()
    .min(8, "password must be Larger than 8 char")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .required("confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});


export const loginSchema=Yup.object().shape({
  email: Yup.string().email("Enter a valid email address").required("Email address is required"),
  password: Yup.string().required("Password is required"),
});
export const forgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email address is required"),
});
export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
});