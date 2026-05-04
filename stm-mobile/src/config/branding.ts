/** Same asset as web Navbar: `/stmsalamlogo.png` on the live site. */
const SITE = (process.env.EXPO_PUBLIC_SITE_ORIGIN || 'https://stmsalam.sg').replace(/\/$/, '');

export const STM_LOGO_PATH = '/stmsalamlogo.png';

export function stmLogoUrl(): string {
  return `${SITE}${STM_LOGO_PATH}`;
}
