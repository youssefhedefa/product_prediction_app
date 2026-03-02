import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Recommendation } from '../model';
import { Colors, FontSize, Radius, Spacing } from './theme';

interface ResultCardProps {
  recommendation: Recommendation;
  index: number;
}

const ResultCard: React.FC<ResultCardProps> = ({ recommendation, index }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;
  const scale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    const delay = index * 150; // staggered entrance
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 450,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 450,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        delay,
        useNativeDriver: true,
        speed: 12,
        bounciness: 5,
      }),
    ]).start();
  }, [index, opacity, translateY, scale]);

  return (
    <Animated.View
      style={[
        styles.card,
        { opacity, transform: [{ translateY }, { scale }] },
      ]}
    >
      {/* Accent bar */}
      <View style={styles.accentBar} />

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>#{recommendation.Product}</Text>
          </View>
          <View style={styles.actionPill}>
            <Text style={styles.actionText}>{recommendation.Recommended_Action}</Text>
          </View>
        </View>

        <View style={styles.grid}>
          <InfoItem label="Assigned Center" value={recommendation.Assigned_Center} />
          <InfoItem label="Estimated Cost" value={recommendation.Estimated_Cost} />
        </View>
        <View style={styles.grid}>
          <InfoItem label="Waste Reduction" value={recommendation.Waste_Reduction_Gain} accent />
        </View>
      </View>
    </Animated.View>
  );
};

/** Small helper to render a key/value pair. */
const InfoItem: React.FC<{ label: string; value: string; accent?: boolean }> = ({
  label,
  value,
  accent = false,
}) => (
  <View style={styles.info}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={[styles.infoValue, accent && styles.infoValueAccent]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  accentBar: {
    height: 3,
    backgroundColor: Colors.accent,
  },
  content: {
    padding: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  badge: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm + 4,
    paddingVertical: Spacing.xs + 2,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  badgeText: {
    color: Colors.primary,
    fontWeight: '800',
    fontSize: FontSize.sm,
  },
  actionPill: {
    backgroundColor: Colors.accentDark,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
  },
  actionText: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.accent,
  },
  grid: {
    flexDirection: 'row',
    marginTop: Spacing.xs + 2,
  },
  info: {
    flex: 1,
  },
  infoLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginBottom: 3,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  infoValueAccent: {
    color: Colors.accent,
  },
});

export default React.memo(ResultCard);
