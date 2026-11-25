import test from 'node:test';
import assert from 'node:assert/strict';
import { CatalogoStaticRepository } from '../../src/infrastructure/CatalogoStaticRepository.js';
import { PedidoLocalStorageRepository } from '../../src/infrastructure/PedidoLocalStorageRepository.js';
import { GestionarPedidoUseCase } from '../../src/application/GestionarPedidoUseCase.js';

test('agregar productos, actualizar cantidades y calcular totales', () => {
  const catalogo = new CatalogoStaticRepository();
  const repo = new PedidoLocalStorageRepository({ clave: 'test_totales' });
  const gestor = new GestionarPedidoUseCase(repo, catalogo);

  gestor.agregarProducto('cafe-americano', 2); // 3.00
  let estado = gestor.agregarProducto('croissant', 1); // 1.75 -> 4.75

  assert.equal(estado.totalArticulos, 3);
  assert.equal(estado.total, 4.75);

  estado = gestor.cambiarCantidad('cafe-americano', 3); // 4.50 + 1.75 = 6.25
  assert.equal(estado.totalArticulos, 4);
  assert.equal(estado.total, 6.25);

  assert.throws(() => gestor.cambiarCantidad('cafe-americano', 0.5));
});