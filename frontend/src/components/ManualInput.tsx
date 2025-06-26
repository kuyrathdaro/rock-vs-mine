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
                    slotProps={{
                        input: {
                            style: {
                                backdropFilter: "blur(8px)",
                                background: "rgba(255,255,255,0.10)",
                                border: "1px solid rgba(191,219,254,0.3)",
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
                    <Button type="submit" variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
                        Predict
                    </Button>
                </Box>
            </form>
        </Box>
    )
}

export default ManualInput;