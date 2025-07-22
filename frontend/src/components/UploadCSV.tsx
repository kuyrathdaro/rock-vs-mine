import type React from "react";
import { useState } from "react";
import { Button, Typography, Box, Paper, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { usePredictSonarCSV } from "../hooks/usePredictSonarData";

const EXPECTED_COLUMNS = 60;

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
            setFile(selected);
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

    // Assume backend returns: { predictions: ["Mine", "Rock", ...] }
    const predictions: string[] = data?.predictions || [];

    return (
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
            {predictions.length > 0 && (
                <TableContainer component={Paper} sx={{ mt: 4, background: "rgba(16,40,80,0.85)" }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: "#90caf9" }}>#</TableCell>
                                <TableCell sx={{ color: "#90caf9" }}>Prediction</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {predictions.map((pred, idx) => (
                                <TableRow key={idx}>
                                    <TableCell sx={{ color: "#fff" }}>{idx + 1}</TableCell>
                                    <TableCell sx={{ color: pred.toLowerCase().includes("mine") ? "#ff5252" : "#90ee90", fontWeight: "bold" }}>
                                        {pred}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Paper>
    );
};

export default UploadCSV;