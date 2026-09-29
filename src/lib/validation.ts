import { INQUIRY_TYPES } from '../data/services';
import { type Locale, t } from '../i18n/utils';

export interface ContactData {
  name: string;
  email: string;
  company: string;
  country: string;
  type: string;
  message: string;
  consent: boolean;
}

export type ContactField = 'name' | 'email' | 'type' | 'message' | 'consent';
export type ErrorCode = 'required' | 'email' | 'messageMin' | 'type' | 'consent';
export type ContactErrors = Partial<Record<ContactField, ErrorCode>>;

export const MESSAGE_MIN_LENGTH = 20;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(data: ContactData): ContactErrors {
  const errors: ContactErrors = {};
  const name = data.name.trim();
  const email = data.email.trim();
  const message = data.message.trim();

  if (!name) errors.name = 'required';

  if (!email) errors.email = 'required';
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'email';

  if (!(INQUIRY_TYPES as readonly string[]).includes(data.type)) errors.type = 'type';

  if (!message) errors.message = 'required';
  else if (message.length < MESSAGE_MIN_LENGTH) errors.message = 'messageMin';

  if (!data.consent) errors.consent = 'consent';

  return errors;
}

export function localizeErrors(errors: ContactErrors, lang: Locale): Partial<Record<ContactField, string>> {
  const messages = t(lang).contact.errors;
  return Object.fromEntries(
    Object.entries(errors).map(([field, code]) => [field, messages[code as ErrorCode]]),
  );
}
