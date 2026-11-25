# Arquitectura de información

## Sitemap

- **Inicio** · horario y ubicación.
- **Menú** · buscador, categorías, catálogo, subtotal y acceso a Mi pedido.
  - **Detalle de producto** · descripción, precio y cantidad para agregar.
- **Mi pedido** · cantidades, subtotales, total, quitar, deshacer, cancelar y confirmar.
  - **Confirmación** · código de retiro, resumen y regreso al menú.

La cabecera permite ir a Inicio y Mi pedido. Después de confirmar también permite volver a consultar el último código durante la sesión.

## Flujos de usuario

| Objetivo | Recorrido | Decisiones y recuperación |
|---|---|---|
| Compra | Inicio → Menú → Detalle → Agregar → Mi pedido → Confirmar → Código de retiro | Si la búsqueda no devuelve productos, limpiar filtros. Si el carrito está vacío, regresar al menú. |
| Modificación | Menú → Mi pedido → Cambiar cantidad o quitar → Revisar total | Deshacer repone el último producto retirado y su cantidad. Para agregar otros, volver al menú. |
| Cancelación | Mi pedido → Cancelar pedido → Elegir entre conservar y vaciar | Conservar vuelve al borrador. Vaciar muestra el carrito vacío y permite volver al menú. La cancelación se aplica al borrador antes de confirmar. |

## Wireframes

Los tres wireframes principales del recorrido se encuentran en el [archivo de wireframes](../prototipos/wireframes/cafeu-wireframes.html): Menú, Mi pedido y Confirmación. Inicio y Detalle completan la navegación.
