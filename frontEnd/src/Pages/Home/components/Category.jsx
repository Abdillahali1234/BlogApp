/* eslint-disable react/prop-types */


import { Link } from "react-router-dom";

export default function Category({ categories}) {

  return (
    <div>
      <div className="capitalize italic flex gap-[5]">
        <p className="px-[5px] text-[#5A7184] text-[20px]">
          popular tag<span className="text-[20px]">{":"}</span>
        </p>
        <div className="text-mainColor ">
        {
            categories.map((category,index)=>{
                    return (
                      <button
                        key={`${index}+${4 * index}`}
                        className="bg-[rgba(21,102,216,0.3)] rounded-[6px] min-w-[82px] italic min-h-[32px] text-mainColor px-[5px] mx-[4px]">
                        <Link to={`/posts/categories/${category?.title}`}>
                          {category?.title}
                        </Link>
                      </button>
                    );

            })
        }
        </div>
      </div>
    </div>
  );
}
