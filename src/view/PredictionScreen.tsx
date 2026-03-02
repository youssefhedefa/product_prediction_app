import React, { useCallback, useRef } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../model';
import { usePredictionViewModel } from '../viewmodel';
import { AnimatedButton, ProductFormCard, Colors, Spacing, FontSize, Radius } from '../components';

type Props = NativeStackScreenProps<RootStackParamList, 'Prediction'>;

const PredictionScreen: React.FC<Props> = ({ navigation }) => {
  const vm = usePredictionViewModel();
  const scrollRef = useRef<ScrollView>(null);

  const handleSubmit = useCallback(async () => {
    const results = await vm.submit();
    if (results) {
      navigation.navigate('Results', { recommendations: results });
    }
  }, [vm, navigation]);

  const handleReset = useCallback(() => {
    Alert.alert('Reset All', 'Clear all products and start fresh?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: vm.reset },
    ]);
  }, [vm]);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 80}
    >
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScrollView
        ref={scrollRef}
        style={styles.flex}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets
      >
        {/* Header */}
        <View style={styles.headerSection}>
          <Text style={styles.heading}>Product Prediction</Text>
          <Text style={styles.subtitle}>
            Enter product lifecycle data and get AI‑powered recommendations.
          </Text>
        </View>

        {/* Product Forms */}
        {vm.products.map((product, idx) => (
          <ProductFormCard
            key={product.id}
            product={product}
            index={idx}
            errors={vm.validationErrors[product.id]}
            canRemove={vm.products.length > 1}
            onUpdate={vm.updateField}
            onRemove={vm.removeProduct}
            onReset={vm.resetProduct}
          />
        ))}

        {/* Add Product */}
        <AnimatedButton
          title="＋  Add Product"
          variant="outline"
          onPress={vm.addProduct}
          style={styles.addBtn}
        />

        {/* Error Banner */}
        {vm.errorMessage ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{vm.errorMessage}</Text>
          </View>
        ) : null}

        {/* Actions */}
        <View style={styles.actions}>
          <AnimatedButton
            title="Get Predictions"
            onPress={handleSubmit}
            loading={vm.isLoading}
            disabled={vm.isLoading}
            style={styles.submitBtn}
          />
          <AnimatedButton
            title="Reset All"
            variant="outline"
            onPress={handleReset}
            disabled={vm.isLoading}
            style={styles.resetBtn}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    padding: Spacing.md,
    paddingBottom: Spacing.xl + 60,
  },
  headerSection: {
    marginBottom: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  heading: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs + 2,
    lineHeight: 20,
  },
  addBtn: {
    marginBottom: Spacing.md,
  },
  errorBanner: {
    backgroundColor: Colors.dangerLight,
    borderRadius: Radius.sm,
    padding: Spacing.sm + 2,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.danger,
  },
  errorText: {
    color: Colors.danger,
    fontSize: FontSize.sm,
    fontWeight: '600',
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  submitBtn: {
    width: '100%',
  },
  resetBtn: {
    width: '125%',
  },
});

export default PredictionScreen;
