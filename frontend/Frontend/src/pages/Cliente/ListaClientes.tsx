import type { Cliente } from "../../types/Cliente";

interface Props {
  clientes: Cliente[];
  onEliminar: (cedula: number) => void;
  onEditar: (cliente: Cliente) => void;
}

function ListaClientes({ clientes, onEliminar, onEditar }: Props) {
  return (
    <table className="table-clientes">
      <thead>
        <tr>
          <th>Cédula</th>
          <th>Nombre</th>
          <th>Teléfono</th>
          <th>Dirección</th>
          <th>Email</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
      </thead>

      <tbody>
        {clientes.map((c) => (
          <tr key={c.cedulaCliente}>
            <td>{c.cedulaCliente}</td>
            <td>{c.nombreCliente}</td>
            <td>{c.telefonoCliente}</td>
            <td>{c.direccionCliente}</td>
            <td>{c.emailCliente}</td>
            <td>
              <button
                className="btn-editar"
                onClick={() => onEditar(c)}
              >
                Editar
              </button>
            </td>
            <td>
              <button
                className="btn-eliminar"
                onClick={() => onEliminar(c.cedulaCliente)}
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

export default ListaClientes;