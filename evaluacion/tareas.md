# Definición de Tareas de Evaluación — CaféU 2.0
**Universidad Técnica de Ambato – FISEI – Carrera de Software**  
**Asignatura:** Interacción Humano-Computador | **Actividades 4 y 6**

---

## Reglas de aplicación (Moderador)
1. Leer la consigna palabra por palabra sin mencionar botones o rutas específicas.
2. Iniciar el cronómetro al terminar de leer la consigna.
3. Aplicar la pista única estandarizada una sola vez si el usuario se bloquea: *«Vuelve a leer la tarea y revisa las opciones que tienes en pantalla»*.

---

## Matriz de Tareas Críticas (T1 – T3)

| ID | Trazabilidad | Escenario y Consigna | Estado Inicial | Tiempo Meta / Máx. | Criterio de Éxito Observable | Métricas Asociadas |
| :---: | :---: | :--- | :--- | :---: | :--- | :--- |
| **T1** | `RF-01`, `RF-02`, `RF-03` | **Buscar y agregar:** «Estás por salir de clases y quieres pedir un café americano. Verifica si la cafetería atiende hoy, busca el producto sin preocuparte por tildes y agrégalo a tu pedido.» | Pantalla **Inicio** (horario `7:00 – 18:00`, carrito en `0`). | 45 s / 90 s | Consulta horario, filtra/busca `CAFE`, entra al detalle y agrega 1 Café americano ($1.50). Contador marca `1`. | Eficacia (% éxito), Tiempo (s), Errores, SEQ. |
| **T2** | `RF-04` | **Cantidad y total:** «Revisa tu pedido actual, cambia la cantidad del café americano a dos unidades y verifica cuánto vas a pagar en total.» | Pantalla **Mi pedido** con 1 Café americano ($1.50). | 45 s / 90 s | Pulsa `+` en la línea del producto; la cantidad sube a `2`, el total marca `$3.00` y el botón `-` queda habilitado. | Eficacia (% éxito), Tiempo (s), Errores, SEQ. |
| **T3** | `RF-05`, `RF-06` | **Eliminar/recuperar y confirmar:** «Quita el producto de tu pedido para probar qué pasa, recupéralo usando la opción de deshacer y finalmente confirma la orden para obtener tu código de retiro.» | Pantalla **Mi pedido** con 2 Cafés americanos ($3.00). | 60 s / 120 s | Pulsa **Quitar**, acciona **Deshacer** reponiendo las 2 unidades ($3.00), pulsa **Confirmar pedido** y lee el código `#CU-104`. | Eficacia (% éxito), Tiempo (s), Errores, SUS final. |

---

## Cuestionario Post-Tarea (SEQ - Single Ease Question)
Al finalizar cada tarea (T1, T2, T3), el participante responde de 1 a 7:  
*«En general, ¿qué tan fácil o difícil te resultó completar esta tarea?»* (`1 = Muy difícil` ... `7 = Muy fácil`).
