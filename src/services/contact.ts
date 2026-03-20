import { api } from "@/lib/axios";

export const createContact = async (dataFinal: { email: string }) => {
  const res = await api.post("/contact/create", dataFinal);
  return res.data;
};
