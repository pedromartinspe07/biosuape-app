// src/components/reports/ReportChart.tsx

import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Colors } from '../../constants/colors';
import { IReportData } from '../../types/common';

const screenWidth = Dimensions.get('window').width;

interface ReportChartProps {
    reportData: IReportData;
}

const ReportChart: React.FC<ReportChartProps> = ({ reportData }) => {
    return (
        <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Tendência de Ocorrências Mensais</Text>
            <LineChart
                data={reportData}
                width={screenWidth - 32}
                height={220}
                chartConfig={{
                    backgroundColor: Colors.surface,
                    backgroundGradientFrom: Colors.surface,
                    backgroundGradientTo: Colors.surface,
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: Colors.primary,
                    },
                }}
                bezier
                style={styles.lineChart}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    chartContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    chartTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.textPrimary,
        marginBottom: 10,
    },
    lineChart: {
        marginVertical: 8,
        borderRadius: 16,
    },
});

export default ReportChart;