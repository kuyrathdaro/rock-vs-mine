export const predictSonar = async (url: string, { arg }: { arg: string }) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: arg }),
  });
  if (!response.ok) throw new Error("Prediction failed");
  return response.json();
};