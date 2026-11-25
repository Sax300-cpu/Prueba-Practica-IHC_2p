# Evaluación Heurística — CaféU 2.0
**Universidad Técnica de Ambato – FISEI – Carrera de Software**  
**Asignatura:** Interacción Humano-Computador | **APE 6 – Fase 2 / Actividad 5**

---

## 1. Objetivo
Inspeccionar de forma sistemática y preventiva la interfaz de usuario del prototipo web móvil **CaféU 2.0** aplicando las **10 heurísticas de usabilidad de Jakob Nielsen**, con el fin de identificar problemas de interacción antes de las pruebas con usuarios y asignarles un nivel de severidad (escala de 0 a 4).

---

## 2. Inspección detallada según las 10 Heurísticas de Nielsen

### H1: Visibilidad del estado del sistema
* **Criterio:** El sistema debe mantener siempre informados a los usuarios de lo que está ocurriendo, a través de retroalimentación visual adecuada en un tiempo razonable.
* **Evaluación en CaféU 2.0:** El estado de carga y los subtotales responden de forma inmediata. Sin embargo, el aviso de confirmación al agregar un producto al carrito se desvía en pantallas de menor resolución, afectando la visibilidad del feedback inmediato.

### H2: Relación entre el sistema y el mundo real
* **Criterio:** El sistema debe hablar el idioma del usuario, utilizando palabras, frases y conceptos familiares para él, siguiendo convenciones del mundo real.
* **Evaluación en CaféU 2.0:** Excelente uso del lenguaje contextual de una cafetería universitaria (*Catálogo*, *Mi pedido*, *Café americano*, *Sándwich de pollo*). El formato de moneda ($) y el horario (*Lunes a viernes, 7:00 – 18:00*) se adaptan perfectamente al entorno de la UTA.

### H3: Control y libertad del usuario
* **Criterio:** Los usuarios suelen elegir las funciones del sistema por error y necesitarán una "salida de emergencia" claramente marcada para abandonar el estado no deseado.
* **Evaluación en CaféU 2.0:** Se cuenta con botones de retorno (`<`) y la opción de eliminar ítems en el carrito (*Quitar*). No obstante, falta una opción explícita de "Deshacer" (*Undo*) inmediata tras eliminar un producto por accidente.

### H4: Consistencia y estándares
* **Criterio:** Los usuarios no deberían tener que preguntarse si diferentes palabras, situaciones o acciones significan la misma cosa. Seguir las convenciones de la plataforma.
* **Evaluación en CaféU 2.0:** Se respeta la consistencia de la barra de navegación inferior (*Inicio*, *Menú*, *Pedido*). Los colores institucionales y la tipografía se mantienen estables en todo el flujo móvil.

### H5: Prevención de errores
* **Criterio:** Incluso mejor que un buen diseño de mensajes de error es un diseño cuidadoso que previene que ocurra el problema en primer lugar.
* **Evaluación en CaféU 2.0:** El botón de "Confirmar pedido" se encuentra deshabilitado de forma lógica cuando el carrito está vacío, previniendo envíos nulos o erróneos.

### H6: Reconocer antes que recordar
* **Criterio:** Minimizar la carga de memoria del usuario haciendo visibles los objetos, acciones y opciones.
* **Evaluación en CaféU 2.0:** Los productos se muestran con imágenes reales, descripciones cortas y precios visibles, evitando que el usuario deba memorizar el catálogo. El selector de cantidad (`-` / `+`) hace explícitas las opciones disponibles.

### H7: Flexibilidad y eficiencia de uso
* **Criterio:** Los aceleradores —ocultos a la vista de los usuarios novatos— pueden acelerar la interacción para el usuario experto.
* **Evaluación en CaféU 2.0:** La barra de búsqueda superior permite filtrar productos rápidamente. Sin embargo, el buscador presenta sensibilidad estricta a las tildes, lo que puede restar eficiencia a usuarios con escritura rápida.

### H8: Diseño estético y minimalista
* **Criterio:** Las páginas no deben contener información irrelevante o poco frecuente. Cada unidad adicional de información compite con las unidades de información relevante.
* **Evaluación en CaféU 2.0:** Diseño limpio, moderno y minimalista enfocado en Mobile-First, priorizando la tarjeta principal de llamada a la acción (*Pide antes de llegar*) y el menú de productos sin saturación visual.

### H9: Ayudar a reconocer, diagnosticar y recuperarse de errores
* **Criterio:** Los mensajes de error deben expresarse en un lenguaje claro (sin códigos), indicar exactamente el problema y sugerir una solución constructiva.
* **Evaluación en CaféU 2.0:** Los estados vacíos del carrito y los avisos de validación operan correctamente, aunque se benefician de descripciones más explícitas cuando un campo o condición de pago requiere atención.

### H10: Ayuda y documentación
* **Criterio:** Incluso es mejor si el sistema no necesita explicaciones adicionales; sin embargo, puede ser necesario proveer ayuda y documentación.
* **Evaluación en CaféU 2.0:** Al ser una aplicación de uso intuitivo en entornos cotidianos, no requiere manuales extensos; el flujo guiado desde el menú hasta el código `#CU-104` es autodescriptivo.

---

## 3. Hallazgos Principales con Escala de Severidad (0–4)
*(Escala de Nielsen: 0 = No es un problema; 1 = Problema cosmético; 2 = Problema menor; 3 = Problema mayor; 4 = Catástrofe de usabilidad)*

| ID Hallazgo | Descripción del Problema en la Interfaz | Heurística Violada | Severidad (0-4) | Evidencia / Impacto |
| :---: | :--- | :---: | :---: | :--- |
| **H-01** | El aviso flotante de "Producto agregado" no se percibe correctamente al borde de la pantalla móvil. | H1 (Visibilidad) | **3** (Mayor) | Varios usuarios ignoran si el producto ingresó al carrito basándose solo en el contador superior. |
| **H-02** | El buscador superior no tolera errores ortográficos o ausencia de tildes. | H7 (Flexibilidad) | **2** (Menor) | Si el usuario busca "cafe" sin tilde, el sistema puede no retornar resultados inmediatos. |
| **H-03** | Ausencia de un mecanismo de "Deshacer" (*Undo*) al hacer clic accidentalmente en "Quitar" un producto. | H3 (Control y libertad) | **2** (Menor) | El producto se elimina de inmediato del carrito sin dar margen de reversión rápida. |
| **H-04** | Falta de contraste o indicación explícita de disponibilidad en tarjetas de productos agotados o fuera de horario. | H5 (Prevención de errores) | **1** (Cosmético) | Puede generar ligeras dudas puntuales si el usuario intenta ordenar fuera del horario de 7:00 a 18:00. |
| **H-05** | El número de pedido generado (`#CU-104`) no cuenta con un botón rápido de copiado al portapapeles. | H6 (Reconocer antes que recordar) | **2** (Menor) | El usuario debe retener visualmente el código para dictarlo o mostrarlo al retirar en la cafetería. |