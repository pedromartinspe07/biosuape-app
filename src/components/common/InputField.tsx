import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Animated, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { Colors } from '../../constants/colors';

// Define as propriedades que o componente InputField pode receber
interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string | boolean;
  iconName?: keyof typeof Ionicons.glyphMap;
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const InputField: React.FC<InputFieldProps> = ({ label, error, iconName, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const borderAnim = useState(new Animated.Value(0))[0];

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(borderAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(borderAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.border, Colors.primary],
  });

  const inputStyle = [
    styles.input,
    { borderColor },
    error && styles.inputError,
  ];

  const iconColor = error ? Colors.error : (isFocused ? Colors.primary : Colors.textSecondary);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        <AnimatedTextInput
          style={inputStyle}
          placeholderTextColor={Colors.textSecondary}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
        {iconName && (
          <Ionicons
            name={iconName}
            size={24}
            color={iconColor}
            style={styles.icon}
          />
        )}
      </View>
      {error && typeof error === 'string' && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 55,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors.surface,
    color: Colors.textPrimary,
    fontSize: 16,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  inputError: {
    borderColor: Colors.error,
  },
  icon: {
    position: 'absolute',
    right: 15,
  },
  errorText: {
    fontSize: 13,
    color: Colors.error,
    marginTop: 5,
    marginLeft: 5,
  },
});

export default InputField;