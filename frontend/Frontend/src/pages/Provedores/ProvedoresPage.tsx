import { useState, useEffect } from "react";
import type { Provedor } from "../../types/Provedor";
import { ProvedorServicio } from "../../services/ProvedorServicio";
import { toast, Toaster } from "react-hot-toast";
import ListaProvedores from "./ListaProvedores";
import FormularioProvedores from "./FormularioProvedores";


function ProveedoresPage() {
  const [proveedores, setProveedores] = useState<Provedor[]>([]);
  const [estado, setEstado] = useState(0);
  const [proveedorEditar, setProveedorEditar] = useState<Provedor | undefined>(undefined);

  useEffect(() => {
    cargarProveedores();
  }, []);

  function cargarProveedores() {
    ProvedorServicio.Listar()
      .then((res) => setProveedores(res.data))
      .catch((err) => {
        console.log(err);
        toast.error("Error al cargar los proveedores");
      });
  }

  function guardarProveedor(data: Provedor) {
    ProvedorServicio.Agregar(data)
      .then(() => {
        toast.success("Proveedor creado correctamente");
        cargarProveedores();
        setEstado(0);
      })
      .catch(() => {
        toast.error("Error al crear el proveedor");
      });
  }

  function eliminarProveedor(id: number) {
    ProvedorServicio.eliminar(id)
      .then(() => {
        toast.success("Proveedor eliminado correctamente");
        cargarProveedores();
      })
      .catch(() => {
        toast.error("Error al eliminar el proveedor");
      });
  }

  function editarProveedor(proveedor: Provedor) {
    setProveedorEditar(proveedor);
    setEstado(2);
  }

  function actualizarProveedor(data: Provedor) {
    ProvedorServicio.actualizar(data.nitProveedor, data)
      .then(() => {
        toast.success("Proveedor actualizado correctamente");
        cargarProveedores();
        setEstado(0);
        setProveedorEditar(undefined);
      })
      .catch(() => {
        toast.error("Error al actualizar el proveedor");
      });
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          success: {
            style: { background: "#22c55e", color: "#fff" },
          },
          error: {
            style: { background: "#ef4444", color: "#fff" },
          },
        }}
      />

      <h1>Proveedores</h1>

      <div className="btn-group">
        <button
          className="btn-listar"
          onClick={() => { setEstado(0); setProveedorEditar(undefined); }}
        >
          Listar
        </button>
        <button
          className="btn-agregar"
          onClick={() => { setEstado(1); setProveedorEditar(undefined); }}
        >
          + Agregar
        </button>
      </div>

      {estado === 0 && (
        <ListaProvedores
          provedores={proveedores}
          onEliminar={eliminarProveedor}
          onEditar={editarProveedor}
        />
      )}

      {estado === 1 && (
        <FormularioProvedores onSubmit={guardarProveedor} />
      )}

      {estado === 2 && (
        <FormularioProvedores Data={proveedorEditar} onSubmit={actualizarProveedor} />
      )}
    </>
  );
}

export default ProveedoresPage;
