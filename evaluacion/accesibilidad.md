# Auditoría de Accesibilidad — CaféU 2.0
**Universidad Técnica de Ambato – FISEI – Carrera de Software**  
**Asignatura:** Interacción Humano-Computador | **Actividad 5**

---

## Criterios Verificados (WCAG 2.1 AA / RNF-01 a RNF-03)

| Dimensión | Requisito Asociado | Hallazgo y Verificación Técnica | Estado |
| :--- | :---: | :--- | :---: |
| **Adaptabilidad (320 px)** | `RNF-01` | Verificado en viewport móvil estrecho (`320 px`) y escritorio. Sin desbordamiento ni scroll horizontal; tarjetas y controles táctiles conservan área mínima de `44×44 px`. | **Cumple** |
| **Navegación por teclado y foco** | `RNF-02` | Flujo completo operable mediante `Tab`, `Enter` y `Espacio` (incluyendo *Quitar* y *Deshacer*). Al cambiar de vista, el foco se traslada al encabezado `<h1>`; al modificar cantidades, el foco retorna al control de la línea editada. | **Cumple** |
| **Contraste cromático** | `RNF-01` | Tipografía oscura (`#1A1A1A`) y acentos institucionales (`#7A1C1C`) sobre fondo crema/blanco (`#FAF8F5` / `#FFFFFF`) alcanzan ratios superiores a `7:1` (AAA), garantizando lectura bajo luz solar en campus. | **Cumple** |
| **Etiquetas y región de estado** | `RNF-03` | Uso de etiquetas semánticas (`<header>`, `<nav>`, `<main>`), `aria-label` descriptivos en botones `+`/`-` y contador de carrito (`Mi pedido: 2 artículos`), más región `aria-live="polite"` para anunciar agregado, cambio y recuperación. | **Cumple** |
| **Prevención y mensajes de error** | `RF-06` / `RNF-03` | Cuando el carrito está vacío, el botón *Confirmar pedido* permanece deshabilitado (`disabled`) acompañado de un mensaje explicativo adyacente que indica cómo habilitar la acción. | **Cumple** |
