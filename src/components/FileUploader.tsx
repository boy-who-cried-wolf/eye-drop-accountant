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
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Upload Invoices/Receipts
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Drop your files here or click to select files to upload.</p>
        </div>
        <div
          {...getRootProps()}
          className={`mt-4 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md
            ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
        >
          <div className="space-y-1 text-center">
            <input {...getInputProps()} />
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
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
            <div className="flex text-sm text-gray-600">
              <span>Upload a file or drag and drop</span>
            </div>
          </div>
        </div>
        {isProcessing && (
          <div className="mt-4 text-center text-sm text-gray-500">
            Processing your document...
          </div>
        )}
        {extractedData.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900">Extracted Data:</h4>
            <ul className="mt-2 divide-y divide-gray-200">
              {extractedData.map((data, index) => (
                <li key={index} className="py-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{data.vendor}</span>
                    <span className="text-gray-500">${data.amount.toFixed(2)}</span>
                    <span className="text-gray-500">{data.date}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}; 