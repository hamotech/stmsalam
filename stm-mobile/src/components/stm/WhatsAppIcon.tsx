import React from 'react';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  size?: number;
  color?: string;
};

export default function WhatsAppIcon({ size = 22, color = '#FFFFFF' }: Props) {
  return <Ionicons name="logo-whatsapp" size={size} color={color} accessibilityElementsHidden />;
}
