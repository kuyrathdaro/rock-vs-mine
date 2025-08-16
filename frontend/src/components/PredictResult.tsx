import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import lightMine from "../assets/mine-light.svg";
import Rock from "../assets/rock.svg";
import { useExplosion } from "../hooks/useExplosion";

const PredictResult: React.FC<{ result: string | null }> = ({ result }) => {
    const isMine = result?.toUpperCase().includes("M");
    const isRock = result?.toUpperCase().includes("R");

    const { explodeSubmarine, resetExplosion } = useExplosion();

    useEffect(() => {
        if (isMine) {
            explodeSubmarine();
        } else {
            resetExplosion();
        }
    }, [isMine, explodeSubmarine, resetExplosion]);


    return (
        <Box
            sx={{
                mt: 3,
                p: 2,
                borderRadius: 2,
                maxWidth: "600px", // Match input box width
                width: "100%",
                mx: "auto",
                background: isMine
                    ? "radial-gradient(circle at 60% 40%, #ff5252 0%, #7f1d1d 100%)"
                    : "radial-gradient(circle at 60% 40%, #60a5fa 0%, #1e293b 100%)",
                color: "#fff",
                textAlign: "center",
                boxShadow: 4,
                position: "relative",
                overflow: "hidden",
                minHeight: 120, // Smaller height
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, position: "relative", zIndex: 2 }}>
                {isMine ? (
                    <>
                        <img
                            src={lightMine}
                            alt="Mine"
                            width={48}
                            height={48}
                            color="white"
                            style={{
                                animation: "mine-spin 1.2s linear infinite",
                                marginBottom: 8
                            }}
                        />
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="#fff" // Use white text for contrast
                            sx={{
                                mt: 1,
                                textShadow: "0 0 12px #fff, 0 0 24px #ff5252, 0 0 8px #fff700",
                                letterSpacing: 2,
                                fontFamily: "'Bangers', cursive, sans-serif",
                                fontSize: { xs: "1.2rem", md: "1.5rem" },
                            }}
                        >
                            💥 KABOOM! Submarine Hit a Mine!
                        </Typography>
                    </>
                ) : isRock ? (
                    <>
                        <img
                            src={Rock}
                            alt="Rock"
                            width={72}
                            height={72}
                            style={{
                                animation: "rock-pop 0.9s cubic-bezier(.36,.07,.19,.97)",
                                marginBottom: "-55px", // Negative margin to overlap wave
                                zIndex: 2,
                                position: "relative",
                            }}
                        />
                        <svg
                            width="100"
                            height="28"
                            viewBox="0 0 100 28"
                            style={{
                                display: "block",
                                margin: "0 auto",
                                position: "relative",
                                zIndex: 1,
                            }}
                        >
                            <path
                                id="wave"
                                fill="#60a5fa"
                                opacity="0.7"
                                d="M0 14 Q 25 0, 50 14 T 100 14 V28 H0 Z"
                            >
                                <animate
                                    attributeName="d"
                                    dur="2s"
                                    repeatCount="indefinite"
                                    values="
          M0 14 Q 25 0, 50 14 T 100 14 V28 H0 Z;
          M0 14 Q 25 28, 50 14 T 100 14 V28 H0 Z;
          M0 14 Q 25 0, 50 14 T 100 14 V28 H0 Z
        "
                                />
                            </path>
                        </svg>
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            color="#90ee90"
                            sx={{
                                mt: 1,
                                textShadow: "0 0 6px #fff", // subtle shadow for readability
                            }}
                        >
                            All Clear! It's a Rock.
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            The submarine is safe. Proceed!
                        </Typography>
                    </>
                ) : (
                    <Typography variant="body1">
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
                    0% { transform: scale(0.7); }
                    60% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
                .waves {
                    position: absolute;
                    left: 50%;
                    top: 80px;
                    width: 100px;
                    height: 28px;
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