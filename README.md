# AI Accounting Assistant

A frontend-only proof of concept for AI-powered accounting automation using React, TypeScript, and various AI services.

## Features

- 📄 **Invoice/Receipt Data Extraction**: Upload and extract data from documents using Tesseract.js
- 🤖 **AI-Powered Categorization**: Automatically categorize transactions using OpenAI's GPT-3.5
- 🔄 **Bank Reconciliation**: Match bank transactions with invoices using fuzzy matching
- 📊 **Financial Reports**: View financial data with interactive charts and metrics

## Prerequisites

- Node.js (v18.0.0 or higher recommended)
- OpenAI API Key (for transaction categorization)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-accounting-assistant.git
   cd ai-accounting-assistant
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```env
   VITE_OPENAI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Usage

### Document Upload
- Drag and drop invoices/receipts onto the upload zone
- Supported formats: PNG, JPEG, PDF
- OCR processing will extract vendor, amount, and date

### Transaction Categorization
- Click "Categorize" on individual transactions or use "Categorize All"
- AI will automatically assign categories: Travel, Meals, Office, Other
- Results appear instantly in the transaction list

### Bank Reconciliation
- View bank transactions and invoices side by side
- Click "Find Matches" to automatically pair transactions
- Matching uses amount and date (within 2 days) criteria

### Reports
- View income vs expenses over time
- See expense breakdown by category
- Check key metrics and summaries

## Technical Stack

- **Frontend Framework**: React + TypeScript
- **Styling**: Tailwind CSS
- **OCR Engine**: Tesseract.js
- **AI Integration**: OpenAI GPT-3.5
- **Charts**: Chart.js + react-chartjs-2
- **File Handling**: react-dropzone

## Development

- Built with Vite for fast development
- Uses modern React practices (hooks, functional components)
- Implements responsive design for all screen sizes

## Limitations

- Frontend-only demo (no data persistence)
- Uses client-side OCR (limited accuracy)
- Requires API key exposure (not production-ready)
- Limited to single-user demonstration

## Next Steps

1. Add backend for secure API handling
2. Integrate real banking APIs (e.g., Plaid)
3. Implement proper user authentication
4. Add database for transaction storage
5. Enhance OCR accuracy with cloud services

## License

MIT
