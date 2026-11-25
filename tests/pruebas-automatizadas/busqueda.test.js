import test from 'node:test';
import assert from 'node:assert/strict';
import { CatalogoStaticRepository } from '../../src/infrastructure/CatalogoStaticRepository.js';
import { BuscarProductosUseCase } from '../../src/application/BuscarProductosUseCase.js';

test('búsqueda tolerante a tildes y mayúsculas en catálogo', () => {
  const repo = new CatalogoStaticRepository();
  const buscar = new BuscarProductosUseCase(repo);

  const cafeSinTilde = buscar.ejecutar({ termino: 'cafe' });
  assert.equal(cafeSinTilde.length, 1);
  assert.equal(cafeSinTilde[0].id, 'cafe-americano');

  const teMayusTilde = buscar.ejecutar({ termino: 'TÉ' });
  assert.equal(teMayusTilde.length, 2);
  assert.ok(teMayusTilde.some((p) => p.id === 'te-manzanilla'));

  const filtroCategoria = buscar.ejecutar({ termino: 'queso', categoria: 'comida' });
  assert.equal(filtroCategoria.length, 1);
  assert.equal(filtroCategoria[0].id, 'sanduche-queso');
});