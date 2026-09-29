import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { beforeAll, describe, expect, it } from 'vitest';
import Alliances from '../../src/components/Alliances.astro';
import Clients from '../../src/components/Clients.astro';
import Training from '../../src/components/Training.astro';
import type { Client } from '../../src/data/clients';
import type { Course } from '../../src/data/courses';
import type { Partner } from '../../src/data/partners';

let container: AstroContainer;

beforeAll(async () => {
  container = await AstroContainer.create();
});

describe('Training', () => {
  const course: Course = {
    title: { es: 'Petrografía aplicada', en: 'Applied petrography', pt: 'Petrografia aplicada', fr: 'Pétrographie appliquée' },
    modality: { es: 'Presencial', en: 'On-site', pt: 'Presencial', fr: 'Présentiel' },
    description: {
      es: 'Identificación de minerales al microscopio.',
      en: 'Mineral identification under the microscope.',
      pt: 'Identificação de minerais ao microscópio.',
      fr: 'Identification des minéraux au microscope.',
    },
  };

  it('muestra una tarjeta por curso con título, modalidad y descripción en el idioma activo', async () => {
    const html = await container.renderToString(Training, { props: { lang: 'en', courses: [course, course] } });
    expect(html.match(/<article/g)).toHaveLength(2);
    expect(html).toContain('Applied petrography');
    expect(html).toContain('On-site');
    expect(html).toContain('Mineral identification under the microscope.');
    expect(html).not.toContain('Training program in development');
  });

  it('sin cursos muestra el estado de oferta en desarrollo', async () => {
    const html = await container.renderToString(Training, { props: { lang: 'es', courses: [] } });
    expect(html).toContain('Oferta formativa en desarrollo');
    expect(html).not.toContain('<article');
  });
});

describe('Alliances', () => {
  const partner: Partner = {
    name: 'Laboratorio Ejemplo',
    logo: { src: '/logo-ejemplo.png', width: 200, height: 80, format: 'png' },
    url: 'https://example.org',
  };

  it('muestra solo los logos de aliados confirmados', async () => {
    const html = await container.renderToString(Alliances, { props: { lang: 'es', partners: [partner] } });
    expect(html).toContain('Organizaciones aliadas');
    expect(html).toMatch(/<img[^>]+alt="Laboratorio Ejemplo"/);
  });

  it('sin aliados confirmados no muestra el bloque de logos', async () => {
    const html = await container.renderToString(Alliances, { props: { lang: 'es', partners: [] } });
    expect(html).not.toContain('Organizaciones aliadas');
    expect(html).not.toContain('<img');
  });
});

describe('Clients', () => {
  const client: Client = {
    name: 'Minera Ejemplo',
    logo: { src: '/logo-minera.png', width: 200, height: 80, format: 'png' },
    url: 'https://example.org',
    project: 'Cerro Ejemplo',
    location: { es: 'Provincia de Salta', en: 'Salta Province', pt: 'Província de Salta', fr: 'Province de Salta' },
  };

  it('muestra logo, proyecto, ubicación y enlace del cliente en el idioma activo', async () => {
    const html = await container.renderToString(Clients, { props: { lang: 'en', clients: [client] } });
    expect(html.match(/<article/g)).toHaveLength(1);
    expect(html).toMatch(/<img[^>]+alt="Minera Ejemplo logo"/);
    expect(html).toContain('Cerro Ejemplo project');
    expect(html).toContain('Salta Province');
    expect(html).toMatch(/<a[^>]+href="https:\/\/example\.org"[^>]+aria-label="Minera Ejemplo website"/);
  });
});
