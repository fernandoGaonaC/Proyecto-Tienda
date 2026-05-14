import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { ProductoServicio } from "../../services/ProductoServicio";
import type { Producto } from "../../types/Producto";
import axios from "axios";

function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productosDB, setProductosDB] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(false);
  const [productoEditando, setProductoEditando] = useState<Producto | null>(null);

  useEffect(() => {
    cargarProductosDB();
  }, []);

  const cargarProductosDB = async () => {
    setCargando(true);
    try {
      const response = await ProductoServicio.listar();
      setProductosDB(response.data);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setCargando(false);
    }
  };

  const eliminarProducto = async (codigo: number) => {
    if (!confirm(`¿Eliminar el producto con código ${codigo}?`)) return;
    try {
      await ProductoServicio.eliminar(codigo);
      await cargarProductosDB();
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("No se pudo eliminar el producto");
    }
  };

  const abrirEditar = (producto: Producto) => {
    setProductoEditando({ ...producto });
  };

  const cancelarEditar = () => {
    setProductoEditando(null);
  };

  const guardarEdicion = async () => {
    if (!productoEditando) return;
    try {
      await ProductoServicio.actualizar(
        productoEditando.codigoProducto,
        productoEditando
      );
      setProductoEditando(null);
      await cargarProductosDB();
    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("No se pudo actualizar el producto");
    }
  };

  const leerExcel = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      setProductos(XLSX.utils.sheet_to_json<any>(sheet));
    };
    reader.readAsArrayBuffer(file);
  };

  // ← NUEVO: convierte fecha serial de Excel a ISO string
  const fechaExcelAISO = (valor: any): string => {
    if (!valor) return new Date().toISOString().split(".")[0];
    if (typeof valor === "number") {
      const fecha = new Date((valor - 25569) * 86400 * 1000);
      return fecha.toISOString().split(".")[0];
    }
    return new Date(valor).toISOString().split(".")[0];
  };

  const enviarProductos = async () => {
    try {
      const productosLimpios = productos
        .filter((p) => Number(p.codigoProducto) > 0)
        .map((p) => ({
          codigoProducto: Number(p.codigoProducto) || 0,
          nombreProducto: p.nombreProducto || "",
          precioCompra: Number(p.precioCompra) || 0,
          precioVenta: Number(p.precioVenta) || 0,
          ivaCompra: Number(p.ivaCompra) || 0,
          nitProveedor: Number(p.nitProveedor) || 0,
          activo:
            String(p.activo).toLowerCase() === "verdadero" ||
            p.activo === true,
          fechaCreacion: fechaExcelAISO(p.fechaCreacion), // ← corregido
        }));

      const response = await ProductoServicio.guardarMasivo(productosLimpios);

  
      setProductos([]);
      await cargarProductosDB(); // ← primero recarga
      alert("Productos cargados correctamente"); // ← luego notifica
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(
          `Error: ${error.response?.data?.error || "Error al enviar productos"}`
        );
      }
    }
  };

  return (
    <div className="page-container">
      <h2>Cargar productos desde Excel</h2>

      <div className="upload-section">
        <input
          type="file"
          accept=".xls,.xlsx"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) leerExcel(file);
          }}
        />
        <button
          className="btn-primary"
          onClick={enviarProductos}
          disabled={productos.length === 0}
        >
          Enviar productos al backend
        </button>
      </div>

      {productos.length > 0 && (
        <div className="section">
          <h3>Vista previa Excel ({productos.length})</h3>
          <table className="table-clientes">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Precio Compra</th>
                <th>Precio Venta</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p, i) => (
                <tr key={i}>
                  <td>{p.codigoProducto}</td>
                  <td>{p.nombreProducto}</td>
                  <td>{p.precioCompra}</td>
                  <td>{p.precioVenta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="section">
        <h3>Productos en base de datos ({productosDB.length})</h3>

        {cargando ? (
          <p>Cargando...</p>
        ) : (
          <table className="table-clientes">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Precio Compra</th>
                <th>Precio Venta</th>
                <th>IVA</th>
                <th>NIT Proveedor</th>
                <th>Activo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosDB.length === 0 ? (
                <tr>
                  <td colSpan={8}>No hay productos registrados</td>
                </tr>
              ) : (
                productosDB.map((p) => (
                  <tr key={p.codigoProducto}>
                    <td>{p.codigoProducto}</td>
                    <td>{p.nombreProducto}</td>
                    <td>{p.precioCompra}</td>
                    <td>{p.precioVenta}</td>
                    <td>{p.ivaCompra}%</td>
                    <td>{p.nitProveedor}</td>
                    <td>{p.activo ? "Activo" : "Inactivo"}</td>
                    <td className="acciones-cell">
                      <button
                        className="btn-editar"
                        onClick={() => abrirEditar(p)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-eliminar"
                        onClick={() => eliminarProducto(p.codigoProducto)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {productoEditando && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Editar producto #{productoEditando.codigoProducto}</h3>

            <div className="modal-field">
              <label>Nombre</label>
              <input
                value={productoEditando.nombreProducto}
                onChange={(e) =>
                  setProductoEditando({
                    ...productoEditando,
                    nombreProducto: e.target.value,
                  })
                }
              />
            </div>

            <div className="modal-field">
              <label>Precio Compra</label>
              <input
                type="number"
                value={productoEditando.precioCompra}
                onChange={(e) =>
                  setProductoEditando({
                    ...productoEditando,
                    precioCompra: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="modal-field">
              <label>Precio Venta</label>
              <input
                type="number"
                value={productoEditando.precioVenta}
                onChange={(e) =>
                  setProductoEditando({
                    ...productoEditando,
                    precioVenta: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="modal-field">
              <label>IVA (%)</label>
              <input
                type="number"
                value={productoEditando.ivaCompra}
                onChange={(e) =>
                  setProductoEditando({
                    ...productoEditando,
                    ivaCompra: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="modal-field">
              <label>NIT Proveedor</label>
              <input
                type="number"
                value={productoEditando.nitProveedor}
                onChange={(e) =>
                  setProductoEditando({
                    ...productoEditando,
                    nitProveedor: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="modal-field">
              <label>Activo</label>
              <select
                value={productoEditando.activo ? "true" : "false"}
                onChange={(e) =>
                  setProductoEditando({
                    ...productoEditando,
                    activo: e.target.value === "true",
                  })
                }
              >
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="modal-actions">
              <button className="btn-primary" onClick={guardarEdicion}>
                Guardar cambios
              </button>
              <button className="btn-cancelar" onClick={cancelarEditar}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductosPage;