import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientePage from "../pages/Cliente/ClientePage";
import UsuarioPage from "../pages/Usuario/UsuarioPage";
import VentasPage from "../pages/ventas/VentasPages";
import ProductosPage from "../pages/Productos/ProductosPages";
import ProvedoresPage from "../pages/Provedores/ProvedoresPage";
import ReportesPage from "../pages/ReportesPage";
import MenuLayout from "../layout/MenuLayout";

function AppRouter(){
    return (
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<MenuLayout></MenuLayout>}>
        <Route path="/Cliente" element={<ClientePage></ClientePage>}/>
        <Route path="/Usuario" element={<UsuarioPage></UsuarioPage>}/>
        <Route path="/Ventas" element={<VentasPage></VentasPage>}/>
        <Route path="/Productos" element={<ProductosPage></ProductosPage>}/>
        <Route path="/Provedores" element={<ProvedoresPage></ProvedoresPage>}/>
        <Route path="/Reportes" element={<ReportesPage></ReportesPage>}/>
        </Route>
        </Routes>
        </BrowserRouter>
    );
}
export default AppRouter; 