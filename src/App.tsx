import React from 'react';
import { FileUploader } from './components/FileUploader';
import { TransactionList } from './components/TransactionList';
import { Reconciliation } from './components/Reconciliation';
import { Reports } from './components/Reports';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            AI Accounting Assistant
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 gap-6">
            <FileUploader />
            <TransactionList />
            <Reconciliation />
            <Reports />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
