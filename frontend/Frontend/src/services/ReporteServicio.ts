import axios from "axios";

const API = "/api/reportes";

export const ReporteServicio = {
  ventasPorCliente: () => axios.get(`${API}/ventas-por-cliente`),
};