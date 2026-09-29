import type { ImageMetadata } from 'astro';
import type { Localized } from '../i18n/utils';

export interface TeamMember {
  name: string;
  photo?: ImageMetadata;
  role: Localized;
  specialty: Localized;
  education: Localized;
  linkedin?: string;
}

const unsjResearcher: Pick<TeamMember, 'role' | 'specialty'> = {
  role: {
    es: 'Docente e investigadora, Universidad Nacional de San Juan',
    en: 'Lecturer and researcher, National University of San Juan',
    pt: 'Docente e pesquisadora, Universidade Nacional de San Juan',
    fr: 'Enseignante-chercheuse, Université nationale de San Juan',
  },
  specialty: {
    es: 'Pórfidos cupríferos',
    en: 'Porphyry copper deposits',
    pt: 'Pórfiros cupríferos',
    fr: 'Porphyres cuprifères',
  },
};

const phdGeology: Localized = {
  es: 'Dra. en Ciencias Geológicas',
  en: 'PhD in Geological Sciences',
  pt: 'Doutora em Ciências Geológicas',
  fr: 'Docteure en sciences géologiques',
};

export const team: TeamMember[] = [
  {
    name: 'Lorena Cristina Previley',
    ...unsjResearcher,
    education: phdGeology,
    linkedin: 'https://www.linkedin.com/in/lorena-previley-0b226714/',
  },
  {
    name: 'María Verónica Bastías Torres',
    ...unsjResearcher,
    education: phdGeology,
    linkedin: 'https://www.linkedin.com/in/mar%C3%ADa-ver%C3%B3nica-bast%C3%ADas-torres-4b618bb1/',
  },
  {
    name: 'Clara Oviedo',
    ...unsjResearcher,
    education: {
      es: 'Lic. en Ciencias Geológicas',
      en: 'BSc in Geological Sciences',
      pt: 'Bacharel em Ciências Geológicas',
      fr: 'Licence en sciences géologiques',
    },
    linkedin: 'https://www.linkedin.com/in/clara-oviedo-8a8522227/',
  },
];
