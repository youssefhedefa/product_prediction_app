import React, { useCallback, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { Colors, FontSize, Radius, Spacing } from './theme';

interface AnimatedButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'danger' | 'outline' | 'ghost';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  style,
  textStyle,
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: 0.94,
      useNativeDriver: true,
      speed: 50,
      bounciness: 6,
    }).start();
  }, [scale]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 6,
    }).start();
  }, [scale]);

  const bgColor =
    variant === 'danger'
      ? Colors.danger
      : variant === 'outline'
        ? 'transparent'
        : variant === 'ghost'
          ? 'transparent'
          : Colors.primary;

  const borderColor =
    variant === 'outline'
      ? Colors.primary
      : variant === 'ghost'
        ? 'transparent'
        : 'transparent';

  const labelColor =
    variant === 'outline'
      ? Colors.primary
      : variant === 'ghost'
        ? Colors.textSecondary
        : Colors.white;

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={[
          styles.button,
          {
            backgroundColor: disabled ? Colors.disabled : bgColor,
            borderColor: disabled ? Colors.disabled : borderColor,
          },
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <Text
            style={[
              styles.label,
              { color: disabled ? Colors.textSecondary : labelColor },
              textStyle,
            ]}
          >
            {title}
          </Text>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.sm + 4,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    minHeight: 50,
    minWidth: 120,
  },
  label: {
    fontSize: FontSize.md,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default React.memo(AnimatedButton);
