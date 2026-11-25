export class Producto {
  constructor({ id, nombre, precio, categoria, desc = '', emoji = '', disponible = true }) {
    if (!id || typeof id !== 'string') {
      throw new Error('El producto requiere un id válido.');
    }
    if (!nombre || typeof nombre !== 'string' || !nombre.trim()) {
      throw new Error('El producto requiere un nombre válido.');
    }
    if (typeof precio !== 'number' || Number.isNaN(precio) || precio <= 0) {
      throw new Error('El precio del producto debe ser mayor que 0.');
    }
    if (!categoria || typeof categoria !== 'string') {
      throw new Error('La categoría del producto es obligatoria.');
    }

    this.id = id.trim();
    this.nombre = nombre.trim();
    this.precio = Number(precio.toFixed(2));
    this.categoria = categoria.trim().toLowerCase();
    this.desc = desc;
    this.emoji = emoji;
    this.disponible = Boolean(disponible);
  }
}