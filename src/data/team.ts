import type { ImageMetadata } from 'astro';
import type { Localized } from '../i18n/utils';

export interface TeamMember {
  name: string;
  photo?: ImageMetadata;
  role: Localized;
  specialty: Localized;
  education: Localized;
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
  { name: 'Lorena Cristina Previley', ...unsjResearcher, education: phdGeology },
  { name: 'María Verónica Bastías Torres', ...unsjResearcher, education: phdGeology },
  {
    name: 'Clara Oviedo',
    ...unsjResearcher,
    education: {
      es: 'Lic. en Ciencias Geológicas',
      en: 'BSc in Geological Sciences',
      pt: 'Bacharel em Ciências Geológicas',
      fr: 'Licence en sciences géologiques',
    },
  },
];
