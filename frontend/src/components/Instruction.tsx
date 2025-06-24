import React from 'react';
import { Typography } from '@mui/material';

const Instruction: React.FC = () => {
    return (
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
    )
}

export default Instruction;