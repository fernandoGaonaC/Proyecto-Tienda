import axios from "axios";
import  type {Provedor} from '../types/Provedor'
const API="/api/productos/proveedores";

export const ProvedorServicio={
    Agregar:(Provedor:Provedor)=>(
        axios.post(`${API}/guardar`,Provedor)
    ),
    Listar:()=>{
        return axios.get<Provedor[]>(`${API}/listar`)
    },
    eliminar:(nit:number)=>(
        axios.delete(`${API}/eliminar/${nit}`)
    ),
    actualizar:(nit:number , provedor:Provedor)=>(
        axios.put(`${API}/actualizar/${nit}`,provedor)
    )
}