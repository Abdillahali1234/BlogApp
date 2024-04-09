import { Link } from "react-router-dom";
import "./HomePage.css";
import Header from "./components/Header";
import PostsList from "./components/PostsList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../../redux/apicalls/postCalls";
export default function HomePage() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);  
  useEffect(() => {
    dispatch(fetchPosts(1));
  }, []);

  return (
    <div className="min-h-[calc(100vh-(78px+50px))] md:min-h-[calc(100vh-(70px+50px))]">
      <div className="container m-auto">
        <Header />
        <div>
          <div>
            <h2 className="text-[25px] w-fit font-[500] border-b-4 border-[#000] ">
              Latest Post
            </h2>
          </div>
          <PostsList posts={posts} />
        </div>
        <div className="text-center my-[10px] text-[20px] bg-[#495e74] p-[5px] rounded-[5px]">
          <Link to={"/posts"}>See All Posts</Link>
        </div>
      </div>
    </div>
  );
}
