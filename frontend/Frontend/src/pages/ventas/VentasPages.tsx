    import { useState, useEffect } from "react";
    import { ProductoServicio } from "../../services/ProductoServicio";
    import { ClienteServicio } from "../../services/ClienteServicio";
    import  {VentaServicio}  from "../../services/VentaServicio";
    import type { Venta, DetalleVenta } from "../../types/ventas";
    import type { Producto } from "../../types/Producto";
    import type { Cliente } from "../../types/Cliente";
    import axios from "axios";

    interface ItemCarrito extends DetalleVenta {
    nombreProducto: string;
    }

    function VentasPage() {
    const [ventas, setVentas] = useState<Venta[]>([]);
    const [productos, setProductos] = useState<Producto[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [carrito, setCarrito] = useState<ItemCarrito[]>([]);

    const [clienteSeleccionado, setClienteSeleccionado] = useState<string>("");
    const [productoSeleccionado, setProductoSeleccionado] = useState<string>("");
    const [cantidad, setCantidad] = useState<number>(1);

    const [cedulaUsuario, setCedulaUsuario] = useState<string>("");

    const [cargando, setCargando] = useState(false);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        setCargando(true);
        try {
        const [resVentas, resProductos, resClientes] = await Promise.all([
            VentaServicio.listar(), 
            ProductoServicio.listar(),
            ClienteServicio.listar(),
        ]);
        setVentas(resVentas.data);
        setProductos(resProductos.data);
        setClientes(resClientes.data);
        } catch (error) {
        console.error("Error al cargar datos:", error);
        } finally {
        setCargando(false);
        }
    };

    const esActivo = (activo: any): boolean =>
        activo === true || activo === 1 || activo === "true" || activo === "verdadero";

    const agregarAlCarrito = () => {
        const codigo = Number(productoSeleccionado);
        if (!codigo || cantidad <= 0) return;

        const producto = productos.find((p) => Number(p.codigoProducto) === codigo);
        if (!producto) return;

        const existe = carrito.find((i) => i.codigoProducto === codigo);

        if (existe) {
        setCarrito(
            carrito.map((i) =>
            i.codigoProducto === codigo
                ? calcularItem(
                    { ...i, cantidadProducto: i.cantidadProducto + cantidad },
                    producto
                )
                : i
            )
        );
        } else {
        setCarrito([
            ...carrito,
            calcularItem(
            {
                codigoProducto: codigo,
                cantidadProducto: cantidad,
                valorVenta: 0,
                valorIva: 0,
                valorTotal: 0,
                nombreProducto: producto.nombreProducto,
            },
            producto
            ),
        ]);
        }

        setProductoSeleccionado("");
        setCantidad(1);
    };

    const calcularItem = (item: ItemCarrito, producto: Producto): ItemCarrito => {
        const subtotal = producto.precioVenta * item.cantidadProducto;
        const iva = subtotal * (producto.ivaCompra / 100);
        return { ...item, valorVenta: subtotal, valorIva: iva, valorTotal: subtotal + iva };
    };

    const quitarDelCarrito = (codigo: number) => {
        setCarrito(carrito.filter((i) => i.codigoProducto !== codigo));
    };

    const totales = carrito.reduce(
        (acc, item) => ({
        valorVenta: acc.valorVenta + item.valorVenta,
        ivaVenta: acc.ivaVenta + item.valorIva,
        totalVenta: acc.totalVenta + item.valorTotal,
        }),
        { valorVenta: 0, ivaVenta: 0, totalVenta: 0 }
    );

    const clienteActual = clientes.find(
        (c) => Number(c.cedulaCliente) === Number(clienteSeleccionado)
    );

    const registrarVenta = async () => {
        if (!clienteSeleccionado || carrito.length === 0) {
        alert("Selecciona un cliente y agrega al menos un producto");
        return;
        }

        if (!cedulaUsuario || Number(cedulaUsuario) <= 0) {
        alert("Ingresa la cédula del usuario que registra la venta");
        return;
        }

        const venta: Venta = {
        cedulaCliente: Number(clienteSeleccionado),
        cedulaUsuario: Number(cedulaUsuario),
        ...totales,
        detalles: carrito.map(({ nombreProducto, ...detalle }) => detalle),
        };

        setGuardando(true);
        try {
        await VentaServicio.registrar(venta);
        alert("Venta registrada correctamente");
        setCarrito([]);
        setClienteSeleccionado("");
        setCedulaUsuario("");
        await cargarDatos();
        } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error backend:", error.response?.data);
            alert(`Error: ${error.response?.data?.error || "No se pudo registrar la venta"}`);
        }
        } finally {
        setGuardando(false);
        }
    };

    const fmt = (valor: number) =>
        valor.toLocaleString("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 });

    return (
        <div className="page-container">
        <h2>Registrar venta</h2>

        <div className="venta-form">

            <div className="form-row">
            <label>Cédula Usuario</label>
            <input
                type="number"
                value={cedulaUsuario}
                placeholder="Ingrese la cédula del usuario"
                onChange={(e) => setCedulaUsuario(e.target.value)}
            />
            </div>

            <div className="form-row">
            <label>Cliente</label>
            <select
                value={clienteSeleccionado}
                onChange={(e) => setClienteSeleccionado(e.target.value)}
            >
                <option value="">-- Selecciona un cliente --</option>
                {clientes.map((c) => (
                <option key={c.cedulaCliente} value={c.cedulaCliente}>
                    {c.nombreCliente} — CC {c.cedulaCliente}
                </option>
                ))}
            </select>
            </div>

            {clienteActual && (
            <div className="cliente-info">
                <span> {clienteActual.direccionCliente || "Sin dirección"}</span>
                <span> {clienteActual.telefonoCliente || "Sin teléfono"}</span>
                <span> {clienteActual.emailCliente || "Sin email"}</span>
            </div>
            )}

            <div className="form-row form-row-inline">

            <div style={{ flex: 2 }}>
                <label>Producto</label>
                <select
                value={productoSeleccionado}
                onChange={(e) => setProductoSeleccionado(e.target.value)}
                >
                <option value="">-- Selecciona un producto --</option>
                {productos.filter((p) => esActivo(p.activo)).map((p) => (
                    <option key={p.codigoProducto} value={p.codigoProducto}>
                    {p.nombreProducto} — {fmt(p.precioVenta)}
                    </option>
                ))}
                </select>
            </div>

            <div style={{ flex: 1 }}>
                <label>Cantidad</label>
                <input
                type="number"
                min={1}
                value={cantidad}
                onChange={(e) => setCantidad(Number(e.target.value))}
                />
            </div>

            <button
                className="btn-primary"
                onClick={agregarAlCarrito}
                disabled={!productoSeleccionado}
                style={{ alignSelf: "flex-end" }}
            >
                + Agregar
            </button>
            </div>

            {carrito.length > 0 && (
            <div className="carrito">
                <h3>Detalle de la venta</h3>
                <table className="table-clientes">
                <thead>
                    <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>IVA</th>
                    <th>Total</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {carrito.map((item) => (
                    <tr key={item.codigoProducto}>
                        <td>{item.nombreProducto}</td>
                        <td>{item.cantidadProducto}</td>
                        <td>{fmt(item.valorVenta)}</td>
                        <td>{fmt(item.valorIva)}</td>
                        <td>{fmt(item.valorTotal)}</td>
                        <td>
                        <button
                            className="btn-eliminar"
                            onClick={() => quitarDelCarrito(item.codigoProducto)}
                        >
                            ✕
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>

                <div className="totales">
                <span>Subtotal: <strong>{fmt(totales.valorVenta)}</strong></span>
                <span>IVA: <strong>{fmt(totales.ivaVenta)}</strong></span>
                <span>Total: <strong>{fmt(totales.totalVenta)}</strong></span>
                </div>

                <button className="btn-primary" onClick={registrarVenta} disabled={guardando}>
                {guardando ? "Guardando..." : " Registrar venta"}
                </button>
            </div>
            )}
        </div>

        <div className="section">
            <h3>Historial de ventas ({ventas.length})</h3>
            {cargando ? (
            <p>Cargando...</p>
            ) : (
            <table className="table-clientes">
                <thead>
                <tr>
                    <th>Código</th>
                    <th>Cliente</th>
                    <th>Subtotal</th>
                    <th>IVA</th>
                    <th>Total</th>
                    <th>Fecha</th>
                    <th>Productos</th>
                </tr>
                </thead>
                <tbody>
                {ventas.length === 0 ? (
                    <tr>
                    <td colSpan={7}>No hay ventas registradas</td>
                    </tr>
                ) : (
                    ventas.map((v) => (
                    <tr key={v.codigoVenta}>
                        <td>{v.codigoVenta}</td>
                        <td>
                        {clientes.find(
                            (c) => Number(c.cedulaCliente) === Number(v.cedulaCliente)
                        )?.nombreCliente ?? `CC ${v.cedulaCliente}`}
                        </td>
                        <td>{fmt(v.valorVenta)}</td>
                        <td>{fmt(v.ivaVenta)}</td>
                        <td>{fmt(v.totalVenta)}</td>
                        <td>
                        {v.fechaVenta
                            ? new Date(v.fechaVenta).toLocaleDateString("es-CO")
                            : "—"}
                        </td>
                        <td>
                        {v.detalles?.map((d) => {
                            const prod = productos.find(
                            (p) => Number(p.codigoProducto) === Number(d.codigoProducto)
                            );
                            return (
                            <span key={d.codigoProducto} className="badge-producto">
                                {prod?.nombreProducto ?? `#${d.codigoProducto}`} x{d.cantidadProducto}
                            </span>
                            );
                        })}
                        </td>
                    </tr>
                    ))
                )}
                </tbody>
            </table>
            )}
        </div>
        </div>
    );
    }

    export default VentasPage;