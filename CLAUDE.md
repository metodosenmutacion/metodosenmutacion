# CLAUDE.md — Métodos en Mutación

Documento de contexto persistente para sesiones de Claude (cualquier modelo, cualquier interfaz) trabajando en este repo. Léelo entero al arrancar cualquier sesión nueva.

## 1. Identidad del proyecto

Plataforma web "Métodos en Mutación", componente práctico del Trabajo de Fin de Grado (TFG) en Diseño de Moda de Pau Rubio Sánchez, BAU Centre Universitari de Disseny de Barcelona, curso 2025-2026.

El proyecto del TFG opera en tres registros articulados:
- Laboratorio: donde se desarrollan los métodos técnicos.
- Colección: 6 looks finales como prueba tangible.
- Plataforma "Métodos en Mutación": esta web, que escala los métodos al conjunto de quienes habitan la moda.

Marco teórico: Mil mesetas (Deleuze/Guattari, 1980), Las tres ecologías (Guattari, 1989), tradición de cultura libre (Stallman, Lessig, Kleiner).

Estética declarada: archivo editorial sobrio, blanco y negro, anti-marca, declarado como prototipo "v0.1 — en mutación".

Plazo de entrega: aproximadamente junio 2026.

## 2. Acuerdo de trabajo

- El usuario (Pau) decide arquitectura, contenido y dirección del proyecto.
- Claude ejecuta trabajo técnico vía Claude Code en la terminal.
- Todo commit pasa por aprobación explícita del usuario antes de ejecutarse.
- Tono: tribunal-rigor, honestidad sin maquillar, decisiones declaradas no escondidas.
- Nivel técnico del usuario: cero. Respuestas y acciones en pasos numerados claros, con bloques copy-paste cuando hay algo que pegar.
- Trabajo en paralelo: programación de la plataforma + escritura asistida de las secciones (15) y (16) de la memoria del TFG.

## 3. Stack técnico verificado

- Astro 6.3.1 (framework SSG).
- Node 22 (pinneado en .nvmrc).
- TypeScript strict.
- Markdown para todo el contenido.
- Netlify para hosting (auto-deploy on push a main).
- GitHub: github.com/metodosenmutacion/metodosenmutacion.
- URL pública: metodosenmutacion.netlify.app.
- Licencia: CC BY-SA 4.0 (en archivo LICENSE del repo).
- Asistencia editorial: Claude (Anthropic), declarada en apéndice B del TFG y en la web pública.

Dominio propio (metodosenmutacion.org) no registrado; decisión pospuesta para post-entrega.

## 4. Decisión arquitectónica de fondo: Git como fuente de verdad

NO HAY BASE DE DATOS. El contenido vive como archivos Markdown en el propio repo, dentro de /content/. Astro los lee al construir el sitio. Las submissions desde la web crean commits vía Netlify Functions con token de GitHub.

Implicaciones operativas:
- Cada entrada es una carpeta con .md más archivos adjuntos (imágenes, PDFs).
- Toda modificación queda registrada en el historial de Git con hash, mensaje y momento.
- Los forks son forks literales del repo en GitHub.
- Cero costes recurrentes (todo gratis en los planes free de GitHub y Netlify).

## 5. Tipos de entrada

### 5.1 Método (tipo canónico)

Único tipo de entrada que aparece en la cartografía principal y se somete a curación por los cinco criterios.

Campos:
- titulo (string): nombre del método.
- slug (auto-generado del título): identificador URL.
- autoria (lista de strings): personas que firman, puede ser colaborativo.
- territorios (multi-select del listado cerrado, ver sección 7 de este documento).
- derivado_de (multi-valor, sistema unificado): cada valor es uno de tres tipos:
  · Slug de otra entrada del archivo (link interno).
  · Nombre de un referente externo (genera nodo agregador bajo /referentes/).
  · "ninguno" (declara originalidad explícita).
- fecha_envio (auto, timestamp del commit).
- licencia (siempre CC BY-SA 4.0).
- documentacion (lista de archivos adjuntos: JPG, PNG, PDF). OBLIGATORIA. Al menos un archivo requerido. Sin documentación, una submission no se acepta. Razón: sin documentación visual el método no es reproducible.
- cuerpo (Markdown): descripción narrativa del método.

Cada método vive en /content/methods/[slug]/ como carpeta, con method.md más sus archivos adjuntos.

### 5.2 Aplicación (tipo secundario)

Vive dentro de cada método como contribución externa de cualquier usuario verificado por email. No aparece en la cartografía principal; aparece dentro de la entrada del método al que aplica y en la galería secundaria /aplicaciones/.

Campos:
- metodo_padre (slug obligatorio del método al que aplica).
- imagen (obligatoria).
- autoria (verificada por email).
- fecha (auto).
- descripcion (opcional, breve).

