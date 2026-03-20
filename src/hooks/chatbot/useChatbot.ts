import { createChatbot } from "@/services/chatbot";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useChatbot = () => {
  return useMutation({
    mutationFn: createChatbot,
    onError: (errors: AxiosError<{ message: string }>) => {
      toast.error(
        errors?.response?.data?.message ||
          "Đã có lỗi xảy ra, vui lòng thử lại.",
      );
    },
  });
};
