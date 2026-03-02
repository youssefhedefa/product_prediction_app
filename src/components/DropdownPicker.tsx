import React, { useState, useCallback } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Colors, FontSize, Radius, Spacing } from './theme';

interface DropdownPickerProps<T extends string> {
  label: string;
  options: readonly T[];
  selectedValue: T;
  onSelect: (value: T) => void;
}

function DropdownPicker<T extends string>({
  label,
  options,
  selectedValue,
  onSelect,
}: DropdownPickerProps<T>): React.ReactElement {
  const [visible, setVisible] = useState(false);

  const handleSelect = useCallback(
    (value: T) => {
      onSelect(value);
      setVisible(false);
    },
    [onSelect],
  );

  const renderItem = useCallback(
    ({ item }: { item: T }) => (
      <Pressable
        onPress={() => handleSelect(item)}
        style={[
          styles.option,
          item === selectedValue && styles.optionSelected,
        ]}
      >
        <Text
          style={[
            styles.optionText,
            item === selectedValue && styles.optionTextSelected,
          ]}
        >
          {item}
        </Text>
      </Pressable>
    ),
    [handleSelect, selectedValue],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Pressable style={styles.selector} onPress={() => setVisible(true)}>
        <Text style={styles.selectorText}>{selectedValue}</Text>
        <Text style={styles.arrow}>▼</Text>
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.dropdown}>
            <Text style={styles.dropdownTitle}>{label}</Text>
            <FlatList
              data={options as unknown as T[]}
              keyExtractor={item => item}
              renderItem={renderItem}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.sm + 2,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.xs + 2,
    letterSpacing: 0.3,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.sm,
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.surfaceLight,
  },
  selectorText: {
    fontSize: FontSize.md,
    color: Colors.textPrimary,
  },
  arrow: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    width: '80%',
    maxHeight: 340,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  dropdownTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  option: {
    paddingVertical: Spacing.sm + 4,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.sm,
    marginBottom: 2,
  },
  optionSelected: {
    backgroundColor: Colors.primaryLight,
  },
  optionText: {
    fontSize: FontSize.md,
    color: Colors.textPrimary,
  },
  optionTextSelected: {
    fontWeight: '700',
    color: Colors.primary,
  },
});

export default React.memo(DropdownPicker) as typeof DropdownPicker;
