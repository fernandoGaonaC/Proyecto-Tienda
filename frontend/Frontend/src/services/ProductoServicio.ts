import axios from "axios";
import type { Producto } from "../types/Producto";


const API = "http://localhost/api/productos/catalogo";
export const ProductoServicio = {
  listar: () => axios.get(`${API}/listar`),

  guardar: (producto: Producto) => axios.post(`${API}/guardar`, producto),

  guardarMasivo: async (productos: Producto[]): Promise<void> => {
    await axios.post(`${API}/guardar-masivo`, productos);
  },

  actualizar: (codigo: number, producto: Producto) =>
    axios.put(`${API}/actualizar/${codigo}`, producto),

  eliminar: (codigo: number) =>
    axios.delete(`${API}/eliminar/${codigo}`),
};