Estructura de carpetas a definir al programar (probablemente /content/methods/[slug]/applications/ o /content/applications/ con referencia al padre).

## 6. Política de admisión

Tres capas:
- Propuestas: públicas desde el momento del envío. Viven en /content/proposals/ antes de pasar a curación.
- Archivo curado: métodos que han pasado los cinco criterios. Viven en /content/methods/.
- Forks: forks literales del repo en GitHub, fuera del control de la plataforma.

Cinco criterios técnicos para que un método pase de propuesta a archivo curado:
1. Es del tipo método (no otra cosa).
2. Declara al menos un territorio existencial.
3. Tiene email verificado.
4. Acepta licencia CC BY-SA 4.0.
5. No duplica un método ya existente en el archivo.

Aplicaciones: solo verificación de email, sin curación adicional. Las aplicaciones son contribuciones ligeras cuyo valor está en cantidad y diversidad.

Capa editorial: existe pero no se documenta aquí. Opera sobre el archivo curado decidiendo qué se ilumina, no qué existe.

## 7. Territorios existenciales (listado cerrado, 37)

Sacados de la sección 9 del TFG. Son la taxonomía operativa del archivo, usados como rúbrica de admisión y como filtro principal en la cartografía.

LINEUP, PATRONAJE, SKETCH, CODIGOS, PRENDA, COLOR, MATERIALES, COSTURA, ACABADOS, EXTERIORES, FORRO, EDITORIAL, HILO, FORNITURAS, PUNTO, PLANO, BIES, CORTE, RELLENO, CONCEPTO, DISEÑO, FOTOS, PRECIOS, TIENDA, CUERPO, PERCHA, PARCHE, ARREGLO, AJUSTE, HOLGURA, CEÑIDO, COMODIDAD, ESTETICA, IDENTIDAD, PROTOTIPOS, INTEMPERIE, COMÚN.

## 8. Sitemap (11 URLs)

URLs en castellano. Contenido de cada método en su idioma original (es o cat).

- / — Cartografía rizomática principal (mapa de métodos más filtros por territorios).
- /metodos/ — Lista editorial de todos los métodos.
- /metodos/[slug]/ — Ficha completa de un método (incluye galería de aplicaciones al final).
- /aplicaciones/ — Galería visual secundaria de todas las aplicaciones.
- /territorios/ — Índice de los 36 territorios con descripción y contador.
- /territorios/[slug]/ — Página agregadora de un territorio.
- /referentes/ — Índice de autores externos citados por algún método.
- /referentes/[slug]/ — Página agregadora de un referente.
- /propuestas/ — Cola pública de propuestas pendientes de curación.
- /enviar/ — Formulario de submission de nuevo método.
- /sobre-el-proyecto/ — About anonimizado (ver sección 11).
- /licencia/ — Página dedicada a la explicación de CC BY-SA 4.0. Enlazada desde la metadata de cada método, desde el footer y desde el texto de /sobre-el-proyecto/.

## 9. Cartografía (home)

Visualización principal del sitio:
- Nodos = métodos del archivo.
- Conexiones = relaciones derivado_de (método-a-método o método-a-referente).
- Métodos originales (derivado_de: ninguno) aparecen sin conexiones, como islas.
- Métodos derivados de referentes externos aparecen visualmente intercalados con el resto, no agrupados en un rincón, para equilibrio estético del mapa. Estructuralmente sus referentes viven todos bajo /referentes/.
- Filtros: chips multi-select de los 36 territorios encima del mapa.

Implementación técnica pendiente. Candidatos a evaluar: d3, vis.js, react-flow, o construcción custom con SVG.

## 10. Integración memoria-plataforma

La sección (17) del TFG "Fichas técnicas de los 6 looks" se reformula: deja de ser técnica-de-confección y pasa a ser ficha-de-genealogía. Cada ficha técnica de un look se materializa como la entrada en la plataforma del método del que ese look emergió. La documentación obligatoria de ese método incluye el desarrollo del look y sus imágenes.

Las secciones (15) "Desarrollo técnico de la plataforma" y (16) "Interfaz y funcionamiento de la plataforma" documentan esta plataforma desde la memoria. Se escriben en paralelo a la programación, en la voz del autor, con asistencia editorial declarada en el apéndice B.

## 11. Anonimización pública

Web pública /sobre-el-proyecto/: anonimizada. Menciona el TFG del que nace (BAU Centre Universitari de Disseny de Barcelona) y la infraestructura técnica (Astro, Netlify, GitHub, Anthropic como asistencia editorial), pero no nombres propios. Las co-autorías específicas (por ejemplo, el look CC BY-SA con Martina Ferrer y Martina Monedero) aparecen en el campo autoria de la entrada correspondiente del método, no en el about.

