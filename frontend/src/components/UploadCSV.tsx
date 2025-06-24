import type React from "react";
import { useState } from "react";
import { Button, Typography, Box } from "@mui/material";

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
        <form onSubmit={handleFileSubmit}>
            <Button variant="contained" component="label">
                Upload CSV
                <input
                    type="file"
                    accept=".csv"
                    hidden
                    onChange={handleFileChange}
                />
            </Button>
            {file && (
                <Typography sx={{ mt: 2 }}>Selected file: {file.name}</Typography>
            )}
            <Box sx={{ mt: 2 }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!file}
                >
                    Predict
                </Button>
            </Box>
        </form>
    )
}

export default UploadCSV;