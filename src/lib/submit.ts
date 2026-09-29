import type { Locale } from '../i18n/utils';
import type { ContactData } from './validation';

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export interface SubmitPayload extends ContactData {
  lang: Locale;
  /** Campo trampa: los humanos lo dejan vacío. */
  botcheck: string;
}

export type SubmitResult =
  | { status: 'success' }
  | { status: 'spam' }
  | { status: 'error'; reason: 'http' | 'rejected' | 'network' };

interface SubmitOptions {
  accessKey: string;
  subject: string;
  fetchFn?: typeof fetch;
}

export async function submitContact(
  payload: SubmitPayload,
  { accessKey, subject, fetchFn = fetch }: SubmitOptions,
): Promise<SubmitResult> {
  if (payload.botcheck) return { status: 'spam' };

  const { consent: _consent, botcheck, ...fields } = payload;
  const body = { access_key: accessKey, subject, from_name: payload.name, botcheck, ...fields };

  let response: Response;
  try {
    response = await fetchFn(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    return { status: 'error', reason: 'network' };
  }

  if (!response.ok) return { status: 'error', reason: 'http' };

  const result = (await response.json().catch(() => null)) as { success?: boolean } | null;
  return result?.success ? { status: 'success' } : { status: 'error', reason: 'rejected' };
}
