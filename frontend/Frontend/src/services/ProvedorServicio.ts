import axios from "axios";
import  type {Provedor} from '../types/Provedor'
const API="http://localhost:8082/api/productos/proveedores";

const ProvedorServicio={
    Agregar:(Provedor:Provedor)=>(
        axios.post(`${API}/guardar`,Provedor)
    ),
    Listar:()=>{
        axios.get<Provedor[]>(`${API}/listar`)
    }
}