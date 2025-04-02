# **Project Requirement Document: AI Accounting MVP (Frontend-Only Proof of Concept)**  
**Objective**: Demonstrate the feasibility of AI-powered accounting automation using a lightweight React + TypeScript app.  

---

## **1. Core Features (MVP Scope)**  
### **A. Invoice/Receipt Data Extraction**  
- **Requirement**: User uploads invoices/receipts (PDF/JPEG/PNG) via drag-and-drop.  
- **AI Tech**:  
  - Option 1: **Tesseract.js** (client-side OCR, free but low accuracy).  
  - Option 2: **Google Vision AI/AWS Textract** (direct API call from frontend, limited free tier).  
- **Output**: Extracted text displayed in a table (vendor, amount, date).  

### **B. Expense Categorization Demo**  
- **Requirement**: Auto-categorize hardcoded example transactions (e.g., "Starbucks" → "Meals").  
- **AI Tech**: Direct call to **OpenAI API** (GPT-3.5-turbo) from frontend with pre-written prompts.  
- **Output**: Labeled transactions with confidence indicators.  

### **C. Bank Reconciliation Mockup**  
- **Requirement**: Simulate bank transaction matching using static JSON/CSV data.  
- **Logic**: Simple fuzzy matching (e.g., amount + date within 2 days).  
- **Output**: Side-by-side view of "bank transactions" vs. "invoices" with matches highlighted.  

### **D. Report Preview**  
- **Requirement**: Generate a placeholder Profit & Loss statement from mock data.  
- **Tech**: **Chart.js** or D3.js for basic graphs.  

---

## **2. Technical Specifications**  
### **Frontend**  
- **Framework**: React + TypeScript (Tailwindcss).  
- **Key Libraries**:  
  - `react-dropzone` (file uploads).  
  - `tesseract.js` (OCR) or `axios` (for Google Vision API calls).  
  - `openai` (direct API calls for categorization).  
  - `chart.js` (visualizations).  
- **State Management**: `useState` + `context` (no Redux).  
- **Data Persistence**: `localStorage` (optional, for demo continuity).  

### **AI Integrations**  
| Feature         | API/Method                          | Mock Alternative              |  
|-----------------|-------------------------------------|-------------------------------|  
| Invoice OCR     | Tesseract.js / Google Vision       | Pre-defined JSON response     |  
| Categorization  | OpenAI API (`gpt-3.5-turbo`)       | Hardcoded category mappings   |  
| Reconciliation  | Static JSON matching               | N/A (pure frontend logic)     |  

### **UI Components**  
1. **File Upload Zone** (drag-and-drop with "processing" animation).  
2. **Extracted Data Table** (editable fields for corrections).  
3. **Categorization Panel** ("Run AI" button + results).  
4. **Reconciliation View** (bank vs. invoices side-by-side).  
5. **Report Preview** (placeholder charts).  

---

## **3. Mock Data & Fake AI**  
- **Sample Transactions** (stored in `src/data/transactions.json`):  
  ```json
  [
    { "id": 1, "description": "Starbucks", "amount": 5.75, "date": "2024-03-01" },
    { "id": 2, "description": "AWS Invoice", "amount": 100.00, "date": "2024-03-02" }
  ]
  ```  
- **Fake "AI" Workflow**:  
  - On "Categorize" button click, call OpenAI API with:  
    ```ts
    const prompt = `Categorize "${description}" as: Travel, Meals, Office, Other. Respond ONLY with the category.`;  
    ```  
  - For demos without API keys, use hardcoded responses.  

---

## **4. Success Metrics**  
- **Demo Usability**:  
  - Users can upload a receipt → see extracted data in <10 seconds.  
  - AI categorization accuracy >70% on sample data.  
- **Performance**:  
  - OCR processes 1-page invoice in <5s (Tesseract.js).  
  - OpenAI response time <3s.  

---

## **5. Limitations & Workarounds**  
| Limitation               | Workaround                          |  
|--------------------------|-------------------------------------|  
| No real database         | Use `localStorage` or session data. |  
| OpenAI API costs         | Free tier (3.5-turbo = $0.002/1K tokens). |  
| Exposed API keys         | Use `.env`; warn users in demo.     |  
| No multi-user support    | Single-user focus for MVP.          |  

---

## **6. Roadmap (If MVP Succeeds)**  
1. Add a Node.js backend for secure API calls.  
2. Integrate Plaid for real bank data.  
3. User accounts + PostgreSQL database.  

---

### **Approval**  
☑️ **Approved by** (Your Name)  
📅 **Date**: (Today’s Date)  

--- 