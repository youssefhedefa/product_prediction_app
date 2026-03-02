import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Animated, LayoutAnimation, Platform, Pressable, StyleSheet, UIManager, View } from 'react-native';
import {
  Material,
  MarketDemand,
  ProductFormState,
  ProductValidationErrors,
} from '../model';
import FormInput from './FormInput';
import DropdownPicker from './DropdownPicker';
import AnimatedButton from './AnimatedButton';
import { Colors, FontSize, Radius, Spacing } from './theme';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MATERIALS: readonly Material[] = ['Glass', 'Plastic', 'Electronics', 'Metal'];
const DEMANDS: readonly MarketDemand[] = ['High', 'Medium', 'Low'];

interface ProductFormCardProps {
  product: ProductFormState;
  index: number;
  errors: ProductValidationErrors | undefined;
  canRemove: boolean;
  onUpdate: <K extends keyof ProductFormState>(
    id: string,
    field: K,
    value: ProductFormState[K],
  ) => void;
  onRemove: (id: string) => void;
  onReset: (id: string) => void;
}

const ProductFormCard: React.FC<ProductFormCardProps> = ({
  product,
  index,
  errors,
  canRemove,
  onUpdate,
  onRemove,
  onReset,
}) => {
  const [expanded, setExpanded] = useState(true);

  // ── Entrance animation (fade + slide in) ──────────────────────────────
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        speed: 12,
        bounciness: 5,
      }),
    ]).start();
  }, [opacity, translateY]);

  // ── Toggle collapse/expand ────────────────────────────────────────────
  const toggleExpand = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(prev => !prev);
  }, []);

  // ── Removal animation (collapse + fade out) ───────────────────────────
  const handleRemove = useCallback(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -20,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onRemove(product.id);
    });
  }, [opacity, translateY, onRemove, product.id]);

  const handleReset = useCallback(() => {
    onReset(product.id);
  }, [onReset, product.id]);

  const hasErrors = errors && Object.keys(errors).length > 0;

  return (
    <Animated.View
      style={[
        styles.card,
        hasErrors && styles.cardError,
        { opacity, transform: [{ translateY }] },
      ]}
    >
      {/* ── Collapsible Header ─────────────────────────────────────────── */}
      <Pressable onPress={toggleExpand} style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.indexBadge}>
            <Animated.Text style={styles.indexText}>{index + 1}</Animated.Text>
          </View>
          <Animated.Text style={styles.title}>Product #{index + 1}</Animated.Text>
        </View>
        <View style={styles.headerRight}>
          <Animated.Text style={styles.chevron}>
            {expanded ? '▲' : '▼'}
          </Animated.Text>
        </View>
      </Pressable>

      {/* ── Summary when collapsed ─────────────────────────────────────── */}
      {!expanded && (
        <View style={styles.collapsedSummary}>
          <Animated.Text style={styles.summaryText}>
            {product.Material} · {product.Age_months || '—'} mo · Score {product.Condition_Score || '—'} · {product.Market_Demand}
          </Animated.Text>
        </View>
      )}

      {/* ── Expanded Form ──────────────────────────────────────────────── */}
      {expanded && (
        <View style={styles.formBody}>
          <DropdownPicker<Material>
            label="Material"
            options={MATERIALS}
            selectedValue={product.Material}
            onSelect={val => onUpdate(product.id, 'Material', val)}
          />

          <FormInput
            label="Age (months)"
            value={product.Age_months}
            onChangeText={val => onUpdate(product.id, 'Age_months', val)}
            placeholder="e.g. 12"
            keyboardType="numeric"
            error={errors?.Age_months}
          />

          <FormInput
            label="Condition Score (1–10)"
            value={product.Condition_Score}
            onChangeText={val => {
              // Allow empty (user is clearing), or digits only within 1-10
              if (val === '') {
                onUpdate(product.id, 'Condition_Score', val);
                return;
              }
              // Only allow digits
              if (!/^\d+$/.test(val)) { return; }
              const num = parseInt(val, 10);
              // Block values > 10 or leading zeros like "00"
              if (num > 10 || (val.length > 1 && val.startsWith('0'))) { return; }
              onUpdate(product.id, 'Condition_Score', val);
            }}
            placeholder="e.g. 8"
            keyboardType="numeric"
            maxLength={2}
            error={errors?.Condition_Score}
          />

          <FormInput
            label="Repair Cost"
            value={product.Repair_Cost}
            onChangeText={val => onUpdate(product.id, 'Repair_Cost', val)}
            placeholder="e.g. 15.50"
            keyboardType="decimal-pad"
            error={errors?.Repair_Cost}
          />

          <FormInput
            label="Recycle Cost"
            value={product.Recycle_Cost}
            onChangeText={val => onUpdate(product.id, 'Recycle_Cost', val)}
            placeholder="e.g. 5.00"
            keyboardType="decimal-pad"
            error={errors?.Recycle_Cost}
          />

          <DropdownPicker<MarketDemand>
            label="Market Demand"
            options={DEMANDS}
            selectedValue={product.Market_Demand}
            onSelect={val => onUpdate(product.id, 'Market_Demand', val)}
          />

          {/* ── Card Actions ─────────────────────────────────────────── */}
          <View style={styles.cardActions}>
            <AnimatedButton
              title="↺ Reset"
              variant="ghost"
              onPress={handleReset}
              style={styles.cardActionBtn}
              textStyle={styles.cardActionText}
            />
            {canRemove && (
              <AnimatedButton
                title="✕ Remove"
                variant="danger"
                onPress={handleRemove}
                style={styles.cardActionBtn}
                textStyle={styles.cardActionText}
              />
            )}
          </View>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: 0,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  cardError: {
    borderColor: Colors.danger,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.surfaceLight,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indexBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  indexText: {
    color: Colors.white,
    fontSize: FontSize.sm,
    fontWeight: '800',
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  chevron: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  collapsedSummary: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm + 2,
  },
  summaryText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    paddingTop: Spacing.xs + 2,
  },
  formBody: {
    padding: Spacing.md,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  cardActionBtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    minHeight: 36,
    borderRadius: Radius.sm,
  },
  cardActionText: {
    fontSize: FontSize.sm,
  },
});

export default React.memo(ProductFormCard);
