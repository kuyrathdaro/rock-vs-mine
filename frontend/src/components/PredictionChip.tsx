import React from "react";
import { Chip } from "@mui/material";

interface PredictionChipProps {
    data: string;
}

const PredictionChip: React.FC<PredictionChipProps> = ({ data }) => {
    const normalized = data.toLowerCase();
    if (normalized.includes("mine") || normalized === "m") {
        return (
            <Chip
                label="Mine"
                color="error"
                sx={{
                    bgcolor: "#ff5252",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "0.95rem",
                    boxShadow: "0 0 8px #ff5252",
                    px: 2,
                }}
            />
        );
    }
    if (normalized.includes("rock") || normalized === "r") {
        return (
            <Chip
                label="Rock"
                color="success"
                sx={{
                    bgcolor: "#90ee90",
                    color: "#222",
                    fontWeight: "bold",
                    fontSize: "0.95rem",
                    boxShadow: "0 0 8px #90ee90",
                    px: 2,
                }}
            />
        );
    }
    return (
        <Chip
            label={data}
            sx={{
                bgcolor: "#64748b",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "0.95rem",
                px: 2,
            }}
        />
    );
}

export default PredictionChip;