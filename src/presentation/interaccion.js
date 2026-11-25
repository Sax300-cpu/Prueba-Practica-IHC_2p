import { CatalogoStaticRepository } from '../infrastructure/CatalogoStaticRepository.js';
import { PedidoLocalStorageRepository } from '../infrastructure/PedidoLocalStorageRepository.js';
import { BuscarProductosUseCase } from '../application/BuscarProductosUseCase.js';
import { GestionarPedidoUseCase } from '../application/GestionarPedidoUseCase.js';

const CODIGO_PEDIDO_BASE = '#CU-104';

// ---------- Casos de uso y persistencia ----------
const catalogoRepo = new CatalogoStaticRepository();
const pedidoRepo = new PedidoLocalStorageRepository({ clave: 'cafeu_2_pedido_v1' });
const buscarUseCase = new BuscarProductosUseCase(catalogoRepo);
const pedidoUseCase = new GestionarPedidoUseCase(pedidoRepo, catalogoRepo);

// ---------- Estado de UI ----------
let categoriaActual = 'todas';
let productoDetalle = null;
let ultimaConfirmacion = null;

// ---------- Referencias DOM ----------
const $ = (sel) => document.querySelector(sel);
const vistas = {
  inicio: $('#vista-inicio'),
  menu: $('#vista-menu'),
  detalle: $('#vista-detalle'),
  pedido: $('#vista-pedido'),
  confirmacion: $('#vista-confirmacion'),
};
const contador = $('#contador');
const catalogo = $('#catalogo');
const buscador = $('#buscador');
const estadoAviso = $('#estado');

// ---------- Utilidades ----------
const fmt = (n) => '$' + Number(n || 0).toFixed(2);

let avisoTimer = null;

function mostrarAviso(mensaje) {
  if (!estadoAviso) return;
  estadoAviso.textContent = mensaje;
  estadoAviso.classList.add('visible');
  if (avisoTimer) clearTimeout(avisoTimer);
  avisoTimer = setTimeout(() => {
    estadoAviso.classList.remove('visible');
    estadoAviso.textContent = '';
  }, 5000);
}

function mostrarVista(nombre) {
  for (const key in vistas) {
    if (vistas[key]) {
      vistas[key].hidden = key !== nombre;
    }
  }
  window.scrollTo(0, 0);
}

function actualizarContador() {
  const estado = pedidoUseCase.obtenerEstado();
  if (contador) {
    contador.textContent = estado.totalArticulos;
  }
}

// ---------- Render: catálogo ----------
function renderCatalogo() {
  const lista = buscarUseCase.ejecutar({
    termino: buscador ? buscador.value : '',
    categoria: categoriaActual,
  });

  catalogo.innerHTML = '';
  if (lista.length === 0) {
    catalogo.innerHTML = '<li class="pedido-vacio">No hay productos que coincidan.</li>';
    return;
  }

  for (const p of lista) {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cat';
    btn.setAttribute('aria-label', `Ver detalle de ${p.nombre}`);
    btn.innerHTML =
      `<span class="emoji" aria-hidden="true">${p.emoji}</span>` +
      `<span class="info">` +
        `<span class="categoria">${p.categoria}</span><br>` +
        `<span class="nombre">${p.nombre}</span><br>` +
        `<span class="desc">${p.desc}</span>` +
      `</span>` +
      `<span class="precio">${fmt(p.precio)}</span>`;
    btn.addEventListener('click', () => abrirDetalle(p.id));
    li.appendChild(btn);
    catalogo.appendChild(li);
  }
}

// ---------- Render: detalle ----------
function abrirDetalle(id) {
  productoDetalle = catalogoRepo.obtenerPorId(id);
  if (!productoDetalle) return;

  const cont = $('#detalle-contenido');
  cont.innerHTML =
    `<div class="emoji" aria-hidden="true">${productoDetalle.emoji}</div>` +
    `<h2>${productoDetalle.nombre}</h2>` +
    `<p class="desc">${productoDetalle.desc}</p>` +
    `<p class="precio">${fmt(productoDetalle.precio)}</p>` +
    `<div class="selector-cantidad">` +
      `<button type="button" id="cant-menos" aria-label="Disminuir cantidad">−</button>` +
      `<span class="cant" id="cant-valor">1</span>` +
      `<button type="button" id="cant-mas" aria-label="Aumentar cantidad">+</button>` +
    `</div>` +
    `<button type="button" class="boton primario" id="btn-agregar">Agregar al pedido</button>`;

  let cant = 1;
  const valor = $('#cant-valor');
  $('#cant-mas').addEventListener('click', () => {
    cant++;
    valor.textContent = cant;
  });
  $('#cant-menos').addEventListener('click', () => {
    cant = Math.max(1, cant - 1);
    valor.textContent = cant;
  });
  $('#btn-agregar').addEventListener('click', () => {
    pedidoUseCase.agregarProducto(productoDetalle.id, cant);
    actualizarContador();
    renderPedido();
    mostrarVista('menu');
    mostrarAviso(`${productoDetalle.nombre} agregado al pedido.`);
  });

  mostrarVista('detalle');
}

