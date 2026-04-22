import { useState, useEffect } from "react";
import { UsuarioServicio } from "../../services/UsuarioServicio";
import type { Usuario } from "../../types/Usuario";
import FormUsuario from "./FormUsuario";
import ListaUsuarios from "./ListaUsuarios";
import { toast, Toaster } from "react-hot-toast";

function UsuarioPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [estado, setEstado] = useState(0);
  const [usuarioEditar, setUsuarioEditar] = useState<Usuario | undefined>(undefined);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  function cargarUsuarios() {
    UsuarioServicio.listar()
      .then((res) => setUsuarios(res.data))
      .catch((err) => {
        console.log(err);
        toast.error("Error al cargar los usuarios");
      });
  }

  function Eliminar(cedula: number) {
    UsuarioServicio.Eliminar(cedula)
.then(() => {
        toast.success("Usuario eliminado correctamente");
        cargarUsuarios();
      })
      .catch(() => {
        toast.error("Error al eliminar el usuario");
      });
  }

  function Guardar(data: any) {
    UsuarioServicio.guardar(data)
      .then(() => {
        toast.success("Usuario creado correctamente");
        cargarUsuarios();
        setEstado(0);
      })
      .catch(() => {
        toast.error("Error al crear el usuario");
      });
  }

  function Editar(usuario: Usuario) {
    setUsuarioEditar(usuario);
    setEstado(2);
  }

  function Actualizar(data: any) {
    UsuarioServicio.actualizar(data.cedulaUsuario, data)
      .then(() => {
        toast.success("Usuario actualizado correctamente");
        cargarUsuarios();
        setEstado(0);
        setUsuarioEditar(undefined);
      })
      .catch(() => {
        toast.error("Error al actualizar el usuario");
      });
  }

  return (
    <>
      {/* Toaster global — ponlo una sola vez aquí */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          success: {
            style: {
              background: "#22c55e",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#ef4444",
              color: "#fff",
            },
          },
        }}
      />

      <h1>Usuarios</h1>
      <div className="btn-group">
  <button
    className="btn-listar"
    onClick={() => { setEstado(0); setUsuarioEditar(undefined); }}
  >
    Listar
  </button>
  <button
    className="btn-agregar"
    onClick={() => { setEstado(1); setUsuarioEditar(undefined); }}
  >
    + Agregar
  </button>
</div>

      {estado === 0 && (
        <ListaUsuarios
          Usuarios={usuarios}
          Eliminar={Eliminar}
          Editar={Editar}
        />
      )}

      {estado === 1 && (
        <FormUsuario onSubmit={Guardar} />
      )}

      {estado === 2 && (
        <FormUsuario Data={usuarioEditar} onSubmit={Actualizar} />
      )}
    </>
  );
}

export default UsuarioPage;