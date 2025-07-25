import React from "react";
import { NavLink } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import {
  LayoutDashboard,
  Boxes,
  FileText,
  Truck,
  ShoppingCart,
  Store,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const { isCollapsed, isMobile, toggleSidebar } = useSidebar();

  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard", path: "/admin/dashboard" },
    { icon: <Boxes size={18} />, label: "Inventory", path: "/admin/inventory" },
    { icon: <FileText size={18} />, label: "Reports", path: "/admin/reports" },
    { icon: <Truck size={18} />, label: "Suppliers", path: "/admin/suppliers" },
    { icon: <ShoppingCart size={18} />, label: "Sales", path: "/admin/sales" },
    { icon: <Store size={18} />, label: "Manage Store", path: "/admin/manage-store" },
    { icon: <Users size={18} />, label: "Employees", path: "/admin/employees" },
  ];

  const footerItems = [
    { icon: <Settings size={18} />, label: "Settings", path: "/admin/settings" },
    { icon: <LogOut size={18} />, label: "Logout", path: "/login" },
  ];

  const getLinkClasses = ({ isActive }) => {
    const base = `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
      isCollapsed ? "justify-center" : ""
    }`;
    return isActive
      ? `${base} bg-blue-50 text-blue-600 font-semibold ${!isCollapsed ? "border-r-2 border-blue-600" : ""}`
      : `${base} text-gray-700 hover:bg-gray-100 hover:text-blue-600`;
  };

  return (
    <>
      {isMobile && !isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-20 h-screen bg-white shadow-lg flex flex-col justify-between transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-16" : "w-52"
        } ${isMobile && isCollapsed ? "-translate-x-full" : "translate-x-0"}`}
      >
        {/* Header */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            {!isCollapsed && (
              <div className="bg-[#f4faf8] px-3 py-2 rounded-md text-[#496961] font-black font-[Lato] text-base hover:text-blue-600">
                LOGO
              </div>
            )}
            <button
              onClick={toggleSidebar}
              className={`p-1 rounded-lg bg-gray-300 hover:bg-blue-500 transition-colors ${
                isCollapsed ? "mx-auto" : ""
              }`}
            >
              {isCollapsed ? <Menu size={18} /> : <X size={18} />}
            </button>
          </div>

          {/* Menu */}
          <ul className="space-y-2 text-sm font-medium">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <NavLink
                  to={item.path}
                  className={getLinkClasses}
                  title={isCollapsed ? item.label : ""}
                >
                  {item.icon}
                  {!isCollapsed && <span>{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="p-4">
          <ul className="space-y-2 text-sm font-medium">
            {footerItems.map((item, idx) => (
              <li key={idx}>
                <NavLink
                  to={item.path}
                  className={getLinkClasses}
                  title={isCollapsed ? item.label : ""}
                >
                  {item.icon}
                  {!isCollapsed && <span>{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Toggle Button on Mobile */}
      {isMobile && isCollapsed && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-30 p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors md:hidden"
        >
          <Menu size={20} />
        </button>
      )}
    </>
  );
};

export default Sidebar;
