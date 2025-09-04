// src/services/reportService.ts

import { IReportData } from '../types/common';

/**
 * Dados simulados para um relatório de sucesso.
 * Subsitua por dados reais da sua API.
 */
const mockReportDataSuccess: IReportData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [{
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
        strokeWidth: 2,
    }],
};

/**
 * Dados simulados para um relatório sem ocorrências.
 */
const mockReportDataEmpty: IReportData = {
    labels: [],
    datasets: [{
        data: [],
        color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
        strokeWidth: 2,
    }],
};

/**
 * Simula a chamada de API para buscar relatórios mensais.
 * @returns {Promise<IReportData>} Uma promessa que resolve com os dados do relatório.
 */
export const fetchMonthlyReports = async (): Promise<IReportData> => {
    return new Promise((resolve, reject) => {
        // Simula um atraso de 1.5 segundos da rede
        setTimeout(() => {
            const random = Math.random();
            if (random > 0.8) {
                // Simula um erro (por exemplo, falha na rede ou 500 no servidor)
                reject(new Error('Falha na conexão com o servidor.'));
            } else if (random > 0.4) {
                // Simula uma resposta com dados vazios
                resolve(mockReportDataEmpty);
            } else {
                // Simula uma resposta com dados válidos
                resolve(mockReportDataSuccess);
            }
        }, 1500);
    });
};