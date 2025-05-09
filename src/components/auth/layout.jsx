import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <section className="flex min-h-screen w-full ">
      <div className="hidden lg:flex justify-center items-center bg-black w-1/2 px-12">
        <div className="max-w-md space-y-6  text-center text-primary-foreground  ">
          <h1 className="text-4xl font-extrabold tracking-tight ">
            Welcome o Our ECommerce Shopping
          </h1>
        </div>
      </div>
      <div className="flex flex-1 justify-center items-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        {/* Renders the matching child route of a parent route or nothing if no child route matches */}
        <Outlet />
      </div>
    </section>
  );
};

export default AuthLayout;
