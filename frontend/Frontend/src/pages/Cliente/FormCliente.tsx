import { useEffect, useState } from "react";
import type { Cliente } from "../../types/Cliente";

interface Props {
  Data?: Cliente;
  onSubmit: (data: Cliente) => void;
}

function FormCliente({ Data, onSubmit }: Props) {
  const [cliente, setCliente] = useState<Cliente>({
    nombreCliente: "",
    cedulaCliente: 0,
    direccionCliente: "",
    telefonoCliente: "",
    emailCliente: "",
    fechaRegistro: new Date().toISOString(),
  });

  useEffect(() => {
    if (Data) {
      setCliente(Data);
    }
  }, [Data]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setCliente((prev) => ({
      ...prev,
      [name]: name === "cedulaCliente" ? Number(value) : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload: Cliente = {
      ...cliente,
      cedulaCliente: Number(cliente.cedulaCliente),
      fechaRegistro: new Date().toISOString(),
    };

    onSubmit(payload);
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>

      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          name="nombreCliente"
          value={cliente.nombreCliente}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Cédula</label>
        <input
          type="number"
          name="cedulaCliente"
          value={cliente.cedulaCliente}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Dirección</label>
        <input
          type="text"
          name="direccionCliente"
          value={cliente.direccionCliente}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Teléfono</label>
        <input
          type="text"
          name="telefonoCliente"
          value={cliente.telefonoCliente}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="emailCliente"
          value={cliente.emailCliente}
          onChange={handleChange}
        />
      </div>

      <button type="submit">
        {Data ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
}

export default FormCliente;