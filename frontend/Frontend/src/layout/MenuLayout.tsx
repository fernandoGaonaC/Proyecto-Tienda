import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MenuLayout(){
    return (
        <>
        <Navbar/>
          <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
        </>
    )
}
export default MenuLayout;