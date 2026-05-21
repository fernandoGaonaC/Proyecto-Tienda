import axios from "axios";

const API = "http://backend-reportes_1:8003/api/reportes";

export const ReporteServicio = {
  ventasPorCliente: () => axios.get(`${API}/ventas-por-cliente`),
};