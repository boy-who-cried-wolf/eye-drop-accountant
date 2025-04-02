import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const mockData = {
  labels: ['January', 'February', 'March', 'April'],
  datasets: [
    {
      label: 'Income',
      data: [12000, 15000, 13500, 14200],
      backgroundColor: 'rgba(34, 197, 94, 0.5)',
      borderColor: 'rgb(34, 197, 94)',
      borderWidth: 1,
    },
    {
      label: 'Expenses',
      data: [10000, 12500, 11800, 13100],
      backgroundColor: 'rgba(239, 68, 68, 0.5)',
      borderColor: 'rgb(239, 68, 68)',
      borderWidth: 1,
    },
  ],
};

const options: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Income vs Expenses',
    },
  },
  scales: {
    y: {
      type: 'linear' as const,
      beginAtZero: true,
      ticks: {
        callback: function(value) {
          return `$${value.toLocaleString()}`;
        },
      },
    },
  },
};

const expensesByCategory = {
  labels: ['Travel', 'Meals', 'Office', 'Other'],
  datasets: [
    {
      label: 'Expenses by Category',
      data: [2500, 1800, 3200, 1500],
      backgroundColor: [
        'rgba(59, 130, 246, 0.5)',
        'rgba(139, 92, 246, 0.5)',
        'rgba(236, 72, 153, 0.5)',
        'rgba(251, 146, 60, 0.5)',
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(139, 92, 246)',
        'rgb(236, 72, 153)',
        'rgb(251, 146, 60)',
      ],
      borderWidth: 1,
    },
  ],
};

export const Reports: React.FC = () => {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-6">
          Financial Reports
        </h3>
        <div className="grid grid-cols-1 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <Bar options={options} data={mockData} />
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <Bar
              options={{
                ...options,
                plugins: {
                  ...options.plugins,
                  title: {
                    ...options.plugins?.title,
                    text: 'Expenses by Category',
                  },
                },
              }}
              data={expensesByCategory}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Summary</h4>
              <dl className="grid grid-cols-1 gap-2">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Total Income</dt>
                  <dd className="text-sm font-medium text-gray-900">$54,700</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Total Expenses</dt>
                  <dd className="text-sm font-medium text-gray-900">$47,400</dd>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <dt className="text-sm font-medium text-gray-900">Net Profit</dt>
                  <dd className="text-sm font-medium text-green-600">$7,300</dd>
                </div>
              </dl>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Metrics</h4>
              <dl className="grid grid-cols-1 gap-2">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Profit Margin</dt>
                  <dd className="text-sm font-medium text-gray-900">13.3%</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Expense Ratio</dt>
                  <dd className="text-sm font-medium text-gray-900">86.7%</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Monthly Average</dt>
                  <dd className="text-sm font-medium text-gray-900">$13,675</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 