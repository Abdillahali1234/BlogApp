import { Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import { resetPasswordSchema } from "../../Schemas/authSchema";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getResetPassword, resetPassword } from "./../../redux/apicalls/passwordCalls";
export default function ResetPassword() {
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.password);

  const { userId, token } = useParams();
  useEffect(() => {
    dispatch(getResetPassword(userId, token));
  }, [userId, token]);
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
      dispatch(resetPassword(values.password, { userId, token }));
    },
  });
  return (
    <div className="min-h-[calc(100vh-(78px+50px))] md:min-h-[calc(100vh-(70px+50px))] flex flex-col items-center ">
      {isError ? (
        <>
          <h2>Not Found</h2>
        </>
      ) : (
        <>
          <h2 className="my-[30px] text-[28px] text-black font-[600]">
            Reset Password
          </h2>
          <form noValidate onSubmit={formik.handleSubmit}>
            <div className="w-[400px] flex flex-col gap-[10px]">
              <Input
                type="password"
                label="Password"
                placeholder="Enter Your  New Password"
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
            </div>
            <button
              type="submit"
              className="w-[100%] bg-black p-[10px] rounded-[10px] text-white font-[600]">
              {" "}
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
}
