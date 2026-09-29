import { expect, type Page, test } from '@playwright/test';

const ENDPOINT = 'https://api.web3forms.com/submit';

async function fillValid(page: Page) {
  const form = page.locator('#contacto form');
  await form.getByLabel('Nombre completo').fill('Ana Pérez');
  await form.getByLabel('Correo electrónico').fill('ana@minera.cl');
  await form.getByLabel(/Empresa o institución/).fill('Minera X');
  await form.getByLabel('Tipo de consulta').selectOption('lab');
  await form.getByLabel('Mensaje').fill('Necesitamos análisis petrográfico de 30 muestras.');
  await form.getByRole('checkbox').check();
}

test.describe('formulario de contacto', () => {
  test('marca los campos inválidos, enfoca el primero y no envía', async ({ page }) => {
    let requests = 0;
    await page.route(ENDPOINT, (route) => {
      requests++;
      return route.fulfill({ json: { success: true } });
    });
    await page.goto('/');
    const form = page.locator('#contacto form');
    await form.getByLabel('Correo electrónico').fill('no-es-correo');
    await form.getByLabel('Mensaje').fill('corto');
    await form.getByRole('button', { name: 'Enviar consulta' }).click();

    const name = form.getByLabel('Nombre completo');
    await expect(name).toBeFocused();
    await expect(name).toHaveAttribute('aria-invalid', 'true');
    await expect(name).toHaveAccessibleDescription('Este campo es obligatorio.');
    await expect(form.getByLabel('Correo electrónico')).toHaveAccessibleDescription(
      'Ingresa un correo electrónico válido.',
    );
    await expect(form.getByLabel('Tipo de consulta')).toHaveAccessibleDescription('Selecciona un tipo de consulta.');
    await expect(form.getByLabel('Mensaje')).toHaveAccessibleDescription(
      'El mensaje debe tener al menos 20 caracteres.',
    );
    await expect(form.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
    await expect(form.getByLabel(/Empresa o institución/)).not.toHaveAttribute('aria-invalid');
    expect(requests).toBe(0);
  });

  test('corregir un campo retira su error', async ({ page }) => {
    await page.goto('/');
    const form = page.locator('#contacto form');
    await form.getByRole('button', { name: 'Enviar consulta' }).click();
    const name = form.getByLabel('Nombre completo');
    await expect(name).toHaveAttribute('aria-invalid', 'true');
    await name.fill('Ana Pérez');
    await expect(name).not.toHaveAttribute('aria-invalid');
    await expect(name).toHaveAccessibleDescription('');
  });

  test('preselecciona el tipo de consulta desde ?tipo=', async ({ page }) => {
    await page.goto('/?tipo=alliance#contacto');
    await expect(page.locator('#contacto form').getByLabel('Tipo de consulta')).toHaveValue('alliance');
  });

  test('ignora un ?tipo= inválido', async ({ page }) => {
    await page.goto('/?tipo=hack#contacto');
    await expect(page.locator('#contacto form').getByLabel('Tipo de consulta')).toHaveValue('');
  });

  test('los CTA de servicios llevan al formulario con el tipo preseleccionado', async ({ page }) => {
    await page.goto('/');
    await page.locator('#servicios').getByRole('link', { name: /Consultar: Análisis macroscópico/ }).click();
    await expect(page.locator('#contacto form').getByLabel('Tipo de consulta')).toHaveValue('lab');
  });

  test('envío exitoso: estado de envío, confirmación anunciada y formulario limpio', async ({ page }) => {
    let body: Record<string, unknown> = {};
    let release!: () => void;
    const released = new Promise<void>((resolve) => (release = resolve));
    await page.route(ENDPOINT, async (route) => {
      body = route.request().postDataJSON();
      await released;
      await route.fulfill({ json: { success: true } });
    });
    await page.goto('/');
    await fillValid(page);
    const form = page.locator('#contacto form');
    const submit = form.getByRole('button');
    await submit.click();

    await expect(submit).toBeDisabled();
    await expect(submit).toHaveText('Enviando…');
    release();

    const status = page.locator('#contacto [role="status"]');
    await expect(status).toHaveAttribute('aria-live', 'polite');
    await expect(status).toContainText('¡Gracias! Recibimos tu consulta');
    await expect(form.getByLabel('Nombre completo')).toHaveValue('');
    await expect(form.getByLabel('Mensaje')).toHaveValue('');
    await expect(form.getByRole('checkbox')).not.toBeChecked();
    await expect(submit).toBeEnabled();
    await expect(submit).toHaveText('Enviar consulta');

    expect(body).toMatchObject({
      name: 'Ana Pérez',
      email: 'ana@minera.cl',
      company: 'Minera X',
      type: 'lab',
      lang: 'es',
      botcheck: '',
    });
  });

  test('envía el idioma activo y muestra los mensajes traducidos', async ({ page }) => {
    let body: Record<string, unknown> = {};
    await page.route(ENDPOINT, (route) => {
      body = route.request().postDataJSON();
      return route.fulfill({ json: { success: true } });
    });
    await page.goto('/en/');
    const form = page.locator('#contacto form');
    await form.getByLabel('Full name').fill('John Smith');
    await form.getByLabel('Email').fill('john@mining.com');
    await form.getByLabel('Inquiry type').selectOption('training');
    await form.getByLabel('Message').fill('We would like a petrography course for our team.');
    await form.getByRole('checkbox').check();
    await form.getByRole('button', { name: 'Send inquiry' }).click();
    await expect(page.locator('#contacto [role="status"]')).toContainText('Thank you!');
    expect(body).toMatchObject({ lang: 'en', type: 'training' });
  });

  test('fallo de entrega: muestra alternativas y conserva los datos', async ({ page }) => {
    await page.route(ENDPOINT, (route) => route.fulfill({ status: 500, json: { success: false } }));
    await page.goto('/');
    await fillValid(page);
    const form = page.locator('#contacto form');
    await form.getByRole('button', { name: 'Enviar consulta' }).click();

    const status = page.locator('#contacto [role="status"]');
    await expect(status).toContainText('No pudimos enviar tu mensaje');
    await expect(status.getByRole('link', { name: /contacto@geocobre\.ar/ })).toHaveAttribute(
      'href',
      'mailto:contacto@geocobre.ar',
    );
    await expect(status.getByRole('link', { name: /WhatsApp/ })).toHaveAttribute('href', /^https:\/\/wa\.me\//);
    await expect(form.getByLabel('Nombre completo')).toHaveValue('Ana Pérez');
    await expect(form.getByLabel('Mensaje')).toHaveValue('Necesitamos análisis petrográfico de 30 muestras.');
    await expect(form.getByRole('button', { name: 'Enviar consulta' })).toBeEnabled();
  });

  test('fallo de red: muestra el error', async ({ page }) => {
    await page.route(ENDPOINT, (route) => route.abort('failed'));
    await page.goto('/');
    await fillValid(page);
    await page.locator('#contacto form').getByRole('button', { name: 'Enviar consulta' }).click();
    await expect(page.locator('#contacto [role="status"]')).toContainText('No pudimos enviar tu mensaje');
  });

  test('honeypot con contenido: descarta el envío sin mostrar error', async ({ page }) => {
    let requests = 0;
    await page.route(ENDPOINT, (route) => {
      requests++;
      return route.fulfill({ json: { success: true } });
    });
    await page.goto('/');
    await fillValid(page);
    await page.locator('#contacto input[name="botcheck"]').evaluate((el: HTMLInputElement) => (el.value = 'spam'));
    await page.locator('#contacto form').getByRole('button', { name: 'Enviar consulta' }).click();
    const status = page.locator('#contacto [role="status"]');
    await expect(status).toContainText('¡Gracias!');
    await expect(status).not.toContainText('No pudimos');
    expect(requests).toBe(0);
  });

  test('el honeypot no es accesible para personas', async ({ page }) => {
    await page.goto('/');
    const honeypot = page.locator('#contacto input[name="botcheck"]');
    await expect(honeypot).toBeHidden();
    await expect(honeypot).toHaveAttribute('tabindex', '-1');
  });

  test('sin JavaScript el formulario hace POST nativo con redirección a la página de gracias', async ({ page }) => {
    await page.goto('/pt/');
    const form = page.locator('#contacto form');
    await expect(form).toHaveAttribute('action', ENDPOINT);
    await expect(form).toHaveAttribute('method', /post/i);
    await expect(form.locator('input[type="hidden"][name="access_key"]')).toHaveCount(1);
    await expect(form.locator('input[type="hidden"][name="redirect"]')).toHaveValue(
      'https://geocobre.pages.dev/pt/obrigado/',
    );
    await expect(form.locator('input[type="hidden"][name="lang"]')).toHaveValue('pt');
  });

  test('enlaza el aviso de privacidad del idioma activo', async ({ page }) => {
    await page.goto('/fr/');
    await expect(
      page.locator('#contacto form').getByRole('link', { name: 'politique de confidentialité' }),
    ).toHaveAttribute('href', '/fr/confidentialite/');
  });
});

test.describe('páginas de privacidad y gracias', () => {
  for (const [path, title] of [
    ['/privacidad/', 'Aviso de privacidad'],
    ['/en/privacy/', 'Privacy notice'],
    ['/pt/privacidade/', 'Aviso de privacidade'],
    ['/fr/confidentialite/', 'Politique de confidentialité'],
  ] as const) {
    test(`privacidad ${path}`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(title);
      await expect(page.getByRole('main').getByRole('link', { name: /@/ })).toHaveAttribute('href', /^mailto:/);
    });
  }

  for (const [path, lang] of [
    ['/gracias/', 'es'],
    ['/en/thanks/', 'en'],
    ['/pt/obrigado/', 'pt'],
    ['/fr/merci/', 'fr'],
  ] as const) {
    test(`gracias ${path}`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('html')).toHaveAttribute('lang', lang);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
      await page.getByRole('main').getByRole('link').first().click();
      await expect(page).toHaveURL(lang === 'es' ? '/' : `/${lang}/`);
    });
  }

  test('el sitemap no incluye las páginas de gracias', async ({ request }) => {
    const body = await (await request.get('/sitemap-0.xml')).text();
    expect(body).toContain('/privacidad/');
    for (const slug of ['gracias', 'thanks', 'obrigado', 'merci']) expect(body).not.toContain(slug);
  });
});

