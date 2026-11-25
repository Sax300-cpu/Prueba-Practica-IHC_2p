/* ============================================================
   CaféU — Lógica de la app (SPA)
   Vistas: Inicio · Menú · Detalle · Mi pedido · Confirmación
   El pedido vive solo en memoria: recargar la página lo reinicia.
   ============================================================ */

// ---------- Catálogo (fuente de verdad) ----------
const PRODUCTOS = [
  { id: 'cafe-americano',  nombre: 'Café americano',     precio: 1.50, categoria: 'bebidas', desc: 'Café de grano molido · 12 oz',  emoji: '☕' },
  { id: 'cappuccino',      nombre: 'Cappuccino',         precio: 2.00, categoria: 'bebidas', desc: 'Espresso, leche y espuma',       emoji: '☕' },
  { id: 'te-manzanilla',   nombre: 'Té de manzanilla',   precio: 1.25, categoria: 'bebidas', desc: 'Infusión natural · 12 oz',       emoji: '🍵' },
  { id: 'sanduche-queso',  nombre: 'Sanduche de queso',  precio: 2.75, categoria: 'comida',  desc: 'Pan, jamón y queso',             emoji: '🥪' },
  { id: 'croissant',       nombre: 'Croissant',          precio: 1.75, categoria: 'comida',  desc: 'Hojaldre de mantequilla',        emoji: '🥐' },
  { id: 'empanada',        nombre: 'Empanada',           precio: 1.50, categoria: 'comida',  desc: 'Relleno de pollo o carne',       emoji: '🥟' },
];

const HORARIO = 'Lunes a viernes · 7:00 a 19:00';
const CODIGO_PEDIDO = '#CU-104';

// ---------- Estado ----------
const pedido = new Map();   // id -> cantidad
let categoriaActual = 'todas';
let productoDetalle = null;
let ultimoEliminado = null;
const nombresCategoria = { todas: "Todas", bebidas: "Bebidas", comida: "Comida" };

// ---------- Referencias DOM ----------
const $ = (sel) => document.querySelector(sel);
const vistas = {
  inicio:       $('#vista-inicio'),
  menu:         $('#vista-menu'),
  detalle:      $('#vista-detalle'),
  pedido:       $('#vista-pedido'),
  confirmacion: $('#vista-confirmacion'),
};
const contador = $('#contador');
const catalogo = $('#catalogo');
const buscador = $('#buscador');
const estado = $('#estado');

// ---------- Utilidades ----------
const fmt = (n) => '$' + n.toFixed(2);

// Normaliza texto para búsquedas: minúsculas y sin tildes.
// Así «cafe» encuentra «Café americano» y «te» encuentra «Té de manzanilla».
const normalizar = (texto) =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

let avisoTimer = null;

// Aviso flotante accesible (role="status"). Permanece 5 s y no se borra al cambiar de vista.
function mostrarAviso(mensaje) {
  estado.textContent = mensaje;
  estado.classList.add('visible');
  if (avisoTimer) clearTimeout(avisoTimer);
  avisoTimer = setTimeout(() => {
    estado.classList.remove('visible');
    estado.textContent = '';
  }, 5000);
}

function totalArticulos() {
  let n = 0;
  for (const c of pedido.values()) n += c;
  return n;
}

function subtotal() {
  let s = 0;
  for (const [id, cant] of pedido) {
    const p = PRODUCTOS.find((x) => x.id === id);
    s += p.precio * cant;
  }
  return s;
}

function mostrarVista(nombre) {
  for (const key in vistas) {
    const activa = key === nombre;
    if (activa) { vistas[key].hidden = false; } else { vistas[key].hidden = true; }
  }
  const titulo = document.getElementById(vistas[nombre].getAttribute('aria-labelledby'));
  titulo.tabIndex = -1;
  titulo.focus({ preventScroll: true });
  window.scrollTo(0, 0);
}

