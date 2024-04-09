import Swal from "sweetalert2";
import AdminSideBare from "../AdminSideBare";
import "../userstable/UsersTable.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { deletePost, fetchPosts, getAllPosts } from "../../../../redux/apicalls/postCalls";

export default function PostTable() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getAllPosts());
  }, [posts]);

  const handleDeleted = (postId) => {
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
        dispatch(deletePost(postId));
      }
    });
  };
  return (
    <div className="flex min-h-[calc(100vh-(78px+50px))] md:min-h-[calc(100vh-(70px+50px))] overflow-hidden">
      <div className="hidden flex-0 lg:block lg:flex-[2]">
        <AdminSideBare />
      </div>
      <div className="users-table flex-[12] lg:flex-[10]">
        <h2 className="users-table-tittle">Categories</h2>
        <table className="table-wrapper">
          <thead>
            <tr>
              <th className="px-0 py-[10px] md:px-[10px]">Count</th>
              <th className="px-0 py-[10px] md:px-[10px] whitespace-nowrap">
                User
              </th>
              <th className="px-0 py-[10px] md:px-[10px]">Post Title</th>
              <th className="px-0 py-[10px] md:px-[10px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post, index) => {
              return (
                <tr key={post?._id} className={``}>
                  <td className="p-[0] md:px-[10px] text-[18px] text-center">
                    <span className="">{index + 1}</span>
                  </td>

                  <td className=" text-black font-[600] ">
                    <div className="flex flex-col lg:flex-row sm:gap-[5px] items-center gap-[5px] p-[10px]">
                      <span className="text-center">
                        {post?.user?.fName + " " + post?.user?.lName}{" "}
                      </span>
                    </div>
                  </td>
                  <td className=" text-black font-[600] ">
                    <div className="flex flex-col lg:flex-row sm:gap-[5px] items-center gap-[5px] p-[10px]">
                      <span className="text-center">{post?.title} </span>
                    </div>
                  </td>
                  <td className="px-[10px]">
                    <div className="flex-col lg:flex-row gap-[5px] md:gap-3 flex justify-center">
                      <button className="px-[10px] py-[5px] rounded-[5px] text-white  bg-[#27ae60]">
                        <Link to={`/posts/details/${post?._id}`}>
                          view post
                        </Link>
                      </button>
                      <button
                        onClick={() => {
                          handleDeleted(post?._id);
                        }}
                        className="bg-[#d9534f] px-[10px] py-[5px] rounded-[5px] text-white ">
                        delete post
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
