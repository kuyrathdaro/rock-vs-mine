import React, { useRef, useState, useEffect, useMemo } from "react";
import {
    Table,
    TableContainer,
    TableHead,
    TableCell,
    Paper,
    TableBody,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import PredictionChip from "./PredictionChip";
import {
    useReactTable,
    getCoreRowModel,
    createColumnHelper,
    flexRender,
} from "@tanstack/react-table";

interface PredictionRow {
    features?: string;
    prediction: string;
}

interface PredictionTableProps {
    data: PredictionRow[];
}

const columnHelper = createColumnHelper<PredictionRow>();

// Truncate features to show first N values
const truncateFeatures = (features: string | undefined, maxValues: number = 5): string => {
    if (!features) return "";
    const values = features.split(",").map((v) => v.trim());
    if (values.length <= maxValues) return features;
    return values.slice(0, maxValues).join(", ") + ` ... (+${values.length - maxValues} more)`;
};

const columns = [
    columnHelper.display({
        id: "index",
        header: "#",
        cell: (info) => info.row.index + 1,
    }),
    columnHelper.accessor("features", {
        header: "Features (Sonar Values)",
        cell: (info) => truncateFeatures(info.getValue()),
    }),
    columnHelper.accessor("prediction", {
        header: "Prediction",
        cell: (info) => info.getValue(),
    }),
];

const PAGE_SIZE = 10;

const PredictionTable: React.FC<PredictionTableProps> = ({ data }) => {
    const [loadedPages, setLoadedPages] = useState(1);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const loadingRef = useRef(false);

    useEffect(() => {
        setLoadedPages(1);
    }, [data]);

    const visibleData = useMemo(() => {
        if (!data) return [];
        return data.slice(0, loadedPages * PAGE_SIZE);
    }, [data, loadedPages]);

    const table = useReactTable({
        data: visibleData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const t = e.currentTarget;
        if (t.scrollHeight - t.scrollTop <= t.clientHeight + 50) {
            if (loadingRef.current) return;
            if (!data) return;
            if (visibleData.length >= data.length) return;
            loadingRef.current = true;
            setLoadedPages((p) => p + 1);
            setTimeout(() => (loadingRef.current = false), 200);
        }
    };

    if (!data || data.length === 0) return null;

    return (
        <TableContainer
            component={Paper}
            ref={containerRef}
            onScroll={onScroll}
            sx={{
                mt: 4,
                background: "linear-gradient(145deg, rgba(16, 40, 80, 0.95), rgba(10, 25, 50, 0.98))",
                borderRadius: 2,
                border: "1px solid rgba(144, 202, 249, 0.2)",
                maxHeight: 450,
                overflow: "auto",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                // Custom scrollbar styling
                "&::-webkit-scrollbar": {
                    width: "8px",
                    height: "8px",
                },
                "&::-webkit-scrollbar-track": {
                    background: "rgba(10, 25, 50, 0.5)",
                    borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb": {
                    background: "linear-gradient(180deg, #3a7bd5 0%, #1a4a8a 100%)",
                    borderRadius: "4px",
                    border: "1px solid rgba(144, 202, 249, 0.3)",
                    "&:hover": {
                        background: "linear-gradient(180deg, #5a9bf5 0%, #2a6aba 100%)",
                        boxShadow: "0 0 8px rgba(90, 155, 245, 0.5)",
                    },
                },
                "&::-webkit-scrollbar-corner": {
                    background: "rgba(10, 25, 50, 0.5)",
                },
                // Firefox scrollbar
                scrollbarWidth: "thin",
                scrollbarColor: "#3a7bd5 rgba(10, 25, 50, 0.5)",
            }}
        >
            <Table size="small" stickyHeader>
                <TableHead>
                    {table.getHeaderGroups().map((hg) => (
                        <TableRow key={hg.id}>
                            {hg.headers.map((header, headerIndex) => (
                                <TableCell
                                    key={header.id}
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
                                        position: "relative",
                                        textShadow: "0 0 10px rgba(125, 211, 252, 0.5), 0 0 20px rgba(125, 211, 252, 0.3)",
                                        "&::before": headerIndex === 0 ? {} : {
                                            content: '""',
                                            position: "absolute",
                                            left: 0,
                                            top: "25%",
                                            height: "50%",
                                            width: "1px",
                                            background: "linear-gradient(180deg, transparent, rgba(125, 211, 252, 0.4), transparent)",
                                        },
                                    }}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {table.getRowModel().rows.map((row, rowIndex) => (
                        <TableRow
                            key={row.id}
                            sx={{
                                background: rowIndex % 2 === 0
                                    ? "rgba(255, 255, 255, 0.02)"
                                    : "rgba(255, 255, 255, 0.05)",
                                "&:hover": {
                                    background: "rgba(144, 202, 249, 0.1)",
                                },
                                transition: "background 0.2s ease",
                            }}
                        >
                            {row.getVisibleCells().map((cell) => {
                                const isPredictionCol = cell.column.id === "prediction";
                                const isIndexCol = cell.column.id === "index";
                                const isFeaturesCol = cell.column.id === "features";
                                const cellValue = String(cell.getValue() ?? "");
                                const originalFeatures = row.original.features ?? "";

                                const cellContent = (
                                    <TableCell
                                        key={cell.id}
                                        sx={{
                                            color: isIndexCol ? "rgba(255, 255, 255, 0.6)" : "#fff",
                                            fontWeight: isPredictionCol ? "bold" : "normal",
                                            fontFamily: isFeaturesCol ? "'Roboto Mono', monospace" : undefined,
                                            fontSize: isFeaturesCol ? "0.75rem" : "0.875rem",
                                            py: 1.25,
                                            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                                            width: isIndexCol ? 50 : isPredictionCol ? 120 : "auto",
                                            textAlign: isIndexCol ? "center" : "left",
                                        }}
                                    >
                                        {isPredictionCol ? (
                                            <PredictionChip data={cellValue} />
                                        ) : (
                                            flexRender(cell.column.columnDef.cell, cell.getContext())
                                        )}
                                    </TableCell>
                                );

                                // Wrap features cell in tooltip to show full data
                                if (isFeaturesCol && originalFeatures.split(",").length > 5) {
                                    return (
                                        <Tooltip
                                            key={cell.id}
                                            title={
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        fontFamily: "'Roboto Mono', monospace",
                                                        fontSize: "0.7rem",
                                                        display: "block",
                                                        maxWidth: 400,
                                                        wordBreak: "break-all",
                                                    }}
                                                >
                                                    {originalFeatures}
                                                </Typography>
                                            }
                                            arrow
                                            placement="top-start"
                                        >
                                            {cellContent}
                                        </Tooltip>
                                    );
                                }

                                return cellContent;
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {visibleData.length < data.length && (
                <Typography
                    variant="caption"
                    sx={{
                        display: "block",
                        textAlign: "center",
                        py: 1.5,
                        color: "rgba(144, 202, 249, 0.7)",
                        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                >
                    Scroll to load more... ({visibleData.length} of {data.length})
                </Typography>
            )}
        </TableContainer>
    );
};

export default PredictionTable;