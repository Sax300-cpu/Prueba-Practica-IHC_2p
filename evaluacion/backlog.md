# Backlog priorizado — CaféU 2.0 (v1 → v2)

## Criterio de priorización
Se cruzan los hallazgos de la evaluación heurística (`heuristicas.md`), accesibilidad (`accesibilidad.md`) y sesiones con usuarios (`hallazgos.md`), aplicando:

- **Severidad (0–4):** escala de Nielsen (`0` = sin problema, `1` = cosmético, `2` = menor, `3` = mayor, `4` = catastrófico).
- **Impacto en flujo principal (1–3):** `1` = bajo, `2` = medio, `3` = alto (afecta selección, cantidades, recuperación de errores o retiro del pedido).
- **Puntaje = Severidad × Impacto** (máximo `12`).

## Matriz de triangulación y priorización

| ID | Hallazgo / Problema | Origen (Heurística / Usuarios / Accesibilidad) | Severidad (0–4) | Impacto (1–3) | Puntaje | Acción en v2 | Estado |
|---|---|---:|---:|---:|---|---|---|
| **H-01** | Aviso «Producto agregado» efímero y falta de visibilidad de cantidad ya añadida desde el menú | H1 (Visibilidad) + Usuarios (2/3 pasaron por alto el aviso) | 3 | 3 | **9** | Aviso `role="status"` persistente 5 s + badge `N en tu pedido` en tarjetas del menú | Implementado |
| **H-02** | Búsqueda sin coincidencias con filtro activo sin acción directa de recuperación | H9 (Recuperación de errores) + Usuarios (P2 tardó 24 s) | 3 | 3 | **9** | Botón *Limpiar búsqueda y filtros* en estado vacío con retorno de foco al buscador | Implementado |
| **H-08** | Eliminación accidental en *Mi pedido* requiere recuperación inmediata y persistente | H3 (Control y libertad) + Usuarios (P1/P2) | 2 | 3 | **6** | Botón *Deshacer eliminación* conectado a `GestionarPedidoUseCase` y `localStorage` | Implementado |
| **H-03** | Salir de confirmación impide volver a consultar el código y resumen del último pedido | H3 (Control y libertad) + Inspección | 2 | 2 | **4** | Persistir `ultimoConfirmado` y habilitar consulta desde *Último pedido* sin perder el código al salir | **Fix v2 #1** |
| **H-05** | El código de retiro (`#CU-104`) carece de acción de copiado rápido e instrucción destacada | H6 / H10 + Inspección | 2 | 2 | **4** | Agregar botón *Copiar código* con confirmación accesible (`role="status"`) en pantalla de confirmación | **Fix v2 #2** |
| **H-04** | Motivo de bloqueo de *Confirmar pedido* en carrito vacío requiere cercanía visual y semántica | H5 (Prevención) + Usuarios (P2) + Accesibilidad (`RF-06`) | 2 | 2 | **4** | Botón `disabled` vinculado mediante `aria-describedby` al mensaje explicativo adyacente | Implementado |
| **H-06** | Contador del carrito sin unidad textual explícita para lectores de pantalla | H2 + Inspección + Accesibilidad (`RNF-03`) | 1 | 2 | **2** | Etiqueta accesible `aria-label` con cantidad de artículos en el acceso a *Mi pedido* | Implementado |
| **H-09** | Consulta del total acumulado sin abrir *Mi pedido* | Usuarios (P3) | 1 | 1 | **1** | Mostrar «Total del pedido» en el menú (`#total-menu`), actualizado con cada cambio | Implementado |
| **H-07** | Orientación de etapa dentro del flujo de compra | Inspección + Accesibilidad (`RNF-02`) | 1 | 1 | **1** | Títulos `<h1>` con traslado de foco al cambiar de vista. Un indicador visual de pasos sigue pendiente | Parcial |

## Resumen de correcciones v2 implementadas por Luis Miranda
1. **Fix v2 #1 (`H-03` — Recuperación del último pedido confirmado):** `Pedido` y `PedidoLocalStorageRepository` persisten `ultimoConfirmado` tras confirmar; al volver al menú o recargar, el botón *Último pedido* (`#btn-ultimo`) muestra nuevamente el comprobante y código generado.
2. **Fix v2 #2 (`H-05` — Copiado rápido del código de retiro):** en la vista de confirmación se incorpora el botón *Copiar código* (`#btn-copiar-codigo`) con copia al portapapeles y retroalimentación inmediata en `#estado` (`role="status"`).