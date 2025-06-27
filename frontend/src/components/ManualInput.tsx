import type React from "react";
import { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { predictSonar } from "../services/sonarApi";
import { z } from "zod";

const sonarSchema = z.string().refine((val) => {
    const values = val.split(",").map(v => v.trim()).filter(v => v !== "");
    return values.length === 60 && values.every(v => !isNaN(Number(v)));
}, {
    message: "Please enter exactly 60 comma-separated numbers for sonar data."
});

const ManualInput: React.FC = () => {
    const [inputText, setInputText] = useState("");
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputText(e.target.value);
        setError(null);
        setResult(null);
    };

    const handleTextSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setResult(null);

        const validation = sonarSchema.safeParse(inputText);
        if (!validation.success) {
            setError(validation.error.errors[0].message);
            return;
        }

        setError(null);
        setLoading(true);
        try {
            const response = await predictSonar(inputText);
            setResult(response.prediction ? String(response.prediction) : JSON.stringify(response));
        } catch (error) {
            setError("Prediction failed. Please try again.");
            console.error("Prediction error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
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
                                background: "rgba(255,255,255,0.10)",
                                fontSize: "1.1rem",
                                padding: "20px",
                                color: "#fff",
                                borderRadius: 8,
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
                    }}
                />
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ mt: 2 }}
                        disabled={loading}
                    >
                        {loading ? "Predicting..." : "Predict"}
                    </Button>
                </Box>
            </form>
            {result && (
                <Box
                    sx={{
                        mt: 4,
                        p: 3,
                        borderRadius: 2,
                        background: "rgba(16, 40, 80, 0.85)",
                        color: "#fff",
                        textAlign: "center",
                        boxShadow: 3,
                    }}
                >
                    <Typography variant="h6">
                        Prediction Result: {result}
                    </Typography>
                </Box>
            )}
            {error && (
                <Alert severity="error" sx={{ mt: 3 }}>
                    {error}
                </Alert>
            )}
        </Box>
    )
}

export default ManualInput;