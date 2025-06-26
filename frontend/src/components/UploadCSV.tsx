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
                    <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
                        Predict
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default UploadCSV;