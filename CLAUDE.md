# CLAUDE.md — Métodos en Mutación

Contexto de proyecto para Claude Code. Este archivo describe el TFG, la arquitectura decidida y las convenciones de trabajo. Leerlo al inicio de cada sesión.

---

## El proyecto

**TFG:** "Devenir TFG es una cartografía de un territorio en mutación"  
**Autora:** Pau Rubio Sánchez  
**Centro:** BAU Centre Universitari de Disseny de Barcelona  
**Grado:** Diseño de Moda, 4.º curso  
**Plazo:** Entrega aproximada junio 2026

El TFG opera en tres registros:

1. **Laboratorio** — métodos técnicos de moda documentados
2. **Colección** — 6 looks finales como prueba tangible de los métodos
3. **Plataforma web "Métodos en Mutación"** — escala la lógica del laboratorio a una infraestructura colectiva abierta

**Marco teórico:** *Mil mesetas* (Deleuze y Guattari, 1980), *Las tres ecologías* (Guattari, 1989), y la tradición de cultura libre y comunes digitales (Stallman, Lessig, Kleiner).

---

## Licencia

**Creative Commons BY-SA 4.0** — ya cargada como `LICENSE` en el repo.  
Es constitutiva y no negociable. Toda la plataforma y sus contenidos operan bajo este régimen.

---

## Arquitectura técnica

- **Generador:** Astro (sitio estático)
- **Contenido:** archivos Markdown por cada entrada (métodos, resultados, looks)
- **Trazabilidad y genealogía:** historial Git público
- **Hospedaje:** Netlify (previsto)
- **Dominio:** metodosenmutacion.org (futuro)
- **Idioma por defecto:** castellano; catalán disponible. Las entradas respetan la lengua original de cada autora, sin traducciones automáticas.

---

## Política de admisión — tres capas

| Capa | Descripción | Moderación |
|------|-------------|------------|
| 1 — Propuestas | Toda contribución externa inscrita públicamente desde el envío, con autoría y fecha | Sin moderación |
| 2 — Archivo curado | Entradas que cumplen los cinco criterios técnicos; catálogo principal navegable | Criterios técnicos |
| 3 — Forks | Cualquiera puede tomar el archivo entero y montar el suyo bajo CC BY-SA | Sin moderación |

Sobre el archivo curado opera una **capa editorial no excluyente**: decide qué se ilumina (portada, destacados) sin condicionar qué existe.

### Los cinco criterios de admisión al archivo curado

1. La entrada debe ser un método, un resultado vinculado a método(s), o un look vinculado a resultado(s) y/o método(s).
2. Debe inscribirse en al menos un territorio existencial de la taxonomía declarada. La taxonomía es ampliable por propuesta argumentada.
3. Debe declarar autoría con email verificado y aceptar CC BY-SA mediante advertencia explícita en el formulario.
4. Las derivaciones declaradas (internas o de referentes externos) deben estar correctamente referenciadas.
5. No debe duplicar una entrada existente.

---

## Taxonomía — territorios existenciales

~36 conceptos que operan como rúbrica de análisis y como infraestructura de búsqueda. Lista completa en la memoria del TFG (sección 9):

LINEUP, CODIGOS, MATERIALES, EXTERIORES, HILO, PLANO, RELLENO, FOTOS, CUERPO, ARREGLO, CEÑIDO, IDENTIDAD, PATRONAJE, PRENDA, COSTURA, FORRO, FORNITURAS, BIES, CONCEPTO, PRECIOS, PERCHA, AJUSTE, COMODIDAD, PROTOTIPOS, SKETCH, COLOR, ACABADOS, EDITORIAL, PUNTO, CORTE, DISEÑO, TIENDA, PARCHE, HOLGURA, ESTETICA, INTEMPERIE

---

## Pantallas previstas

- Inicio (con cartografía rizomática como portada)
- Catálogo curado con filtros
- Ficha de método
- Ficha de resultado
- Ficha de look
- Perfil de autora
- Cartografía rizomática general
- Capa de propuestas
- Formulario de envío
- Sobre el proyecto

---

## Estética

- Archivo abierto, sobrio y editorial
- Blanco y negro
- Tipografía con carácter
- Referencias: MIT Press, e-flux, Monoskop, archivos de bibliotecas independientes
- Anti-marca, anti-startup
- Marca de versión en pie de página: **"v0.1 — en mutación"**

---

## Declaración de asistencia con IA

El proyecto declara públicamente, como parte del régimen de trazabilidad, que la construcción de la plataforma se hace con asistencia de **Claude (Anthropic)**. Esta declaración aparecerá en la página "Sobre el proyecto" y en el README del repositorio.

---

## Nivel técnico de la autora y modo de trabajo

- Nivel técnico: cero
- Claude hace la mayoría del trabajo técnico
- Pau decide, aprueba, redacta los textos del archivo, carga los métodos y firma los commits
- Guía paso a paso cuando sea necesario
