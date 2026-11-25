# Consolidado de Métricas y Resultados — CaféU 2.0
**Universidad Técnica de Ambato – FISEI – Carrera de Software**  
**Asignatura:** Interacción Humano-Computador | **APE 6 – Fase 2 / Actividad 7**

---

## 1. Objetivo
Registrar, calcular y analizar cuantitativamente las métricas de usabilidad (eficacia, eficiencia y satisfacción) obtenidas durante la ejecución de las pruebas empíricas con usuarios reales (P01 y P02, precedidas por el pilotaje P00), aplicando los lineamientos de la norma ISO 9241-11.

---

## 2. Resumen de Tasas de Éxito por Tarea (Eficacia)
*Fórmula utilizada: `(Participantes con éxito "Sí" / Total de participantes) × 100`*

| ID Tarea | Descripción Breve | P01 (Participante 1) | P02 (Participante 2) | Tasa de Éxito Global (%) |
| :---: | :--- | :---: | :---: | :---: |
| **T1** | Consultar horario de la cafetería | Sí | Sí | **100%** |
| **T2** | Agregar sánduche de queso al pedido | Sí | Sí | **100%** |
| **T3** | Agregar dos cafés americanos | Sí | Con ayuda (Pista) | **50%** |
| **T4** | Quitar sánduche y confirmar pedido (#CU-104) | Sí | Sí | **100%** |
| **T5** | Consultar cantidad de productos de comida | Sí | Sí | **100%** |
| **T6** | Simular cálculo de precio para 3 croissants | Sí | Sí | **100%** |

---

## 3. Tiempos de Ejecución y Eficiencia
*Nota: Tiempos registrados en segundos desde la finalización de la consigna del moderador hasta la conclusión de la tarea.*

| ID Tarea | Tiempo Meta (s) | Tiempo Máx. (s) | Mediana P01 (s) | Mediana P02 (s) | Estado de Eficiencia |
| :---: | :---: | :---: | :---: | :---: | :--- |
| **T1** | 60 | 120 | 22s | 31s | Óptimo (Muy por debajo de la meta) |
| **T2** | 60 | 120 | 38s | 45s | Óptimo |
| **T3** | 60 | 120 | 41s | 58s | Aceptable (Requirió pista en P02) |
| **T4** | 90 | 180 | 52s | 67s | Óptimo |
| **T5** | 60 | 120 | 25s | 34s | Óptimo |
| **T6** | 90 | 180 | 48s | 55s | Óptimo |

---

## 4. Resultados de Satisfacción (Cuestionario SUS)

Tras concluir la sesión de tareas, cada participante completó la escala SUS (*System Usability Scale*).

* **Participante P01:** Puntuación final calculada = **82.5 / 100** (Nivel: Excelente / Rango Aceptable alto).
* **Participante P02:** Puntuación final calculada = **77.5 / 100** (Nivel: Bueno / Rango Aceptable).
* **Promedio General de Satisfacción:** **80.0 / 100** *(Supera ampliamente el estándar de referencia aceptable fijado en 68 puntos)*.

---

## 5. Conclusiones Metodológicas
1. **Eficacia global alta:** Con un promedio de éxito superior al 91.6% en todas las tareas, se demuestra que el flujo principal de navegación e interacción de CaféU 2.0 es intuitivo y comprensible.
2. **Punto de fricción menor detectado:** La tarea **T3** evidenció un incremento en el tiempo de ejecución y necesidad de pista única en un usuario, lo cual se alinea con el hallazgo heurístico sobre la visibilidad del aviso flotante al agregar elementos al carrito, justificando la mejora prioritaria en la Versión 2 (v2).