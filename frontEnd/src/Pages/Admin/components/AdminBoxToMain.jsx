import { Link } from "react-router-dom";
import "./AdminBox.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../../redux/apicalls/categoryCalls";
import { getProfilesCount } from "../../../redux/apicalls/profileCalls";
import { fetchPostsCount } from "../../../redux/apicalls/postCalls";
import { getAllComments } from "../../../redux/apicalls/commentCalls";
const boxes = [
  {
    url: "/admin-dashboard/users-table",
    icon: "bi bi-person",
    name: "users",
    count: "400",
  },
  {
    url: "/admin-dashboard/posts",
    icon: "bi bi-file-post",
    name: "posts",
    count: "400",
  },
  {
    url: "/admin-dashboard/categories",
    icon: "bi bi-tag-fill",
    name: "categories",
    count: "400",
  },
  {
    url: "/admin-dashboard/comments",
    icon: "bi bi-chat-left-text",
    name: "comments",
    count: "400",
  },
];
export default function AdminBoxToMain() {
  const { categories } = useSelector((state) => state.category);
  const { userCount } = useSelector((state) => state.profile);
  const { postsCount } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchPostsCount());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProfilesCount());
  }, [dispatch, userCount]);
  const { comments } = useSelector((state) => state.comment);
  useEffect(() => {
    dispatch(getAllComments());
  }, []);
  return (
    <div className="flex flex-wrap gap-[20px] justify-between border-b-[2px] border-[#495e74] pb-[20px]">
      {boxes.map((box, index) => {
        return (
          <div className="admin-box w-[100%] md:w-[45%] xl:w-[20%]" key={index}>
            <div>
              <h4 className="capitalize">{box.name}</h4>
              <h5>
                {box.name == "categories"
                  ? categories?.length
                  : box.name == "users"
                  ? userCount
                  : box.name == "posts"
                  ? postsCount
                  : box.name == "comments"
                  ? comments?.length
                  : box.count}
              </h5>
            </div>

            <div className="flex items-center justify-between">
              <button className="btn-adminBox">
                <Link to={`${box.url}`} className="capitalize">
                  See All {box.name}
                </Link>
              </button>
              <i
                className={`${box.icon}bg-[#495e74] px-[8px] py-[3px] rounded-[10px] text-white`}></i>
            </div>
          </div>
        );
      })}
    </div>
  );
}
