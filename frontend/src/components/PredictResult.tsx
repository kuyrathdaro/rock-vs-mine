import React from "react";
import { Box, Typography } from "@mui/material";

const PredictResult: React.FC<{ result: string | null }> = ({ result }) => {
    return (
        <Box
            sx={{
                mt: 4,
                p: 3,
                borderRadius: 2,
                background: "rgba(16, 40, 80, 0.85)",
                color: "#fff",
                textAlign: "center",
                boxShadow: 3,
            }}
        >
            <Typography variant="h6">
                Prediction Result: {result}
            </Typography>
        </Box>
    );
};

export default PredictResult;
