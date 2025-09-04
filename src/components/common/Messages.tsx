// src/components/common/Messages.tsx

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { IMessage } from '../../types/common';

const Messages: React.FC<IMessage> = ({ text, type }) => {
    let iconName: keyof typeof Ionicons.glyphMap;
    let backgroundColor: string;
    let textColor: string;

    switch (type) {
        case 'success':
            iconName = 'checkmark-circle';
            backgroundColor = Colors.success;
            textColor = Colors.textLight;
            break;
        case 'error':
            iconName = 'alert-circle';
            backgroundColor = Colors.error;
            textColor = Colors.textLight;
            break;
        default:
            iconName = 'information-circle';
            backgroundColor = Colors.info;
            textColor = Colors.textPrimary;
            break;
    }

    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Ionicons name={iconName} size={20} color={textColor} style={styles.icon} />
            <Text style={[styles.text, { color: textColor }]}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        width: '100%',
    },
    icon: {
        marginRight: 10,
    },
    text: {
        flex: 1,
        fontSize: 14,
    },
});

export default Messages;