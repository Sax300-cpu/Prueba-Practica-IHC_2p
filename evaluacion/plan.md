# Plan de evaluación de usabilidad — CaféU 2.0

**Asignatura:** Interacción Humano-Computador · **Docente:** Caiza Caizabuano José Rubén
**Integrantes:** Miranda Tarupi Luis Sebastian · Velasco Huayamave Kevin Andres · Cholota Bastidas Ariel Isai · Garcia Amores Manolo Jose

Este plan resume el protocolo de la prueba práctica integradora. El detalle de las consignas está en [`tareas.md`](tareas.md); el plan más extenso de la fase anterior de la materia se conserva en [`01_Plan_Evaluacion.md`](01_Plan_Evaluacion.md).

## 1. Objeto y pregunta de evaluación
Se evalúa la aplicación CaféU 2.0 (`src/presentation/index.html`). La pregunta, según ISO 9241-11, es: ¿en qué medida permite a estudiantes de la UTA consultar productos, modificar su pedido y confirmarlo con **eficacia**, **eficiencia** y **satisfacción**?

## 2. Métodos
- **Analítico:** evaluación heurística con las diez heurísticas de Nielsen, recorrido cognitivo de T2 y T3 y revisión de accesibilidad ([`heuristicas.md`](heuristicas.md), [`recorrido-cognitivo.md`](recorrido-cognitivo.md), [`accesibilidad.md`](accesibilidad.md)).
- **Empírico:** pruebas con usuarios con pensamiento en voz alta, sesiones P00 (piloto), P01 y P02.
- **Triangulación:** contraste de ambos métodos en [`hallazgos.md`](hallazgos.md) y priorización en [`backlog.md`](backlog.md).

## 3. Tareas, estado inicial y criterios
| Tarea | Escenario | Estado inicial | Tiempo meta / máximo | Éxito observable |
|---|---|---|---|---|
| T1 | Buscar un café americano (sin preocuparse por tildes) y agregarlo | Inicio, carrito en 0 | 45 s / 90 s | Contador en 1 con un café americano |
| T2 | Cambiar la cantidad a dos unidades y verificar el total | Mi pedido con 1 café americano | 45 s / 90 s | Cantidad 2 y total $3.00 |
| T3 | Quitar el producto, recuperarlo con deshacer y confirmar | Mi pedido con 2 cafés americanos | 60 s / 120 s | Código de retiro visible con $3.00 |

Una tarea termina en **éxito** sin ayuda, **éxito con ayuda** si se usó la pista estándar, o **fallo** si se supera el tiempo máximo o se abandona.

## 4. Métricas
- **Eficacia:** porcentaje de tareas completadas sin ayuda.
- **Eficiencia:** tiempo por tarea en segundos (mediana por tarea) frente a la meta.
- **Errores:** críticos (impiden la tarea) y no críticos.
- **Ayuda:** número de pistas usadas (una sola pista estándar permitida).
- **Satisfacción:** SEQ de 1 a 7 tras cada tarea y SUS al finalizar.

Con tres participantes, las métricas son **descriptivas** y no se generalizan estadísticamente.

## 5. Participantes
- Estudiantes de la UTA, mayores de edad, que **no participaron** en el diseño ni la construcción de la aplicación y no conocen las tareas.
- P00 (piloto, para revisar el protocolo y las consignas), P01 y P02.
- Cada participante firma el [consentimiento informado](02_Consentimiento_Informado.md). En las notas se usan solo códigos (P00, P01, P02).

## 6. Procedimiento
1. **Preparar el estado inicial:** limpiar los datos del sitio (`localStorage`) y recargar, porque el pedido persiste entre cargas; T2 y T3 parten con productos ya agregados.
2. Leer el consentimiento y la consigna palabra por palabra, sin nombrar botones ni rutas.
3. Iniciar el cronómetro al terminar la consigna y registrar en la [hoja de observación](04_Hoja_Observacion_SUS.md): resultado, tiempo, errores, ayuda y frases del participante.
4. Si el participante se bloquea, aplicar **una sola vez** la pista estándar: «Vuelve a leer la tarea y revisa las opciones que tienes en pantalla».
5. Aplicar el SEQ tras cada tarea y el SUS al final.
6. El moderador **no indica la respuesta ni guía hacia controles específicos**.

## 7. Roles previstos
| Sesión | Moderación | Observación |
|---|---|---|
| P00 | Ariel Cholota | Manolo García |
| P01 | Kevin Velasco | Manolo García |
| P02 | Luis Miranda | Manolo García |

## 8. Instrumentos
[Consentimiento informado](02_Consentimiento_Informado.md) · [Hoja de observación y SUS](04_Hoja_Observacion_SUS.md) · [Tareas T1–T3](tareas.md).
