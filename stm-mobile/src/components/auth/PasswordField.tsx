import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, type TextInputProps } from 'react-native';
import { Brand } from '@/src/theme/brand';

const GREEN = Brand.green;
const BORDER = 'rgba(1, 50, 32, 0.14)';
const INPUT_BG = '#FFFFFF';

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
} & Pick<TextInputProps, 'textContentType' | 'autoComplete' | 'onSubmitEditing' | 'returnKeyType' | 'testID' | 'editable'>;

/** Password input with Amazon-style Show / Hide toggle. */
export default function PasswordField({
  value,
  onChangeText,
  placeholder = 'Password',
  ...rest
}: Props) {
  const [show, setShow] = useState(false);

  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Brand.muted}
        secureTextEntry={!show}
        autoCapitalize="none"
        autoCorrect={false}
        {...rest}
      />
      <TouchableOpacity
        style={styles.toggle}
        onPress={() => setShow((v) => !v)}
        accessibilityRole="button"
        accessibilityLabel={show ? 'Hide password' : 'Show password'}
        hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
      >
        <Text style={styles.toggleText}>{show ? 'Hide' : 'Show'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: BORDER,
    borderRadius: Brand.radius,
    backgroundColor: INPUT_BG,
    marginBottom: 14,
    minHeight: 52,
    paddingRight: 4,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 14,
    fontSize: 16,
    fontWeight: '600',
    color: Brand.text,
  },
  toggle: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '800',
    color: GREEN,
  },
});
