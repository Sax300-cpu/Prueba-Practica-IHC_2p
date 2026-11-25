# CaféU 2.0 — Prueba Práctica Integradora IHC

UTA · FISEI · Ingeniería de Software · Interacción Humano-Computador (5.º semestre)

**Integrantes:** Miranda Tarupi Luis Sebastian · Velasco Huayamave Kevin Andres · Cholota Bastidas Ariel Isai · Garcia Amores Manolo Jose
**Docente:** Caiza Caizabuano Jose Ruben

> Origen: la v1 de la app y parte de la evidencia provienen del repo de la materia `Sax300-cpu/HCI-2026-G2` (`ape6/`). Aquí se reorganiza según la estructura exigida.

Aplicación web de la cafetería universitaria: consultar productos, buscar, armar un pedido, modificarlo y confirmarlo para recibir un código de retiro.

## Instalación
No hay dependencias que instalar. Se necesita un navegador actual y, para las pruebas, [Node.js](https://nodejs.org/) 18 o superior. Clona el repositorio:

```sh
git clone https://github.com/Sax300-cpu/Prueba-Practica-IHC_2p.git
cd Prueba-Practica-IHC_2p
```

## Ejecución
Desde la raíz del repositorio, inicia un servidor local, por ejemplo con Python 3:

```sh
python -m http.server 8000
```

Abre [CaféU](http://localhost:8000/src/presentation/index.html). Usa HTTP para que el navegador cargue los módulos JavaScript. La versión de referencia (v1) está en `prototipos/version-v1/index.html`.

## Pruebas
```sh
npm test
```
Ejecuta cinco pruebas automatizadas con el ejecutor nativo de Node (`tests/pruebas-automatizadas/`): búsqueda tolerante a tildes y mayúsculas, cantidades y totales, eliminar/recuperar/confirmar, persistencia y recuperación cuando `localStorage` falla.

## Arquitectura
Presentación → Aplicación → Dominio → Infraestructura. La presentación (`src/presentation/`) invoca casos de uso (`src/application/`), que operan sobre entidades y reglas (`src/domain/`); la infraestructura (`src/infrastructure/`) implementa el catálogo y la persistencia en `localStorage`. Detalle en [`docs/arquitectura.md`](docs/arquitectura.md).

## Funcionalidades
- Catálogo con filtros por categoría y búsqueda tolerante a tildes y mayúsculas, con salida cuando no hay resultados.
- Carrito con cantidades, subtotales y total, visible también desde el menú.
- Quitar un producto y deshacer la eliminación; cancelar el borrador con confirmación.
- Confirmación con código de retiro, botón «Copiar código» y consulta posterior desde «Último pedido».
- Persistencia del pedido al recargar (`localStorage`), navegación por teclado, foco visible y avisos en región de estado.

## Limitaciones
- Las pruebas con usuarios se hicieron con **tres participantes**: las métricas son descriptivas y no se generalizan. El consolidado de métricas no adjunta las hojas individuales de observación.
- El código de retiro es fijo (`#CU-104`), heredado de la v1; no hay servidor ni cuentas de usuario.
- Falta un indicador visual de pasos del flujo (H-07) y el aviso verde queda ligeramente por debajo del contraste 4,5:1.
- Archivos pedidos por el enunciado que aún no existen con ese nombre: `evaluacion/plan.md`, `evaluacion/piloto.md` y `evaluacion/resultados.csv` (el plan, el consentimiento y la hoja de observación están como `01_`, `02_` y `04_` en `evaluacion/`).

## Enlaces a evidencias
| Criterio | Evidencia | Responsable |
|---|---|---|
| 1 Análisis UX | [`docs/analisis-ux.md`](docs/analisis-ux.md) | KV |
| 2 Requisitos y AI | [Requisitos](docs/requisitos.md), [mapa y flujos](docs/arquitectura-informacion.md), [trazabilidad](docs/trazabilidad.md) | MG |
| 3 Prototipado | [Wireframes](prototipos/wireframes/cafeu-wireframes.html) | MG |
| 4 Implementación | [`src/`](src), [`tests/`](tests), [arquitectura](docs/arquitectura.md) | LM + MG |
| 5 Planificación y pilotaje | [Plan](evaluacion/01_Plan_Evaluacion.md), [tareas](evaluacion/tareas.md), [consentimiento](evaluacion/02_Consentimiento_Informado.md), [hoja de observación](evaluacion/04_Hoja_Observacion_SUS.md) | AC |
| 6 Heurística y accesibilidad | [Heurísticas](evaluacion/heuristicas.md), [recorrido cognitivo](evaluacion/recorrido-cognitivo.md), [accesibilidad](evaluacion/accesibilidad.md) | AC |
| 7 Pruebas con usuarios | [Métricas](evaluacion/metricas.md) | AC / KV |
| 8 Hallazgos y validación | [Hallazgos](evaluacion/hallazgos.md), `evaluacion/backlog.md`, [validación v2](evaluacion/validacion-v2.md), [capturas antes/después](evidencias/README.md) | MG / LM / AC |
| 9 GitHub y colaboración | Este README, historial de commits y pull requests | todos |
| Informe | [`informe/Informe_CafeU_2.0.pdf`](informe/Informe_CafeU_2.0.pdf) (fuentes LaTeX en `informe/`) | todos |
