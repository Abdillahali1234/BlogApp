import { useEffect, useState } from "react";
import PostsList from "./../Home/components/PostsList";
import Pagination from "./components/pagination/Pagination";
import Sidebar from "./components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/apicalls/postCalls";
const POSTS_PER_PAGE = 3;
export default function PostPage() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { posts } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(fetchPosts(currentPage, POSTS_PER_PAGE));
    window.scrollTo(0, 0);
  }, [currentPage]);
  return (
    <div className="min-h-[calc(100vh-(78px+50px))] md:min-h-[calc(100vh-(70px+50px))]">
      <div className="container m-auto my-[10px] flex flex-col items-center">
        <div className="flex w-full justify-between items-start p-[30px] flex-col md:flex-row">
          <div className="flex flex-[9]  flex-col items-center">
            <PostsList posts={posts} />
            <div className="my-[20px]">
              <Pagination
                setCurrentPage={setCurrentPage}
                postsPerPage={POSTS_PER_PAGE}
              />
            </div>
          </div>
          <div className="w-[100%] md:flex-[3]">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
