import type { ImageMetadata } from 'astro';
import type { Localized } from '../i18n/utils';
import orvanaLogo from '../assets/clients/orvana.png';
import psjLogo from '../assets/clients/psj-cobre-mendocino.png';

export interface Client {
  name: string;
  logo: ImageMetadata;
  url: string;
  /** Nombre propio del proyecto; no se traduce. */
  project: string;
  location: Localized;
}

// Solo clientes a los que ya se les prestó un servicio.
export const clients: Client[] = [
  {
    name: 'Orvana Minerals Corp.',
    logo: orvanaLogo,
    url: 'https://www.orvana.com/English/home/default.aspx',
    project: 'Taguas',
    location: {
      es: 'Provincia de San Juan, Argentina',
      en: 'San Juan Province, Argentina',
      pt: 'Província de San Juan, Argentina',
      fr: 'Province de San Juan, Argentine',
    },
  },
  {
    name: 'PSJ Cobre Mendocino',
    logo: psjLogo,
    url: 'https://psjcobremendocino.com/',
    project: 'San Jorge',
    location: {
      es: 'Provincia de Mendoza, Argentina',
      en: 'Mendoza Province, Argentina',
      pt: 'Província de Mendoza, Argentina',
      fr: 'Province de Mendoza, Argentine',
    },
  },
];
