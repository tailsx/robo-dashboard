import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function useAuth() {
  const navigate = useNavigate();
  const logOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate("/login");
          toast.success("Logged out successfully");
        },
      },
    });
  };

  return { logOut };
}
