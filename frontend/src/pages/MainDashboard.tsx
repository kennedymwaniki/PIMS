import { Outlet } from "react-router";
import SideNav from "../components/SideNav";

const MainDashboard = () => {
  return (
    <div className="flex h-full bg-gray-100">
      <SideNav />
      <main className="flex-1 h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default MainDashboard;
