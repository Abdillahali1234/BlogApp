import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
export default function PostsHome({ post,postId,userName }) {
  const handlePost = postId ? postId : post?.user?.id; 
  const handleUserName = userName ? userName : (post?.user?.fName + " "+ post.user?.lName);
  return (
    <>
      <div className="post-section border-[1px] border-[#495e74] my-[10px] w-[100%] rounded-[5px]">
        <div className="flex items-center justify-center p-[17px] w-[100%]">
          <img
            className="w-[100%] h-[300px] object-contain rounded-[5px]"
            src={`${post?.image.url}`}
            alt=""
          />
        </div>
        <div className="details  mx-[15px]">
          <div className="flex justify-between border-b-[1px] border-[#1d2d3d]">
            <h2>
              <span className="text-[#16a085] font-[600] cursor-pointer">
                Author:
              </span>{" "}
              <Link to={`/profile/${handlePost || 1}`}>{handleUserName}</Link>
            </h2>
            <h3 className="text-[#16a085] font-[600]">
              {new Date(post?.createdAt).toDateString()}
            </h3>
          </div>
          <div className="title flex justify-between py-[5px]">
            <div className="font-[600] text-[25] py-[5px] ">{post?.title}</div>
            <div className="bg-[#d35400] rounded-[10px] px-[5px] text-center flex items-center justify-center ">
              {" "}
              <span className="text-center text-white"> {post?.category}</span>
            </div>
          </div>
          <div className="description">{post?.description}</div>

          <div className="flex justify-center my-[10px] bg-[#27ae60] text-white font-[500] text-[20px] rounded-[6px]">
            <Link to={`/posts/details/${post?._id}`}>Read more</Link>
          </div>
        </div>
      </div>
    </>
  );
}
