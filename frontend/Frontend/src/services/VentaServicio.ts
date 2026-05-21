import axios from "axios";
import type { Venta } from "../types/ventas";

const API = "http://backend-reportes_1:8003/api/ventas"; 

export const VentaServicio = {
  registrar: (venta: Venta) => axios.post(`${API}/registrar/guardar`, venta),
  listar: () => axios.get<Venta[]>(`${API}/registrar/listar`),
  consultarPorCliente: (cedula: number) =>
    axios.get<Venta[]>(`${API}/registrar/cliente/${cedula}`),
};