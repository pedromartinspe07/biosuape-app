// src/screens/ReportsScreen.tsx

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import Card from '../components/common/Card';
import Messages from '../components/common/Messages';
import ReportChart from '../components/reports/ReportChart';
import { Colors } from '../constants/colors';
import { Strings } from '../constants/strings';
import { fetchMonthlyReports } from '../services/reportService';
import { IReportData } from '../types/common';

const ReportsScreen: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [reportData, setReportData] = useState<IReportData | null>(null);
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

    useEffect(() => {
        const loadReports = async () => {
            setLoading(true);
            setMessage(null);
            try {
                // Aqui você usaria o token real e a API real
                const data = await fetchMonthlyReports(); 
                setReportData(data);
                if (data.datasets[0].data.length === 0) {
                    setMessage({ text: Strings.reportsScreen.noData, type: 'info' });
                }
            } catch (error: any) {
                setMessage({ text: `Não foi possível carregar os relatórios: ${error.message}`, type: 'error' });
                setReportData(null);
            } finally {
                setLoading(false);
            }
        };

        loadReports();
    }, []);

    const renderContent = () => {
        if (loading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                    <Text style={styles.loadingText}>{Strings.common.loading}</Text>
                </View>
            );
        }

        if (message?.type === 'info' || message?.type === 'error') {
            return <Messages text={message.text} type={message.type} />;
        }
        
        if (reportData) {
            return (
                <ReportChart reportData={reportData} />
            );
        }

        return null;
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>{Strings.reportsScreen.title}</Text>
            <Card containerStyle={styles.card}>
                {renderContent()}
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingHorizontal: 16,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginTop: 50,
        marginBottom: 20,
    },
    card: {
        padding: 0,
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    loadingText: {
        marginTop: 10,
        color: Colors.textSecondary,
    },
});

export default ReportsScreen;