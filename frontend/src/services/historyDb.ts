// IndexedDB service for storing prediction history

import type { PredictionHistory } from "../types";

const DB_NAME = "rock-vs-mine-history";
const DB_VERSION = 1;
const STORE_NAME = "predictions";

let dbInstance: IDBDatabase | null = null;

/**
 * Initialize and get the IndexedDB database instance
 */
export const initDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        if (dbInstance) {
            resolve(dbInstance);
            return;
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => {
            reject(new Error("Failed to open IndexedDB"));
        };

        request.onsuccess = () => {
            dbInstance = request.result;
            resolve(dbInstance);
        };

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;

            // Create object store if it doesn't exist
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
                store.createIndex("timestamp", "timestamp", { unique: false });
                store.createIndex("inputType", "inputType", { unique: false });
            }
        };
    });
};

/**
 * Generate a unique ID for a prediction record
 */
const generateId = (): string => {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Save a prediction to history
 */
export const savePrediction = async (
    inputType: "manual" | "csv",
    inputData: string,
    predictions: { features?: string; prediction: string }[],
    fileName?: string
): Promise<PredictionHistory> => {
    const db = await initDB();

    const record: PredictionHistory = {
        id: generateId(),
        timestamp: Date.now(),
        inputType,
        inputData,
        predictions,
        fileName,
    };

    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.add(record);

        request.onsuccess = () => resolve(record);
        request.onerror = () => reject(new Error("Failed to save prediction"));
    });
};

/**
 * Get all predictions sorted by timestamp (newest first)
 */
export const getAllPredictions = async (): Promise<PredictionHistory[]> => {
    const db = await initDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const index = store.index("timestamp");
        const request = index.openCursor(null, "prev"); // Descending order

        const results: PredictionHistory[] = [];

        request.onsuccess = (event) => {
            const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
            if (cursor) {
                results.push(cursor.value);
                cursor.continue();
            } else {
                resolve(results);
            }
        };

        request.onerror = () => reject(new Error("Failed to fetch predictions"));
    });
};

/**
 * Delete a single prediction by ID
 */
export const deletePrediction = async (id: string): Promise<void> => {
    const db = await initDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(new Error("Failed to delete prediction"));
    });
};

/**
 * Clear all prediction history
 */
export const clearAllPredictions = async (): Promise<void> => {
    const db = await initDB();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.clear();

        request.onsuccess = () => resolve();
        request.onerror = () => reject(new Error("Failed to clear predictions"));
    });
};
