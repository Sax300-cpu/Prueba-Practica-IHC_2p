# Evaluación Heurística — CaféU 2.0
**Universidad Técnica de Ambato – FISEI – Carrera de Software**  
**Asignatura:** Interacción Humano-Computador | **Actividad 5**

---

## 1. Inspección de las 10 Heurísticas de Nielsen

1. **H1 – Visibilidad del estado del sistema:** El cálculo de subtotales es inmediato, pero el aviso flotante de confirmación al agregar productos resulta efímero y pasa desapercibido en pantallas móviles.
2. **H2 – Relación entre el sistema y el mundo real:** Terminología familiar del campus (*Catálogo*, *Mi pedido*, *Retiro en cafetería*) y precios claros en USD (`$1.50`, `$3.75`). El contador superior carece de etiqueta textual explícita (`artículos`).
3. **H3 – Control y libertad del usuario:** Existe navegación de retorno (`<`) y opción de cancelar borrador, pero salir de la pantalla de confirmación borra el acceso inmediato al código si no se persiste en sesión.
4. **H4 – Consistencia y estándares:** Barra inferior estable (*Inicio*, *Menú*, *Pedido*), aunque las tarjetas del menú son completamente clicables mientras que las filas de *Mi pedido* solo permiten interacción en botones puntuales.
5. **H5 – Prevención de errores:** El botón *Confirmar pedido* se bloquea cuando el carrito está vacío, pero la explicación del motivo del bloqueo está visualmente alejada del botón de acción.
6. **H6 – Reconocer antes que recordar:** Imágenes, descripciones y precios visibles evitan carga cognitiva. Sin embargo, el total acumulado no es visible mientras se navega en el menú y el código `#CU-104` no tiene botón de copiado rápido.
7. **H7 – Flexibilidad y eficiencia de uso:** El buscador integrado agiliza la selección de productos para usuarios frecuentes mediante filtrado instantáneo sin sensibilidad a mayúsculas o tildes.
8. **H8 – Diseño estético y minimalista:** Interfaz limpia orientada a *Mobile-First* con jerarquía clara entre el banner de horario, catálogo y resumen de orden.
9. **H9 – Ayudar a reconocer, diagnosticar y recuperarse de errores:** En v1, una búsqueda sin coincidencias dejaba un estado vacío sin acción directa para limpiar filtros y recuperar el catálogo.
10. **H10 – Ayuda y documentación:** Flujo autodescriptivo con microcopys de apoyo (*«Presenta este número al recoger»*, *«Listo en aproximadamente 12 minutos»*).

---

## 2. Hallazgos Principales Consolidados (Severidad 0–4)

| ID | Hallazgo Detectado | Heurística Violada | Severidad (0-4) | Impacto en la Experiencia |
| :---: | :--- | :---: | :---: | :--- |
| **H-01** | Aviso «Producto agregado» efímero y de bajo contraste frente al fondo. | H1 (Visibilidad) | **3** (Mayor) | 2 de 3 usuarios dudaron si el artículo se sumó al carrito (Momento de Verdad 1). |
| **H-02** | Búsqueda sin resultados carece de botón directo para limpiar búsqueda y filtros. | H9 (Recuperación) | **3** (Mayor) | P2 tardó 24 s en notar que el filtro *Comida* seguía activo al buscar café. |
| **H-03** | Salir de la pantalla de confirmación impide volver a consultar el código generado. | H3 (Control y libertad) | **2** (Menor) | Si el estudiante cierra la vista antes de llegar a caja, pierde la referencia del pedido. |
| **H-04** | El motivo del bloqueo de *Confirmar pedido* en carrito vacío está lejos del botón. | H5 (Prevención) | **2** (Menor) | Genera incertidumbre sobre por qué el botón principal está inhabilitado. |
| **H-05** | El código de retiro (`#CU-104`) no cuenta con acción de copiado rápido ni instrucción destacada. | H6 / H10 | **2** (Menor) | Obliga al usuario a memorizar o mantener la pantalla encendida hasta retirar. |
