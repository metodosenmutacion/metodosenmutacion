import type { Handler } from '@netlify/functions';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
const REPO_OWNER = 'metodosenmutacion';
const REPO_NAME = 'metodosenmutacion';
const BRANCH = 'main';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

async function githubPut(path: string, content: string, message: string, isBase64: boolean) {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`;
  const body = {
    message,
    content: isBase64 ? content : Buffer.from(content, 'utf8').toString('base64'),
    branch: BRANCH,
  };
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'User-Agent': 'metodosenmutacion-portal',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub ${response.status}: ${text}`);
  }
  return response.json();
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }
  try {
    const body = JSON.parse(event.body || '{}');
    if (body.password !== ADMIN_PASSWORD) {
      return { statusCode: 401, body: JSON.stringify({ error: 'Contraseña incorrecta' }) };
    }
    const { titulo, autoria, territorios, derivado_de, cuerpo, files } = body;
    if (!titulo || !Array.isArray(autoria) || autoria.length === 0 ||
        !Array.isArray(territorios) || territorios.length === 0 ||
        !cuerpo || !Array.isArray(files) || files.length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Faltan campos requeridos' }) };
    }
    const slug = slugify(titulo);
    if (!slug) {
      return { statusCode: 400, body: JSON.stringify({ error: 'El título no genera un slug válido' }) };
    }
    const today = new Date().toISOString().split('T')[0];
    const derivadoLines = (Array.isArray(derivado_de) && derivado_de.length > 0)
      ? derivado_de.map((d: any) => d.tipo === 'interno'
          ? `  - tipo: "interno"\n    slug: "${d.slug}"`
          : `  - tipo: "referente"\n    nombre: ${JSON.stringify(d.nombre)}`
        ).join('\n')
      : '';
    const frontmatter = `---
titulo: ${JSON.stringify(titulo)}
autoria:
${autoria.map((a: string) => `  - ${JSON.stringify(a)}`).join('\n')}
territorios:
${territorios.map((t: string) => `  - "${t}"`).join('\n')}
derivado_de:${derivadoLines ? '\n' + derivadoLines : ' []'}
fecha_envio: ${today}
licencia: "CC BY-SA 4.0"
documentacion:
${files.map((f: any) => `  - ${JSON.stringify(f.filename)}`).join('\n')}
---

${cuerpo}
`;
    const basePath = `src/content/methods/${slug}`;
    await githubPut(`${basePath}/method.md`, frontmatter, `Add method via portal: ${slug}`, false);
    for (const file of files) {
      await githubPut(`${basePath}/${file.filename}`, file.content_base64, `Add file ${file.filename} for ${slug}`, true);
    }
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, slug, url: `/metodos/${slug}/` }),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message || 'Error desconocido' }),
    };
  }
};
