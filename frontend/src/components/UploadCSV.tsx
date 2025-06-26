import type React from "react";
import { useState } from "react";
import { Button, Typography, Box, Paper } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const UploadCSV: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleFileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (file) {
            alert(`Predicting for file: ${file.name}`);
        }
    };

    return (
        <Paper
            elevation={6}
            sx={{
                background: "rgba(10, 30, 80, 0.85)",
                borderRadius: 3,
                boxShadow: 6,
                p: 4,
                width: "100%",
                height: "100%",
                maxWidth: 600,
                mx: "auto",
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
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!file}
                        size="large"
                        sx={{ width: 180 }}
                    >
                        Predict
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default UploadCSV;