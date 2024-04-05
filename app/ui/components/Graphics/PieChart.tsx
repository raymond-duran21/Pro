'use client'

import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
import { Asignaciones } from '@/types/indes';
import { getAllAsignaciones } from '@/services/asignaciones/asignaciones';

const EchartsPieChart: React.FC = () => {
  const [chartDom, setChartDom] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const initChart = async () => {
      const chartDom = document.getElementById('echarts-container-pie') as HTMLDivElement;
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
          trigger: 'item',
        },
        series: [
          {
            name: 'Número de Equipos',
            type: 'pie',
            radius: '70%',
            data: chartData.map((item) => ({
              value: item.count,
              name: item.department,
            })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };

      myChart.setOption(option);
    };

    initChart();
  }, []); // Empty dependency array to run only once on component mount

  return <div id="echarts-container-pie" style={{ width: '900px', height: '600px' }} className='  bg-slate-50' />;
};

export default EchartsPieChart;