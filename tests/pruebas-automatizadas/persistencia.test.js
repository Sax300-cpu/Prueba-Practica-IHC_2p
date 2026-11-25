import test from 'node:test';
import assert from 'node:assert/strict';
import { CatalogoStaticRepository } from '../../src/infrastructure/CatalogoStaticRepository.js';
import { PedidoLocalStorageRepository } from '../../src/infrastructure/PedidoLocalStorageRepository.js';
import { GestionarPedidoUseCase } from '../../src/application/GestionarPedidoUseCase.js';

function crearStorageSimulado() {
  const store = new Map();
  return {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
  };
}

test('persiste el pedido en almacenamiento y lo restaura en una nueva instancia', () => {
  const storage = crearStorageSimulado();
  const catalogo = new CatalogoStaticRepository();

  const repo1 = new PedidoLocalStorageRepository({ storage, clave: 'cafeu_persist_test' });
  const gestor1 = new GestionarPedidoUseCase(repo1, catalogo);
  gestor1.agregarProducto('cappuccino', 2); // 4.00
  gestor1.agregarProducto('empanada', 1); // 1.50

  const repo2 = new PedidoLocalStorageRepository({ storage, clave: 'cafeu_persist_test' });
  const gestor2 = new GestionarPedidoUseCase(repo2, catalogo);
  const estadoRestaurado = gestor2.obtenerEstado();

  assert.equal(estadoRestaurado.totalArticulos, 3);
  assert.equal(estadoRestaurado.total, 5.50);
  assert.equal(estadoRestaurado.items.length, 2);
});