/**
 * TrackingTimeline.tsx
 * Vertical step-by-step progress tracker — mirrors the web OrderTracking.jsx UI.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { STATUS_STEPS, getActiveStep, OrderStatus } from '../services/orderService';

interface Props {
  status: OrderStatus | string;
}

export default function TrackingTimeline({ status }: Props) {
  const activeStep = getActiveStep(status);

  return (
    <View style={styles.container}>
      {/* Background rail */}
      <View style={styles.rail} />
      {/* Active progress fill */}
      <View
        style={[
          styles.railFill,
          {
            height: `${(activeStep / (STATUS_STEPS.length - 1)) * 100}%` as any,
          },
        ]}
      />

      {STATUS_STEPS.map((step, i) => {
        const isCompleted = i < activeStep;
        const isActive    = i === activeStep;

        return (
          <View key={step.id} style={styles.row}>
            {/* Dot */}
            <View
              style={[
                styles.dot,
                isCompleted && styles.dotCompleted,
                isActive    && styles.dotActive,
              ]}
            >
              <Text style={styles.dotEmoji}>
                {isCompleted ? '✓' : step.emoji}
              </Text>
            </View>

            {/* Labels */}
            <View style={styles.labelGroup}>
              <Text
                style={[
                  styles.label,
                  (isCompleted || isActive) && styles.labelHighlight,
                ]}
              >
                {step.label}
              </Text>
              <Text style={styles.desc}>{step.desc}</Text>
            </View>

            {/* LIVE badge */}
            {isActive && (
              <View style={styles.liveBadge}>
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

const GREEN  = '#013220';
const GOLD   = '#D4AF37';
const BORDER = '#E2E8F0';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingLeft: 20,
  },
  rail: {
    position: 'absolute',
    left: 38,
    top: 24,
    bottom: 24,
    width: 3,
    backgroundColor: BORDER,
    zIndex: 0,
    borderRadius: 4,
  },
  railFill: {
    position: 'absolute',
    left: 38,
    top: 24,
    width: 3,
    backgroundColor: GREEN,
    zIndex: 1,
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    zIndex: 2,
  },
  dot: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 2,
    borderColor: BORDER,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    zIndex: 2,
  },
  dotCompleted: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },
  dotActive: {
    backgroundColor: GOLD,
    borderColor: GOLD,
  },
  dotEmoji: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  labelGroup: {
    flex: 1,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#94A3B8',
    marginBottom: 2,
  },
  labelHighlight: {
    color: '#0F172A',
  },
  desc: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  liveBadge: {
    backgroundColor: '#FEF3C7',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  liveText: {
    fontSize: 10,
    fontWeight: '900',
    color: GOLD,
    letterSpacing: 1,
  },
});
