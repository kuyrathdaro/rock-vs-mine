import useSWRMutation from "swr/mutation";
import { predictSonar } from "../services/sonarApi";

export function usePredictSonar() {
  const apiUrl = `${import.meta.env.VITE_API_URL}/predict`;
  return useSWRMutation(apiUrl, predictSonar);
}