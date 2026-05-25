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

async function githubFetch(path: string, options: any = {}) {
  const url = `https://api.github.com${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'User-Agent': 'metodosenmutacion-portal',
      ...(options.headers || {}),
    },
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub ${response.status}: ${text}`);
  }
  return response.json();
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };
  try {
    const body = JSON.parse(event.body || '{}');
    if (body.password !== ADMIN_PASSWORD) {
      return { statusCode: 401, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Contraseña incorrecta' }) };
    }
    const { titulo, autoria, territorios, derivado_de, cuerpo, files } = body;
    if (!titulo || !Array.isArray(autoria) || autoria.length === 0 ||
        !Array.isArray(territorios) || territorios.length === 0 ||
        !cuerpo || !Array.isArray(files) || files.length === 0) {
      return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Faltan campos requeridos' }) };
    }
    for (const f of files) {
      if (!f.sha || !f.filename) {
        return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Archivo sin sha o filename' }) };
      }
    }
    const slug = slugify(titulo);
    if (!slug) {
      return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'El título no genera un slug válido' }) };
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
    const methodBlob = await githubFetch(`/repos/${REPO_OWNER}/${REPO_NAME}/git/blobs`, {
      method: 'POST',
      body: JSON.stringify({ content: Buffer.from(frontmatter, 'utf8').toString('base64'), encoding: 'base64' }),
    });
    const ref = await githubFetch(`/repos/${REPO_OWNER}/${REPO_NAME}/git/refs/heads/${BRANCH}`);
    const currentCommitSha = ref.object.sha;
    const currentCommit = await githubFetch(`/repos/${REPO_OWNER}/${REPO_NAME}/git/commits/${currentCommitSha}`);
    const baseTreeSha = currentCommit.tree.sha;
    const basePath = `src/content/methods/${slug}`;
    const treeEntries: any[] = [
      { path: `${basePath}/method.md`, mode: '100644', type: 'blob', sha: methodBlob.sha },
      ...files.map((f: any) => ({ path: `${basePath}/${f.filename}`, mode: '100644', type: 'blob', sha: f.sha })),
    ];
    const newTree = await githubFetch(`/repos/${REPO_OWNER}/${REPO_NAME}/git/trees`, {
      method: 'POST',
      body: JSON.stringify({ base_tree: baseTreeSha, tree: treeEntries }),
    });
    const newCommit = await githubFetch(`/repos/${REPO_OWNER}/${REPO_NAME}/git/commits`, {
      method: 'POST',
      body: JSON.stringify({ message: `Add method via portal: ${slug}`, tree: newTree.sha, parents: [currentCommitSha] }),
    });
    await githubFetch(`/repos/${REPO_OWNER}/${REPO_NAME}/git/refs/heads/${BRANCH}`, {
      method: 'PATCH',
      body: JSON.stringify({ sha: newCommit.sha }),
    });
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ success: true, slug, url: `/metodos/${slug}/` }) };
  } catch (error: any) {
    return { statusCode: 500, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: error.message || 'Error desconocido' }) };
  }
};
