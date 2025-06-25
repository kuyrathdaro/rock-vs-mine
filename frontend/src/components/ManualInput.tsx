import type React from "react";
import { useState } from "react";
import { TextField, Button } from "@mui/material";

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
                    style: { fontSize: "1.1rem", padding: "20px", color: "white" }
                }}
            />
            <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
                Predict
            </Button>
        </form>
    )
}

export default ManualInput;