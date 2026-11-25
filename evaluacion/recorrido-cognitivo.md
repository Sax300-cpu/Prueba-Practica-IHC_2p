# Recorrido Cognitivo — CaféU 2.0 (Tareas T2 y T3)
**Universidad Técnica de Ambato – FISEI – Carrera de Software**  
**Asignatura:** Interacción Humano-Computador | **Actividad 5**

---

## 1. Análisis de Tarea T2: Modificar cantidad y verificar total (`RF-04`)
* **Estado inicial:** Vista **Mi pedido** con 1 Café americano (`$1.50`).

1. **Acción 1: Localizar e incrementar la cantidad del producto.**
   * *¿Intentará el usuario realizar la acción correcta?* Sí, busca incrementar las unidades en la tarjeta del café.
   * *¿Verá el control disponible?* Sí, el selector numérico presenta los botones `-` y `+` claramente delimitados.
   * *¿Asociará el control con la acción?* Sí, el símbolo `+` es estándar para aumentar cantidad.
   * *¿Recibirá retroalimentación adecuada?* Sí, al pulsar `+`, la cantidad pasa a `2`, el subtotal de línea y el **Total** se actualizan de inmediato a `$3.00`, y el botón `-` se habilita (estando bloqueado cuando la cantidad es `1`).

---

## 2. Análisis de Tarea T3: Eliminar, recuperar y confirmar pedido (`RF-05`, `RF-06`)
* **Estado inicial:** Vista **Mi pedido** con 2 Cafés americanos (`$3.00`).

1. **Acción 1: Eliminar la línea de producto.**
   * *¿Verá y asociará el control?* Sí, el botón **Quitar** en tono rojo de alerta comunica claramente la eliminación de la línea.
   * *¿Recibirá retroalimentación?* La línea desaparece y el sistema despliega una notificación con la opción **Deshacer** para revertir la acción.
2. **Acción 2: Recuperar el producto eliminado.**
   * *¿Asociará el control de recuperación?* Sí, pulsar **Deshacer** restaura la línea de Café americano conservando sus `2` unidades y el total de `$3.00` (cumpliendo `RF-05`).
3. **Acción 3: Confirmar la orden y obtener código de retiro.**
   * *¿Identificará la acción de cierre?* Sí, el botón inferior oscuro **Confirmar pedido** destaca como acción primaria.
   * *¿Comprenderá el resultado?* Sí, al confirmar aparece la vista **¡Pedido confirmado!** con el código `#CU-104`, el resumen pagado y el acceso persistente desde *Último pedido* en el menú (`RF-06`).
