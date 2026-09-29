import { describe, expect, it, vi } from 'vitest';
import { WEB3FORMS_ENDPOINT, submitContact, type SubmitPayload } from '../../src/lib/submit';

const payload: SubmitPayload = {
  name: 'Ana Pérez',
  email: 'ana@minera.cl',
  company: 'Minera X',
  country: 'Chile',
  type: 'lab',
  message: 'Necesitamos análisis petrográfico de 30 muestras.',
  consent: true,
  lang: 'es',
  botcheck: '',
};

const options = { accessKey: 'test-key', subject: 'Nueva consulta' };

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });
}

describe('submitContact', () => {
  it('envía los datos a Web3Forms y devuelve éxito', async () => {
    const fetchFn = vi.fn().mockResolvedValue(jsonResponse({ success: true }));

    const result = await submitContact(payload, { ...options, fetchFn });

    expect(result).toEqual({ status: 'success' });
    expect(fetchFn).toHaveBeenCalledOnce();
    const [url, init] = fetchFn.mock.calls[0];
    expect(url).toBe(WEB3FORMS_ENDPOINT);
    expect(init.method).toBe('POST');
    expect(init.headers).toMatchObject({ 'Content-Type': 'application/json', Accept: 'application/json' });
    expect(JSON.parse(init.body)).toEqual({
      access_key: 'test-key',
      subject: 'Nueva consulta',
      from_name: 'Ana Pérez',
      botcheck: '',
      name: 'Ana Pérez',
      email: 'ana@minera.cl',
      company: 'Minera X',
      country: 'Chile',
      type: 'lab',
      message: 'Necesitamos análisis petrográfico de 30 muestras.',
      lang: 'es',
    });
  });

  it('devuelve error si el servicio responde con estado HTTP de error', async () => {
    const fetchFn = vi.fn().mockResolvedValue(jsonResponse({ success: false }, 500));
    expect(await submitContact(payload, { ...options, fetchFn })).toEqual({ status: 'error', reason: 'http' });
  });

  it('devuelve error si el servicio rechaza el envío', async () => {
    const fetchFn = vi.fn().mockResolvedValue(jsonResponse({ success: false, message: 'Invalid key' }));
    expect(await submitContact(payload, { ...options, fetchFn })).toEqual({ status: 'error', reason: 'rejected' });
  });

  it('devuelve error de red si fetch falla', async () => {
    const fetchFn = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));
    expect(await submitContact(payload, { ...options, fetchFn })).toEqual({ status: 'error', reason: 'network' });
  });

  it('descarta el envío sin llamar al servicio si el honeypot tiene contenido', async () => {
    const fetchFn = vi.fn();
    const result = await submitContact({ ...payload, botcheck: 'spam' }, { ...options, fetchFn });
    expect(result).toEqual({ status: 'spam' });
    expect(fetchFn).not.toHaveBeenCalled();
  });
});
