// React hook for managing prediction history with IndexedDB

import { useState, useEffect, useCallback } from "react";
import type { PredictionHistory } from "../types";
import {
    initDB,
    savePrediction,
    getAllPredictions,
    deletePrediction,
    clearAllPredictions,
} from "../services/historyDb";

interface UseHistoryDbReturn {
    history: PredictionHistory[];
    loading: boolean;
    error: string | null;
    loadHistory: () => Promise<void>;
    saveToHistory: (
        inputType: "manual" | "csv",
        inputData: string,
        predictions: { features?: string; prediction: string }[],
        fileName?: string
    ) => Promise<PredictionHistory | null>;
    removeFromHistory: (id: string) => Promise<void>;
    clearHistory: () => Promise<void>;
}

export function useHistoryDb(): UseHistoryDbReturn {
    const [history, setHistory] = useState<PredictionHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadHistory = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            await initDB();
            const predictions = await getAllPredictions();
            setHistory(predictions);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load history");
        } finally {
            setLoading(false);
        }
    }, []);

    const saveToHistory = useCallback(async (
        inputType: "manual" | "csv",
        inputData: string,
        predictions: { features?: string; prediction: string }[],
        fileName?: string
    ): Promise<PredictionHistory | null> => {
        try {
            setError(null);
            const record = await savePrediction(inputType, inputData, predictions, fileName);
            // Prepend to history (newest first)
            setHistory((prev) => [record, ...prev]);
            return record;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to save prediction");
            return null;
        }
    }, []);

    const removeFromHistory = useCallback(async (id: string) => {
        try {
            setError(null);
            await deletePrediction(id);
            setHistory((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete prediction");
        }
    }, []);

    const clearHistory = useCallback(async () => {
        try {
            setError(null);
            await clearAllPredictions();
            setHistory([]);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to clear history");
        }
    }, []);

    // Auto-load on mount
    useEffect(() => {
        loadHistory();
    }, [loadHistory]);

    return {
        history,
        loading,
        error,
        loadHistory,
        saveToHistory,
        removeFromHistory,
        clearHistory,
    };
}
