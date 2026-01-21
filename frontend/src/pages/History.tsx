import React, { useState } from "react";
import {
    Box,
    Typography,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tooltip,
    Chip,
    CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import HistoryIcon from "@mui/icons-material/History";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import { useHistoryDb } from "../hooks/useHistoryDb";
import type { PredictionHistory } from "../types";

const History: React.FC = () => {
    const { history, loading, error, removeFromHistory, clearHistory } = useHistoryDb();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [clearDialogOpen, setClearDialogOpen] = useState(false);
    const [detailDialogOpen, setDetailDialogOpen] = useState(false);
    const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
    const [selectedRecord, setSelectedRecord] = useState<PredictionHistory | null>(null);

    const handleDeleteClick = (id: string) => {
        setPendingDeleteId(id);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (pendingDeleteId) {
            await removeFromHistory(pendingDeleteId);
        }
        setDeleteDialogOpen(false);
        setPendingDeleteId(null);
    };

    const handleClearAll = async () => {
        await clearHistory();
        setClearDialogOpen(false);
    };

    const handleViewDetails = (record: PredictionHistory) => {
        setSelectedRecord(record);
        setDetailDialogOpen(true);
    };

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const truncateText = (text: string, maxLength: number = 50) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + "...";
    };

    // Fix: Handle both direct prediction string and nested object structure
    const getPredictionValue = (pred: { prediction?: string } | string): string => {
        if (typeof pred === "string") return pred;
        return pred?.prediction || "";
    };

    // Convert R/M to Rock/Mine for display
    const formatPrediction = (value: string): string => {
        const v = value.trim().toUpperCase();
        if (v === "R") return "Rock";
        if (v === "M") return "Mine";
        return value;
    };

    const getResultSummary = (predictions: ({ prediction?: string } | string)[]) => {
        let rocks = 0;
        let mines = 0;

        for (const p of predictions) {
            const value = getPredictionValue(p).toLowerCase().trim();
            // Check for both short (R/M) and full (rock/mine) formats
            if (value === "r" || value.includes("rock")) rocks++;
            if (value === "m" || value.includes("mine")) mines++;
        }

        return { rocks, mines, total: predictions.length };
    };

    // Common scrollbar styles
    const scrollbarStyles = {
        "&::-webkit-scrollbar": { width: "8px", height: "8px" },
        "&::-webkit-scrollbar-track": { background: "rgba(10, 25, 50, 0.5)", borderRadius: "4px" },
        "&::-webkit-scrollbar-thumb": {
            background: "linear-gradient(180deg, #3a7bd5 0%, #1a4a8a 100%)",
            borderRadius: "4px",
            border: "1px solid rgba(144, 202, 249, 0.3)",
            "&:hover": { background: "linear-gradient(180deg, #5a9bf5 0%, #2a6aba 100%)" },
        },
        scrollbarWidth: "thin",
        scrollbarColor: "#3a7bd5 rgba(10, 25, 50, 0.5)",
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
                <CircularProgress sx={{ color: "#90caf9" }} />
            </Box>
        );
    }

    return (
        <Box sx={{ px: 3, py: 4, maxWidth: 1200, mx: "auto" }}>
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <HistoryIcon sx={{ fontSize: 40, color: "#7dd3fc" }} />
                    <Typography
                        variant="h4"
                        sx={{
                            color: "#7dd3fc",
                            fontWeight: 700,
                            textShadow: "0 0 20px rgba(125, 211, 252, 0.5)",
                        }}
                    >
                        Prediction History
                    </Typography>
                </Box>
                {history.length > 0 && (
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteSweepIcon />}
                        onClick={() => setClearDialogOpen(true)}
                        sx={{
                            borderColor: "rgba(239, 68, 68, 0.5)",
                            color: "#ef4444",
                            "&:hover": {
                                borderColor: "#ef4444",
                                background: "rgba(239, 68, 68, 0.1)",
                            },
                        }}
                    >
                        Clear All
                    </Button>
                )}
            </Box>

            {/* Error Alert */}
            {error && (
                <Box sx={{ mb: 3, p: 2, background: "rgba(239, 68, 68, 0.2)", borderRadius: 2, border: "1px solid #ef4444" }}>
                    <Typography color="error">{error}</Typography>
                </Box>
            )}

            {/* Empty State */}
            {history.length === 0 && !loading && (
                <Box
                    sx={{
                        textAlign: "center",
                        py: 10,
                        background: "linear-gradient(145deg, rgba(16, 40, 80, 0.5), rgba(10, 25, 50, 0.7))",
                        borderRadius: 3,
                        border: "1px solid rgba(144, 202, 249, 0.2)",
                    }}
                >
                    <HistoryIcon sx={{ fontSize: 80, color: "rgba(144, 202, 249, 0.3)", mb: 2 }} />
                    <Typography variant="h6" sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 1 }}>
                        No prediction history yet
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
                        Make some predictions and they will appear here
                    </Typography>
                </Box>
            )}

            {/* History Table */}
            {history.length > 0 && (
                <TableContainer
                    component={Paper}
                    sx={{
                        background: "linear-gradient(145deg, rgba(16, 40, 80, 0.95), rgba(10, 25, 50, 0.98))",
                        borderRadius: 2,
                        border: "1px solid rgba(144, 202, 249, 0.2)",
                        maxHeight: 600,
                        overflow: "auto",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                        ...scrollbarStyles,
                    }}
                >
                    <Table size="small" stickyHeader>
                        <TableHead>
                            <TableRow>
                                {["Date & Time", "Type", "Input", "Results", "Actions"].map((header, idx) => (
                                    <TableCell
                                        key={header}
                                        sx={{
                                            background: "linear-gradient(180deg, #1e4976 0%, #0d2a4a 50%, #071a30 100%)",
                                            color: "#7dd3fc",
                                            fontWeight: 700,
                                            fontSize: "0.8rem",
                                            textTransform: "uppercase",
                                            letterSpacing: "1.5px",
                                            borderBottom: "3px solid",
                                            borderImage: "linear-gradient(90deg, #3b82f6, #06b6d4, #3b82f6) 1",
                                            py: 2,
                                            px: 2,
                                            whiteSpace: "nowrap",
                                            textShadow: "0 0 10px rgba(125, 211, 252, 0.5)",
                                            textAlign: idx === 4 ? "center" : "left",
                                        }}
                                    >
                                        {header}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {history.map((item, rowIndex) => {
                                const summary = getResultSummary(item.predictions);
                                const rawPrediction = item.predictions.length === 1
                                    ? getPredictionValue(item.predictions[0])
                                    : null;
                                const singlePrediction = rawPrediction ? formatPrediction(rawPrediction) : null;
                                const isMine = rawPrediction ? (rawPrediction.toLowerCase().trim() === "m" || rawPrediction.toLowerCase().includes("mine")) : false;

                                return (
                                    <TableRow
                                        key={item.id}
                                        sx={{
                                            background: rowIndex % 2 === 0 ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.05)",
                                            "&:hover": { background: "rgba(144, 202, 249, 0.1)" },
                                            transition: "background 0.2s ease",
                                        }}
                                    >
                                        <TableCell sx={{ color: "#fff", py: 1.5, whiteSpace: "nowrap" }}>
                                            {formatDate(item.timestamp)}
                                        </TableCell>
                                        <TableCell sx={{ py: 1.5 }}>
                                            <Chip
                                                label={item.inputType === "csv" ? "CSV" : "Manual"}
                                                size="small"
                                                sx={{
                                                    bgcolor: item.inputType === "csv" ? "rgba(59, 130, 246, 0.3)" : "rgba(34, 197, 94, 0.3)",
                                                    color: item.inputType === "csv" ? "#60a5fa" : "#4ade80",
                                                    fontWeight: 600,
                                                    fontSize: "0.7rem",
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ color: "rgba(255, 255, 255, 0.8)", py: 1.5, maxWidth: 200 }}>
                                            <Tooltip title={item.inputData} arrow placement="top">
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontFamily: "'Roboto Mono', monospace",
                                                        fontSize: "0.75rem",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {truncateText(item.inputData, 40)}
                                                </Typography>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell sx={{ py: 1.5 }}>
                                            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                                                {singlePrediction ? (
                                                    <Chip
                                                        label={singlePrediction}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: isMine
                                                                ? "rgba(239, 68, 68, 0.3)"
                                                                : "rgba(34, 197, 94, 0.3)",
                                                            color: isMine
                                                                ? "#f87171"
                                                                : "#4ade80",
                                                            fontWeight: 600,
                                                        }}
                                                    />
                                                ) : (
                                                    <>
                                                        <Chip
                                                            label={`${summary.rocks} Rock`}
                                                            size="small"
                                                            sx={{ bgcolor: "rgba(34, 197, 94, 0.3)", color: "#4ade80", fontWeight: 600, fontSize: "0.7rem" }}
                                                        />
                                                        <Chip
                                                            label={`${summary.mines} Mine`}
                                                            size="small"
                                                            sx={{ bgcolor: "rgba(239, 68, 68, 0.3)", color: "#f87171", fontWeight: 600, fontSize: "0.7rem" }}
                                                        />
                                                    </>
                                                )}
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ py: 1.5, textAlign: "center" }}>
                                            <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center" }}>
                                                <Tooltip title="View Details" arrow>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleViewDetails(item)}
                                                        sx={{
                                                            color: "rgba(125, 211, 252, 0.7)",
                                                            "&:hover": { color: "#7dd3fc", background: "rgba(125, 211, 252, 0.1)" },
                                                        }}
                                                    >
                                                        <VisibilityIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete" arrow>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleDeleteClick(item.id)}
                                                        sx={{
                                                            color: "rgba(239, 68, 68, 0.7)",
                                                            "&:hover": { color: "#ef4444", background: "rgba(239, 68, 68, 0.1)" },
                                                        }}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* View Details Dialog */}
            <Dialog
                open={detailDialogOpen}
                onClose={() => setDetailDialogOpen(false)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        background: "linear-gradient(145deg, #1e3a5f, #0d1f36)",
                        border: "1px solid rgba(144, 202, 249, 0.3)",
                        maxHeight: "80vh",
                    },
                }}
            >
                <DialogTitle sx={{ color: "#7dd3fc", borderBottom: "1px solid rgba(144, 202, 249, 0.2)", pr: 6 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <VisibilityIcon />
                        Prediction Details
                    </Box>
                    <IconButton
                        onClick={() => setDetailDialogOpen(false)}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: "rgba(255, 255, 255, 0.7)",
                            "&:hover": { color: "#fff", background: "rgba(255, 255, 255, 0.1)" },
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ mt: 2 }}>
                    {selectedRecord && (
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                            {/* Meta Info */}
                            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                                <Box>
                                    <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.5)" }}>Date & Time</Typography>
                                    <Typography sx={{ color: "#fff" }}>{formatDate(selectedRecord.timestamp)}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.5)" }}>Type</Typography>
                                    <Box>
                                        <Chip
                                            label={selectedRecord.inputType === "csv" ? "CSV Upload" : "Manual Input"}
                                            size="small"
                                            sx={{
                                                bgcolor: selectedRecord.inputType === "csv" ? "rgba(59, 130, 246, 0.3)" : "rgba(34, 197, 94, 0.3)",
                                                color: selectedRecord.inputType === "csv" ? "#60a5fa" : "#4ade80",
                                                fontWeight: 600,
                                            }}
                                        />
                                    </Box>
                                </Box>
                                {selectedRecord.fileName && (
                                    <Box>
                                        <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.5)" }}>File Name</Typography>
                                        <Typography sx={{ color: "#fff" }}>{selectedRecord.fileName}</Typography>
                                    </Box>
                                )}
                            </Box>

                            {/* Summary */}
                            {selectedRecord.predictions.length > 1 && (
                                <Box>
                                    <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.5)", mb: 1, display: "block" }}>Summary</Typography>
                                    <Box sx={{ display: "flex", gap: 2 }}>
                                        {(() => {
                                            const summary = getResultSummary(selectedRecord.predictions);
                                            return (
                                                <>
                                                    <Chip
                                                        label={`${summary.rocks} Rock`}
                                                        sx={{ bgcolor: "rgba(34, 197, 94, 0.3)", color: "#4ade80", fontWeight: 600 }}
                                                    />
                                                    <Chip
                                                        label={`${summary.mines} Mine`}
                                                        sx={{ bgcolor: "rgba(239, 68, 68, 0.3)", color: "#f87171", fontWeight: 600 }}
                                                    />
                                                    <Chip
                                                        label={`${summary.total} Total`}
                                                        sx={{ bgcolor: "rgba(144, 202, 249, 0.2)", color: "#90caf9", fontWeight: 600 }}
                                                    />
                                                </>
                                            );
                                        })()}
                                    </Box>
                                </Box>
                            )}

                            {/* Predictions Table */}
                            <Box>
                                <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.5)", mb: 1, display: "block" }}>
                                    Predictions ({selectedRecord.predictions.length})
                                </Typography>
                                <TableContainer
                                    sx={{
                                        maxHeight: 300,
                                        background: "rgba(0, 0, 0, 0.2)",
                                        borderRadius: 1,
                                        ...scrollbarStyles,
                                    }}
                                >
                                    <Table size="small" stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ background: "#1e3a5f", color: "#7dd3fc", fontWeight: 600 }}>#</TableCell>
                                                <TableCell sx={{ background: "#1e3a5f", color: "#7dd3fc", fontWeight: 600 }}>Features</TableCell>
                                                <TableCell sx={{ background: "#1e3a5f", color: "#7dd3fc", fontWeight: 600 }}>Prediction</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {selectedRecord.predictions.map((pred, idx) => {
                                                const predValue = getPredictionValue(pred);
                                                const displayValue = formatPrediction(predValue);
                                                const predIsMine = predValue.toLowerCase().trim() === "m" || predValue.toLowerCase().includes("mine");
                                                const features = typeof pred === "object" && pred.features
                                                    ? pred.features
                                                    : selectedRecord.inputData;
                                                const truncatedFeatures = features.length > 60
                                                    ? features.substring(0, 60) + "..."
                                                    : features;

                                                return (
                                                    <TableRow key={idx}>
                                                        <TableCell sx={{ color: "rgba(255, 255, 255, 0.6)" }}>{idx + 1}</TableCell>
                                                        <TableCell>
                                                            <Tooltip title={features} arrow>
                                                                <Typography
                                                                    variant="body2"
                                                                    sx={{
                                                                        color: "rgba(255, 255, 255, 0.8)",
                                                                        fontFamily: "'Roboto Mono', monospace",
                                                                        fontSize: "0.7rem",
                                                                    }}
                                                                >
                                                                    {truncatedFeatures}
                                                                </Typography>
                                                            </Tooltip>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Chip
                                                                label={displayValue}
                                                                size="small"
                                                                sx={{
                                                                    bgcolor: predIsMine
                                                                        ? "rgba(239, 68, 68, 0.3)"
                                                                        : "rgba(34, 197, 94, 0.3)",
                                                                    color: predIsMine
                                                                        ? "#f87171"
                                                                        : "#4ade80",
                                                                    fontWeight: 600,
                                                                }}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box>
                    )}
                </DialogContent>

            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                PaperProps={{
                    sx: {
                        background: "linear-gradient(145deg, #1e3a5f, #0d1f36)",
                        border: "1px solid rgba(144, 202, 249, 0.3)",
                    },
                }}
            >
                <DialogTitle sx={{ color: "#7dd3fc" }}>Delete Prediction</DialogTitle>
                <DialogContent>
                    <Typography sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
                        Are you sure you want to delete this prediction from history?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Clear All Confirmation Dialog */}
            <Dialog
                open={clearDialogOpen}
                onClose={() => setClearDialogOpen(false)}
                PaperProps={{
                    sx: {
                        background: "linear-gradient(145deg, #1e3a5f, #0d1f36)",
                        border: "1px solid rgba(144, 202, 249, 0.3)",
                    },
                }}
            >
                <DialogTitle sx={{ color: "#7dd3fc" }}>Clear All History</DialogTitle>
                <DialogContent>
                    <Typography sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
                        Are you sure you want to delete all prediction history? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setClearDialogOpen(false)} sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                        Cancel
                    </Button>
                    <Button onClick={handleClearAll} color="error" variant="contained">
                        Clear All
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default History;
