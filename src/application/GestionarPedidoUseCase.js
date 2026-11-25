import { Pedido } from '../domain/Pedido.js';

export class GestionarPedidoUseCase {
  constructor(pedidoRepository, catalogoRepository) {
    this.pedidoRepository = pedidoRepository;
    this.catalogoRepository = catalogoRepository;
    this.pedido = this.pedidoRepository.cargar() || new Pedido();
  }

  obtenerEstado() {
    return {
      items: this.pedido.items.map((d) => ({
        id: d.producto.id,
        nombre: d.producto.nombre,
        emoji: d.producto.emoji,
        precio: d.producto.precio,
        cantidad: d.cantidad,
        subtotal: d.calcularSubtotal(),
      })),
      totalArticulos: this.pedido.obtenerCantidadTotal(),
      total: this.pedido.calcularTotal(),
      estaVacio: this.pedido.estaVacio(),
      puedeRecuperar: Boolean(this.pedido.ultimoEliminado),
      ultimoEliminadoNombre: this.pedido.ultimoEliminado ? this.pedido.ultimoEliminado.producto.nombre : null,
      ultimoConfirmado: this.pedido.ultimoConfirmado,
    };
  }

  agregarProducto(productoId, cantidad = 1) {
    const producto = this.catalogoRepository.obtenerPorId(productoId);
    if (!producto) {
      throw new Error(`Producto no encontrado: ${productoId}`);
    }
    this.pedido.agregarProducto(producto, cantidad);
    this.pedidoRepository.guardar(this.pedido);
    return this.obtenerEstado();
  }

  cambiarCantidad(productoId, cantidad) {
    this.pedido.establecerCantidad(productoId, cantidad);
    this.pedidoRepository.guardar(this.pedido);
    return this.obtenerEstado();
  }

  ajustarCantidad(productoId, delta) {
    this.pedido.ajustarCantidad(productoId, delta);
    this.pedidoRepository.guardar(this.pedido);
    return this.obtenerEstado();
  }

  eliminarProducto(productoId) {
    const eliminado = this.pedido.eliminarProducto(productoId);
    this.pedidoRepository.guardar(this.pedido);
    return {
      eliminado: eliminado ? eliminado.producto.nombre : null,
      estado: this.obtenerEstado(),
    };
  }

  recuperarUltimoEliminado() {
    const restaurado = this.pedido.recuperarUltimoEliminado();
    this.pedidoRepository.guardar(this.pedido);
    return {
      recuperado: restaurado ? restaurado.producto.nombre : null,
      estado: this.obtenerEstado(),
    };
  }

  confirmarPedido() {
    const confirmacion = this.pedido.confirmar();
    this.pedidoRepository.guardar(this.pedido);
    return {
      confirmacion,
      estado: this.obtenerEstado(),
    };
  }
}