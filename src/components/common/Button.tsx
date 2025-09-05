// src/components/common/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../../constants/colors';

interface ButtonProps {
  title?: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode; // Para adicionar um ícone ao lado do texto
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
  children,
}) => {
  const getButtonStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          button: styles.secondaryButton,
          text: styles.secondaryButtonText,
        };
      case 'outline':
        return {
          button: styles.outlineButton,
          text: styles.outlineButtonText,
        };
      default: // primary
        return {
          button: styles.primaryButton,
          text: styles.primaryButtonText,
        };
    }
  };

  const { button: variantButton, text: variantText } = getButtonStyles();

  return (
    <TouchableOpacity
      style={[
        styles.buttonBase,
        variantButton,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? Colors.textLight : Colors.primary} size="small" />
      ) : (
        <>
          {children ? (
            children
          ) : (
            <>
              {icon && <Text style={styles.iconStyle}>{icon}</Text>}
              {title && <Text style={[styles.textBase, variantText, textStyle]}>{title}</Text>}
            </>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minHeight: 48,
  },
  textBase: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  primaryButtonText: {
    color: Colors.textLight,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary, // Supondo que você tenha Colors.secondary
  },
  secondaryButtonText: {
    color: Colors.textLight,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  outlineButtonText: {
    color: Colors.primary,
  },
  disabled: {
    opacity: 0.6,
  },
  iconStyle: {
    marginRight: 8,
  }
});

export default Button;