import { useEffect, useState } from "react";
import type { Usuario } from "../../types/Usuario";

interface Props {
  Data?: Usuario;
  onSubmit: (data: any) => void;
}

function FormUsuario({ Data, onSubmit }: Props) {
  const [usuario, setUsuario] = useState<Usuario>({
    cedulaUsuario: 0,
    nombreUsuario: "",
    emailUsuario: "",
    usuario: "",
    password: "",
    activo: true,
    fechaCreacion: "",
  });

  useEffect(() => {
    if (Data) {
      setUsuario(Data);
    }
  }, [Data]);

  function Actualizar(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUsuario((prev) => ({
      ...prev,
      [name]: name === "cedulaUsuario" ? Number(value) : value,
    }));
  }

  function Guardar(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      cedulaUsuario: Number(usuario.cedulaUsuario),
      nombreUsuario: usuario.nombreUsuario,
      emailUsuario: usuario.emailUsuario,
      usuario: usuario.usuario,
      password: usuario.password,
      activo: usuario.activo,
      fechaCreacion: new Date().toISOString(),
    };

    onSubmit(payload);
  }

  return (
    <form className="form-container" onSubmit={Guardar}>

      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          name="nombreUsuario"
          value={usuario.nombreUsuario}
          onChange={Actualizar}
        />
      </div>

      <div className="form-group">
        <label>Cédula</label>
        <input
          type="number"
          name="cedulaUsuario"
          value={usuario.cedulaUsuario}
          onChange={Actualizar}
        />
      </div>

      <div className="form-group">
        <label>Correo</label>
        <input
          type="email"
          name="emailUsuario"
          value={usuario.emailUsuario}
          onChange={Actualizar}
        />
      </div>

      <div className="form-group">
        <label>Usuario</label>
        <input
          type="text"
          name="usuario"
          value={usuario.usuario}
          onChange={Actualizar}
        />
      </div>

      <div className="form-group">
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={usuario.password}
          onChange={Actualizar}
        />
      </div>

      <button type="submit">
        {Data ? "Actualizar" : "Agregar"}
      </button>
    </form>
  );
}

export default FormUsuario;