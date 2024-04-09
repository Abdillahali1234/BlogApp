import { useFormik } from "formik";
import { Input } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../../Schemas/authSchema";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apicalls/authCalls";
import swal from "sweetalert2";
export default function Register() {
  const { messageRegister } = useSelector((state) => state.auth);
  // handle valdition
  const dispatch = useDispatch();
  const navgiate = useNavigate();
  const formik = useFormik({
    initialValues: {
      fName: "",
      lName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    validateOnBlur: true,
    validateOnChange: true,

    onSubmit: (values) => {
      dispatch(registerUser({
        fName: values.fName,
        lName: values.lName,
        email: values.email,
        password: values.password,
      }));
      if (messageRegister) {
        swal.fire({
          title: messageRegister,
          icon: "success",
        }).then((isOk) => {
          if (isOk) {
            navgiate("/auth/login");
          }
        });
      }
    },
  });

  return (
    <div className="min-h-[calc(100vh-(78px+50px))] md:min-h-[calc(100vh-(70px+50px))] flex flex-col items-center ">
      <h2 className="my-[30px] text-[28px] text-mainColor">
        Create new account
      </h2>
      <form noValidate onSubmit={formik.handleSubmit}>
        <div className="w-[400px] flex flex-col gap-[20px]">
          <Input
            type="text"
            label="First Name"
            placeholder="Enter Your first name"
            autoComplete="off"
            aria-autocomplete="off"
            name="fName"
            value={formik.values.fName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="text-red-500">{formik.errors.fName}</div>
          <Input
            type="text"
            label="Last Name"
            placeholder="Enter Your last name"
            autoComplete="off"
            aria-autocomplete="off"
            name="lName"
            value={formik.values.lName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="text-red-500">
            {formik.touched.lName && formik.errors.lName}
          </div>
          <Input
            type="email"
            label="Email"
            placeholder="Enter Your Email"
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
          <Input
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            autoComplete="off"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="text-red-500">
            {formik.touched.confirmPassword && formik.errors.confirmPassword}
          </div>
          <button
            type="submit"
            className="w-[100%] bg-mainColor p-[10px] rounded-[10px] text-white font-[600]">
            {" "}
            Register
          </button>
        </div>
      </form>
      <div className="my-[10px]">
        <span>
          Already have an account?
          <Link to={"/auth/login"} className="text-blue-700 text-[18px]">
            {"  "}login
          </Link>
        </span>
      </div>
    </div>
  );
}
