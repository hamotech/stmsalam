/**
 * Splash — first route (/). Auto-navigates after auth is ready + minimum display time.
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, useWindowDimensions, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { navReplaceUnsafe } from '@/src/navigation/appNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { useAuth } from '@/src/context/AuthContext';
import { Brand } from '@/src/theme/brand';
import StmLogoPlate from '@/src/components/stm/StmLogoPlate';

const GOLD = '#D4AF37';
const MIN_SPLASH_MS = 2000;

const SPRING = {
  damping: 18,
  stiffness: 210,
  mass: 0.85,
};

function SplashGradientBg() {
  const { width, height } = useWindowDimensions();
  return (
    <Svg
      width={width}
      height={height}
      style={StyleSheet.absoluteFill}
      pointerEvents="none"
    >
      <Defs>
        <LinearGradient
          id="splashBg"
          x1="0"
          y1="0"
          x2="0"
          y2={height}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor={Brand.green} />
          <Stop offset="0.28" stopColor="#064d34" />
          <Stop offset="0.62" stopColor="#e8f4ee" />
          <Stop offset="1" stopColor="#ffffff" />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width={width} height={height} fill="url(#splashBg)" />
    </Svg>
  );
}

export default function SplashScreen() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const startRef = useRef<number | null>(null);

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(18);
  const scale = useSharedValue(0.9);
  const spinnerOpacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 580,
      easing: Easing.out(Easing.cubic),
    });
    translateY.value = withSpring(0, SPRING);
    scale.value = withSpring(1, SPRING);
    spinnerOpacity.value = withDelay(
      420,
      withTiming(1, { duration: 480, easing: Easing.out(Easing.quad) })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps -- entrance once
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  const spinnerStyle = useAnimatedStyle(() => ({
    opacity: spinnerOpacity.value,
  }));

  useEffect(() => {
    if (loading) return undefined;
    if (startRef.current === null) startRef.current = Date.now();

    const startedAt = startRef.current;
    const remaining = Math.max(0, MIN_SPLASH_MS - (Date.now() - startedAt));

    const id = setTimeout(() => {
      if (typeof __DEV__ !== 'undefined' && __DEV__) {
        console.log('🚨 NAV OVERRIDE SOURCE', {
          file: 'app/index.tsx',
          reason: 'splash_auth_redirect',
          hasUser: !!user,
        });
      }
      if (user) {
        navReplaceUnsafe(router, { kind: 'tabs' });
      } else {
        navReplaceUnsafe(router, { kind: 'login' });
      }
    }, remaining);

    return () => clearTimeout(id);
  }, [loading, user, router]);

  return (
    <View style={styles.root}>
      <SplashGradientBg />
      <StatusBar style="light" />
      <SafeAreaView style={styles.safe} edges={['top', 'bottom', 'left', 'right']}>
        <View style={styles.center}>
          <Animated.View style={logoAnimatedStyle}>
            <StmLogoPlate logoSize={118} />
          </Animated.View>
          <Animated.View style={[styles.spinnerWrap, spinnerStyle]}>
            <ActivityIndicator color={GOLD} accessibilityLabel="Loading" />
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    ...Platform.select({
      web: { minHeight: '100%' },
      default: {},
    }),
  },
  safe: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerWrap: {
    marginTop: 32,
    height: 36,
    justifyContent: 'center',
  },
});
