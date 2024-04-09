import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyEmail } from "../../redux/apicalls/authCalls";
export default function VerifyEmailPage() {
  const dispatch = useDispatch();
  const { isEmailVerified } = useSelector((state) => state.auth);
  const { userId, token } = useParams();
  useEffect(() => {
    dispatch(verifyEmail(userId, token));
  }, [userId, token]);
  return (
    <div className="min-h-[calc(100vh-(78px+50px))] md:min-h-[calc(100vh-(70px+50px))] flex justify-center items-center">
      {isEmailVerified ? (
        <>
          <div className="flex flex-col justify-center gap-2 items-center">
            <i className="bi bi-patch-check text-[50px] text-green-600"></i>
            <h2 className="text-[18px] text-center md:text-[50px] text-green-600">
              Your Email Address has been successfully verified
            </h2>
            <Link
              to={"/auth/login"}
              className="bg-[#1d2d3d] text-white p-[5px] rounded-[5px]">
              Go To Login Page
            </Link>
          </div>
        </>
      ) : (
        <>
          <div>
            <h1 className="text-[40px] capitalize text-[#d9534f]">not found</h1>
          </div>
        </>
      )}
    </div>
  );
}
