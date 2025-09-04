// src/components/common/Card.tsx

import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
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
   * Função para lidar com o evento de clique.
   * Se fornecida, o Card será renderizado como um componente clicável.
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
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: Colors.textPrimary, // Sombra mais suave
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // Elevação para Android
    borderWidth: 1,
    borderColor: Colors.border, // Borda sutil para dar mais destaque
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 10,
  },
});

export default Card;