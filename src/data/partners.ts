import type { ImageMetadata } from 'astro';

export interface Partner {
  name: string;
  logo: ImageMetadata;
  url?: string;
}

// Solo aliados CONFIRMADOS por escrito. Vacío oculta el bloque de logos.
export const partners: Partner[] = [];
