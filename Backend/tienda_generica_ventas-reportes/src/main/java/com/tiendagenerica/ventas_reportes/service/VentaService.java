// service/VentaService.java
package com.tiendagenerica.ventas_reportes.service;

import com.tiendagenerica.ventas_reportes.exception.ResourceNotFoundException;
import com.tiendagenerica.ventas_reportes.model.DetalleVenta;
import com.tiendagenerica.ventas_reportes.model.Venta;
import com.tiendagenerica.ventas_reportes.repository.VentaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class VentaService {

    private final VentaRepository ventaRepository;
    private final RestTemplate restTemplate;

    @Value("${microservicios.usuarios.url}")
    private String usuariosUrl;

    @Value("${microservicios.productos.url}")
    private String productosUrl;

    // ─── Validaciones contra otros microservicios ───────────────────────────

    private void validarCliente(Long cedula) {
        try {
            restTemplate.getForObject(
                    usuariosUrl + "/clientes/consultar/" + cedula, Map.class);
        } catch (HttpClientErrorException.NotFound e) {
            throw new ResourceNotFoundException(
                    "Cliente con cédula " + cedula + " no existe en el sistema");
        }
    }

    private void validarUsuario(Long cedula) {
        try {
            restTemplate.getForObject(
                    usuariosUrl + "/consultar/" + cedula, Map.class);
        } catch (HttpClientErrorException.NotFound e) {
            throw new ResourceNotFoundException(
                    "Usuario con cédula " + cedula + " no existe en el sistema");
        }
    }

    private Map obtenerProducto(Long codigo) {
        try {
            return restTemplate.getForObject(
                    productosUrl + "/catalogo/consultar/" + codigo, Map.class);
        } catch (HttpClientErrorException.NotFound e) {
            throw new ResourceNotFoundException(
                    "Producto con código " + codigo + " no existe en el sistema");
        }
    }

    // ─── Registrar venta ────────────────────────────────────────────────────

    @Transactional
    public Venta registrarVenta(Venta venta) {

        // 1. Validar que el cliente existe en microservicio usuarios
        validarCliente(venta.getCedulaCliente());

        // 2. Validar que el usuario existe en microservicio usuarios
        validarUsuario(venta.getCedulaUsuario());

        // 3. Validar máximo 3 productos por venta
        if (venta.getDetalles() == null || venta.getDetalles().isEmpty()) {
            throw new IllegalArgumentException("La venta debe tener al menos un producto");
        }
        if (venta.getDetalles().size() > 3) {
            throw new IllegalArgumentException("La venta no puede tener más de 3 productos");
        }

        // 4. Calcular totales consultando precios reales del microservicio productos
        double totalSinIva = 0.0;
        double totalIva = 0.0;

        for (DetalleVenta detalle : venta.getDetalles()) {
            Map producto = obtenerProducto(detalle.getCodigoProducto());

            double precioVenta = ((Number) producto.get("precioVenta")).doubleValue();
            double ivaProducto = ((Number) producto.get("ivaCompra")).doubleValue();
            int cantidad = detalle.getCantidadProducto();

            double subtotal = precioVenta * cantidad;
            double ivaLinea = subtotal * (ivaProducto / 100);

            detalle.setValorVenta(subtotal);
            detalle.setValorIva(ivaLinea);
            detalle.setValorTotal(subtotal + ivaLinea);
            detalle.setVenta(venta);

            totalSinIva += subtotal;
            totalIva += ivaLinea;
        }

        // 5. Asignar totales a la venta
        venta.setValorVenta(totalSinIva);
        venta.setIvaVenta(totalIva);
        venta.setTotalVenta(totalSinIva + totalIva);

        return ventaRepository.save(venta);
    }

    // ─── Consultas ──────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public Venta consultarVenta(Long codigo) {
        return ventaRepository.findById(codigo)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Venta con código " + codigo + " no encontrada"));
    }

    @Transactional(readOnly = true)
    public List<Venta> listarVentas() {
        return ventaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Venta> ventasPorCliente(Long cedula) {
        return ventaRepository.findByCedulaCliente(cedula);
    }
}