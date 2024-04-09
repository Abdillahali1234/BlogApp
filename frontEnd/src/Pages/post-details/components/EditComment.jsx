/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { updateCommentFn } from "../../../redux/apicalls/commentCalls";
import { useDispatch } from "react-redux";

export default function EditComment({ comment, commentId }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(comment);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("comment is empty");
    dispatch(updateCommentFn(commentId, text));
    setOpen(false);
    //toast.success("Updated Successfully");
  };
  return (
    <>
      <i
        onClick={handleOpen}
        className="bi bi-pencil-square text-[#27ae60] cursor-pointer"></i>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="text-[#16a085] w-[100%] text-center">
          <span className="w-[100%]">Edit Your Comment</span>
          <i
            onClick={handleOpen}
            className="bi bi-x-circle mr-1 text-[#ba3a35] cursor-pointer"></i>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name=""
              id=""
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Edit your comment"
              className="bg-white p-[10px] rounded-[5px] outline-none border-[2px] my-[5px] w-[100%]"
            />
            <Button type="submit" className="bg-[#16a085] w-[100%]">
              <span>Update Comment</span>
            </Button>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}
