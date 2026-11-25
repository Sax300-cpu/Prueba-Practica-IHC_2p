# Informe de guía práctica (LaTeX)

Documento final de la prueba. La portada, objetivos e instrucciones ya están armados. **Cada integrante edita solo su carpeta**, así no hay conflictos al fusionar.

| Integrante | Carpeta | Archivos a completar |
|---|---|---|
| Kevin Velasco | `secciones/kv/` | `resultados.tex` (falta métricas), `conclusiones.tex`, `recomendaciones.tex` |
| Manolo García | `secciones/mg/` | `resultados.tex`, `conclusiones.tex`, `recomendaciones.tex` |
| Luis Miranda | `secciones/lm/` | `resultados.tex`, `conclusiones.tex`, `recomendaciones.tex` |
| Ariel Cholota | `secciones/ac/` | `resultados.tex`, `conclusiones.tex`, `recomendaciones.tex` |

## Estado
El informe está completo y compilado en `Informe_CafeU_2.0.pdf`. Los textos de Luis y Ariel se redactaron a partir de sus documentos del repositorio: cada uno debe leer su sección y corregirla si algo no refleja su trabajo.

## Cómo editar
1. Trabajamos en la rama compartida `docs/informe`: `git checkout docs/informe` y `git pull --rebase origin docs/informe`.
2. Edita solo tu carpeta `secciones/<iniciales>/`.
3. Capturas: copia la imagen a `imagenes/` y usa `\includegraphics`.
4. Recompila (`latexmk -pdf main.tex` dentro de `informe/`), copia `main.pdf` a `Informe_CafeU_2.0.pdf` y sube.

## Reglas de contenido
- Usa solo datos reales del repositorio. No inventes resultados de pruebas con usuarios.
- Tablas y capturas deben apuntar a su evidencia en el repo (ruta del archivo).
- En LaTeX escapa `%`, `&`, `_`, `#` y `$` con una barra invertida.

## Compilar
```powershell
cd informe
latexmk -pdf main.tex
```
(o súbelo a Overleaf con la carpeta completa). Los archivos auxiliares no se versionan.
