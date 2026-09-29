import { describe, expect, it } from 'vitest';
import { type ContactData, localizeErrors, validateContact } from '../../src/lib/validation';

const valid: ContactData = {
  name: 'Ana Pérez',
  email: 'ana@minera.cl',
  company: '',
  country: '',
  type: 'lab',
  message: 'Necesitamos análisis petrográfico de 30 muestras.',
  consent: true,
};

describe('validateContact', () => {
  it('no devuelve errores con datos válidos', () => {
    expect(validateContact(valid)).toEqual({});
  });

  it('empresa y país son opcionales', () => {
    expect(validateContact({ ...valid, company: '', country: '' })).toEqual({});
  });

  it('exige nombre, correo y mensaje (ignorando espacios)', () => {
    expect(validateContact({ ...valid, name: '  ', email: '', message: '' })).toEqual({
      name: 'required',
      email: 'required',
      message: 'required',
    });
  });

  it.each(['ana', 'ana@', '@minera.cl', 'ana@minera', 'ana minera@x.cl'])(
    'rechaza el correo inválido %s',
    (email) => {
      expect(validateContact({ ...valid, email })).toEqual({ email: 'email' });
    },
  );

  it('exige un mensaje de al menos 20 caracteres sin contar espacios extremos', () => {
    expect(validateContact({ ...valid, message: '   muy corto   ' })).toEqual({ message: 'messageMin' });
    expect(validateContact({ ...valid, message: 'a'.repeat(20) })).toEqual({});
  });

  it('exige un tipo de consulta válido', () => {
    expect(validateContact({ ...valid, type: '' })).toEqual({ type: 'type' });
    expect(validateContact({ ...valid, type: 'hack' })).toEqual({ type: 'type' });
  });

  it('exige aceptar el aviso de privacidad', () => {
    expect(validateContact({ ...valid, consent: false })).toEqual({ consent: 'consent' });
  });
});

describe('localizeErrors', () => {
  it('traduce los códigos de error al idioma pedido', () => {
    const errors = validateContact({ ...valid, email: 'x', consent: false });
    expect(localizeErrors(errors, 'es')).toEqual({
      email: 'Ingresa un correo electrónico válido.',
      consent: 'Debes aceptar el aviso de privacidad.',
    });
    expect(localizeErrors(errors, 'fr').email).toBe('Saisissez une adresse e-mail valide.');
  });
});