// ---------- Render: catálogo ----------
function renderCatalogo() {
  const q = normalizar(buscador.value);
  const lista = PRODUCTOS.filter((p) => {
    const okCat = categoriaActual === 'todas' || p.categoria === categoriaActual;
    const okBus = !q ||
      normalizar(p.nombre).includes(q) ||
      normalizar(p.desc).includes(q);
    return okCat && okBus;
  });

  catalogo.innerHTML = '';
  if (lista.length === 0) {
    catalogo.innerHTML = `<li class="pedido-vacio">
      <p>No hay coincidencias en «${nombresCategoria[categoriaActual]}».</p>
      <button type="button" class="boton secundario" id="limpiar-busqueda">Limpiar búsqueda y filtros</button>
    </li>`;
    $('#limpiar-busqueda').addEventListener('click', () => {
      buscador.value = '';
      seleccionarCategoria('todas');
      buscador.focus();
    });
    return;
  }
  for (const p of lista) {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cat';
    const cantidad = pedido.get(p.id) || 0;
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
  productoDetalle = PRODUCTOS.find((p) => p.id === id);
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
  $('#cant-mas').addEventListener('click', () => { cant++; valor.textContent = cant; });
  $('#cant-menos').addEventListener('click', () => { cant = Math.max(1, cant - 1); valor.textContent = cant; });
  $('#btn-agregar').addEventListener('click', () => {
    pedido.set(productoDetalle.id, (pedido.get(productoDetalle.id) || 0) + cant);
    actualizarContador();
    mostrarVista('menu');
    mostrarAviso(`${productoDetalle.nombre} agregado al pedido.`);
  });

  mostrarVista('detalle');
}

// ---------- Render: mi pedido ----------
function renderPedido() {
  const cont = $('#pedido-contenido');
  const vacio = pedido.size === 0;
  let html = '';

  if (vacio) {
    html +=
      `<div class="pedido-vacio">` +
        `<span class="emoji" aria-hidden="true">🛍️</span>` +
        `<p>Aún no agregas productos.</p>` +
        `<button type="button" class="boton primario" id="btn-vacio-menu">Volver al menú</button>` +
      `</div>`;
  } else {
    for (const [id, cant] of pedido) {
      const p = PRODUCTOS.find((x) => x.id === id);
      html +=
        `<div class="linea-pedido">` +
          `<div class="info">` +
            `<span class="nombre">${p.emoji} ${p.nombre}</span><br>` +
            `<span class="precio-unit">${fmt(p.precio)} c/u</span>` +
          `</div>` +
          `<div class="mini-selector">` +
            `<button type="button" data-id="${id}" data-op="-1" aria-label="Disminuir ${p.nombre}" ${cant === 1 ? "disabled" : ""}>−</button>` +
            `<span><span class="sr-only">Cantidad: </span>${cant}</span>` +
            `<button type="button" data-id="${id}" data-op="1" aria-label="Aumentar ${p.nombre}">+</button>` +
          `</div>` +
          `<span class="subtotal">${fmt(p.precio * cant)}</span>` +
          `<button type="button" class="quitar" data-id="${id}" aria-label="Quitar ${p.nombre} de mi pedido">` +
            `<span aria-hidden="true">🗑</span> Quitar` +
          `</button>` +
        `</div>`;
    }
  }

  if (ultimoEliminado) {
    html += '<button type="button" class="boton secundario" id="btn-deshacer">Deshacer eliminación</button>';
  }
  if (!vacio) {
    html += '<button type="button" class="boton secundario" id="btn-cancelar">Cancelar pedido</button>';
  }

  html +=
    `<dl class="resumen">` +
      `<div class="fila"><dt>Artículos</dt><dd>${totalArticulos()}</dd></div>` +
      `<div class="fila total"><dt>Total a pagar</dt><dd>${fmt(subtotal())}</dd></div>` +
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
    const { id, cantidad } = ultimoEliminado;
    pedido.set(id, (pedido.get(id) || 0) + cantidad);
    ultimoEliminado = null;
    actualizarContador();
    renderPedido();
    enfocarLinea(id);
    mostrarAviso('Producto recuperado.');
  });
  $('#btn-cancelar')?.addEventListener('click', abrirCancelacion);

  if (vacio) {
    $('#btn-vacio-menu').addEventListener('click', () => mostrarVista('menu'));
  } else {
    // Eventos de cantidad / quitar
    cont.querySelectorAll('.mini-selector button').forEach((b) => {
      b.addEventListener('click', () => {
        const id = b.dataset.id;
        const delta = parseInt(b.dataset.op, 10);
        const nueva = (pedido.get(id) || 0) + delta;
        pedido.set(id, nueva);
        actualizarContador();
        renderPedido();
        enfocarLinea(id, delta);
        mostrarAviso(`Cantidad: ${nueva}. Total: ${fmt(subtotal())}.`);
      });
    });
    cont.querySelectorAll('.quitar').forEach((b) => {
      b.addEventListener('click', () => {
        const id = b.dataset.id;
        ultimoEliminado = { id, cantidad: pedido.get(id) };
        pedido.delete(id);
        actualizarContador();
        renderPedido();
        $('#btn-deshacer').focus();
        mostrarAviso('Producto retirado. Puedes deshacer la eliminación.');
      });
    });
    $('#btn-confirmar').addEventListener('click', confirmarPedido);
  }

  $('#btn-seguir').addEventListener('click', () => mostrarVista('menu'));
}

