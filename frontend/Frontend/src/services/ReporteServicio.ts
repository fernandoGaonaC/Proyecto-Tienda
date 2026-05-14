import axios from "axios";

const API = "http://localhost/api/reportes";

export const ReporteServicio = {
  ventasPorCliente: () => axios.get(`${API}/ventas-por-cliente`),
};