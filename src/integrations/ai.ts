export interface AIAnalysisResult {
  vendor: string;
  total: number;
  date: string;
  items: Array<{
    name: string;
    price: number;
    quantity?: number;
  }>;
}

export const analyzeReceipt = async (text: string): Promise<AIAnalysisResult | null> => {
  try {
    // Debug logging
    console.log('Environment variables:', import.meta.env);
    console.log('API Key:', import.meta.env.VITE_OPENAI_API_KEY);
    
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      console.error('OpenAI API key is not set in environment variables');
      return null;
    }

    // Debug logging for the request
    console.log('Making request with API key:', apiKey.substring(0, 4) + '...');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a receipt analysis assistant. Extract the following information from the receipt text:
              - vendor name (store/company name)
              - total amount (final total including tax)
              - date (transaction date)
              - list of items with their prices and quantities
              
              Format the response as JSON with the following structure:
              {
                "vendor": "store name",
                "total": number,
                "date": "YYYY-MM-DD",
                "items": [
                  {
                    "name": "item name",
                    "price": number,
                    "quantity": number (optional)
                  }
                ]
              }`
          },
          {
            role: "user",
            content: text
          }
        ],
        temperature: 0.3,
        max_tokens: 500
      })
    });

    const data = await response.json();
    const analysis = JSON.parse(data.choices[0].message.content);
    return analysis;
  } catch (error) {
    console.error('Error analyzing text with AI:', error);
    return null;
  }
}; 