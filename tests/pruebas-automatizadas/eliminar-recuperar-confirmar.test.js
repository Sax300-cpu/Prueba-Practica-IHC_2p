import test from 'node:test';
import assert from 'node:assert/strict';
import { CatalogoStaticRepository } from '../../src/infrastructure/CatalogoStaticRepository.js';
import { PedidoLocalStorageRepository } from '../../src/infrastructure/PedidoLocalStorageRepository.js';
import { GestionarPedidoUseCase } from '../../src/application/GestionarPedidoUseCase.js';

test('eliminar producto, recuperar último eliminado y confirmar pedido', () => {
  const catalogo = new CatalogoStaticRepository();
  const repo = new PedidoLocalStorageRepository({ clave: 'test_eliminar_recuperar' });
  const gestor = new GestionarPedidoUseCase(repo, catalogo);

  assert.throws(() => gestor.confirmarPedido(), /vacío/i);

  gestor.agregarProducto('sanduche-queso', 2); // 5.50
  gestor.agregarProducto('te-manzanilla', 1); // 1.25

  const { estado: trasEliminar } = gestor.eliminarProducto('sanduche-queso');
  assert.equal(trasEliminar.totalArticulos, 1);
  assert.equal(trasEliminar.total, 1.25);
  assert.equal(trasEliminar.puedeRecuperar, true);

  const { estado: trasRecuperar } = gestor.recuperarUltimoEliminado();
  assert.equal(trasRecuperar.totalArticulos, 3);
  assert.equal(trasRecuperar.total, 6.75);
  assert.equal(trasRecuperar.puedeRecuperar, false);

  const { confirmacion, estado: trasConfirmar } = gestor.confirmarPedido();
  assert.ok(confirmacion.codigo.startsWith('#CU-'));
  assert.equal(confirmacion.total, 6.75);
  assert.equal(trasConfirmar.estaVacio, true);
  assert.equal(trasConfirmar.total, 0);
});