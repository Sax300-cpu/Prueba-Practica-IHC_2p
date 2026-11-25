import { DetallePedido } from './DetallePedido.js';
import { Producto } from './Producto.js';

export class Pedido {
  constructor({ items = [], ultimoEliminado = null, ultimoConfirmado = null, correlativo = 104 } = {}) {
    this.items = items.map((item) =>
      item instanceof DetallePedido ? item : DetallePedido.fromJSON(item)
    );
    this.ultimoEliminado = ultimoEliminado
      ? (ultimoEliminado instanceof DetallePedido ? ultimoEliminado : DetallePedido.fromJSON(ultimoEliminado))
      : null;
    this.ultimoConfirmado = ultimoConfirmado;
    this.correlativo = correlativo;
  }

  agregarProducto(producto, cantidad = 1) {
    if (!(producto instanceof Producto)) {
      throw new Error('Solo se pueden agregar instancias de Producto.');
    }
    if (!producto.disponible) {
      throw new Error(`El producto "${producto.nombre}" no está disponible.`);
    }
    if (!Number.isInteger(cantidad) || cantidad < 1) {
      throw new Error('La cantidad a agregar debe ser un entero mayor o igual a 1.');
    }

    const existente = this.items.find((d) => d.producto.id === producto.id);
    if (existente) {
      existente.cambiarCantidad(existente.cantidad + cantidad);
    } else {
      this.items.push(new DetallePedido(producto, cantidad));
    }
    this.ultimoEliminado = null;
    return this;
  }

  establecerCantidad(productoId, cantidad) {
    if (!Number.isInteger(cantidad)) {
      throw new Error('La cantidad debe ser un número entero.');
    }
    if (cantidad <= 0) {
      return this.eliminarProducto(productoId);
    }
    const detalle = this.items.find((d) => d.producto.id === productoId);
    if (!detalle) {
      throw new Error(`No existe el producto "${productoId}" en el pedido.`);
    }
    detalle.cambiarCantidad(cantidad);
    return this;
  }

  ajustarCantidad(productoId, delta) {
    const detalle = this.items.find((d) => d.producto.id === productoId);
    if (!detalle) return this;
    const nueva = detalle.cantidad + delta;
    if (nueva <= 0) {
      return this.eliminarProducto(productoId);
    }
    detalle.cambiarCantidad(nueva);
    return this;
  }

  eliminarProducto(productoId) {
    const idx = this.items.findIndex((d) => d.producto.id === productoId);
    if (idx === -1) return null;
    const [eliminado] = this.items.splice(idx, 1);
    this.ultimoEliminado = eliminado;
    return eliminado;
  }

  recuperarUltimoEliminado() {
    if (!this.ultimoEliminado) {
      return null;
    }
    const restaurado = this.ultimoEliminado;
    const existente = this.items.find((d) => d.producto.id === restaurado.producto.id);
    if (existente) {
      existente.cambiarCantidad(existente.cantidad + restaurado.cantidad);
    } else {
      this.items.push(new DetallePedido(restaurado.producto, restaurado.cantidad));
    }
    this.ultimoEliminado = null;
    return restaurado;
  }

  estaVacio() {
    return this.items.length === 0;
  }

  obtenerCantidadTotal() {
    return this.items.reduce((acc, item) => acc + item.cantidad, 0);
  }

  calcularTotal() {
    const suma = this.items.reduce((acc, item) => acc + item.calcularSubtotal(), 0);
    return Number(suma.toFixed(2));
  }

  confirmar() {
    if (this.estaVacio()) {
      throw new Error('No se puede confirmar un pedido vacío.');
    }

    const codigo = `#CU-${this.correlativo}`;
    const resumen = {
      codigo,
      confirmadoEn: new Date().toISOString(),
      totalArticulos: this.obtenerCantidadTotal(),
      total: this.calcularTotal(),
      items: this.items.map((d) => ({
        id: d.producto.id,
        nombre: d.producto.nombre,
        precioUnitario: d.producto.precio,
        cantidad: d.cantidad,
        subtotal: d.calcularSubtotal(),
      })),
    };

    this.ultimoConfirmado = resumen;
    this.correlativo += 1;
    this.items = [];
    this.ultimoEliminado = null;
    return resumen;
  }

  toJSON() {
    return {
      items: this.items.map((d) => d.toJSON()),
      ultimoEliminado: this.ultimoEliminado ? this.ultimoEliminado.toJSON() : null,
      ultimoConfirmado: this.ultimoConfirmado,
      correlativo: this.correlativo,
    };
  }

  static fromJSON(data) {
    if (!data || typeof data !== 'object') {
      return new Pedido();
    }
    return new Pedido(data);
  }
}