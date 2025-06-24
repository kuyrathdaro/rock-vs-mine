import React from "react";
import MainForm from "../components/MainForm";

const Home: React.FC = () => {
  return (
    <>
      <header className="flex flex-col items-center justify-center mt-16 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4">
          Rock vs Mine Prediction
        </h1>
        <p className="text-xl md:text-2xl text-blue-100 font-medium">
          Predict using <span className="font-bold text-amber-300">Sonar</span>{" "}
          data!
        </p>
      </header>
      <MainForm />
    </>
  );
};

export default Home;
