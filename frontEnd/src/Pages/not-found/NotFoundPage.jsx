import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-(78px+50px))] md:min-h-[calc(100vh-(70px+50px))] gap-[10px] flex flex-col items-center justify-center">
      <h2 className="text-[#d35400] text-[60px]  font-[700]">404</h2>
      <h3 className="text-[#1d2d3d] text-[27px] font-[600]">Page Not Found</h3>
      <button className="bg-[#495e74] px-[10px] py-[5px] text-white rounded-[5px]">
        <Link to={"/"}> Go to home page</Link>
      </button>
    </div>
  );
}
