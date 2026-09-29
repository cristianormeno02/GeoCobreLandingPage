/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';

// getViteConfig permite importar componentes .astro en las pruebas (Container API).
export default getViteConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
  },
});
