// Shared TypeScript types for the Rock vs Mine application

export interface PredictionResult {
    features?: string;
    prediction: string;
}

export interface PredictionHistory {
    id: string;
    timestamp: number;
    inputType: "manual" | "csv";
    inputData: string; // For manual: the 60 values. For CSV: file name
    predictions: PredictionResult[];
    fileName?: string; // Optional, for CSV uploads
}
