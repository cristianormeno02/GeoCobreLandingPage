import type { Dictionary } from '../i18n/types';

/** Tipos de consulta del formulario; se usan también en `?tipo=` para preseleccionar. */
export const INQUIRY_TYPES = ['field', 'lab', 'training', 'alliance', 'other'] as const;
export type InquiryType = (typeof INQUIRY_TYPES)[number];

export interface Service {
  /** Clave de `services.items` en los diccionarios. */
  id: keyof Dictionary['services']['items'];
  group: 'field' | 'lab';
}

// TODO(contenido): confirmar la lista definitiva de servicios con GeoCobre.
export const services: Service[] = [
  { id: 'logging', group: 'field' },
  { id: 'sampling', group: 'field' },
  { id: 'fieldAdvisory', group: 'field' },
  { id: 'macro', group: 'lab' },
  { id: 'micro', group: 'lab' },
];
