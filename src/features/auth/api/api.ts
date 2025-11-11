import { LoginResponse } from "@/features/types";
import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { API_RESPONSE } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export function useLoginMutation() {
  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: { username: string; password: string }) => {
      const req = await api.post<API_RESPONSE<LoginResponse>>(
        "/auth/login",
        data
      );
      return req.data;
    },
    onSuccess(data, variables, onMutateResult, context) {
      if (data.success) {
        switch (data.data.role) {
          case "admin":
            window.location.href = "/admin/dashboard";
            break;
          case "user":
            window.location.href = "/user/dashboard";
            break;
          default:
            window.location.href = "/";
            break;
        }
      }
    },
    onError(error, variables, onMutateResult, context) {
      toast({
        title: "Login Gagal",
        description: "Periksa kembali username dan password Anda.",
        variant: "destructive",
      });
    },
  });
  return {
    mutate,
    isPending,
  };
}
