'use client'

import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import { Asignaciones } from '@/types/indes';
import { getAllAsignaciones } from '@/services/asignaciones/asignaciones';

const EchartsBarChart: React.FC = () => {
  const [chartDom, setChartDom] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const initChart = async () => {
      const chartDom = document.getElementById('echarts-container-bar') as HTMLDivElement;
      setChartDom(chartDom);

      const response = await getAllAsignaciones();
      const asignacionesData: Asignaciones[] = response;

      // Calcular el total de asignaciones por departamento
      const departmentCounts: { [key: string]: number } = {};
      asignacionesData.forEach((item) => {
        if (departmentCounts[item.departamento]) {
          departmentCounts[item.departamento] += 1;
        } else {
          departmentCounts[item.departamento] = 1;
        }
      });

      // Convertir los datos a un array de objetos
      const chartData = Object.keys(departmentCounts).map((department) => ({
        department,
        count: departmentCounts[department],
      }));

      const myChart = echarts.init(chartDom);

      const option: echarts.EChartsOption = {
        title: {
          text: 'Equipos Por departamento',
          subtext: 'Data from API',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: chartData.map(item => item.department),
          axisLabel: {
            rotate: 45,
            interval: 0
          }
        },
        yAxis: {
          type: 'value',
          
        },
        series: [
          {
            name: 'Número de Equipos',
            type: 'bar',
            data: chartData.map((item) => item.count),
            label: {
              show: true,
              position: 'top'
            }
          }
        ],
      };

      myChart.setOption(option);
    };

    initChart();
  }, []); // Empty dependency array to run only once on component mount

  return <div id="echarts-container-bar" style={{ width: '600px', height: '400px' }} className=' bg-slate-100' />;
};

export default EchartsBarChart;