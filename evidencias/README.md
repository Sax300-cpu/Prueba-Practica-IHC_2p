# Evidencias

Capturas que muestran el estado de la app antes y después de cada corrección (v1 → v2).

## Estructura
- `antes/`: capturas de la versión v1 con el problema.
- `despues/`: capturas de la versión v2 con la corrección.

## Convención de nombres
`<ID-hallazgo>_<antes|despues>_<descripcion-corta>.png`

Ejemplos:
- `antes/H-01_antes_aviso-agregado.png`
- `despues/H-01_despues_aviso-agregado.png`

Reglas:
- Un par antes/después por cada problema corregido (mínimo 2, según el TXT).
- El ID debe existir en `evaluacion/backlog.md`.
- Mismo tamaño de pantalla (preferible móvil) en ambas capturas del par.
- No incluir datos personales de participantes.

## Pares registrados
| Hallazgo | Antes (v1) | Después (v2) | Qué muestra |
|---|---|---|---|
| H-01 | `antes/h01-v1.jpg` | `despues/h01-v2.jpg` | Tras agregar, la tarjeta del menú indica «1 en tu pedido» y aparece el total del pedido. |
| H-02 | `antes/h02-v1.jpg` | `despues/h02-v2.jpg` | Búsqueda sin resultados con filtro activo: v2 nombra el filtro y ofrece «Limpiar búsqueda y filtros». |
| H-03 | `antes/h03-v1.jpg` | `despues/h03-v2.jpg` | Tras confirmar y volver al menú, v2 mantiene el botón «Último pedido». |
| H-05 | `antes/h05-v1.jpg` | `despues/h05-v2.jpg` | Pantalla de confirmación: v2 añade «Copiar código» y la instrucción de retiro. |
| H-08 | `antes/h08-v1.jpg` | `despues/h08-v2.jpg` | Tras quitar un producto, v2 ofrece «Deshacer eliminación». |

Capturas tomadas en un viewport móvil (375×812) sirviendo el repositorio por HTTP: `prototipos/version-v1/` para «antes» y `src/presentation/` en la rama `feat/lm-piloto-backlog-v2` (commit a784efb) para «después».
