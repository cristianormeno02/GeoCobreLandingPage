import type { Dictionary } from '../i18n/types';

/** Secciones de la página. Los ids de ancla son iguales en todos los idiomas. */
export const SECTIONS = [
  { id: 'metodologia', key: 'methodology' },
  { id: 'servicios', key: 'services' },
  { id: 'validacion', key: 'validation' },
  { id: 'equipo', key: 'team' },
  { id: 'capacitacion', key: 'training' },
  { id: 'alianzas', key: 'alliances' },
  { id: 'contacto', key: 'contact' },
] as const satisfies readonly { id: string; key: keyof Dictionary['nav']['links'] }[];
