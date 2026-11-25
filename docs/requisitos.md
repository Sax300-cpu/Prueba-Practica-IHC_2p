# Requisitos de CaféU 2.0

El recorrido parte del [análisis UX](analisis-ux.md) y del [prototipo base](../prototipos/version-v1/index.html). El pedido es una simulación local de retiro en cafetería.

| ID | Requisito funcional | Criterio de aceptación |
|---|---|---|
| RF-01 | Consultar horario y catálogo con filtros por categoría. | Inicio muestra el horario y el menú permite ver todas las categorías, bebidas o comida. |
| RF-02 | Buscar por nombre o descripción sin depender de tildes o mayúsculas. | `CAFE` encuentra Café americano en Todas. Un resultado vacío permite limpiar la búsqueda y restablecer el filtro. |
| RF-03 | Agregar un producto y su cantidad desde el detalle. | Al agregar dos cafés, el menú informa el agregado y el encabezado muestra dos unidades. |
| RF-04 | Modificar cantidades y consultar subtotales y total en USD. | Subir de uno a dos cafés de $1,50 muestra $3,00. La cantidad mínima de una línea es 1. |
| RF-05 | Quitar y recuperar una línea, y cancelar el borrador completo. | Deshacer repone la cantidad retirada. Cancelar solicita confirmación y conservar el pedido mantiene las líneas. |
| RF-06 | Confirmar un pedido con artículos y mostrar su código, resumen y total. | Un carrito vacío explica cómo habilitar la acción. Tras confirmar aparece el código de retiro simulado y queda disponible al volver al menú. |

| ID | Requisito no funcional | Criterio de aceptación |
|---|---|---|
| RNF-01 | Interfaz adaptable con enfoque mobile first. | A 320 px, el contenido y las acciones se pueden usar sin desplazamiento horizontal. |
| RNF-02 | Operación por teclado y foco visible. | Tab, Enter y Espacio permiten recorrer y accionar los controles. Al cambiar de pantalla el foco se sitúa en el título y al editar una cantidad vuelve a un control de esa línea. |
| RNF-03 | Estructura semántica y comunicación accesible del estado. | Las vistas tienen título, los controles nombres accesibles y los avisos de agregado, cambio y recuperación se anuncian en una región de estado. |
| RNF-04 | Continuidad del borrador mediante persistencia local. | Agregar o modificar artículos, recargar y abrir Mi pedido conserva las líneas y sus cantidades. La integración de persistencia corresponde a la [issue #4](https://github.com/Sax300-cpu/Prueba-Practica-IHC_2p/issues/4). |

[Mapa y flujos](arquitectura-informacion.md) · [Trazabilidad](trazabilidad.md)
