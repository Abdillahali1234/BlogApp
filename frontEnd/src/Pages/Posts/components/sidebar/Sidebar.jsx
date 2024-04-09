import { Link } from "react-router-dom";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "./../../../../redux/apicalls/categoryCalls";
export default function Sidebar() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [categories]);
  
  return (
    <div className="mx-[20px] text-center">
      <div className="border-y-[2px] border-black">
        <h2 className="uppercase text-[25px] font-[600]">categories</h2>
      </div>
      {categories.map((category) => {
        return (
          <div
            key={category.id}
            className=" bg-[#778697] capitalize my-[5px] p-[5px]  w-[100%] category cursor-pointer  transition duration-75  hover:bg-[#d35400]">
            <Link to={`/posts/categories/${category?.title}`}>
              {category?.title}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
