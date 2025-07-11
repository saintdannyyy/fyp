import React from "react";
import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const { isCollapsed, isMobile, toggleSidebar } = useSidebar();

  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard", path: "/" },
    { icon: <Boxes size={18} />, label: "Inventory", path: "/inventory" },
    { icon: <FileText size={18} />, label: "Reports", path: "/reports" },
    { icon: <Truck size={18} />, label: "Suppliers", path: "/suppliers" },
    { icon: <ShoppingCart size={18} />, label: "Sales", path: "/sales" },
    { icon: <Store size={18} />, label: "Manage Store", path: "/manage-store" },
    { icon: <Users size={18} />, label: "Employees", path: "/employees" },
  ];

  const footerItems = [
    { icon: <Settings size={18} />, label: "Settings", path: "/settings" },
    { icon: <LogOut size={18} />, label: "Logout", path: "/login" },
  ];

  // Function to check if current path is active
  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  // Function to get link classes based on active state
  const getLinkClasses = (path) => {
    const baseClasses = `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
      isCollapsed ? "justify-center" : ""
    }`;

    if (isActive(path)) {
      return `${baseClasses} bg-blue-50 text-blue-500 font-semibold ${
        !isCollapsed ? "border-r-2 border-blue-500" : ""
      }`;
    }

    return `${baseClasses} text-gray-700 hover:bg-gray-100 hover:text-blue-600`;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && !isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-20 h-screen bg-white shadow-lg flex flex-col justify-between transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-16" : "w-52"
        } ${isMobile && isCollapsed ? "-translate-x-full" : "translate-x-0"}`}
      >
        {/* Header */}
        <div className="p-4">
          {/* Logo and Toggle Button */}
          <div className="flex items-center justify-between mb-8">
            {!isCollapsed && (
              <div className="bg-[#f4faf8] px-3 py-2 rounded-md text-[#496961] font-black font-[Lato] text-base text-center hover:text-blue-600">
                LOGO
              </div>
            )}

            {/* Toggle Button */}
            <button
              onClick={toggleSidebar}
              className={`p-1 rounded-lg bg-gray-300 hover:bg-blue-500 transition-colors ${
                isCollapsed ? "mx-auto" : ""
              }`}
            >
              {isCollapsed ? (
                <Menu size={18} color="black" />
              ) : (
                <X size={18} color="black" />
              )}
            </button>
          </div>

          {/* Menu Items */}
          <ul className="space-y-2 text-sm font-medium">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={getLinkClasses(item.path)}
                  title={isCollapsed ? item.label : ""}
                >
                  <span className={isActive(item.path) ? "text-blue-500" : ""}>
                    {item.icon}
                  </span>
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Items */}
        <div className="p-4">
          <ul className="space-y-2 text-sm font-medium">
            {footerItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={getLinkClasses(item.path)}
                  title={isCollapsed ? item.label : ""}
                >
                  <span className={isActive(item.path) ? "text-blue-500" : ""}>
                    {item.icon}
                  </span>
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Mobile Toggle Button (when sidebar is hidden) */}
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
