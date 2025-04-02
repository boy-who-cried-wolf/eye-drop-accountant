import React, { useState } from 'react';

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  matched?: boolean;
}

const bankTransactions: Transaction[] = [
  { id: 1, description: "SBUX", amount: 5.75, date: "2024-03-01" },
  { id: 2, description: "Amazon Web Services", amount: 100.00, date: "2024-03-02" },
  { id: 3, description: "Office Depot Purchase", amount: 45.99, date: "2024-03-03" },
  { id: 4, description: "Delta Air", amount: 450.00, date: "2024-03-04" },
];

const invoices: Transaction[] = [
  { id: 101, description: "Starbucks", amount: 5.75, date: "2024-03-01" },
  { id: 102, description: "AWS Invoice", amount: 100.00, date: "2024-03-02" },
  { id: 103, description: "Office Depot", amount: 45.99, date: "2024-03-03" },
  { id: 104, description: "Delta Airlines", amount: 450.00, date: "2024-03-04" },
];

const fuzzyMatch = (bank: Transaction, invoice: Transaction): boolean => {
  // Simple matching logic: amount must match exactly and dates within 2 days
  const dateMatch = Math.abs(
    new Date(bank.date).getTime() - new Date(invoice.date).getTime()
  ) <= 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds

  return bank.amount === invoice.amount && dateMatch;
};

export const Reconciliation: React.FC = () => {
  const [bankItems, setBankItems] = useState<Transaction[]>(bankTransactions);
  const [invoiceItems, setInvoiceItems] = useState<Transaction[]>(invoices);

  const findMatches = () => {
    const newBankItems = [...bankItems];
    const newInvoiceItems = [...invoiceItems];

    newBankItems.forEach((bank, bankIndex) => {
      if (!bank.matched) {
        const matchIndex = newInvoiceItems.findIndex(
          invoice => !invoice.matched && fuzzyMatch(bank, invoice)
        );

        if (matchIndex !== -1) {
          newBankItems[bankIndex] = { ...bank, matched: true };
          newInvoiceItems[matchIndex] = { ...newInvoiceItems[matchIndex], matched: true };
        }
      }
    });

    setBankItems(newBankItems);
    setInvoiceItems(newInvoiceItems);
  };

  const TransactionTable: React.FC<{ transactions: Transaction[]; title: string }> = ({ transactions, title }) => (
    <div className="flex-1">
      <h4 className="text-lg font-medium text-gray-900 mb-4">{title}</h4>
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
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className={transaction.matched ? 'bg-green-50' : ''}>
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
                  {transaction.matched ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Matched
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
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
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Bank Reconciliation
          </h3>
          <button
            onClick={findMatches}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Find Matches
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TransactionTable transactions={bankItems} title="Bank Transactions" />
          <TransactionTable transactions={invoiceItems} title="Invoices/Receipts" />
        </div>
      </div>
    </div>
  );
}; 