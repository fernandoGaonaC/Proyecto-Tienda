export interface DetalleVenta {
  codigoProducto: number;
  cantidadProducto: number;
  valorVenta: number;
  valorIva: number;
  valorTotal: number;
}

export interface Venta {
  codigoVenta?: number;
  cedulaCliente: number;
  cedulaUsuario: number;
  valorVenta: number;
  ivaVenta: number;
  totalVenta: number;
  fechaVenta?: string;
  detalles: DetalleVenta[];
}