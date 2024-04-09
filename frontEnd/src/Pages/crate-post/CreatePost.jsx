import { useEffect, useState } from "react";
import "./createPost.css";
import { schemaPost } from "../../Schemas/createPostSchema";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../../redux/apicalls/postCalls";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { fetchCategories } from "../../redux/apicalls/categoryCalls";
export default function CreatePost() {
  const [title, setTitile] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schemaPost.validate({ title, category, description, image });
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("image", image);
      dispatch(createNewPost(formData));
    } catch (errors) {
      // Log validation errors
      toast.error(errors.message);
    }
  };
  const { isPostCreated, isLoading } = useSelector((state) => state.post);
  const navigate = useNavigate();
  useEffect(() => {
    if (isPostCreated) {
      navigate("/");
    }
  }, [isPostCreated, navigate]);
  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [categories]);

  return (
    <section className="bg-[#efefef]">
      <div className="h-[calc(100vh-(77.6px+50px))] container m-auto lg:h-[calc(100vh-(69.6px+50px))] ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center py-[20px]">
          <input
            type="text"
            placeholder="Post Title"
            className="input-title"
            value={title}
            onChange={(e) => {
              setTitile(e.target.value);
            }}
          />
          <select
            name=""
            id=""
            className="input-category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}>
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => {
              return (
                <option key={title?._id} value={`${category?.title}`}>
                  {category?.title}
                </option>
              );
            })}
          </select>

          <textarea
            name=""
            id=""
            rows="7"
            className="text-area"
            placeholder="Enter Post Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}>
            {" "}
          </textarea>
          <input
            type="file"
            name=""
            id=""
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            className="md:w-[100%] bg-[#495e74] w-[80%] rounded-[5px] p-[10px] text-[20px] capitalize cursor-pointer"
          />

          <Button
            type="submit"
            color="#1d2d3d"
            className="md:w-[100%]  w-[80%] my-[5px] bg-[#1d2d3d] p-[10px] cursor-pointer rounded-[5px] text-white text-[20px]"
            loading={isLoading}>
            {isLoading ? "Loading..." : "create"}
          </Button>
        </form>
      </div>
    </section>
  );
}
