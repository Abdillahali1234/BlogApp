import "./Profile.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UpdateProfile from "./components/UpdateProfile";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import {
  deleteProfile,
  getProfileUser,
  uploadProfilePhoto,
} from "../../redux/apicalls/profileCalls";
import { useNavigate, useParams } from "react-router-dom";
import PostsHome from "../Home/components/PostsHome";
import { logoutUser } from "../../redux/apicalls/authCalls";

export default function Profile() {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileInfo, isLoading, profileDeleted } = useSelector(
    (state) => state.profile
  );
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProfileUser(id));
    window.scrollTo(0, 0);
  }, []);
    
  useEffect(() => {
    if (profileDeleted) {
      navigate("/");
    }
  }, [navigate, profileDeleted]);
  //profile info
  const { user } = useSelector((state) => state.auth);

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("their  is no file");
    const formData = new FormData();
    formData.append("image", file);
      dispatch(uploadProfilePhoto(formData));
  };

  //delete account
  const handleDeleted = () => {
    Swal.fire({
      title: "Are you sure ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfile(profileInfo._id));
        dispatch(logoutUser());
      }
    });
  };
  if (isLoading) {
    return (
      <div className="con-profile-spinner">
        <div className="profile-spinners">
          <BeatLoader color="#36d7b7" />
        </div>
        <div className="h-[calc(100vh-128px)] lg:h-[calc(100vh-120.5px)]"></div>
      </div>
    );
  }
  return (
    <div className="w-[350px] my-[20px] sm:container m-auto min-h-[calc(100vh-(77.6px+50px))] container lg:min-h-[calc(100vh-(69.6px+50px))] ">
      <div
        className="py-[30px] md:my-[20px] md:py-[20px] bg-[#1d2d3d]"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: " center",
          textAlign: "center",
        }}>
        <div className="relative">
          <div className="">
            <img
              className="rounded-[50%] w-[100px] h-[100px] object-contain"
              src={`${
                file
                  ? URL.createObjectURL(file)
                  : `${profileInfo?.imagePortfolio?.url}`
              }`}
              alt="image-profile"
            />
            {profileInfo?._id === user.id && (
              <form className="" onSubmit={handleSubmit}>
                <abbr title="Edit your image profile" className="">
                  <label
                    htmlFor="filePhoto"
                    className="bi bi-camera-fill text-black text-[20px] label-camera"></label>
                  <button type="submit" className="btn2-image">
                    {" "}
                    upload
                  </button>
                </abbr>
                <input
                  type="file"
                  id="filePhoto"
                  className="hidden"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
              </form>
            )}
          </div>
        </div>
        <div className="text-white">
          <h3 className="my-[10px]  capitalize text-[20px] font-[500]">
            {profileInfo?.fName + " " + profileInfo?.lName}
          </h3>
          <p>{profileInfo?.bio}</p>
          <h4 className="text-[#778697]">
            Date joined:{" "}
            <span className="text-[#16a085] capitalize">
              {new Date(profileInfo?.createdAt).toDateString()}
            </span>
          </h4>
        </div>
        {profileInfo?._id === user.id && (
          <UpdateProfile id={id} profileInfo={profileInfo} />
        )}
      </div>
      <div>
        <h3 className="border-b-[3px] w-[60%] container capitalize m-auto border-black text-[25px] font-[700]">
          {profileInfo?.fName + " " + profileInfo?.lName} Posts
        </h3>

        {profileInfo?.posts?.length > 0 ? (
          profileInfo?.posts?.map((post) => {
            return (
              <PostsHome
                key={post?._id}
                post={post}
                userId={profileInfo?._id}
                userName={profileInfo?.fName + " " + profileInfo?.lName}
              />
            );
          })
        ) : (
          <div className="text-center my-[40px]">
            <h2 className="font-[600] text-[30px]">No Posts</h2>
          </div>
        )}
      </div>
      <div>
        {profileInfo?._id === user.id && (
          <button
            className="border-[1px] border-red-600 text-red-700 rounded-[5px] p-[10px]"
            onClick={handleDeleted}>
            delete Your Account
          </button>
        )}
      </div>
    </div>
  );
}
