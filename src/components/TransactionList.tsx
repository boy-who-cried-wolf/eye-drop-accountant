import React, { useState } from 'react';
import OpenAI from 'openai';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  category?: string;
}

const sampleTransactions: Transaction[] = [
  { id: 1, description: "Starbucks", amount: 5.75, date: "2024-03-01" },
  { id: 2, description: "AWS Invoice", amount: 100.00, date: "2024-03-02" },
  { id: 3, description: "Office Depot", amount: 45.99, date: "2024-03-03" },
  { id: 4, description: "Delta Airlines", amount: 450.00, date: "2024-03-04" },
];

export const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);
  const [isProcessing, setIsProcessing] = useState(false);

  const categorizeTransaction = async (transaction: Transaction) => {
    try {
      const openai = new OpenAI({
        apiKey: process.env.VITE_OPENAI_API_KEY,
      });

      const prompt = `Categorize "${transaction.description}" as one of: Travel, Meals, Office, Other. Respond ONLY with the category.`;
      
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });

      const category = response.choices[0]?.message?.content || 'Other';
      
      setTransactions(prev =>
        prev.map(t =>
          t.id === transaction.id ? { ...t, category } : t
        )
      );
    } catch (error) {
      console.error('Error categorizing transaction:', error);
    }
  };

  const categorizeAll = async () => {
    setIsProcessing(true);
    try {
      await Promise.all(
        transactions
          .filter(t => !t.category)
          .map(categorizeTransaction)
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Transactions
          </h3>
          <button
            onClick={categorizeAll}
            disabled={isProcessing}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white
              ${isProcessing ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {isProcessing ? 'Processing...' : 'Categorize All'}
          </button>
        </div>
        <div className="mt-4">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {transaction.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${transaction.amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.category || (
                              <button
                                onClick={() => categorizeTransaction(transaction)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Categorize
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 