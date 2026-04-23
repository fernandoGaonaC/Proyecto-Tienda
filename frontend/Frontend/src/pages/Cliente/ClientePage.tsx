import { useEffect, useState } from "react";
import type { Cliente } from "../../types/Cliente";
import FormCliente from "./FormCliente";
import { ClienteServicio } from "../../services/ClienteServicio";
import ListaClientes from "./ListaClientes";
import { toast, Toaster } from "react-hot-toast";

function ClientePage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [estado, setEstado] = useState(0);
  const [clienteEditar, setClienteEditar] = useState<Cliente | undefined>(undefined);

  useEffect(() => {
    cargarClientes();
  }, []);

  function cargarClientes() {
    ClienteServicio.listar()
      .then((res) => setClientes(res.data))
      .catch((err) => {
        console.log(err);
        toast.error("Error al cargar los clientes");
      });
  }

  function guardarCliente(data: Cliente) {
    ClienteServicio.guardar(data)
      .then(() => {
        toast.success("Cliente creado correctamente");
        cargarClientes();
        setEstado(0);
      })
      .catch(() => {
        toast.error("Error al crear el cliente");
      });
  }

  function eliminarCliente(id: number) {
    ClienteServicio.Eliminar(id)
      .then(() => {
        toast.success("Cliente eliminado correctamente");
        cargarClientes();
      })
      .catch(() => {
        toast.error("Error al eliminar el cliente");
      });
  }

  function editarCliente(cliente: Cliente) {
    setClienteEditar(cliente);
    setEstado(2);
  }

  function actualizarCliente(data: Cliente) {
    ClienteServicio.actualizar(data.cedulaCliente, data)
      .then(() => {
        toast.success("Cliente actualizado correctamente");
        cargarClientes();
        setEstado(0);
        setClienteEditar(undefined);
      })
      .catch(() => {
        toast.error("Error al actualizar el cliente");
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

      <h1>Clientes</h1>

     <div className="btn-group">
  <button
    className="btn-listar"
    onClick={() => { setEstado(0); setClienteEditar(undefined); }}
  >
    Listar
  </button>
  <button
    className="btn-agregar"
    onClick={() => { setEstado(1); setClienteEditar(undefined); }}
  >
    + Agregar
  </button>
</div>
      {estado === 0 && (
        <ListaClientes
          clientes={clientes}
          onEliminar={eliminarCliente}
          onEditar={editarCliente}
        />
      )}

      {estado === 1 && (
        <FormCliente onSubmit={guardarCliente} />
      )}

      {estado === 2 && (
        <FormCliente Data={clienteEditar} onSubmit={actualizarCliente} />
      )}
    </>
  );
}

export default ClientePage;