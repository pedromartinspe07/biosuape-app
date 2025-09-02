// src/components/common/Card.tsx

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../../constants/colors';

interface CardProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  title, 
  description, 
  containerStyle, 
  titleStyle, 
  descriptionStyle 
}) => {
  return (
    <View style={[styles.card, containerStyle]}>
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      {description && <Text style={[styles.description, descriptionStyle]}>{description}</Text>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3, // Elevação para Android
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: 8,
  },
});

export default Card;