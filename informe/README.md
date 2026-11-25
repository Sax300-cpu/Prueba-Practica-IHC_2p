# Informe de guía práctica (LaTeX)

Documento final de la prueba. La portada, objetivos e instrucciones ya están armados. **Cada integrante edita solo su carpeta**, así no hay conflictos al fusionar.

| Integrante | Carpeta | Archivos a completar |
|---|---|---|
| Kevin Velasco | `secciones/kv/` | `resultados.tex` (falta métricas), `conclusiones.tex`, `recomendaciones.tex` |
| Manolo García | `secciones/mg/` | `resultados.tex`, `conclusiones.tex`, `recomendaciones.tex` |
| Luis Miranda | `secciones/lm/` | `resultados.tex`, `conclusiones.tex`, `recomendaciones.tex` |
| Ariel Cholota | `secciones/ac/` | `resultados.tex`, `conclusiones.tex`, `recomendaciones.tex` |

## Cómo completar tu parte
1. Crea tu rama desde `develop` (`feat/<iniciales>-informe`).
2. Abre tus archivos en `secciones/<iniciales>/`. Hoy tienen una línea roja `\pendiente{...}`: **bórrala** y escribe tu contenido.
3. Capturas: copia la imagen a `imagenes/` y usa `\begin{figure}[H]\centering\includegraphics[width=0.8\textwidth]{nombre.png}\caption{Descripción}\end{figure}`.
4. Referencias: agrega tus fuentes a `referencias.bib`.
5. Compila y abre un PR hacia `develop`.

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
