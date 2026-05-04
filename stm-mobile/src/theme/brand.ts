import { Platform, type ViewStyle } from 'react-native';

/** STM Salam — aligned with web (green + gold). */
export const Brand = {
  green: '#013220',
  greenMid: '#056a48',
  gold: '#D4AF37',
  orange: '#EA580C',
  bg: '#F8FAFC',
  card: '#FFFFFF',
  border: '#E2E8F0',
  text: '#0F172A',
  muted: '#64748B',
  radius: 16,
  /** Slightly tighter corners (inputs, buttons). */
  radiusMd: 12,
  /** Cards / sheets (alias of radius). */
  radiusLg: 16,
  space: 16,
  spaceSm: 12,
} as const;

export const cardShadow: ViewStyle = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  android: { elevation: 3 },
  default: {},
}) as ViewStyle;
