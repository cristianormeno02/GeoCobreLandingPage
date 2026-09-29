import { describe, expect, it } from 'vitest';
import { buildWhatsAppUrl } from '../../src/lib/whatsapp';

describe('buildWhatsAppUrl', () => {
  it('genera un enlace wa.me con el mensaje codificado', () => {
    expect(buildWhatsAppUrl('56912345678', 'Hola GeoCobre, ¿cotización?')).toBe(
      'https://wa.me/56912345678?text=Hola%20GeoCobre%2C%20%C2%BFcotizaci%C3%B3n%3F',
    );
  });

  it('elimina "+", espacios y guiones del número', () => {
    expect(buildWhatsAppUrl('+56 9 1234-5678', 'Hi')).toBe('https://wa.me/56912345678?text=Hi');
  });

  it('omite el parámetro text si no hay mensaje', () => {
    expect(buildWhatsAppUrl('56912345678', '')).toBe('https://wa.me/56912345678');
  });

  it('rechaza un número sin dígitos', () => {
    expect(() => buildWhatsAppUrl('abc', 'Hola')).toThrow();
  });
});
