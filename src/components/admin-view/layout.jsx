import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AmdinSidebar from "./sidebar";
import AdminHeader from "./header";

const AmdinLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className="flex min-h-screen w-full">
      {/* Admin Sidebar  */}
      <AmdinSidebar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col ">
        {/* amdin Header  */}
        <AdminHeader setOpen={setOpenSidebar} />
        <main className="flex flex-1 bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AmdinLayout;
