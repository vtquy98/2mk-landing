/**
 * Every form of the site (newsletter, contact, questionnaire, alerts, simulator leads) posts here.
 * The Google Apps Script endpoint already receives the alert and simulator leads of the Webflow site; Webflow-native
 * forms (newsletter, contact, questionnaire, qrcode) used Webflow's own form backend, which goes away with Webflow.
 */
export const LEAD_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbyBuKoFuSQo6jmmcj9fqWvGH4FNrCTQXYRTFaWhNPPIyVRd8qiTk5_612TCXZOb7Mz25g/exec';

export const PRIVACY_URL = '/legal/politique-de-confidentialite';

export interface Lead {
  leadAction: string; // 'alert' | 'newsletter' | 'contact' | 'questionnaire' | 'simulator' …
  email: string;
  [field: string]: unknown;
}

/** Context sent with every lead (same fields as the Webflow-era scripts). */
export function leadContext(placement: string) {
  const q = new URLSearchParams(location.search);
  return {
    url: location.href,
    title: document.title,
    referrer: document.referrer,
    device: matchMedia('(max-width: 767px)').matches ? 'mobile' : 'desktop',
    placement,
    utm_source: q.get('utm_source') ?? '',
    utm_medium: q.get('utm_medium') ?? '',
    utm_campaign: q.get('utm_campaign') ?? '',
  };
}

/** Posts a lead. Apps Script doesn't answer CORS preflights, so the body is sent as text/plain. */
export async function sendLead(lead: Lead): Promise<boolean> {
  try {
    const r = await fetch(LEAD_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(lead) });
    return r.ok;
  } catch {
    return false;
  }
}
