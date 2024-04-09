import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddComment from "./components/AddComment";
import CommentList from "./components/CommentList";
import Swal from "sweetalert2";
import EditPost from "./components/EditPost";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  fetchPost,
  toggleLike,
  updatePostImage,
} from "../../redux/apicalls/postCalls";
export default function PostDetails() {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { post } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPost(id));
    window.scrollTo(0, 0);
  }, [id]);
  const { user } = useSelector((state) => state.auth);
  // handle update image
  const handleUpdateImage = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("their  is no file");
    console.log("enterd");
    const formData = new FormData();
    formData.append("image", file);
    dispatch(updatePostImage(post?._id, formData));
  };
  // handle delete
  const handleDeleted = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?.id}`);
      }
    });
  };
  return (
    <div className="bg-[#efefef]">
      <div className="container  flex flex-col justify-center items-center py-[30px] mx-auto">
        <div className="">
          <img
            className="w-[300px] md:w-[100%] max-h-[360px] object-contain md:max-w-[700px] py-[10px]"
            src={`${file ? URL.createObjectURL(file) : `${post?.image?.url}`}`}
            alt="image-post"
          />
          {user?.id == post?.user?._id && (
            <>
              <form
                onSubmit={handleUpdateImage}
                className="flex  items-center content-center md:content-start gap-[12px]">
                <div className="flex gap-[5px] cursor-pointer items-center text-mainColor text-[18px]">
                  <i className="bi bi-image"></i>
                  <label htmlFor="inputToImage" className="cursor-pointer">
                    Select new image
                  </label>
                </div>
                <input
                  type="file"
                  name=""
                  className="hidden"
                  id="inputToImage"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <button
                  type="submit"
                  className="capitalize bg-[#1d2d3d] text-[white] p-[5px] rounded-[5px] mt-[5px]">
                  upload
                </button>
              </form>
            </>
          )}
        </div>

        <div>
          <h1 className="text-[20px] capitalize font-[600]">{post?.title}</h1>
        </div>
        <div className="user-details flex content-center items-center gap-[20px]">
          <div>
            <img
              className="w-[60px] h-[60px] rounded-[50%] "
              src={`${post?.user?.imagePortfolio?.url}`}
              alt=""
            />
          </div>
          <div className="flex flex-col">
            <span className="text-blue-500 text-[20px] capitalize">
              {" "}
              {post?.user?.fName + " " + post?.user?.lName}
            </span>
            <span className="text-[#778697]">
              {new Date(post?.createdAt).toDateString()}
            </span>
          </div>
        </div>
        <div className="py-[10px]">
          <p className="text-black text-center text-[15px] px-[10px] md:p-0 md:text-[18px]">
            {post?.description}
          </p>
        </div>
        <div className="flex justify-between items-center w-[90%]">
          <div className="flex gap-[5px] text-[20px] cursor-pointer text-mainColor">
            <i
              onClick={() => {
                dispatch(toggleLike(post?._id));
              }}
              className={
                post?.likes.includes(user?.id)
                  ? "bi bi-hand-thumbs-up-fill text-[25px]"
                  : "bi bi-hand-thumbs-up text-[25px]"
              }></i>
            <span>{post?.likes?.length} likes</span>
          </div>

          {user?.id == post?.user?._id && (
            <div className="flex gap-[3px] text-[20px]">
              <EditPost post={post} />
              <i
                className="bi bi-trash-fill cursor-pointer text-[#d9534f]"
                onClick={handleDeleted}></i>
            </div>
          )}
        </div>
        <div className="w-[90%]">
          <AddComment postId={post?._id} />
          <CommentList comments={post?.comments} />
        </div>
      </div>
    </div>
  );
}
