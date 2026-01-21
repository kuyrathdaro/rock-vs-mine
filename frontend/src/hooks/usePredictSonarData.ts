import useSWRMutation from "swr/mutation";
import { predictSonar, uploadSonarCSV } from "../services/sonarApi";

export function usePredictSonar() {
  const apiUrl = `${import.meta.env.VITE_API_URL}/predict`;
  return useSWRMutation(apiUrl, predictSonar);
}

export function usePredictSonarCSV() {
  const apiUrl = `${import.meta.env.VITE_API_URL}/predict-csv`;
  return useSWRMutation(apiUrl, uploadSonarCSV);
}