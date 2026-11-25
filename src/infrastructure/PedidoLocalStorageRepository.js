import { Pedido } from '../domain/Pedido.js';

const CLAVE_DEFAULT = 'cafeu_2_pedido_v1';

export class PedidoLocalStorageRepository {
  constructor({ storage = null, clave = CLAVE_DEFAULT } = {}) {
    this.clave = clave;
    this.memoriaFallback = null;
    this.storageDisponible = true;

    if (storage) {
      this.storage = storage;
    } else if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
      this.storage = globalThis.localStorage;
    } else {
      this.storage = null;
      this.storageDisponible = false;
    }
  }

  cargar() {
    try {
      if (this.storage && this.storageDisponible) {
        const raw = this.storage.getItem(this.clave);
        if (raw !== null && raw !== undefined) {
          return Pedido.fromJSON(JSON.parse(raw));
        }
      }
    } catch {
      this.storageDisponible = false;
    }

    if (this.memoriaFallback) {
      return Pedido.fromJSON(this.memoriaFallback);
    }
    return new Pedido();
  }

  guardar(pedido) {
    const serializado = pedido.toJSON();
    this.memoriaFallback = serializado;

    if (!this.storage || !this.storageDisponible) {
      return;
    }

    try {
      this.storage.setItem(this.clave, JSON.stringify(serializado));
    } catch {
      this.storageDisponible = false;
    }
  }

  limpiar() {
    this.memoriaFallback = null;
    if (!this.storage) return;

    try {
      this.storage.removeItem(this.clave);
    } catch {
      this.storageDisponible = false;
    }
  }
}