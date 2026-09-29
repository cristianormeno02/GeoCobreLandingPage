import type { ImageMetadata } from 'astro';
import type { Localized } from '../i18n/utils';

export interface TeamMember {
  name: string;
  photo?: ImageMetadata;
  role: Localized;
  specialty: Localized;
  education: Localized;
}

// TODO(contenido): reemplazar por los perfiles reales del equipo antes de publicar.
export const team: TeamMember[] = [
  {
    name: 'TODO: Nombre del especialista',
    role: { es: 'Geólogo/a consultor/a', en: 'Consulting geologist', pt: 'Geólogo(a) consultor(a)', fr: 'Géologue-conseil' },
    specialty: {
      es: 'Petrografía y exploración minera',
      en: 'Petrography and mineral exploration',
      pt: 'Petrografia e exploração mineral',
      fr: 'Pétrographie et exploration minière',
    },
    education: { es: 'TODO: formación', en: 'TODO: education', pt: 'TODO: formação', fr: 'TODO: formation' },
  },
];
