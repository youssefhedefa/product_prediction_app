import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../model';
import { AnimatedButton, ResultCard, Colors, FontSize, Spacing, Radius } from '../components';

type Props = NativeStackScreenProps<RootStackParamList, 'Results'>;

const ResultsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { recommendations } = route.params;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />

      {/* Header */}
      <View style={styles.headerSection}>
        <Text style={styles.heading}>Prediction Results</Text>
        <View style={styles.countPill}>
          <Text style={styles.countText}>
            {recommendations.length} product{recommendations.length !== 1 ? 's' : ''} analysed
          </Text>
        </View>
      </View>

      {/* Result cards with staggered animation (handled inside ResultCard) */}
      {recommendations.map((rec, idx) => (
        <ResultCard key={rec.Product} recommendation={rec} index={idx} />
      ))}

      {/* Back button */}
      <AnimatedButton
        title="← New Prediction"
        variant="outline"
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
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
  countPill: {
    alignSelf: 'flex-start',
    marginTop: Spacing.sm,
    backgroundColor: Colors.primaryLight,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
  },
  countText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
  backBtn: {
    marginTop: Spacing.md,
  },
});

export default ResultsScreen;
