# Hallazgos de evaluación — CaféU 2.0

La [matriz consolidada de APE6](https://github.com/Sax300-cpu/HCI-2026-G2/blob/main/ape6/Fase3-4/docs/matriz-consolidada.md) recoge una inspección de cuatro evaluadores y sesiones Think-Aloud con P1, P2 y P3 sobre el prototipo anterior. Esta tabla conserva sus severidades y propone comprobaciones para la entrega actual.

| ID | Evidencia histórica | Severidad | Comprobación en la entrega actual |
|---|---|---:|---|
| H-01 | Ambos métodos. Dos de tres participantes pasaron por alto el aviso de agregado. | 3 | Comprobar si se perciben el aviso y la cantidad visible en la tarjeta. |
| H-02 | Ambos métodos. P2 tardó 24 s en reconocer el efecto del filtro Comida. | 3 | Buscar un café con Comida activo y observar si se recupera con la acción de limpiar. |
| H-03 | Inspección. Las tareas con usuarios no activaron la pérdida del código al salir. | 2 | Confirmar, volver al menú y recuperar el código desde Último pedido. |
| H-04 | Ambos métodos. P2 requirió una pista para entender el bloqueo de confirmación. | 2 | Abrir el carrito vacío y verbalizar por qué no permite confirmar. |
| H-05 | Inspección. Ningún participante intentó copiar el número de retiro. | 2 | Pedir que expliquen cómo usar el código. La copia queda como mejora posible. |
| H-06 | Inspección. El contador carecía de unidad o etiqueta suficiente. | 1 | Revisar que el acceso diga Mi pedido y que el lector de pantalla anuncie la cantidad de artículos. |
| H-07 | Inspección. Los participantes no mencionaron la falta de un indicador de pasos. | 1 | Observar si los títulos y controles de navegación permiten identificar la etapa del pedido. |
| H-08 | Usuarios. P1 y P2 tocaron la línea para intentar modificar su cantidad. | 2 | Observar si las personas identifican los controles de cantidad y si pueden deshacer una eliminación. |
| H-09 | Usuarios. P3 buscó el total desde el menú. | 1 | Verificar si el total del encabezado del menú se localiza sin abrir Mi pedido. |

## Sesiones de la entrega

| Sesión | Moderación | Observación | Estado |
|---|---|---|---|
| P00 | Ariel Cholota | Manolo García | T1–T3 sin ayuda (34, 21 y 43 s). El consolidado reporta que la consigna de T1 fue clara. |
| P01 | Kevin Velasco | Manolo García | T1–T3 sin ayuda (29, 26 y 39 s). En T2 tocó primero la tarjeta y luego usó el botón «+». |
| P02 | Luis Miranda | Manolo García | T1 con ayuda (54 s). T2 y T3 sin ayuda (24 y 47 s). |

Fuente de la tabla: [consolidado de métricas del equipo](metricas.md). El [plan del equipo](../docs/plan-equipo.md) define los roles previstos. El consolidado no identifica el commit evaluado, los cambios entre el piloto y las otras sesiones ni las hojas individuales. Las observaciones de esta sección se atribuyen al consolidado.

### Registro para contrastar las sesiones con la inspección

| Sesión y tarea | Observación publicada | Relación con la inspección y el historial |
|---|---|---|
| P02 · T1 | Con el filtro Comida activo, usó una pista para limpiar los filtros. | **H-02.** Coincide con la [inspección](heuristicas.md) sobre la dificultad de recuperar una búsqueda vacía. La presencia del botón en la interfaz actual es comprobable. Su descubrimiento sin ayuda requiere seguimiento. |
| P01 · T2 | Tocó la tarjeta antes de usar «+» y terminó sin ayuda. | **H-08.** Reaparece el intento observado en APE6 de editar tocando la línea. El control permitió completar la tarea, aunque no fue su primera elección. |
| P00–P02 · T3 | Los tres quitaron, recuperaron y confirmaron sin ayuda, según el consolidado. | **RF-05 y RF-06.** Las sesiones respaldan el recorrido de recuperación y confirmación. Volver a abrir la confirmación (**H-03**) y copiar el código (**H-05**) requieren comprobaciones específicas. |

El consolidado registra 8 de 9 ejecuciones sin ayuda, incluido el piloto. En P01 y P02 fueron 5 de 6. Las observaciones publicadas sobre T1–T3 no permiten determinar si se percibió el aviso de agregado (H-01), si el contador se entendió (H-06), si se echó de menos un indicador de pasos (H-07) o si se localizó el total desde el menú (H-09).
