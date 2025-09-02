import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Colors } from '../../constants/colors';

// Define as propriedades que o componente InputField pode receber
interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string | boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, error, ...rest }) => {
  return (
    <View style={styles.container}>
      {/* Label do campo */}
      <Text style={styles.label}>{label}</Text>

      {/* Campo de entrada de texto */}
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor={Colors.textSecondary}
        {...rest}
      />

      {/* Mensagem de erro */}
      {error && typeof error === 'string' && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: Colors.textPrimary,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: Colors.surface,
    color: Colors.textPrimary,
  },
  inputError: {
    borderColor: Colors.error,
  },
  errorText: {
    fontSize: 12,
    color: Colors.error,
    marginTop: 5,
  },
});

export default InputField;
