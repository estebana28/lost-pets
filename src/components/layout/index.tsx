import React from "react";
import { Outlet } from "react-router-dom";
import "./layout.css";

function Layout() {
   return (
      <div>
         <Outlet />
      </div>
   );
}

export { Layout };