function enfocarLinea(id, operacion = 1) {
  const boton = document.querySelector(`[data-id="${id}"][data-op="${operacion}"]:enabled`);
  (boton || document.querySelector(`[data-id="${id}"][data-op="1"]`)).focus();
}

function abrirCancelacion() {
  const dialogo = $('#cancelacion');
  dialogo.showModal();
}

$('#cancelacion form').addEventListener('submit', (evento) => {
  evento.preventDefault();
  $('#cancelacion').close();
  if (evento.submitter?.value !== 'vaciar') return;
  pedido.clear();
  ultimoEliminado = null;
  actualizarContador();
  renderPedido();
  $('#btn-vacio-menu').focus();
  mostrarAviso('Pedido cancelado.');
});

function confirmarPedido() {
  // Defensa adicional: nunca confirmar un pedido vacío, aunque se invoque por código.
  if (pedido.size === 0) {
    mostrarAviso('Agrega al menos un producto antes de confirmar tu pedido.');
    return;
  }

  const cont = $('#confirmacion-contenido');
  let items = '';
  for (const [id, cant] of pedido) {
    const p = PRODUCTOS.find((x) => x.id === id);
    items += `<div class="fila"><dt>${cant} × ${p.nombre}</dt><dd>${fmt(p.precio * cant)}</dd></div>`;
  }
  const total = subtotal();
  cont.innerHTML =
    `<div class="check" aria-hidden="true">✅</div>` +
    `<h1 id="titulo-confirmacion">Pedido confirmado</h1>` +
    `<p>En esta simulación, presenta el código en caja para retirar tu pedido.</p>` +
    `<p class="codigo">${CODIGO_PEDIDO}</p>` +
    `<dl class="resumen detalle-pedido">${items}` +
      `<div class="fila total"><dt>Total</dt><dd>${fmt(total)}</dd></div>` +
    `</dl>` +
    `<button type="button" class="boton primario" id="btn-finalizar">Volver al menú</button>`;

  pedido.clear();
  ultimoEliminado = null;
  actualizarContador();
  $('#btn-ultimo').hidden = false;
  $('#btn-finalizar').addEventListener('click', () => mostrarVista('menu'));
  mostrarVista('confirmacion');
}

// ---------- Contador ----------
function actualizarContador() {
  const cantidad = totalArticulos();
  contador.textContent = cantidad;
  $('#btn-pedido').setAttribute('aria-label', `Mi pedido, ${cantidad} ${cantidad === 1 ? 'artículo' : 'artículos'}`);
  $('#total-menu').textContent = `Total del pedido: ${fmt(subtotal())}`;
  renderCatalogo();
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
  document.querySelectorAll('.filtro').forEach((filtro) => {
    filtro.addEventListener('click', () => seleccionarCategoria(filtro.dataset.cat));
  });
  seleccionarCategoria(categoriaActual);
  buscador.addEventListener('input', renderCatalogo);
}

// ---------- Navegación ----------
function initNavegacion() {
  $('#btn-ultimo').addEventListener('click', () => mostrarVista('confirmacion'));
  $('#btn-inicio').addEventListener('click', () => mostrarVista('inicio'));
  $('#btn-ver-menu').addEventListener('click', () => { mostrarVista('menu'); renderCatalogo(); });
  $('#btn-volver-menu').addEventListener('click', () => { mostrarVista('menu'); renderCatalogo(); });
  $('#btn-pedido').addEventListener('click', () => { renderPedido(); mostrarVista('pedido'); });
}

// ---------- Arranque ----------
initFiltros();
initNavegacion();
actualizarContador();
