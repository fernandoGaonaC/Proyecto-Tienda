import type { Usuario } from "../../types/Usuario";

interface Prop {
  Usuarios: Usuario[];
  Eliminar: (cedula: number) => void;
  Editar: (usuario: Usuario) => void;
}

function ListaUsuarios({ Usuarios, Eliminar, Editar }: Prop) {
  return (
    <table className="table-clientes">
      <thead>
        <tr>
          <th>Cédula</th>
          <th>Nombre</th>
          <th>Usuario</th>
          <th>Correo</th>
          <th>Contraseña</th>
          <th>Estado</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
      </thead>

      <tbody>
        {(Usuarios ?? []).map((u) => (
          <tr key={u.cedulaUsuario}>
            <td>{u.cedulaUsuario}</td>
            <td>{u.nombreUsuario}</td>
            <td>{u.usuario}</td>
            <td>{u.emailUsuario}</td>
            <td>{u.password}</td>
            <td>{u.activo ? "Activo" : "Inactivo"}</td>
            <td>
              <button
                className="btn-editar"
                onClick={() => Editar(u)}
              >
                Editar
              </button>
            </td>
            <td>
              <button
                className="btn-eliminar"
                onClick={() => Eliminar(u.cedulaUsuario)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListaUsuarios;