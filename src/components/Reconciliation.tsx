import React, { useState } from 'react';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  matched?: boolean;
}

const bankTransactions: Transaction[] = [
  { id: 1, description: 'Starbucks', amount: 5.75, date: '2024-03-01' },
  { id: 2, description: 'AWS Invoice', amount: 100.00, date: '2024-03-02' },
  { id: 3, description: 'Office Supplies', amount: 45.99, date: '2024-03-03' },
  { id: 4, description: 'Client Dinner', amount: 85.50, date: '2024-03-04' },
];

const invoices: Transaction[] = [
  { id: 1, description: 'Starbucks Coffee', amount: 5.75, date: '2024-03-01' },
  { id: 2, description: 'AWS Services', amount: 100.00, date: '2024-03-02' },
  { id: 3, description: 'Office Depot', amount: 45.99, date: '2024-03-03' },
  { id: 4, description: 'Restaurant Bill', amount: 85.50, date: '2024-03-04' },
];

const fuzzyMatch = (bank: Transaction, invoice: Transaction): boolean => {
  const amountMatch = Math.abs(bank.amount - invoice.amount) < 0.01;
  const dateMatch = Math.abs(new Date(bank.date).getTime() - new Date(invoice.date).getTime()) < 2 * 24 * 60 * 60 * 1000;
  return amountMatch && dateMatch;
};

export const Reconciliation: React.FC = () => {
  const [bankItems, setBankItems] = useState<Transaction[]>(bankTransactions);
  const [invoiceItems, setInvoiceItems] = useState<Transaction[]>(invoices);

  const findMatches = () => {
    const newBankItems = bankItems.map(bank => ({
      ...bank,
      matched: invoiceItems.some(invoice => fuzzyMatch(bank, invoice))
    }));
    const newInvoiceItems = invoiceItems.map(invoice => ({
      ...invoice,
      matched: bankItems.some(bank => fuzzyMatch(bank, invoice))
    }));
    setBankItems(newBankItems);
    setInvoiceItems(newInvoiceItems);
  };

  const TransactionTable: React.FC<{
    title: string;
    transactions: Transaction[];
  }> = ({ title, transactions }) => (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {title}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
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
                  {transaction.matched ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Matched
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Unmatched
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Bank Reconciliation</h2>
        <button
          onClick={findMatches}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Find Matches
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TransactionTable title="Bank Transactions" transactions={bankItems} />
        <TransactionTable title="Invoices" transactions={invoiceItems} />
      </div>
    </div>
  );
}; 