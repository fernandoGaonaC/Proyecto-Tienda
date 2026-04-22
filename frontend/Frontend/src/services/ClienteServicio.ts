import axios from "axios";
import type { Cliente } from "../types/Cliente";

const API = "http://localhost:8081/api/usuarios/clientes";

export const ClienteServicio = {
  listar: () => axios.get<Cliente[]>(`${API}/listar`),

  guardar: (cliente: Cliente) =>
    axios.post(`${API}/guardar`, cliente),

  Eliminar: (cedula: number) =>
    axios.delete(`${API}/eliminar/${cedula}`),

  actualizar: (cedula: number, cliente: Cliente) =>
    axios.put(`${API}/actualizar/${cedula}`, cliente),
};