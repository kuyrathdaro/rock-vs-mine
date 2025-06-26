import type React from "react";
import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const ManualInput: React.FC = () => {
    const [inputText, setInputText] = useState("");

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputText(e.target.value);
    };
    const handleTextSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Predicting for input: ${inputText}`);
    };
    return (
        <Box
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
                    InputProps={{
                        style: {
                            fontSize: "1.1rem",
                            padding: "20px",
                            color: "#fff",
                            background: "rgba(20, 40, 100, 0.95)",
                            borderRadius: 8,
                        }
                    }}
                    InputLabelProps={{
                        style: { color: "#bbdefb" }
                    }}
                />
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
                        Predict
                    </Button>
                </Box>
            </form>
        </Box>
    )
}

export default ManualInput;