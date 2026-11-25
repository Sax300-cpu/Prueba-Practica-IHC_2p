import { Producto } from './Producto.js';

export class DetallePedido {
  constructor(producto, cantidad = 1) {
    if (!(producto instanceof Producto)) {
      throw new Error('DetallePedido requiere una instancia válida de Producto.');
    }
    this.producto = producto;
    this.cantidad = 1;
    this.cambiarCantidad(cantidad);
  }

  cambiarCantidad(nuevaCantidad) {
    if (!Number.isInteger(nuevaCantidad) || nuevaCantidad < 1) {
      throw new Error('La cantidad debe ser un número entero mayor o igual a 1.');
    }
    this.cantidad = nuevaCantidad;
  }

  incrementar(delta = 1) {
    if (!Number.isInteger(delta) || delta === 0) {
      throw new Error('El incremento debe ser un entero distinto de cero.');
    }
    const resultante = this.cantidad + delta;
    if (resultante < 1) {
      return null;
    }
    this.cantidad = resultante;
    return this;
  }

  calcularSubtotal() {
    return Number((this.producto.precio * this.cantidad).toFixed(2));
  }

  toJSON() {
    return {
      producto: {
        id: this.producto.id,
        nombre: this.producto.nombre,
        precio: this.producto.precio,
        categoria: this.producto.categoria,
        desc: this.producto.desc,
        emoji: this.producto.emoji,
        disponible: this.producto.disponible,
      },
      cantidad: this.cantidad,
    };
  }

  static fromJSON(data) {
    const prod = new Producto(data.producto);
    return new DetallePedido(prod, data.cantidad);
  }
}