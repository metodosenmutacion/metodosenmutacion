import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const TERRITORIOS = [
  'LINEUP', 'PATRONAJE', 'SKETCH', 'CODIGOS', 'PRENDA', 'COLOR', 'MATERIALES',
  'COSTURA', 'ACABADOS', 'EXTERIORES', 'FORRO', 'EDITORIAL', 'HILO', 'FORNITURAS',
  'PUNTO', 'PLANO', 'BIES', 'CORTE', 'RELLENO', 'CONCEPTO', 'DISEÑO', 'FOTOS',
  'PRECIOS', 'TIENDA', 'CUERPO', 'PERCHA', 'PARCHE', 'ARREGLO', 'AJUSTE',
  'HOLGURA', 'CEÑIDO', 'COMODIDAD', 'ESTETICA', 'IDENTIDAD', 'PROTOTIPOS', 'INTEMPERIE', 'COMÚN',
] as const;

const derivadoDeItem = z.union([
  z.object({ tipo: z.literal('interno'), slug: z.string() }),
  z.object({ tipo: z.literal('referente'), nombre: z.string() }),
]);

const methodSchema = z.object({
  titulo: z.string(),
  autoria: z.array(z.string()).min(1),
  territorios: z.array(z.enum(TERRITORIOS)).min(1),
  derivado_de: z.array(derivadoDeItem).default([]),
  fecha_envio: z.coerce.date(),
  licencia: z.literal('CC BY-SA 4.0').default('CC BY-SA 4.0'),
  documentacion: z.array(
    z.string().regex(/\.(jpg|jpeg|png|pdf)$/i)
  ).min(1),
});

const methods = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/methods' }),
  schema: methodSchema,
});

const proposals = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/proposals' }),
  schema: methodSchema,
});

const applications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/applications' }),
  schema: z.object({
    metodo_padre: z.string(),
    imagen: z.string().regex(/\.(jpg|jpeg|png)$/i),
    autoria: z.string(),
    fecha: z.coerce.date(),
    descripcion: z.string().optional(),
  }),
});

export const collections = { methods, proposals, applications };
