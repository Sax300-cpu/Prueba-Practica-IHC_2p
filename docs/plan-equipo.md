# Plan — Prueba Práctica Integradora IHC · CaféU 2.0 (2,00 pts)

Equipo: Kevin Velasco (KV), Manolo García (MG), Luis Miranda (LM), Ariel Cholota (AC)

## Context
El TXT pide un repo GitHub con 7 actividades (análisis UX, requisitos, arquitectura/implementación, plan de evaluación, evaluación heurística, pilotaje con usuarios, triangulación y validación v1/v2) y una estructura de carpetas fija (`README, docs/, prototipos/, src/{presentation,application,domain,infrastructure}, tests/, evaluacion/, evidencias/`). Cada integrante debe tener commits y revisiones verificables.

## Hallazgo sobre el repo existente (`Sax300-cpu/HCI-2026-G2`)
Es el repo de la materia (APE4, APE5, APE6, presentación), no un repo de entrega. Contiene la app CaféU en `ape6/prototipo/` (HTML + `interaccion.js` 295 líneas + CSS; catálogo, búsqueda sin tildes, aviso, quitar, confirmar), y material **real** reutilizable: `ape6/Fase3-4/` (backlog H-01…H-09, ajustes v2, triangulación, P1–P3, heurísticas de los 4, métricas), wireframes (`prototipos/`, `ape4/fase2/`), plan/consentimiento/SUS (`ape6/Fase1/`).
Lo que **falta** frente al TXT: capas `src/` (hoy todo en un JS, sin dominio/aplicación/infra), persistencia (pedido solo en memoria), pruebas automatizadas (0), `docs/analisis-ux`, `requisitos`, `arquitectura`, `trazabilidad`, sitemap/user-flow como entregables, carga de cantidad en carrito, recuperar eliminado, README exigido.

## Decisión recomendada: crear repo NUEVO `cafeu-ihc-integrador`
Motivos: (1) el TXT exige esa estructura en la raíz y el repo actual ya usa raíz para otras APE; (2) el evaluador ve limpio solo lo de esta prueba; (3) los commits/PRs de los 4 quedan trazables en un repo nuevo. Se **migra** (copia con referencia al origen en el README) el código y evidencias reutilizables desde `ape6/`. Alternativa: usar el repo actual en una carpeta `cafeu-ihc-integrador/` — válida pero mezcla evidencia y es menos clara. Confirmar con el equipo.

Aviso de honestidad (regla del TXT): P1–P3 son pruebas reales ya hechas; reutilizarlas **solo si** fueron personas ajenas al desarrollo, y declarar cuál actúa como P00 (piloto) y cuáles como P01/P02. No inventar datos nuevos; si v2 corrige problemas, repetir comprobaciones con participantes reales.

## Reparto equitativo (≈ 18–20 h c/u)

| Persona | Responsabilidad principal | Entregables | Criterios (pts) |
|---|---|---|---|
| **Kevin (inicio / base)** | Repo + organización, Actividad 1, métricas | Crear repo, estructura de carpetas, ramas, plantilla de PR, issues, `README.md` final; `docs/analisis-ux.md` (persona, ≥5 touchpoints, 2 momentos de verdad, curva emocional, matriz problemas↔Nielsen/Gestalt); `evaluacion/metricas.md` (éxito, tiempos, SEQ/SUS); `evidencias/` ordenadas | 1 (0,15) + 9 (0,20) |
| **Manolo** | Actividad 2 + capa Presentación | `docs/requisitos.md` (6 RF + 4 RNF), `sitemap`, `user-flow` (compra/modificación/cancelación), 3 wireframes en `prototipos/`, `docs/trazabilidad.md`; `src/presentation` (componentes reutilizables, Mobile First, teclado, foco visible, HTML semántico, estados/errores) | 2 (0,15) + 3 (0,15) |
| **Luis** | Actividad 3 núcleo + correcciones | `src/domain` (Producto, Pedido, DetallePedido, reglas), `src/application` (casos de uso), `src/infrastructure` (repositorio LocalStorage), `tests/` (≥3 pruebas críticas automatizadas: búsqueda con tildes, total/cantidades, eliminar/recuperar+confirmar), `docs/arquitectura.md`; implementar ≥2 correcciones v2 | 4 (0,35, compartido con MG) |
| **Ariel** | Actividades 4 y 5 | `evaluacion/plan.md`, `tareas.md` (T1–T3), `consentimiento.md`, hoja de observación, cuestionario SEQ/SUS, `heuristicas.md` (10 heurísticas, 5 hallazgos sev. 0–4), `recorrido-cognitivo.md` (T2, T3), `accesibilidad.md` (teclado, contraste, etiquetas, errores) | 5 (0,15) + 6 (0,25) |

Actividades 6 y 7 (criterios 7 y 8 = 0,60 pts) se reparten para que nadie quede fuera:
- **Pilotaje (todos):** P00 moderado por AC, P01 por KV, P02 por LM; MG observa/anota en todas (rotar). Moderador no guía hacia controles. Datos en `evaluacion/piloto.md` y `resultados.csv`.
- **Triangulación:** KV `metricas.md` · MG `hallazgos.md` (heurística vs. usuarios) · LM `backlog.md` (severidad×impacto) + implementación de fixes · AC `validacion-v2.md` + capturas antes/después en `evidencias/`.

## Cronograma sugerido (4 bloques)
1. **Base (KV, hoy):** repo, estructura, README esqueleto, issues por persona, importar código y evidencias reutilizables. Luego todos ramifican.
2. **Diseño y código en paralelo:** KV A1 · MG A2 + presentación · LM capas+tests · AC A4/A5 (heurística puede hacerse sobre v1 ya existente).
3. **Pilotaje y pruebas:** P00 → ajuste de consignas → P01/P02; completar hojas y CSV.
4. **Cierre:** triangulación, backlog, ≥2 fixes (v2), repetir comprobaciones, README final con enlaces, revisión cruzada de PRs.

## Colaboración verificable (criterio 9)
Ramas `feat/…` por persona, PR con ≥1 revisión de otro integrante, commits pequeños con autor propio, tabla de aportes en README. Evitar que una persona suba todo.

## Mi parte (Kevin) — "lo del inicio", pasos concretos
1. Crear repo `cafeu-ihc-integrador` (público/privado según docente), invitar a Manolo, Luis y Ariel (usuarios GitHub vistos: Sax300-cpu, Garcia2501, LuisMiranda0, ArielIsai).
2. Crear árbol de carpetas del TXT con `.gitkeep`, `README.md` con secciones obligatorias (instalación, ejecución, pruebas, arquitectura, funcionalidades, limitaciones, enlaces a evidencias).
3. Importar `ape6/prototipo` como `src/` v1 provisional y wireframes a `prototipos/`; guardar v1 intacta en `prototipos/version-v1`.
4. Crear 4 issues/milestones con el reparto de arriba y proteger `main` (PR obligatorio).
5. Escribir `docs/analisis-ux.md`.

## Verificación
- Estructura del repo coincide con la sección 5 del TXT (comparar árbol).
- App abre en navegador, persiste pedido tras recargar, `npm test` (o equivalente) pasa ≥3 pruebas.
- Checklist de la matriz de 9 criterios: cada uno con archivo de evidencia enlazado en README.
- `git shortlog -sn` muestra los 4 autores.
