import React from 'react';
import { Box, Typography } from '@mui/material';

const Instruction: React.FC = () => {
    return (
        <Box sx={{
            background: "rgba(10, 30, 80, 0.85)",
            borderRadius: 3,
            boxShadow: 6,
            p: 4,
            width: "100%",
            height: "100%",
            maxWidth: 600,
            mx: "auto", color: "#fff"
        }}>
            <Typography variant="h5" gutterBottom fontWeight="bold" color="white" textAlign="center">
                How to Use Rock vs Mine Sonar Predictor
            </Typography>
            <Typography variant="body1" color="white" gutterBottom>
                This app helps you predict whether sonar data corresponds to a rock or a mine. You can use it in two ways:
            </Typography>
            <ol style={{ paddingLeft: 20, marginBottom: 16 }}>
                <li style={{ marginBottom: 12 }}>
                    <b>Manual Input:</b>
                    <ul style={{ marginTop: 4 }}>
                        <li>Enter your sonar data as <b>comma-separated values</b> (e.g., <code>0.02,0.03,0.04,...</code>).</li>
                        <li>Make sure you enter all required features (usually 60 values per sample).</li>
                        <li>Click <b>Predict</b> to see if your data is classified as a rock or a mine.</li>
                    </ul>
                </li>
                <li>
                    <b>Upload CSV:</b>
                    <ul style={{ marginTop: 4 }}>
                        <li>Prepare a CSV file where each row is a sonar sample (comma-separated values, no header required).</li>
                        <li>Click <b>Upload CSV</b> and select your file.</li>
                        <li>Click <b>Predict</b> to get results for all samples in your file.</li>
                    </ul>
                </li>
            </ol>
            <Typography variant="body2">
                <b>Tip:</b> You can find example sonar data files online, or use your own measurements. Results are for educational purposes only.
            </Typography>
        </Box>
    );
};

export default Instruction;