import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartOptions } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

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
      beginAtZero: true,
      ticks: {
        callback: function(value) {
          return '$' + value.toLocaleString();
        },
      },
    },
  },
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
      beginAtZero: true,
      ticks: {
        callback: function(value) {
          return '$' + value.toLocaleString();
        },
      },
    },
  },
};

const incomeExpenseData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Income',
      data: [12000, 19000, 15000, 25000, 22000, 30000],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1,
    },
    {
      label: 'Expenses',
      data: [8000, 12000, 10000, 18000, 15000, 20000],
      backgroundColor: 'rgba(239, 68, 68, 0.5)',
      borderColor: 'rgb(239, 68, 68)',
      borderWidth: 1,
    },
  ],
};

const categoryData = {
  labels: ['Travel', 'Meals', 'Office', 'Other'],
  datasets: [
    {
      label: 'Expenses',
      data: [5000, 8000, 3000, 4000],
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1,
    },
  ],
};

export const Reports: React.FC = () => {
  const totalIncome = 123000;
  const totalExpenses = 83000;
  const netProfit = totalIncome - totalExpenses;
  const profitMargin = ((netProfit / totalIncome) * 100).toFixed(1);
  const expenseRatio = ((totalExpenses / totalIncome) * 100).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Income</h3>
          <p className="mt-2 text-3xl font-semibold text-green-600">${totalIncome.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
          <p className="mt-2 text-3xl font-semibold text-red-600">${totalExpenses.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Net Profit</h3>
          <p className="mt-2 text-3xl font-semibold text-blue-600">${netProfit.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Profit Margin</h3>
          <p className="mt-2 text-3xl font-semibold text-indigo-600">{profitMargin}%</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <Bar options={options} data={incomeExpenseData} />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <Bar options={categoryOptions} data={categoryData} />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Key Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Expense Ratio</h4>
            <p className="mt-1 text-2xl font-semibold text-gray-900">{expenseRatio}%</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Average Monthly Income</h4>
            <p className="mt-1 text-2xl font-semibold text-gray-900">${(totalIncome / 6).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 