import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {

  return (
    <div className="app">

      <div className={`homeLayout flex h-screen`}>
        <Sidebar />
        <main className='flex-1 flex flex-col w-full bg-white m-2 rounded-xl shadow-lg overflow-hidden'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout;