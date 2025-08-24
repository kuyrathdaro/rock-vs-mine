import type React from "react";
import { useState } from "react";
import { Button, Typography, Box, Paper, Alert } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { usePredictSonarCSV } from "../hooks/usePredictSonarData";
import PredictionTable from "./PredictionTable";

const EXPECTED_COLUMNS: number = 60;

const UploadCSV: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    // SWR mutation for backend prediction
    const { trigger, data, isMutating } = usePredictSonarCSV();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        if (e.target.files && e.target.files.length > 0) {
            const selected = e.target.files[0];
            if (!selected.name.endsWith(".csv")) {
                setError("Please upload a .csv file.");
                setFile(null);
                return;
            }

            // Validate CSV content
            const reader = new FileReader();
            reader.onload = (event) => {
                const text = event.target?.result as string;
                const rows = text.trim().split(/\r?\n/);
                for (let i = 0; i < rows.length; i++) {
                    const cols = rows[i].split(",");
                    if (cols.length !== EXPECTED_COLUMNS) {
                        setError(`Row ${i + 1} does not have ${EXPECTED_COLUMNS} columns.`);
                        setFile(null);
                        return;
                    }
                    for (let j = 0; j < cols.length; j++) {
                        if (isNaN(Number(cols[j]))) {
                            setError(`Row ${i + 1}, column ${j + 1} is not a valid number.`);
                            setFile(null);
                            return;
                        }
                    }
                }
                setFile(selected);
            };
            reader.readAsText(selected);
        }
    };

    const handleFileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!file) {
            setError("No file selected.");
            return;
        }
        try {
            await trigger(file);
        } catch {
            setError("Prediction failed.");
        }
    };

    const predictions = Array.isArray(data?.data) ? data.data : [];

    return (
        <>
            <Paper
                elevation={6}
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
                <form onSubmit={handleFileSubmit}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<UploadFileIcon />}
                            sx={{ mb: 2, bgcolor: "#1976d2", color: "#fff", "&:hover": { bgcolor: "#1565c0" } }}
                        >
                            Upload CSV
                            <input
                                type="file"
                                accept=".csv"
                                hidden
                                onChange={handleFileChange}
                            />
                        </Button>
                        <Typography variant="body2" color="#bbdefb" sx={{ mb: 2, textAlign: "center" }}>
                            {file
                                ? <>Selected file: <b>{file.name}</b></>
                                : "Choose a CSV file with sonar data (one row per sample, no header required)."}
                        </Typography>
                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                        <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2 }} disabled={isMutating}>
                            {isMutating ? "Predicting..." : "Predict"}
                        </Button>
                    </Box>
                </form>
            </Paper>
            {predictions.length > 0 && (
                <PredictionTable data={predictions} />
            )}
        </>
    );
};

export default UploadCSV;