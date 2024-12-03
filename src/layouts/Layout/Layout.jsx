import { Outlet } from "react-router";

import Navbar from "../Navber/navbar";
import "./Layout.css";

function Layout({ setToken, token }) {  // รับ props จาก App.js
    return ( 
        <div className="layout-container">
            
            <Navbar setToken={setToken} token={token} />  {/* ส่ง props token และ setToken ไปที่ Navbar */}
            <Outlet/>  {/* สำหรับการแสดงผลของหน้าอื่นๆ */}
        </div>
    );
}

export default Layout;
