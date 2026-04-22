import { Link } from "react-router-dom";
import '../stylesheet/Navbar.css'
function Navbar(){
return(
    
   <>
   <nav>
    <Link to="/Usuario">Usuario</Link>
    <Link to="/Cliente">Cliente</Link>
    <Link to="/Provedores">Provedores</Link>
    <Link to="/Productos">Productos</Link>
    <Link to="/Ventas">Ventas</Link>
    <Link to="/Reportes">Reportes</Link>
   </nav>
   </>
);
}
export default  Navbar;