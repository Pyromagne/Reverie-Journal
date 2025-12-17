import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

const Layout = () => {

  return (
    <div className="app gradient-background-2 poppins-regular">

      <div className={`homeLayout flex h-screen`}>
        <Sidebar />
        
        <main className='w-full'>
          <Outlet />
        </main>
      </div>
      
    </div>
  )
}

export default Layout;