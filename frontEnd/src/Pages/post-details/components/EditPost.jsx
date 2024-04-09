/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { schemaPost2 } from "../../../Schemas/createPostSchema";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Button,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../../redux/apicalls/postCalls";
import { fetchCategories } from "../../../redux/apicalls/categoryCalls";

export default function EditPost({ post }) {
  const [open, setOpen] = React.useState(false);
  const { categories } = useSelector ((state) => state.category);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [categories]);

  const handleOpen = () => {
    setOpen(!open);
  };
  const dispatch = useDispatch();
  //edit comment
  const [title, setTitile] = useState(post?.title);
  const [description, setDescription] = useState(post?.description);
  const [category, setCategory] = useState(post?.category);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await schemaPost2.validate({ title, category, description });
      if (data) {
        dispatch(updatePost(post?._id, data));
        setOpen(false);
      }
    } catch (errors) {
      // Log validation errors
      toast.error(errors.message);
    }
  };
  return (
    <>
      <i
        onClick={handleOpen}
        className="bi bi-pencil-square text-[#27ae60] cursor-pointer"></i>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="text-[#16a085] w-[100%] text-center">
          <span className="w-[100%]">Edit Your Post</span>
          <i
            onClick={handleOpen}
            className="bi bi-x-circle mr-1 text-[#ba3a35] cursor-pointer"></i>
        </DialogHeader>
        <DialogBody>
          <div>
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
                {
                  categories.map((category) => (
                    <option value={category?.title} key={category._id}>
                      {category?.title}
                    </option>
                  ))
                }
                <option value="coffee">coffee</option>
                <option value="programming">programming</option>
                <option value="dance">Dance</option>
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
              <Button type="submit" className="bg-[#16a085] w-[100%]">
                <span>Update Post</span>
              </Button>
            </form>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
