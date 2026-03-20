import { api } from "@/lib/axios";

export const createChatbot = async (dataFinal: { message: string }) => {
  const res = await api.post("/chatbot", dataFinal);
  return res.data;
};
