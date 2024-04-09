import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AddCommentFn } from "../../../redux/apicalls/commentCalls";

// eslint-disable-next-line react/prop-types
export default function AddComment({ postId }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [text, setText] = useState("");
  const handleSubmit = (e) => {
     e.preventDefault();
        if(user){
             
              if (text.trim() === "") return toast.error("comment is empty");
              dispatch(AddCommentFn({ text, postId }));
              toast.success("comment added");
        }
        else{
          toast.error("please login to comment");
        }
  };
  return (
    <div className="w-[100%]">
      
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-start text-[18px] my-[5px]">
          <input
            type="text"
            name=""
            id=""
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment"
            className="bg-white p-[10px] rounded-[5px] outline-none"
          />
          <button
            type="submit"
            className="bg-[#1d2d3d] w-fit px-[10px] py-[2px] rounded-[5px] text-white my-[5px]">
            comment
          </button>
        </form>
      
    </div>
  );
}
