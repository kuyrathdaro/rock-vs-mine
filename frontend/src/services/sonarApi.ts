import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useSonarData = (endpoint: string) => {
  const { data, error } = useSWR(`${process.env.API_URL}${endpoint}`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export async function predictSonar(data: string) {
    const response = await fetch(`${process.env.API_URL}/predict`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
    });

    if (!response.ok) {
        throw new Error("Failed to predict");
    }

    return response.json();
}
