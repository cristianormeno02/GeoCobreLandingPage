import type { Localized } from '../i18n/utils';

export interface Course {
  title: Localized;
  modality: Localized;
  description: Localized;
}

// TODO(contenido): agregar cursos cuando estén confirmados. Vacío muestra "oferta en desarrollo".
export const courses: Course[] = [];
