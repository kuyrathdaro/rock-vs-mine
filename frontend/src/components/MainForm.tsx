import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import Instruction from "./Instruction";
import ManualInput from "./ManualInput";
import UploadCSV from "./UploadCSV";

const MainForm: React.FC = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Tabs value={tabIndex} onChange={handleTabChange} centered
                sx={{
                    "& .MuiTab-root": {
                        color: "#fff",
                        transition: "color 0.2s",
                        "&:hover": {
                            color: "#90caf9", // Light blue on hover
                        },
                    },
                    "& .Mui-selected": {
                        color: "#90caf9", // Light blue for selected tab
                        fontWeight: "bold",
                    },
                    "& .MuiTabs-indicator": {
                        backgroundColor: "#90caf9", // Light blue indicator
                    },
                }}>
                <Tab label="Instructions" />
                <Tab label="Manual Input" />
                <Tab label="Upload CSV" />
            </Tabs>
            <Box sx={{
                p: 3,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}>
                {tabIndex === 0 && (
                    <Instruction />
                )}
                {tabIndex === 1 && (
                    <ManualInput />
                )}
                {tabIndex === 2 && (
                    <UploadCSV />
                )}
            </Box>
        </Box>
    );
};

export default MainForm;