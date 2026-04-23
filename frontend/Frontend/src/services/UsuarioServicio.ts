import type { Usuario } from "../types/Usuario";
import axios from "axios";

const API = "http://localhost:8081/api/usuarios";

export const UsuarioServicio = {
  listar: () => {
    return axios.get<Usuario[]>(`${API}/listar`);
  },

  guardar: (usuario: Usuario) => {
    return axios.post(`${API}/guardar`, usuario);
  },

  Eliminar: (cedula: number) => {
    return axios.delete(`${API}/eliminar/${cedula}`);
  },

  actualizar: (cedula: number, usuario: Usuario) => {
    return axios.put(`${API}/actualizar/${cedula}`, usuario);
  },
};