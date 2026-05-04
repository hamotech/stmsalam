import * as Linking from 'expo-linking';

/** Digits-only path — matches web `https://wa.me/6591915766` */
export const WHATSAPP_ME_URL = 'https://wa.me/6591915766';

export async function openWhatsApp(prefillMessage?: string): Promise<void> {
  const url = prefillMessage?.trim()
    ? `${WHATSAPP_ME_URL}?text=${encodeURIComponent(prefillMessage.trim())}`
    : WHATSAPP_ME_URL;
  const can = await Linking.canOpenURL(url);
  if (can) await Linking.openURL(url);
  else await Linking.openURL(WHATSAPP_ME_URL);
}
