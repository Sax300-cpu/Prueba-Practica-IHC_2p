# Recorrido Cognitivo — CaféU 2.0 (Tareas T2 y T3)
**Universidad Técnica de Ambato – FISEI – Carrera de Software**  
**Asignatura:** Interacción Humano-Computador | **APE 6 – Fase 2 / Actividad 5**

---

## 1. Objetivo
Evaluar de manera analítica si el diseño de la interfaz de CaféU 2.0 guía correctamente al usuario paso a paso en sus decisiones y acciones durante la modificación del carrito y la confirmación final de la compra, respondiendo a las cuatro preguntas fundamentales del recorrido cognitivo.

---

## 2. Análisis de la Tarea T2: Modificar cantidad y verificar el total
* **Objetivo del usuario:** Incrementar la cantidad de un producto en el carrito y comprobar que el precio total se actualice de forma coherente.
* **Estado inicial:** Vista de **Mi pedido** con 1 unidad de "Café americano" ($1.50).

### Secuencia de pasos y preguntas cognitivas:
1. **Paso 1: Localizar los controles de modificación de cantidad.**
   * *¿Intentará el usuario realizar la acción correcta?* Sí, el usuario identifica visualmente el cuadro contenedor del producto dentro de la tarjeta del carrito.
   * *¿Verá el usuario que el control está disponible?* Sí, los botones de incremento (`+`) y decremento (`-`) junto al número de cantidad se muestran claramente dentro de un control estilizado.
   * *¿Asociará el usuario la acción correcta con el control disponible?* Sí, el icono `+` es un estándar universal de incremento de cantidad.
   * *¿Obtendrá el usuario retroalimentación adecuada al realizar la acción?* Sí, al hacer clic en `+`, el contador cambia de `1` a `2` de forma inmediata y el subtotal de la fila se actualiza a `$3.00`.

2. **Paso 2: Comprobar la actualización del monto total general.**
   * *¿Intentará el usuario buscar el precio total final?* Sí, la vista despliega una sección inferior de desglose con subtotales y la línea de "Total".
   * *¿El sistema comunica con claridad el cambio de precio?* Sí, el total se recalcula de forma automática a `$3.00`, permitiendo al usuario avanzar con seguridad hacia el siguiente paso.

---

## 3. Análisis de la Tarea T3: Eliminar/recuperar un producto y confirmar el pedido
* **Objetivo del usuario:** Quitar un elemento no deseado del carrito, verificar el ajuste del pedido y completar la confirmación hasta visualizar el código de retiro (`#CU-104`).
* **Estado inicial:** Vista de **Mi pedido** con múltiples ítems.

### Secuencia de pasos y preguntas cognitivas:
1. **Paso 1: Encontrar la opción para eliminar el producto.**
   * *¿Intentará el usuario realizar la acción de remoción?* Sí, busca un enlace o botón de eliminación asociado al elemento.
   * *¿Verá el usuario el control de eliminación?* Sí, el texto en color rojo con la etiqueta **Quitar** está ubicado en la esquina inferior derecha de la tarjeta del producto.
   * *¿Obtendrá retroalimentación inmediata?* El producto desaparece de la lista y el total se ajusta. *Observación de mejora:* El sistema elimina el ítem de inmediato sin ofrecer un mensaje de deshacer (*Undo*), lo que podría generar dudas si el clic fue accidental.

2. **Paso 2: Avanzar hacia la confirmación de la orden.**
   * *¿Identificará el usuario el botón de cierre del pedido?* Sí, el botón principal inferior **Confirmar pedido** destaca visualmente con un tono oscuro y una flecha de acción.
   * *¿El sistema valida restricciones antes de continuar?* Sí, si el carrito quedara vacío, el botón se bloquea de manera lógica (prevención de errores H5).
   * *¿Se comunica el éxito de la transacción?* Sí, al hacer clic, el sistema transiciona a la pantalla verde de confirmación mostrando de manera visible el código único de retiro (`#CU-104`).