import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { createWorker } from 'tesseract.js';

interface ExtractedData {
  vendor: string;
  amount: number;
  date: string;
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

      // Simple parsing logic - in real app, this would be more sophisticated
      const data: ExtractedData = {
        vendor: text.match(/(?:Company|Vendor):\s*([^\n]+)/i)?.[1] || 'Unknown',
        amount: parseFloat(text.match(/(?:Amount|Total):\s*\$?(\d+\.?\d*)/i)?.[1] || '0'),
        date: text.match(/(?:Date):\s*([^\n]+)/i)?.[1] || new Date().toISOString().split('T')[0],
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Vendor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {extractedData.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{data.vendor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">${data.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{data.date}</td>
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