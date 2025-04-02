import { createWorker } from 'tesseract.js';

export interface OCRResult {
  text: string;
}

export const performOCR = async (file: File): Promise<OCRResult> => {
  const worker = await createWorker();
  try {
    await worker.reinitialize('eng');
    const { data: { text } } = await worker.recognize(file);
    return { text };
  } finally {
    await worker.terminate();
  }
}; 