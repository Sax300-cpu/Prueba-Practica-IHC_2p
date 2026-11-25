import test from 'node:test';
import assert from 'node:assert/strict';
import { CatalogoStaticRepository } from '../../src/infrastructure/CatalogoStaticRepository.js';
import { PedidoLocalStorageRepository } from '../../src/infrastructure/PedidoLocalStorageRepository.js';
import { GestionarPedidoUseCase } from '../../src/application/GestionarPedidoUseCase.js';

test('recupera el pedido desde memoria cuando localStorage.setItem() falla', () => {
  const storageConFallo = {
    getItem: () => null,
    setItem: () => {
      throw new Error('QuotaExceededError / Storage bloqueado');
    },
    removeItem: () => {},
  };

  const catalogo = new CatalogoStaticRepository();
  const repo = new PedidoLocalStorageRepository({
    storage: storageConFallo,
    clave: 'cafeu_fallo_setitem',
  });
  const gestor = new GestionarPedidoUseCase(repo, catalogo);

  gestor.agregarProducto('cafe-americano', 2); // 3.00
  gestor.agregarProducto('croissant', 1); // 1.75 -> 4.75

  const recuperado = repo.cargar();
  assert.equal(recuperado.obtenerCantidadTotal(), 3);
  assert.equal(recuperado.calcularTotal(), 4.75);
  assert.equal(recuperado.items.length, 2);

  const estado = gestor.obtenerEstado();
  assert.equal(estado.totalArticulos, 3);
  assert.equal(estado.total, 4.75);
});