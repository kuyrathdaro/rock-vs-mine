import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import MineSVG from "../assets/mine.svg";
import RockSVG from "../assets/rock.svg";
import { useExplosion } from "../hooks/useExplosion";

const PredictResult: React.FC<{ result: string | null }> = ({ result }) => {
    const { setExplode } = useExplosion();
    const isMine = result?.toUpperCase().includes("M");
    const isRock = result?.toUpperCase().includes("R");

    useEffect(() => {
        setExplode(!!isMine);
        // Optionally reset after 1.2s so the explosion can replay
        if (isMine) {
            const timeout = setTimeout(() => setExplode(false), 1200);
            return () => clearTimeout(timeout);
        }
    }, [isMine, setExplode]);


    return (
        <Box
            sx={{
                mt: 4,
                p: 3,
                borderRadius: 2,
                background: isMine
                    ? "radial-gradient(circle at 60% 40%, #ff5252 0%, #7f1d1d 100%)"
                    : "radial-gradient(circle at 60% 40%, #60a5fa 0%, #1e293b 100%)",
                color: "#fff",
                textAlign: "center",
                boxShadow: 6,
                position: "relative",
                overflow: "hidden",
                minHeight: 320,
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, position: "relative", zIndex: 2 }}>
                {isMine ? (
                    <>
                        <img
                            src={MineSVG}
                            alt="Mine"
                            width={64}
                            height={64}
                            style={{
                                animation: "mine-spin 1.2s linear infinite",
                                marginBottom: 8,
                            }}
                        />
                        <Typography variant="h4" fontWeight="bold" color="#ff5252" sx={{ mt: 1, textShadow: "0 0 8px #fff" }}>
                            BOOM! It's a Mine!
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            The submarine has exploded! Be careful!
                        </Typography>
                    </>
                ) : isRock ? (
                    <>
                        <img
                            src={RockSVG}
                            alt="Rock"
                            width={64}
                            height={64}
                            style={{
                                animation: "rock-pop 0.9s cubic-bezier(.36,.07,.19,.97)",
                                marginBottom: 8,
                            }}
                        />
                        <div className="waves" />
                        <Typography variant="h4" fontWeight="bold" color="#90ee90" sx={{ mt: 1, textShadow: "0 0 8px #fff" }}>
                            All Clear! It's a Rock.
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                            The submarine is safe. Proceed!
                        </Typography>
                    </>
                ) : (
                    <Typography variant="h6">
                        Prediction Result: {result}
                    </Typography>
                )}
            </Box>
            {/* Animations and effects */}
            <style>
                {`
                @keyframes mine-spin {
                    0% { transform: rotate(0deg);}
                    100% { transform: rotate(360deg);}
                }
                @keyframes rock-pop {
                    0% { transform: scale(0.7);}
                    60% { transform: scale(1.2);}
                    100% { transform: scale(1);}
                }
                .waves {
                    position: absolute;
                    left: 50%;
                    top: 120px;
                    width: 140px;
                    height: 40px;
                    background: repeating-radial-gradient(circle at 70% 60%, #60a5fa 0 8px, #1e293b 10px 20px, transparent 22px 40px);
                    border-radius: 50%;
                    opacity: 0.5;
                    transform: translate(-50%, 0) scale(1);
                    animation: wave-move 1.2s linear infinite;
                    z-index: 1;
                }
                @keyframes wave-move {
                    0% { background-position: 0 0;}
                    100% { background-position: 40px 0;}
                }
                `}
            </style>
        </Box>
    );
};

export default PredictResult;