// ---------- Render: mi pedido ----------
function renderPedido() {
  const cont = $('#pedido-contenido');
  if (!cont) return;

  const estado = pedidoUseCase.obtenerEstado();
  const vacio = estado.estaVacio;
  let html = '';

  if (vacio) {
    html +=
      `<div class="pedido-vacio">` +
        `<span class="emoji" aria-hidden="true">🛍️</span>` +
        `<p>Aún no agregas productos.</p>` +
        `<button type="button" class="boton primario" id="btn-vacio-menu">Volver al menú</button>` +
      `</div>`;
  } else {
    for (const item of estado.items) {
      html +=
        `<div class="linea-pedido">` +
          `<div class="info">` +
            `<span class="nombre">${item.emoji} ${item.nombre}</span><br>` +
            `<span class="precio-unit">${fmt(item.precio)} c/u</span>` +
          `</div>` +
          `<div class="mini-selector">` +
            `<button type="button" data-id="${item.id}" data-op="-1" aria-label="Disminuir ${item.nombre}">−</button>` +
            `<span>${item.cantidad}</span>` +
            `<button type="button" data-id="${item.id}" data-op="1" aria-label="Aumentar ${item.nombre}">+</button>` +
          `</div>` +
          `<span class="subtotal">${fmt(item.subtotal)}</span>` +
          `<button type="button" class="quitar" data-id="${item.id}" aria-label="Quitar ${item.nombre} de mi pedido">` +
            `<span aria-hidden="true">🗑</span> Quitar` +
          `</button>` +
        `</div>`;
    }
  }

  html +=
    `<dl class="resumen">` +
      `<div class="fila"><dt>Artículos</dt><dd>${estado.totalArticulos}</dd></div>` +
      `<div class="fila total"><dt>Total a pagar</dt><dd>${fmt(estado.total)}</dd></div>` +
    `</dl>` +
    `<div class="acciones">` +
      `<button type="button" class="boton primario" id="btn-confirmar"` +
        (vacio ? ` disabled aria-describedby="motivo-confirmar"` : ``) +
      `>Confirmar pedido</button>` +
      (vacio
        ? `<p class="motivo" id="motivo-confirmar">Agrega al menos un producto para confirmar tu pedido.</p>`
        : ``) +
      `<button type="button" class="boton secundario" id="btn-seguir">Seguir comprando</button>` +
    `</div>`;

  cont.innerHTML = html;

  if (vacio) {
    $('#btn-vacio-menu').addEventListener('click', () => mostrarVista('menu'));
  } else {
    cont.querySelectorAll('.mini-selector button').forEach((b) => {
      b.addEventListener('click', () => {
        const id = b.dataset.id;
        const delta = parseInt(b.dataset.op, 10);
        pedidoUseCase.ajustarCantidad(id, delta);
        actualizarContador();
        renderPedido();
      });
    });

    cont.querySelectorAll('.quitar').forEach((b) => {
      b.addEventListener('click', () => {
        const { eliminado } = pedidoUseCase.eliminarProducto(b.dataset.id);
        actualizarContador();
        renderPedido();
        if (eliminado) {
          mostrarAviso(`${eliminado} quitado del pedido.`);
        }
      });
    });

    $('#btn-confirmar').addEventListener('click', confirmarPedido);
  }

  $('#btn-seguir').addEventListener('click', () => mostrarVista('menu'));
}

function confirmarPedido() {
  const estadoPrevio = pedidoUseCase.obtenerEstado();
  if (estadoPrevio.estaVacio) {
    mostrarAviso('Agrega al menos un producto antes de confirmar tu pedido.');
    return;
  }

  const { confirmacion } = pedidoUseCase.confirmarPedido();
  ultimaConfirmacion = confirmacion;
  actualizarContador();
  renderPedido();

  const cont = $('#confirmacion-contenido');
  const itemsHtml = confirmacion.items
    .map((item) => `<div class="fila"><dt>${item.cantidad} × ${item.nombre}</dt><dd>${fmt(item.subtotal)}</dd></div>`)
    .join('');

  cont.innerHTML =
    `<div class="check" aria-hidden="true">✅</div>` +
    `<h2>¡Pedido recibido!</h2>` +
    `<p>Ya está en camino a la cocina de la cafetería.</p>` +
    `<p class="codigo">${confirmacion.codigo || CODIGO_PEDIDO_BASE}</p>` +
    `<dl class="resumen detalle-pedido">${itemsHtml}` +
      `<div class="fila total"><dt>Total</dt><dd>${fmt(confirmacion.total)}</dd></div>` +
    `</dl>` +
    `<button type="button" class="boton primario" id="btn-finalizar">Volver al menú</button>`;

  $('#btn-finalizar').addEventListener('click', () => {
    ultimaConfirmacion = null;
    mostrarVista('menu');
  });

  mostrarVista('confirmacion');
}

// ---------- Filtros y búsqueda ----------
function initFiltros() {
  document.querySelectorAll('.filtro').forEach((f) => {
    f.addEventListener('click', () => {
      document.querySelectorAll('.filtro').forEach((x) => x.classList.remove('activo'));
      f.classList.add('activo');
      categoriaActual = f.dataset.cat;
      renderCatalogo();
    });
  });
  if (buscador) {
    buscador.addEventListener('input', renderCatalogo);
  }
}

// ---------- Navegación ----------
function initNavegacion() {
  $('#btn-inicio').addEventListener('click', () => mostrarVista('inicio'));
  $('#btn-ver-menu').addEventListener('click', () => {
    mostrarVista('menu');
    renderCatalogo();
  });
  $('#btn-volver-menu').addEventListener('click', () => {
    mostrarVista('menu');
    renderCatalogo();
  });
  $('#btn-pedido').addEventListener('click', () => {
    renderPedido();
    mostrarVista('pedido');
  });
}

// ---------- Arranque ----------
initFiltros();
initNavegacion();
renderCatalogo();
renderPedido();
actualizarContador();