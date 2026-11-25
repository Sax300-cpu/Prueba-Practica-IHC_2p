# Auditoría de Accesibilidad — CaféU 2.0
**Universidad Técnica de Ambato – FISEI – Carrera de Software**  
**Asignatura:** Interacción Humano-Computador | **Actividad 5**

---

## Criterios Verificados (WCAG 2.1 AA / RNF-01 a RNF-03)

| Dimensión | Requisito Asociado | Hallazgo y Verificación Técnica | Estado |
| :--- | :---: | :--- | :---: |
| **Adaptabilidad (320 px)** | `RNF-01` | Verificado en viewport móvil estrecho (`320 px`) y escritorio. Sin desbordamiento ni scroll horizontal en ninguna de las cinco vistas (ancho del documento = 320 px). Los botones y controles miden al menos `44×44 px`, salvo los filtros de categoría del menú, que miden `40 px` de alto. | **Cumple con observación** |
| **Navegación por teclado y foco** | `RNF-02` | Flujo completo operable mediante `Tab`, `Enter` y `Espacio` (incluyendo *Quitar* y *Deshacer*). Al cambiar de vista, el foco se traslada al encabezado `<h1>`; al modificar cantidades, el foco retorna al control de la línea editada. | **Cumple** |
| **Contraste cromático** | `RNF-01` | Ratios calculados con los colores reales de `src/presentation/estilos.css`: texto principal `#2c2c2c` sobre fondo `#faf6f2`, `13,0:1`; texto atenuado `#6f6a66` sobre el fondo, `5,0:1`; botón rojo `#c0392b` con texto blanco, `5,4:1`; indicador de foco `#1f3a93`, `9,4:1`. El texto blanco sobre el aviso verde `#218a55` alcanza `4,35:1`, por debajo del `4,5:1` exigido a texto normal (AA). | **Cumple con observación** |
| **Etiquetas y región de estado** | `RNF-03` | Uso de etiquetas semánticas (`<header>`, `<main>`, `<section>` con `aria-labelledby`), `aria-label` descriptivos en botones `+`/`-` y en el acceso al carrito (`Mi pedido, 2 artículos`), más región `aria-live="polite"` para anunciar agregado, cambio y recuperación. | **Cumple** |
| **Prevención y mensajes de error** | `RF-06` / `RNF-03` | Cuando el carrito está vacío, el botón *Confirmar pedido* permanece deshabilitado (`disabled`) acompañado de un mensaje explicativo adyacente que indica cómo habilitar la acción. | **Cumple** |
