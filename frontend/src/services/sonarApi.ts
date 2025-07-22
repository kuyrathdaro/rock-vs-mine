export const predictSonar = async (url: string, { arg }: { arg: string }) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: arg }),
  });
  if (!response.ok) throw new Error("Prediction failed");
  return response.json();
};

export const uploadSonarCSV = async (url: string, { arg }: { arg: File }) => {
  const formData = new FormData();
  formData.append("file", arg);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("CSV upload failed");
  return response.json();
}