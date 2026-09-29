import type { es } from './es';

/** Recorre la forma del diccionario fuente convirtiendo literales en `string`. */
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : { readonly [K in keyof T]: Widen<T[K]> };

export type Dictionary = Widen<typeof es>;
