# Evaluación y Verificación de Accesibilidad — CaféU 2.0
**Universidad Técnica de Ambato – FISEI – Carrera de Software**  
**Asignatura:** Interacción Humano-Computador | **APE 6 – Fase 2 / Actividad 5**

---

## 1. Objetivo
Comprobar el cumplimiento de los estándares básicos de accesibilidad web (enfocados en WCAG y usabilidad inclusiva) sobre el prototipo móvil **CaféU 2.0**, garantizando una correcta navegación por teclado, contraste cromático adecuado, semántica HTML y un manejo robusto de errores.

---

## 2. Criterios de Evaluación y Auditoría de Interfaz

### A. Navegación por Teclado y Foco Visible (`Tab` y `Focus`)
* **Estado en CaféU 2.0:** Todos los elementos interactivos principales (enlaces de navegación inferior, botones de tarjetas de menú, controles de cantidad `+`/`-` y botones de confirmación) aceptan el foco mediante la tecla `Tab`.
* **Mejora aplicada:** Se verifica que el indicador de foco (*outline*) sea visible y mantenga un contraste adecuado para que los usuarios que dependen del teclado no pierdan su ubicación en la pantalla móvil.

### B. Contraste de Colores
* **Estado en CaféU 2.0:** Se utiliza una paleta institucional basada en tonos oscuros sobre fondos claros (*#ffffff* y grises suaves), combinados con acentos en borravino y negro carbón (*#1a1a1a*). 
* **Verificación:** Los textos principales de los títulos (*Menú de hoy*, *Mi pedido*) y los precios (*$1.50*) superan el ratio mínimo de contraste WCAG AA, garantizando legibilidad ante fatiga visual o iluminación ambiental directa en la cafetería.

### C. Etiquetas Semánticas y Roles (HTML5 y Accesibilidad)
* **Estado en CaféU 2.0:** Uso riguroso de etiquetas semánticas de HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`) en lugar de contenedores genéricos `<div>`.
* **Atributos de apoyo:** Los botones de control de cantidad cuentan con descripciones adecuadas para lectores de pantalla, asegurando que elementos críticos como el contador del carrito (`Mi pedido (1)`) sean anunciados con precisión.

### D. Manejo de Errores y Validaciones
* **Estado en CaféU 2.0:** Los errores de interacción (por ejemplo, intentar confirmar un pedido con el carrito vacío) se previenen de forma lógica deshabilitando el botón de acción principal e incorporando mensajes descriptivos claros que guían al usuario hacia el estado correcto sin recurrir a códigos crípticos.

---

## 3. Resumen del Checklist de Accesibilidad

| Categoría WCAG / IHC | Criterio Verificado | Estado Actual | Observación o Acción de Mejora |
| :--- | :--- | :---: | :--- |
| **Operable** | Navegación completa mediante teclado (`Tab` / `Enter`) | **Cumplido** | Los flujos principales se completan sin uso obligatorio de ratón. |
| **Perceptible** | Contraste de texto y fondo (Ratio mín. 4.5:1) | **Cumplido** | Excelente legibilidad en tipografías y precios sobre fondo claro. |
| **Perceptible** | Uso de texto alternativo en imágenes de productos | **En revisión** | Asegurar atributos `alt` descriptivos en las fotos del catálogo. |
| **Robusto** | Estructura semántica HTML5 y etiquetas de formulario | **Cumplido** | Uso correcto de elementos semánticos para lectores de pantalla. |
| **Comprensible** | Prevención y mensajes claros ante acciones bloqueadas | **Cumplido** | Botones inhabilitados lógicamente para evitar estados nulos. |