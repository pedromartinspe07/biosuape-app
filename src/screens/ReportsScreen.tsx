import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Colors } from '../constants/colors';
import { Strings } from '../constants/strings';
import Card from '../components/common/Card';
import { getAuthToken } from '../utils/authHelper';
import { API_BASE_URL } from '../constants/api';

const screenWidth = Dimensions.get('window').width;

// Define a estrutura de dados esperada da API
interface ReportData {
  labels: string[];
  datasets: {
    data: number[];
    color: (opacity: number) => string;
    strokeWidth: number;
  }[];
}

const ReportsScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState<ReportData | null>(null);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const token = await getAuthToken();
      if (!token) {
        Alert.alert(Strings.alerts.errorTitle, 'Usuário não autenticado.');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/relatorios`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao buscar dados do relatório.');
      }

      const data = await response.json();
      
      // A API precisa retornar os dados no formato esperado pelo gráfico
      setReportData(data);
    } catch (error) {
      console.error('Falha ao buscar relatórios:', error);
      Alert.alert(Strings.alerts.errorTitle, `Não foi possível carregar os relatórios: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);  
      setReportData(null); // Define como nulo em caso de erro para exibir "sem dados"
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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