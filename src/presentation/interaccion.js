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
let ultimoEliminado = null;
const nombresCategoria = { todas: 'Todas', bebidas: 'Bebidas', comida: 'Comida' };

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
  const vistaActiva = vistas[nombre];
  const idTitulo = vistaActiva?.getAttribute('aria-labelledby');
  const titulo = idTitulo ? document.getElementById(idTitulo) : null;
  if (titulo) {
    titulo.tabIndex = -1;
    titulo.focus({ preventScroll: true });
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

  const estadoPedido = pedidoUseCase.obtenerEstado();
  const cantidadesPorId = new Map(estadoPedido.items.map((item) => [item.id, item.cantidad]));

  catalogo.innerHTML = '';
  if (lista.length === 0) {
    catalogo.innerHTML = `<li class="pedido-vacio">
      <p>No hay coincidencias en «${nombresCategoria[categoriaActual] || categoriaActual}».</p>
      <button type="button" class="boton secundario" id="limpiar-busqueda">Limpiar búsqueda y filtros</button>
    </li>`;
    $('#limpiar-busqueda')?.addEventListener('click', () => {
      if (buscador) buscador.value = '';
      seleccionarCategoria('todas');
      buscador?.focus();
    });
    return;
  }

  for (const p of lista) {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cat';
    const cantidad = cantidadesPorId.get(p.id) || 0;
    btn.innerHTML =
      `<span class="emoji" aria-hidden="true">${p.emoji}</span>` +
      `<span class="info">` +
        `<span class="categoria">${p.categoria}</span><br>` +
        `<span class="nombre">${p.nombre}</span><br>` +
        `<span class="desc">${p.desc}</span>` +
        (cantidad ? `<br><strong>${cantidad} en tu pedido</strong>` : '') +
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
    `<h1 id="titulo-detalle">${productoDetalle.nombre}</h1>` +
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
    ultimoEliminado = null;
    actualizarContador();
    renderCatalogo();
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

  if (ultimoEliminado || estado.puedeRecuperar) {
    html += '<button type="button" class="boton secundario" id="btn-deshacer">Deshacer eliminación</button>';
  }
  if (!vacio) {
    html += '<button type="button" class="boton secundario" id="btn-cancelar">Cancelar pedido</button>';
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

  $('#btn-deshacer')?.addEventListener('click', () => {
    const previa = ultimoEliminado;
    const { estado: nuevoEstado } = pedidoUseCase.recuperarUltimoEliminado();
    ultimoEliminado = null;
    actualizarContador();
    renderCatalogo();
    renderPedido();
    if (previa?.id) {
      enfocarLinea(previa.id);
    }
    const itemRestaurado = previa?.id
      ? nuevoEstado.items.find((x) => x.id === previa.id)
      : null;
    mostrarAviso(
      itemRestaurado
        ? `Producto recuperado (${itemRestaurado.cantidad}). Total: ${fmt(nuevoEstado.total)}.`
        : 'Producto recuperado.'
    );
  });

  $('#btn-cancelar')?.addEventListener('click', abrirCancelacion);

  if (vacio) {
    $('#btn-vacio-menu')?.addEventListener('click', () => mostrarVista('menu'));
  } else {
    cont.querySelectorAll('.mini-selector button').forEach((b) => {
      b.addEventListener('click', () => {
        const id = b.dataset.id;
        const delta = parseInt(b.dataset.op, 10);
        const { estado: nuevoEstado } = pedidoUseCase.ajustarCantidad(id, delta);
        const itemActual = nuevoEstado.items.find((x) => x.id === id);
        actualizarContador();
        renderCatalogo();
        renderPedido();
        if (itemActual) {
          enfocarLinea(id, delta);
          mostrarAviso(`Cantidad: ${itemActual.cantidad}. Total: ${fmt(nuevoEstado.total)}.`);
        } else {
          mostrarAviso(`Producto quitado. Total: ${fmt(nuevoEstado.total)}.`);
        }
      });
    });

    cont.querySelectorAll('.quitar').forEach((b) => {
      b.addEventListener('click', () => {
        const id = b.dataset.id;
        const estadoActual = pedidoUseCase.obtenerEstado();
        const itemPrevio = estadoActual.items.find((x) => x.id === id);
        if (itemPrevio) {
          ultimoEliminado = { id: itemPrevio.id, cantidad: itemPrevio.cantidad };
        }
        const { eliminado, estado: nuevoEstado } = pedidoUseCase.eliminarProducto(id);
        actualizarContador();
        renderCatalogo();
        renderPedido();
        if (eliminado) {
          mostrarAviso(`${eliminado} quitado. Total: ${fmt(nuevoEstado.total)}.`);
        }
      });
    });

    $('#btn-confirmar')?.addEventListener('click', confirmarPedido);
  }

  $('#btn-seguir')?.addEventListener('click', () => mostrarVista('menu'));
}

function enfocarLinea(id, operacion = 1) {
  const boton = document.querySelector(`[data-id="${id}"][data-op="${operacion}"]:enabled`);
  (boton || document.querySelector(`[data-id="${id}"][data-op="1"]`))?.focus();
}

function abrirCancelacion() {
  const dialogo = $('#cancelacion');
  dialogo?.showModal?.();
}

$('#cancelacion form')?.addEventListener('submit', (evento) => {
  evento.preventDefault();
  $('#cancelacion')?.close?.();
  if (evento.submitter?.value !== 'vaciar') return;

  const estadoActual = pedidoUseCase.obtenerEstado();
  for (const item of estadoActual.items) {
    pedidoUseCase.eliminarProducto(item.id);
  }
  ultimoEliminado = null;
  actualizarContador();
  renderCatalogo();
  renderPedido();
  $('#btn-vacio-menu')?.focus();
  mostrarAviso('Pedido cancelado.');
});

function confirmarPedido() {
  const estadoPrevio = pedidoUseCase.obtenerEstado();
  if (estadoPrevio.estaVacio) {
    mostrarAviso('Agrega al menos un producto antes de confirmar tu pedido.');
    return;
  }

  const { confirmacion } = pedidoUseCase.confirmarPedido();
  ultimaConfirmacion = confirmacion;
  ultimoEliminado = null;
  actualizarContador();
  renderCatalogo();
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
function seleccionarCategoria(categoria) {
  categoriaActual = categoria;
  document.querySelectorAll('.filtro').forEach((filtro) => {
    const activo = filtro.dataset.cat === categoria;
    filtro.classList.toggle('activo', activo);
    filtro.setAttribute('aria-pressed', String(activo));
  });
  renderCatalogo();
}

function initFiltros() {
  document.querySelectorAll('.filtro').forEach((f) => {
    f.addEventListener('click', () => {
      seleccionarCategoria(f.dataset.cat);
    });
  });
  if (buscador) {
    buscador.addEventListener('input', renderCatalogo);
  }
}

// ---------- Navegación ----------
function initNavegacion() {
  $('#btn-ultimo')?.addEventListener('click', () => mostrarVista('confirmacion'));
  $('#btn-inicio')?.addEventListener('click', () => mostrarVista('inicio'));
  $('#btn-ver-menu')?.addEventListener('click', () => {
    mostrarVista('menu');
    renderCatalogo();
  });
  $('#btn-volver-menu')?.addEventListener('click', () => {
    mostrarVista('menu');
    renderCatalogo();
  });
  $('#btn-pedido')?.addEventListener('click', () => {
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