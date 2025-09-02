import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Colors } from '../constants/colors';
import { Strings } from '../constants/strings';
import Card from '../components/common/Card';

const screenWidth = Dimensions.get('window').width;

const mockData = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const ReportsScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState(mockData);

  useEffect(() => {
    const fetchReports = async () => {
      // Simula a busca de dados da API
      // Ex: const response = await api.get('/relatorios');
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
      // setReportData(response.data); // Usaria os dados reais da API
    };
    fetchReports();
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

    if (!reportData || reportData.datasets[0].data.length === 0) {
      return (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>{Strings.reportsScreen.noData}</Text>
        </View>
      );
    }

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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{Strings.reportsScreen.title}</Text>
      <Card containerStyle={styles.card}>{renderContent()}</Card>
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
  noDataContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  noDataText: {
    color: Colors.textSecondary,
    fontStyle: 'italic',
  },
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

export default ReportsScreen;