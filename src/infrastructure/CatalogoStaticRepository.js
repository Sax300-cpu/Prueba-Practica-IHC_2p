import { Producto } from '../domain/Producto.js';

const PRODUCTOS_INICIALES = [
  { id: 'cafe-americano', nombre: 'Café americano', precio: 1.50, categoria: 'bebidas', desc: 'Café de grano molido · 12 oz', emoji: '☕' },
  { id: 'cappuccino', nombre: 'Cappuccino', precio: 2.00, categoria: 'bebidas', desc: 'Espresso, leche y espuma', emoji: '☕' },
  { id: 'te-manzanilla', nombre: 'Té de manzanilla', precio: 1.25, categoria: 'bebidas', desc: 'Infusión natural · 12 oz', emoji: '🍵' },
  { id: 'sanduche-queso', nombre: 'Sanduche de queso', precio: 2.75, categoria: 'comida', desc: 'Pan, jamón y queso', emoji: '🥪' },
  { id: 'croissant', nombre: 'Croissant', precio: 1.75, categoria: 'comida', desc: 'Hojaldre de mantequilla', emoji: '🥐' },
  { id: 'empanada', nombre: 'Empanada', precio: 1.50, categoria: 'comida', desc: 'Relleno de pollo o carne', emoji: '🥟' },
];

export class CatalogoStaticRepository {
  constructor(datos = PRODUCTOS_INICIALES) {
    this.productos = datos.map((item) => new Producto(item));
  }

  obtenerTodos() {
    return [...this.productos];
  }

  obtenerPorId(id) {
    return this.productos.find((p) => p.id === id) || null;
  }
}