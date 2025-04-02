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
      type: 'linear',
      ticks: {
        callback: function(value) {
          return '$' + value.toLocaleString();
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

const categoryOptions: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Expenses by Category',
    },
  },
  scales: {
    y: {
      type: 'linear',
      ticks: {
        callback: function(value) {
          return '$' + value.toLocaleString();
        },
      },
    },
  },
};

export const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Financial Reports</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Income vs Expenses
            </h3>
          </div>
          <div className="p-6">
            <Bar options={options} data={mockData} />
          </div>
        </div>
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Expenses by Category
            </h3>
          </div>
          <div className="p-6">
            <Bar options={categoryOptions} data={expensesByCategory} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Summary
            </h3>
          </div>
          <div className="p-6">
            <dl className="grid grid-cols-1 gap-4">
              <div className="flex justify-between items-center">
                <dt className="text-sm font-medium text-gray-500">Total Income</dt>
                <dd className="text-sm font-medium text-gray-900">$54,700</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-sm font-medium text-gray-500">Total Expenses</dt>
                <dd className="text-sm font-medium text-gray-900">$47,400</dd>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <dt className="text-sm font-medium text-gray-900">Net Profit</dt>
                <dd className="text-sm font-medium text-green-600">$7,300</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Key Metrics
            </h3>
          </div>
          <div className="p-6">
            <dl className="grid grid-cols-1 gap-4">
              <div className="flex justify-between items-center">
                <dt className="text-sm font-medium text-gray-500">Profit Margin</dt>
                <dd className="text-sm font-medium text-gray-900">13.3%</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-sm font-medium text-gray-500">Expense Ratio</dt>
                <dd className="text-sm font-medium text-gray-900">86.7%</dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-sm font-medium text-gray-500">Monthly Average</dt>
                <dd className="text-sm font-medium text-gray-900">$13,675</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}; 