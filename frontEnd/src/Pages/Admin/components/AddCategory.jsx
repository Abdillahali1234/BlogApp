import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addCategory } from "../../../redux/apicalls/categoryCalls";

export default function AddCategory() {
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (category.trim() === "") {
      toast.error("category is empty");
      return;
    }
    dispatch(addCategory({ title:category }));
  };
  return (
    <div className="flex justify-center items-center my-[30px]">
      <div className="bg-[#778697] w-[70%] p-[10px] rounded-[10px]">
        <h1 className="text-[25px] text-white">Add New Category</h1>
        <form className="flex flex-col gap-[10px]" onSubmit={handleSubmit}>
          <label htmlFor="category-title" className="text-[#efefef]">
            Category title
          </label>
          <input
            type="text"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            className="outline-none border-[1px] border-[#565656] p-[10px] rounded-[10px]"
          />
          <button
            type="submit"
            className="bg-mainColor p-[10px] rounded-[10px] text-[18px] text-white">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
