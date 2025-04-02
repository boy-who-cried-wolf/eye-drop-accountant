import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { createWorker } from 'tesseract.js';

interface ExtractedData {
  id: string;
  vendor: string;
  amount: number;
  date: string;
  file: File;
}

export const FileUploader: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData[]>([]);

  const processImage = async (file: File) => {
    setIsProcessing(true);
    try {
      const worker = await createWorker();
      await worker.reinitialize('eng');
      const { data: { text } } = await worker.recognize(file);
      await worker.terminate();

      console.log('Raw OCR text:', text);

      // Split into lines and clean up
      const lines = text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);

      console.log('Processed lines:', lines);

      // Find the vendor name (usually appears at the top of the receipt)
      let vendor = 'Unknown';
      const vendorCandidates = lines.slice(0, 5); // Look at first 5 lines
      for (const line of vendorCandidates) {
        // Look for common store names or patterns
        if (line.includes('TRADER') || line.includes('WALMART') || line.includes('TARGET') || 
            line.includes('COSTCO') || line.includes('AMAZON') || line.includes('STARBUCKS')) {
          vendor = line;
          break;
        }
      }

      // Find the total amount (usually at the bottom of the receipt)
      let amount = 0;
      const totalCandidates = lines.slice(-5); // Look at last 5 lines
      for (const line of totalCandidates) {
        // Look for lines containing currency amounts
        const matches = line.match(/\$(\d+\.\d{2})/);
        if (matches) {
          amount = parseFloat(matches[1]);
          break;
        }
      }

      // Find the date (usually near the bottom of the receipt)
      let date = new Date().toISOString().split('T')[0];
      const dateCandidates = lines.slice(-10); // Look at last 10 lines
      for (const line of dateCandidates) {
        // Look for common date formats
        const dateMatch = line.match(/(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/);
        if (dateMatch) {
          const parsedDate = new Date(dateMatch[1]);
          if (!isNaN(parsedDate.getTime())) {
            date = parsedDate.toISOString().split('T')[0];
            break;
          }
        }
      }

      console.log('Extracted data:', { vendor, amount, date });

      const data: ExtractedData = {
        id: Math.random().toString(36).substr(2, 9),
        vendor,
        amount,
        date,
        file,
      };

      setExtractedData(prev => [...prev, data]);
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        processImage(file);
      }
    });
  }, []);

  const handleDelete = (id: string) => {
    setExtractedData(prev => prev.filter(data => data.id !== id));
  };

  const handleRetry = async (data: ExtractedData) => {
    setExtractedData(prev => prev.filter(item => item.id !== data.id));
    await processImage(data.file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf']
    }
  });

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl p-6">
      <div
        {...getRootProps()}
        className={`relative rounded-lg border-2 border-dashed p-12 text-center
          ${isDragActive
            ? 'border-white bg-white/20'
            : 'border-white/50 hover:border-white/80'}`}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <div className="flex justify-center">
            <svg
              className="h-12 w-12 text-white"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-white">
            <p className="text-lg font-medium">
              {isDragActive
                ? 'Drop your files here'
                : 'Drag and drop your files here, or click to select files'}
            </p>
            <p className="mt-2 text-sm text-indigo-100">
              Supported formats: PDF, PNG, JPG, JPEG
            </p>
          </div>
        </div>
      </div>

      {isProcessing && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-white shadow rounded-md bg-white/10">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing your document...
          </div>
        </div>
      )}

      {extractedData.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-medium text-white mb-4">Extracted Data</h4>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-white/10">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-white/70 uppercase tracking-wider">Vendor</th>
                  <th className="px-6 py-3 text-xs font-medium text-white/70 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-xs font-medium text-white/70 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-xs font-medium text-white/70 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {extractedData.map((data) => (
                  <tr key={data.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{data.vendor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">${data.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{data.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRetry(data)}
                          className="p-1 hover:bg-white/10 rounded-full"
                          title="Retry OCR"
                        >
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(data.id)}
                          className="p-1 hover:bg-white/10 rounded-full"
                          title="Delete"
                        >
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}; 