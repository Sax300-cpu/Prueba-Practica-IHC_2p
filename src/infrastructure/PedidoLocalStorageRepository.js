import { Pedido } from '../domain/Pedido.js';

const CLAVE_DEFAULT = 'cafeu_2_pedido_v1';

export class PedidoLocalStorageRepository {
  constructor({ storage = null, clave = CLAVE_DEFAULT } = {}) {
    this.clave = clave;
    this.memoriaFallback = null;

    if (storage) {
      this.storage = storage;
    } else if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
      this.storage = globalThis.localStorage;
    } else {
      this.storage = null;
    }
  }

  cargar() {
    try {
      if (this.storage) {
        const raw = this.storage.getItem(this.clave);
        if (!raw) return new Pedido();
        return Pedido.fromJSON(JSON.parse(raw));
      }
      return this.memoriaFallback ? Pedido.fromJSON(this.memoriaFallback) : new Pedido();
    } catch {
      return new Pedido();
    }
  }

  guardar(pedido) {
    const serializado = pedido.toJSON();
    try {
      if (this.storage) {
        this.storage.setItem(this.clave, JSON.stringify(serializado));
        return;
      }
    } catch {
      // Si localStorage no está disponible o falla, se conserva el respaldo en memoria
    }
    this.memoriaFallback = serializado;
  }

  limpiar() {
    this.memoriaFallback = null;
    try {
      if (this.storage) {
        this.storage.removeItem(this.clave);
      }
    } catch {
      // Ignorar errores de acceso a storage
    }
  }
}