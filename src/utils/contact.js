/**
 * Contact Obfuscation Utility
 * Melindungi alamat email dan nomor WhatsApp dari web scraper & crawler regex otomatis.
 * Nilai disimpan terenkode Base64 dan didekodekan secara dinamis saat runtime / aksi interaksi.
 */

const OBFUSCATED = {
  // Base64 encoded contacts
  email: 'b2t0YXZpYW5vYWxkeTc3N0BnbWFpbC5jb20=', // oktavianoaldy777@gmail.com
  whatsapp: 'KzYyODk2MDE1NzkzMjE=',              // +6289601579321
  whatsappDisplay: 'KzYyIDg5Ni0wMTU3LTkzMjE='     // +62 896-0157-9321
};

export function decodeContact(encoded) {
  if (!encoded) return '';
  try {
    if (typeof window !== 'undefined' && typeof window.atob === 'function') {
      return window.atob(encoded);
    }
    if (typeof Buffer !== 'undefined') {
      return Buffer.from(encoded, 'base64').toString('utf-8');
    }
  } catch {
    return '';
  }
  return '';
}

export function getEmail() {
  return decodeContact(OBFUSCATED.email);
}

export function getWhatsApp() {
  return decodeContact(OBFUSCATED.whatsapp);
}

export function getWhatsAppDisplay() {
  return decodeContact(OBFUSCATED.whatsappDisplay);
}

export function getWhatsAppUrl(message = '') {
  const phone = getWhatsApp().replace('+', '');
  return `https://wa.me/${phone}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}

export function getMailtoUrl(subject = '') {
  const email = getEmail();
  return `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
}
