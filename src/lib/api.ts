export const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const errorText = await res.text().catch(() => "Unknown error");
    throw new Error(`API Error: ${res.status} - ${errorText}`);
  }
  return res.json();
};
