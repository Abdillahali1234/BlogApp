import { useDispatch, useSelector } from "react-redux";
import PostsList from "../Home/components/PostsList";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPostsCategory } from "../../redux/apicalls/postCalls";
export default function CategoryPage() {
  const dispatch = useDispatch();
  const { postsCat } = useSelector((state) => state.post);
  const { category } = useParams();
  useEffect(() => {
    dispatch(fetchPostsCategory(category));
  },[category]);
  return (
    <div className="container mx-auto  min-h-[calc(100vh-(78px+50px))] md:min-h-[calc(100vh-(70px+50px))]">
      {postsCat.length > 0 ? (
        <>
          <div>
            <h1 className="border-b-[3px]  border-black w-fit text-[28px] font-[bold] front-[600]">
              Posts Based On {category}
            </h1>
          </div>
          <PostsList posts={postsCat} />
        </>
      ) : (
        <div className="min-h-[400px]">
          <div className="flex flex-col justify-center items-center min-h-[400px] text-center">
            <h1 className="capitalize w-fit text-[28px] font-[bold] front-[600]">
              no posts based on {category}
            </h1>
            <Link
              to={"/posts"}
              className="text-mainColor decoration-mainColor underline link_posts_ca font-[600] w-fit">
              Go To Posts Page
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
