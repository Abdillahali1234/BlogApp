import AdminMain from "./components/AdminMain";
import AdminSideBare from "./components/AdminSideBare";



export default function AdminDashboard() {
  return (
    <div className="min-h-[calc(100vh-(78px+50px))] md:min-h-[calc(100vh-(70px+50px))] flex box-border py-[3px]">
      <div className="hidden  lg:block md:flex-[2]">
        <AdminSideBare />
      </div>
      <div className="w-[100%] lg:flex-[10]">
        <AdminMain />
      </div>
    </div>
  );
}
