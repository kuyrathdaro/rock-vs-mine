import React, { useState } from "react";
import { Tabs, Tab, Box, Typography, Button, TextField } from "@mui/material";

const PredictForm: React.FC = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [inputText, setInputText] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleTextSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add predict logic for text input
        alert(`Predicting for input: ${inputText}`);
    };

    const handleFileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add predict logic for file upload
        if (file) {
            alert(`Predicting for file: ${file.name}`);
        }
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Tabs value={tabIndex} onChange={handleTabChange} centered centered
                sx={{
                    "& .MuiTab-root": {
                        color: "#fff",
                    },
                }}>
                <Tab label="Instructions" />
                <Tab label="Manual Input" />
                <Tab label="Upload CSV" />
            </Tabs>
            <Box sx={{
                p: 3,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}>
                {tabIndex === 0 && (
                    <Typography>
                        <b>Instructions:</b>
                        <ul>
                            <li>
                                <b>Input Text:</b> Enter comma-separated sonar data values in the text box and submit to predict if it is a rock or mine.
                            </li>
                            <li>
                                <b>Upload File:</b> Upload a CSV file containing sonar data (one row per sample) to predict in batch.
                            </li>
                        </ul>
                    </Typography>
                )}
                {tabIndex === 1 && (
                    <form onSubmit={handleTextSubmit}>
                        <TextField
                            label="Sonar Data (comma-separated)"
                            variant="outlined"
                            fullWidth
                            value={inputText}
                            onChange={handleTextChange}
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Predict
                        </Button>
                    </form>
                )}
                {tabIndex === 2 && (
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
                )}
            </Box>
        </Box>
    );
};

export default PredictForm;