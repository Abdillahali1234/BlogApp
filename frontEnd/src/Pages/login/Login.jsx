import { Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import { loginSchema } from "../../Schemas/authSchema";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apicalls/authCalls";
import { Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });
  return (
    <div className="min-h-[calc(100vh-(78px+50px))] md:min-h-[calc(100vh-(70px+50px))] flex flex-col items-center ">
      <h2 className="my-[30px] text-[28px] text-mainColor">
        Login to your account
      </h2>

      <form noValidate onSubmit={formik.handleSubmit}>
        <div className="w-[400px] flex flex-col gap-[20px]">
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email address"
            autoComplete="off"
            aria-autocomplete="off"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="text-red-500">
            {formik.touched.email && formik.errors.email}
          </div>
          <Input
            type="password"
            label="Password"
            placeholder="Enter Your Password"
            autoComplete="off"
            aria-autocomplete="off"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="text-red-500">
            {formik.touched.password && formik.errors.password}
          </div>

          <button
            type="submit"
            className="w-[100%] bg-mainColor p-[10px] rounded-[10px] text-white font-[600]">
            {" "}
            Login
          </button>
        </div>
      </form>
      <div className="my-[10px]">
        Did you forget your password ?
        <Link to={"/forget-password"} className="text-[#0275d8]">
          Forget Password
        </Link>
      </div>
    </div>
  );
}
