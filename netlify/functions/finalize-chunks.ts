import type { Handler } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
const REPO_OWNER = 'metodosenmutacion';
const REPO_NAME = 'metodosenmutacion';

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
    const { sessionId, totalChunks } = body;
    if (!sessionId || typeof totalChunks !== 'number' || totalChunks < 1) {
      return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Falta sessionId o totalChunks' }) };
    }
    const store = getStore('upload-chunks');
    const chunks: string[] = [];
    for (let i = 0; i < totalChunks; i++) {
      const chunk = await store.get(`${sessionId}/${i}`);
      if (!chunk) {
        return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: `Falta el chunk ${i}` }) };
      }
      chunks.push(chunk as string);
    }
    const fullBase64 = chunks.join('');
    const blob = await githubFetch(`/repos/${REPO_OWNER}/${REPO_NAME}/git/blobs`, {
      method: 'POST',
      body: JSON.stringify({ content: fullBase64, encoding: 'base64' }),
    });
    for (let i = 0; i < totalChunks; i++) {
      try { await store.delete(`${sessionId}/${i}`); } catch (e) {}
    }
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sha: blob.sha }) };
  } catch (error: any) {
    return { statusCode: 500, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: error.message || 'Error desconocido' }) };
  }
};
