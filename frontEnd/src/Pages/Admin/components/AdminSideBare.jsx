import { Link } from "react-router-dom";

const URLS = [
  {
    url: "/admin-dashboard/users-table",
    icon: "bi bi-person",
    name: "users",
  },
  {
    url: "/admin-dashboard/posts",
    icon: "bi bi-file-post",
    name: "posts",
  },
  {
    url: "/admin-dashboard/categories",
    icon: "bi bi-tag-fill",
    name: "categories",
  },
  {
    url: "/admin-dashboard/comments",
    icon: "bi bi-chat-left-text",
    name: "comments",
  },
];

export default function AdminSideBare() {
  return (
    <div className="h-[100%] border-r-[1px] border-[#222] p-[10px] flex flex-col gap-[30px]">
      <div className="flex items-center gap-[10px]">
        <i className="bi bi-columns text-[#27ae60] text-[25px]"></i>
        <h3 className="font-[600] text-[25px]">Dashboard</h3>
      </div>
      <div className="flex flex-col gap-[20px]">
        {URLS.map(({ url, icon, name }, index) => {
          return (
            <div
              key={`${index}`}
              className="text-[#495e74] flex items-center gap-[8px] text-[20px] transition duration-100 cursor-pointer p-[5px] hover:rounded-[5px] hover:text-[white] hover:bg-[#0275d8]">
              <span className={`${icon}`}></span>
              <Link to={`${url}`}>{name}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
