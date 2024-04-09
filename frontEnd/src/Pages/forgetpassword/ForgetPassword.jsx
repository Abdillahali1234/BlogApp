import { useFormik } from "formik";
import { forgetPasswordSchema } from "../../Schemas/authSchema";
import { Input } from "@material-tailwind/react";
import { forgotPassword } from "../../redux/apicalls/passwordCalls";
import { useDispatch } from 'react-redux';

export default function ForgetPassword() {
  const dispatch=useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: forgetPasswordSchema,
    onSubmit: (values) => {
      dispatch(forgotPassword(values.email));
    },
  });
  return (
    <div>
      <div className="min-h-[calc(100vh-(78px+50px))] md:min-h-[calc(100vh-(70px+50px))] flex flex-col items-center ">
        <h2 className="my-[30px] text-[28px] text-black font-[600]">
          Forget Password
        </h2>
        <form noValidate onSubmit={formik.handleSubmit}>
          <div className="w-[400px] flex flex-col gap-[10px]">
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
          </div>
          <button
            type="submit"
            className="w-[100%] bg-mainColor p-[10px] rounded-[10px] text-white font-[600]">
            {" "}
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
