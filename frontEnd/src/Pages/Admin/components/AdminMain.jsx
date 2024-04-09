import AddCategory from "./AddCategory";
import AdminBoxToMain from "./AdminBoxToMain";

export default function AdminMain() {
  return (
    <div className="p-[10px]">
      <AdminBoxToMain />
      <AddCategory/>
    </div>
  );
}
