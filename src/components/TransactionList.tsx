import React, { useState } from 'react';
import OpenAI from 'openai';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  category?: string;
}

const mockTransactions: Transaction[] = [
  { id: 1, description: 'Starbucks', amount: 5.75, date: '2024-03-01' },
  { id: 2, description: 'AWS Invoice', amount: 100.00, date: '2024-03-02' },
  { id: 3, description: 'Office Supplies', amount: 45.99, date: '2024-03-03' },
  { id: 4, description: 'Client Dinner', amount: 85.50, date: '2024-03-04' },
];

export const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [isProcessing, setIsProcessing] = useState(false);

  const categorizeTransaction = async (transaction: Transaction) => {
    setIsProcessing(true);
    try {
      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
      });

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a financial categorization assistant. Categorize the given transaction into one of these categories: Travel, Meals, Office, Other. Respond ONLY with the category name."
          },
          {
            role: "user",
            content: `Categorize this transaction: ${transaction.description}`
          }
        ],
        temperature: 0.3,
      });

      const category = response.choices[0].message.content?.trim();
      
      setTransactions(prev =>
        prev.map(t =>
          t.id === transaction.id
            ? { ...t, category }
            : t
        )
      );
    } catch (error) {
      console.error('Error categorizing transaction:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Transactions
          </h3>
          <button
            onClick={() => transactions.forEach(categorizeTransaction)}
            disabled={isProcessing}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Categorizing...
              </>
            ) : (
              'Categorize All'
            )}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${transaction.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {transaction.category ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {transaction.category}
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                      Uncategorized
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => categorizeTransaction(transaction)}
                    disabled={isProcessing}
                    className="text-indigo-600 hover:text-indigo-900 disabled:opacity-50"
                  >
                    Categorize
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 