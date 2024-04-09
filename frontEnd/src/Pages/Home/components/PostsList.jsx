/* eslint-disable react/prop-types */
import PostsHome from "./PostsHome";


export default function PostsList({ posts }) {
  return (
    <>
      <section className="w-[100%] flex flex-col">
        {posts.map((post, index) => {
          return <PostsHome key={`1-${index}+2*${index}`} post={post} />;
        })}
      </section>
    </>
  );
}
