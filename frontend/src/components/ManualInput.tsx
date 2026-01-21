import type React from "react";
import { useState } from "react";
import { TextField, Button, Box, Alert, Snackbar } from "@mui/material";
import { usePredictSonar } from "../hooks/usePredictSonarData";
import { useHistoryDb } from "../hooks/useHistoryDb";
import { z } from "zod";
import PredictResult from "./PredictResult";
import { useExplosion } from "../hooks/useExplosion";

const sonarSchema = z.string().refine((val) => {
    const values = val.split(",").map(v => v.trim()).filter(v => v !== "");
    return values.length === 60 && values.every(v => !isNaN(Number(v)));
}, {
    message: "Please enter exactly 60 comma-separated numbers for sonar data."
});

const ManualInput: React.FC = () => {
    const [inputText, setInputText] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { resetExplosion } = useExplosion();

    const { trigger, data, reset, error: swrError, isMutating } = usePredictSonar();
    const { saveToHistory } = useHistoryDb();

    const handleReset = () => {
        setInputText("");
        setError(null);
        resetExplosion();
        if (reset) reset();
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputText(e.target.value);
        setError(null);
    };

    const handleTextSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validation = sonarSchema.safeParse(inputText);
        if (!validation.success) {
            setError(validation.error.errors[0].message);
            return;
        }

        setError(null);
        try {
            const result = await trigger(inputText);
            // Save to history after successful prediction
            if (result?.data?.prediction) {
                await saveToHistory(
                    "manual",
                    inputText,
                    [{ features: inputText, prediction: result.data.prediction }]
                );
            }
        } catch (error) {
            setError("Prediction failed. Please try again.");
            console.error("Prediction error:", error);
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    };

    return (
        <>
            <Box
                sx={{
                    backdropFilter: "blur(8px)",
                    background: "rgba(255,255,255,0.10)",
                    border: "1px solid rgba(191,219,254,0.3)",
                    borderRadius: 3,
                    boxShadow: 6,
                    maxWidth: "600px",
                    width: "100%",
                    p: 4,
                    mx: "auto",
                    color: "#fff"
                }}
            >
                <form onSubmit={handleTextSubmit}>
                    <TextField
                        label="Sonar Data (comma-separated)"
                        variant="outlined"
                        fullWidth
                        multiline
                        minRows={10}
                        maxRows={16}
                        value={inputText}
                        onChange={handleTextChange}
                        margin="normal"
                        error={!!error}
                        helperText={error ? error : "Enter 60 comma-separated numbers (features)."}
                        slotProps={{
                            input: {
                                style: {
                                    backdropFilter: "blur(8px)",
                                    background: "rgba(16, 40, 80, 0.85)",
                                    fontSize: "1.1rem",
                                    padding: "20px",
                                    color: "#fff",
                                    borderRadius: 8,
                                    caretColor: "#90caf9",
                                    cursor: "text",
                                },
                            },
                            inputLabel: {
                                style: {
                                    color: "#fff",
                                }
                            }
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    border: "1px solid rgba(191,219,254,0.3)",
                                },
                                "&:hover fieldset": {
                                    border: "1px solid rgba(191,219,254,0.3)",
                                },
                                "&.Mui-focused fieldset": {
                                    border: "1px solid rgba(191,219,254,0.3)",
                                },
                            },
                            "& .MuiFormHelperText-root": {
                                color: error ? "#ff0000" : "#fff"
                            }
                        }}
                    />
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            sx={{ mt: 2 }}
                            disabled={isMutating}
                        >
                            {isMutating ? "Predicting..." : "Predict"}
                        </Button>
                        <Button
                            type="button"
                            variant="outlined"
                            color="inherit" // or "secondary" or "primary" as you prefer
                            size="large"
                            sx={{ mt: 2 }}
                            onClick={handleReset}
                        >
                            Reset
                        </Button>
                    </Box>
                </form>
            </Box>
            {data?.data?.prediction && <PredictResult result={data.data.prediction} />}
            {(error || swrError) && (
                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    open={!!error || !!swrError}
                    autoHideDuration={6000}
                    onClose={() => setError(null)}
                >
                    <Alert onClose={() => setError(null)} severity="error">
                        {error || swrError?.message}
                    </Alert>
                </Snackbar>
            )}
        </>
    )
}

export default ManualInput;