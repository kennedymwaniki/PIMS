// import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiUsers, FiCalendar, FiLogOut } from "react-icons/fi";
import { BsCardChecklist, BsListCheck } from "react-icons/bs";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem = ({ to, icon, label }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 text-white hover:bg-indigo-700 transition-colors rounded-md ${
          isActive ? "bg-indigo-800 font-medium" : "font-normal"
        }`
      }
    >
      <span className="mr-3 text-xl">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
};

const SideNav: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-indigo-600 text-white w-64 p-4">
      <div className="flex items-center mb-8">
        <div className="w-10 h-10 bg-white rounded-full mr-3"></div>
        <div className="flex flex-col">
          <h2 className="font-bold text-lg">Admin Portal</h2>
          <span className="text-sm text-indigo-200">Administrator</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col space-y-1">
        <NavItem to="/doctor/clients" icon={<FiUsers />} label="Clients" />
        <NavItem
          to="/doctor/programs"
          icon={<BsCardChecklist />}
          label="Programs"
        />
        <NavItem
          to="/doctor/enrollments"
          icon={<BsListCheck />}
          label="Enrollments"
        />
        <NavItem
          to="/doctor/appointments"
          icon={<FiCalendar />}
          label="Appointments"
        />
      </div>

      <button
        className="flex items-center px-4 py-3 mt-auto text-white hover:bg-red-700 hover:text-white transition-colors rounded-md"
        onClick={() => {
          // Add logout functionality here
          console.log("Logging out...");
        }}
      >
        <span className="mr-3 text-xl">
          <FiLogOut />
        </span>
        <span>Logout</span>
      </button>
    </div>
  );
};

export default SideNav;
