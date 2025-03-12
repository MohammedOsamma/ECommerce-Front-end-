import React from "react";
import { Outlet } from "react-router-dom";
import AmdinSidebar from "./sidebar";
import AdminHeader from "./header";

const AmdinLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      {/* Admin Sidebar  */}
      <AmdinSidebar />
      <div className="flex flex-1 flex-col ">
        {/* amdin Header  */}
        <AdminHeader />
        <main className="flex flex-1 bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AmdinLayout;
