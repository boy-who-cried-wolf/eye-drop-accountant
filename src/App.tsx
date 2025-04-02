import { FileUploader } from './components/FileUploader';
import { TransactionList } from './components/TransactionList';
import { Reconciliation } from './components/Reconciliation';
import { Reports } from './components/Reports';
import Logo from './components/Logo';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <nav className="flex space-x-8">
              <a href="#" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
              <a href="#" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Reports</a>
              <a href="#" className="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Settings</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Eye-drop Accounting</h1>
            <p className="text-xl text-blue-100 mb-8">Upload your documents and let AI handle the rest</p>
            <FileUploader />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <TransactionList />
          <Reconciliation />
          <Reports />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">About</h3>
              <p className="mt-4 text-base text-gray-500">
                Eye-drop Accounting helps you automate your accounting tasks with AI-powered document processing.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Features</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">Document Processing</a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">AI Categorization</a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">Bank Reconciliation</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Contact</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">Support</a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">Terms of Service</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 text-center">
              &copy; {new Date().getFullYear()} Eye-drop Accounting. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
