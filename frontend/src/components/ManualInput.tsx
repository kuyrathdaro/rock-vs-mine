import type React from "react";
import { useState } from "react";
import { TextField, Button } from "@mui/material";


const ManualInput: React.FC = () => {
    const [inputText, setInputText] = useState("");

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                value={inputText}
                onChange={handleTextChange}
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary">
                Predict
            </Button>
        </form>
    )
}

export default ManualInput;