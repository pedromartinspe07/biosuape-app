// src/components/common/Card.tsx

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle, 
  TouchableOpacity, 
  GestureResponderEvent 
} from 'react-native';
import { Colors } from '../../constants/colors';

interface CardProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  /**
   * Função para lidar com o evento de clique no cartão.
   * Se esta prop for fornecida, o componente será renderizado como um TouchableOpacity.
   */
  onPress?: (event: GestureResponderEvent) => void;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  title, 
  description, 
  containerStyle, 
  titleStyle, 
  descriptionStyle,
  onPress
}) => {
  const content = (
    <>
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      {description && <Text style={[styles.description, descriptionStyle]}>{description}</Text>}
      {children}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity 
        style={[styles.card, containerStyle]} 
        onPress={onPress}
        activeOpacity={0.7}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.card, containerStyle]}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: Colors.textPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3, // Elevação para Android
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
});

export default Card;