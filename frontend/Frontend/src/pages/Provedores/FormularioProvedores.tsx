import { useEffect, useState } from "react";
import type { Provedor } from "../../types/Provedor";

interface Props {
  Data?: Provedor;
  onSubmit: (data: Provedor) => void;
}

function FormularioProvedores({ Data, onSubmit }: Props) {
  const [proveedor, setProveedor] = useState<Provedor>({
    nitProveedor: 0,
    nombreProveedor: "",
    direccionProveedor: "",
    telefonoProveedor: "",
    ciudadProveedor: "",
    fechaRegistro: new Date().toISOString(),
  });

  useEffect(() => {
    if (Data) {
      setProveedor(Data);
    }
  }, [Data]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setProveedor((prev) => ({
      ...prev,
      [name]: name === "nitProveedor" ? Number(value) : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload: Provedor = {
      ...proveedor,
      nitProveedor: Number(proveedor.nitProveedor),
      fechaRegistro: new Date().toISOString(),
    };

    onSubmit(payload);
  }

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>NIT</label>
        <input
          type="number"
          name="nitProveedor"
          value={proveedor.nitProveedor}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          name="nombreProveedor"
          value={proveedor.nombreProveedor}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Dirección</label>
        <input
          type="text"
          name="direccionProveedor"
          value={proveedor.direccionProveedor}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Teléfono</label>
        <input
          type="text"
          name="telefonoProveedor"
          value={proveedor.telefonoProveedor}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Ciudad</label>
        <input
          type="text"
          name="ciudadProveedor"
          value={proveedor.ciudadProveedor}
          onChange={handleChange}
        />
      </div>

      <button type="submit">
        {Data ? "Actualizar" : "Guardar"}
      </button>
    </form>
  );
}

export default FormularioProvedores;