LICENSE: mantiene el nombre del autor por requisito legal de las licencias Creative Commons (necesitan licenciador identificable para ser operativas).

README: minimalista, coherente con el about público.

## 12. Decisiones pendientes / open items

- Nombre final oficial de la plataforma (actualmente "Métodos en Mutación").
- Servicio de email para verificación de submissions (candidatos: Resend, Postmark, otros con plan free).
- Librería para la cartografía interactiva.
- Detalle de la capa editorial (cómo se gestiona internamente la promoción de propuesta a archivo).
- Implementar enlace al historial de Git en cada ficha de método, para que cualquier visitante pueda ver versiones anteriores y diffs de cualquier entrada (transparencia editorial radical apoyada en versionado nativo de Git).

## 13. Historial de hitos cerrados

- 2026-05-12: Repo creado en GitHub. LICENSE CC BY-SA 4.0 committeado.
- 2026-05-13: Astro 6.3.1 instalado, Node 22 pinneado en .nvmrc, Netlify conectado, sitio desplegado en metodosenmutacion.netlify.app, pipeline edit-commit-push-deploy verificado end-to-end.
- 2026-05-14: .DS_Store añadido al .gitignore. Placeholder "Astro" reemplazado por "Métodos en Mutación · v0.1" como primera prueba viva del pipeline.
- 2026-05-20: Arquitectura abstracta completa cerrada y consolidada en este documento.
- 2026-05-21: Primer método añadido al archivo (Método del Agenciamiento Colectivo). Territorio COMÚN creado como 37º del listado cerrado, marcando la singularidad estructural del método fundacional.

## 14. Fase estética — decisiones cerradas

- Tipografía: Sora (Google Fonts, weights 300/400/500/700), aplicada globalmente.
- Sistema cromático: 7 grupos de territorios + 1 color para referentes externos.
  · Grupo 1 Diseño/Concepción (LINEUP, SKETCH, CONCEPTO, DISEÑO, IDENTIDAD, ESTETICA, EDITORIAL, FOTOS): ocre #B7791F
  · Grupo 2 Patronaje/Construcción 2D (PATRONAJE, PLANO, CORTE, BIES, PROTOTIPOS): azul #2C5282
  · Grupo 3 Materiales/Materia (MATERIALES, HILO, FORRO, FORNITURAS, PUNTO, RELLENO, PARCHE): verde #2F6F4E
  · Grupo 4 Costura/Ensamblaje (COSTURA, ACABADOS, CODIGOS, PRENDA): naranja quemado #B7350D
  · Grupo 5 Ajuste/Cuerpo (CUERPO, ARREGLO, AJUSTE, HOLGURA, CEÑIDO, COMODIDAD, PERCHA): morado #553C9A
  · Grupo 6 Exteriores/Contexto (EXTERIORES, INTEMPERIE, COLOR, TIENDA, PRECIOS): teal #2C7A7B
  · Grupo 7 COMÚN (meta-territorio singular): gris #6B7280
  · Referentes externos (no territorio, página agregadora): negro #000000
- Acentos para hover de enlaces: verde #10B981, amarillo #F59E0B, rosa #EC4899, azul #3B82F6, lila #A855F7. Rotación aleatoria.
- Navegación superior 6 pestañas: Inicio, Métodos, Galería, Buscar, Subir, Sobre el proyecto.
- Fondo blanco #FFFFFF, tinta negra #000000.
- Densidad: márgenes generosos, mucha imagen.
- Mood: archivo editorial sobrio + tensión moda. Sin transiciones gratuitas.
- Aclaración usuarios: NO red social. Solo verificación email para subida. Páginas /autores/[nombre]/ planificadas para v0.2 como aggregator de trazabilidad (misma mecánica que /referentes/, sin login ni perfil personalizable).

Implementado en Mega-Batch 2:
- Ficha multipanel de método (ficha-grid: docs a la izquierda, meta a la derecha), heading display, chips de territorios enlazados y coloreados.
- Cards de métodos en /metodos/ y en páginas de territorio: cover image, borde superior coloreado por familia del primer territorio.
- /territorios/ agrupa los 37 por las 7 familias con chips coloreados y contador de métodos.
- Mapping territorios → familias vive en src/lib/territory-colors.ts.

Implementado en Mega-Batch 3:
- Ficha reorganizada: columna izquierda = cover + metadata + body; columna derecha = documentación adicional (o placeholder con borde punteado si no hay).
- Home con overlay de papel vegetal (rgba + trama diagonal) que desaparece en fade al hacer scroll.
- Cartografía v0.1: grid con leve rotación aleatoria por tarjeta, filtros por las 7 familias de territorio (CSS toggle de clase only-{family}), marca ✦ en métodos que declaran COMÚN.
