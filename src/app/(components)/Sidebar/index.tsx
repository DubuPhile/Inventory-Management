"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { Menu } from "lucide-react";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSideBarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${isSideBarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"} bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <main className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div className="flex gap-3 justify-between md:justify-normal items-center pt-8">
        <div>Logo</div>
        <h1 className="font-extrabold text-2xl">DubSTOCK</h1>
        <button
          className="md:hidden px-3 py-3 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-blue-100 hover:dark:bg-blue-800 mr-2"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* LINKS */}
      <div className="grow mt-8">{/* links here */}</div>

      {/* FOOTER */}
      <div>
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 pb-10">
          &copy; 2026 DubStock
        </p>
      </div>
    </main>
  );
}
