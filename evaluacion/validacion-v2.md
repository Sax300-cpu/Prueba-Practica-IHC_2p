# Validación de Mejoras v1 → v2 — CaféU 2.0
**Universidad Técnica de Ambato – FISEI – Carrera de Software**  
**Asignatura:** Interacción Humano-Computador | **Actividad 7**

---

## 1. Resumen de Correcciones Implementadas (v2)
A partir de la triangulación entre la evaluación heurística (`H-01`–`H-09`) y las pruebas con participantes (`P00`–`P02`), se implementaron y verificaron las siguientes mejoras en la versión 2 del prototipo:

| ID Hallazgo | Problema en v1 | Solución Implementada en v2 | Evidencia Visual (`evidencias/`) |
| :---: | :--- | :--- | :--- |
| **H-01** | Aviso de producto agregado efímero y poco visible. | Banner persistente de alto contraste en región `aria-live` + badge de cantidad en la tarjeta del menú. | `evidencias/antes/h01-v1.png` vs `evidencias/despues/h01-v2.png` |
| **H-02** | Búsqueda sin resultados sin opción de restablecimiento. | Estado vacío con botón explícito **«Limpiar búsqueda y filtros»** que restablece la categoría *Todas*. | `evidencias/antes/h02-v1.png` vs `evidencias/despues/h02-v2.png` |
| **H-03 / H-05** | Pérdida del código de retiro al salir de confirmación y falta de copiado. | Botón **«Copiar código»** en `#CU-104` y acceso directo **«Último pedido»** en el menú. | `evidencias/antes/h03-v1.png` vs `evidencias/despues/h03-v2.png` |
| **H-08 / RF-05** | Eliminación irreversible sin opción de recuperación. | Implementación de acción **«Deshacer»** tras pulsar *Quitar*, reponiendo producto y cantidad exacta. | `evidencias/antes/h08-v1.png` vs `evidencias/despues/h08-v2.png` |

---

## 2. Verificación Post-Corrección
* **Comprobación funcional y automatizada:** Todas las pruebas unitarias e integración (`tests/`) superan los escenarios de búsqueda sin tildes (`CAFE`), cálculo de subtotales (`$3.00`), flujo *Quitar + Deshacer* y persistencia en `localStorage`.
* **Comprobación con usuarios:** Al repetir los escenarios críticos T1 y T3 sobre v2, la tasa de éxito alcanzó el **100 % sin necesidad de pistas**, reduciendo la mediana de T1 de 34 s a **21 s**.
