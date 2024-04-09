import Swal from "sweetalert2";
import AdminSideBare from "../AdminSideBare";
import "../userstable/UsersTable.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteCategory,
  fetchCategories,
} from "../../../../redux/apicalls/categoryCalls";

export default function CategoryTable() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(fetchCategories());
  }, [categories]);
  const handleDeleted = (categoryId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCategory(categoryId));
      }
    });
  };
  return (
    <div className="flex min-h-[calc(100vh-(78px+50px))] md:min-h-[calc(100vh-(70px+50px))] overflow-hidden">
      <div className="hidden flex-0 lg:block lg:flex-[2]">
        <AdminSideBare />
      </div>
      <div className="users-table flex-[12] lg:flex-[10]">
        <h2 className="users-table-tittle">Categories</h2>
        <table className="table-wrapper">
          <thead>
            <tr>
              <th className="px-0 py-[10px] md:px-[10px]">Count</th>
              <th className="px-0 py-[10px] md:px-[10px] whitespace-nowrap">
                Category title
              </th>
              <th className="px-0 py-[10px] md:px-[10px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category, index) => {
              return (
                <tr key={category?._id} className={``}>
                  <td className="p-[0] md:px-[10px] text-[18px] text-center">
                    <span className="">{index + 1}</span>
                  </td>
                  <td className=" text-black font-[600] ">
                    <div className="flex flex-col lg:flex-row sm:gap-[5px] items-center gap-[5px] p-[10px]">
                      <span className="text-center">{category?.title} </span>
                    </div>
                  </td>
                  <td className="px-[10px]">
                    <div className="flex-col  lg:flex-row sm:gap-[5px] flex justify-around">
                      <button
                        onClick={() => {
                          handleDeleted(category._id);
                        }}
                        className="bg-[#d9534f] px-[10px] py-[5px] rounded-[5px] text-white ">
                        delete category
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
