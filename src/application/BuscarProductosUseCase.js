import { normalizarTexto } from '../domain/NormalizadorTexto.js';

export class BuscarProductosUseCase {
  constructor(catalogoRepository) {
    this.catalogoRepository = catalogoRepository;
  }

  ejecutar({ termino = '', categoria = 'todas' } = {}) {
    const productos = this.catalogoRepository.obtenerTodos();
    const q = normalizarTexto(termino);
    const cat = normalizarTexto(categoria || 'todas');

    return productos.filter((producto) => {
      const cumpleCategoria = !cat || cat === 'todas' || normalizarTexto(producto.categoria) === cat;
      if (!cumpleCategoria) return false;

      if (!q) return true;
      const nombreNorm = normalizarTexto(producto.nombre);
      const descNorm = normalizarTexto(producto.desc);
      const catNorm = normalizarTexto(producto.categoria);
      return nombreNorm.includes(q) || descNorm.includes(q) || catNorm.includes(q);
    });
  }
}