test.describe('WhatsApp', () => {
  test('abre wa.me en una pestaña nueva con el mensaje del idioma activo', async ({ page }) => {
    for (const [path, label, text] of [
      ['/', 'Escríbenos por WhatsApp', 'Hola GeoCobre'],
      ['/fr/', 'Écrivez-nous sur WhatsApp', 'Bonjour GeoCobre'],
    ] as const) {
      await page.goto(path);
      const button = page.locator('[data-whatsapp-float]');
      await expect(button).toHaveAccessibleName(label);
      await expect(button).toHaveAttribute('target', '_blank');
      await expect(button).toHaveAttribute('rel', 'noopener noreferrer');
      const href = new URL((await button.getAttribute('href'))!);
      expect(href.origin).toBe('https://wa.me');
      expect(href.searchParams.get('text')).toContain(text);
    }
  });

  test('permanece visible al desplazarse', async ({ page }) => {
    await page.goto('/');
    await page.locator('#alianzas').scrollIntoViewIfNeeded();
    await expect(page.locator('[data-whatsapp-float]')).toBeInViewport();
  });

  test.describe('móvil', () => {
    test.use({ viewport: { width: 360, height: 780 } });

    const overlaps = (a: DOMRect, b: DOMRect) =>
      a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;

    test('no cubre el botón de envío ni los enlaces del pie de página', async ({ page }) => {
      await page.goto('/');
      const floatBox = () => page.locator('[data-whatsapp-float]').evaluate((el) => el.getBoundingClientRect().toJSON());

      const submit = page.locator('#contacto form button[type="submit"]');
      await submit.evaluate((el) => el.scrollIntoView({ block: 'end' }));
      const submitBox = await submit.evaluate((el) => el.getBoundingClientRect().toJSON());
      expect(overlaps(await floatBox(), submitBox)).toBe(false);

      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      const float = await floatBox();
      for (const box of await page.getByRole('contentinfo').getByRole('link').evaluateAll((links) =>
        links.map((l) => l.getBoundingClientRect().toJSON()),
      )) {
        expect(overlaps(float, box)).toBe(false);
      }
    });
  });
});

test.describe('pie de página', () => {
  test('muestra correo, WhatsApp, aviso de privacidad, idiomas y año', async ({ page }) => {
    await page.goto('/');
    const footer = page.getByRole('contentinfo');
    await expect(footer.getByRole('link', { name: 'contacto@geocobre.ar' })).toHaveAttribute(
      'href',
      'mailto:contacto@geocobre.ar',
    );
    await expect(footer.getByRole('link', { name: /WhatsApp/ })).toHaveAttribute('href', /^https:\/\/wa\.me\//);
    await expect(footer.getByRole('link', { name: 'Aviso de privacidad' })).toHaveAttribute('href', '/privacidad/');
    await expect(footer.getByRole('navigation', { name: 'Idioma' }).getByRole('link')).toHaveCount(4);
    await expect(footer).toContainText(`© ${new Date().getFullYear()} GeoCobre`);
    await expect(footer.getByRole('link', { name: 'Servicios' })).toHaveAttribute('href', '/#servicios');
  });
});
