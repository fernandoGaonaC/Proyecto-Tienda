import { useEffect, useState } from "react";
import { UsuarioServicio } from "../services/UsuarioServicio";
import { VentaServicio } from "../services/VentaServicio";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Usuario } from "../types/Usuario";
import type { Venta } from "../types/ventas";

const fmt = (valor: number) =>
  valor.toLocaleString("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 });

const fmtFecha = (fecha?: string) =>
  fecha ? new Date(fecha).toLocaleDateString("es-CO") : "—";

function ReportesPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [ventas, setVentas] = useState<Venta[]>([]);

  useEffect(() => {
    UsuarioServicio.listar().then((res) => setUsuarios(res.data));
    VentaServicio.listar().then((res) => setVentas(res.data));
  }, []);

  
  const filasUsuarios = (): string[][] =>
    usuarios.map((u) => [
      String(u.cedulaUsuario ?? ""),
      String(u.nombreUsuario ?? ""),
      String(u.emailUsuario ?? ""),
    ]);

  const filasVentas = (): string[][] =>
    ventas.map((v) => [
      String(v.codigoVenta ?? ""),
      String(v.cedulaCliente ?? ""),
      fmt(v.valorVenta ?? 0),
      fmt(v.ivaVenta ?? 0),
      fmt(v.totalVenta ?? 0),
      fmtFecha(v.fechaVenta),
    ]);

  const exportarUsuarios = () => {
    const doc = new jsPDF();
    doc.text("Reporte de Usuarios", 14, 14);
    autoTable(doc, {
      startY: 20,
      head: [["Cédula", "Nombre", "Correo"]],
      body: filasUsuarios(),
    });
    doc.save("reporte-usuarios.pdf");
  };

  const exportarVentas = () => {
    const doc = new jsPDF();
    doc.text("Reporte de Ventas", 14, 14);
    autoTable(doc, {
      startY: 20,
      head: [["Código", "Cliente (CC)", "Subtotal", "IVA", "Total", "Fecha"]],
      body: filasVentas(),
    });
    doc.save("reporte-ventas.pdf");
  };

  const exportarTodo = () => {
    const doc = new jsPDF();
    doc.text("Reporte de Usuarios", 14, 14);
    autoTable(doc, {
      startY: 20,
      head: [["Cédula", "Nombre", "Correo"]],
      body: filasUsuarios(),
    });
    const finalY = (doc as any).lastAutoTable?.finalY || 40;
    doc.text("Reporte de Ventas", 14, finalY + 10);
    autoTable(doc, {
      startY: finalY + 16,
      head: [["Código", "Cliente (CC)", "Subtotal", "IVA", "Total", "Fecha"]],
      body: filasVentas(),
    });
    doc.save("reporte-general.pdf");
  };

  return (
    <div>
      <h1>Reportes</h1>

      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        <button  className="btn-editar" onClick={exportarUsuarios}>Exportar Usuarios</button>
        <button  className="btn-editar" onClick={exportarVentas}>Exportar Ventas</button>
        <button className="btn-editar" onClick={exportarTodo}>Exportar Todo</button>
      </div>

      <h2>Usuarios ({usuarios.length})</h2>
      <table  className="table-clientes">
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length === 0 ? (
            <tr><td colSpan={3}>Sin registros</td></tr>
          ) : (
            usuarios.map((u, i) => (
              <tr key={i}>
                <td>{u.cedulaUsuario}</td>
                <td>{u.nombreUsuario}</td>
                <td>{u.emailUsuario}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h2>Ventas ({ventas.length})</h2>
      <table className="table-clientes">
        <thead>
          <tr>
            <th>Código</th>
            <th>Cliente (CC)</th>
            <th>Subtotal</th>
            <th>IVA</th>
            <th>Total</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {ventas.length === 0 ? (
            <tr><td colSpan={6}>Sin registros</td></tr>
          ) : (
            ventas.map((v, i) => (
              <tr key={i}>
                <td>{v.codigoVenta}</td>
                <td>{v.cedulaCliente}</td>
                <td>{fmt(v.valorVenta ?? 0)}</td>
                <td>{fmt(v.ivaVenta ?? 0)}</td>
                <td>{fmt(v.totalVenta ?? 0)}</td>
                <td>{fmtFecha(v.fechaVenta)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ReportesPage;