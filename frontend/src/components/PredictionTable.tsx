import React from "react";
import { Table, TableContainer, TableHead, TableCell, Paper, TableBody, TableRow } from "@mui/material";
import PredictionChip from "./PredictionChip";

interface PredictionRow {
    [key: string]: string | number;
    prediction: string;
}

interface PredictionTableProps {
    data: PredictionRow[];
}

const PredictionTable: React.FC<PredictionTableProps> = ({ data }) => {
    if (!data || data.length === 0) return null;
    return (
        <TableContainer component={Paper} sx={{
            mt: 4,
            background: "rgba(16, 40, 80, 0.85)"
        }}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: "#90caf9" }}>#</TableCell>
                        <TableCell sx={{ color: "#90caf9" }}>Features</TableCell>
                        <TableCell sx={{ color: "#90caf9" }}>Prediction</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, idx) => (
                        <TableRow key={idx}>
                            <TableCell sx={{ color: "#fff" }}>{idx + 1}</TableCell>
                            <TableCell
                                sx={{
                                    color: "#fff",
                                    wordBreak: "break-word",
                                    maxWidth: 250,
                                    whiteSpace: "pre-line",
                                }}
                            >
                                {row.features}
                            </TableCell>
                            <TableCell
                                sx={{
                                    color: row.prediction.toLowerCase().includes("mine")
                                        ? "#ff5252"
                                        : "#90ee90",
                                    fontWeight: "bold",
                                }}
                            >
                                <PredictionChip data={row.prediction} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default PredictionTable;