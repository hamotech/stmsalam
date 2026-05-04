/** Route: `/order-tracking/:orderId` — dedicated post-order mobile tracking flow. */

import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import MobileOrderTrackingScreen from '@/src/screens/MobileOrderTrackingScreen';

export default function OrderTrackingRoute() {
  const params = useLocalSearchParams<{ orderId?: string | string[] }>();
  if (!params?.orderId) {
    console.error('[TRACKING] Missing orderId');
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
        <Text style={{ color: '#b91c1c', fontWeight: '800' }}>Invalid order</Text>
      </View>
    );
  }
  return <MobileOrderTrackingScreen orderId={params.orderId} />;
}
