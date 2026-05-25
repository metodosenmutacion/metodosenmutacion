import type { Handler } from '@netlify/functions';
import { connectLambda, getStore } from '@netlify/blobs';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };
  connectLambda(event);
  try {
    const body = JSON.parse(event.body || '{}');
    if (body.password !== ADMIN_PASSWORD) {
      return { statusCode: 401, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Contraseña incorrecta' }) };
    }
    const { sessionId, chunkIndex, chunk_base64 } = body;
    if (!sessionId || typeof chunkIndex !== 'number' || !chunk_base64) {
      return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Falta sessionId, chunkIndex o chunk_base64' }) };
    }
    const store = getStore('upload-chunks');
    await store.set(`${sessionId}/${chunkIndex}`, chunk_base64);
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ok: true }) };
  } catch (error: any) {
    return { statusCode: 500, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: error.message || 'Error desconocido' }) };
  }
};
