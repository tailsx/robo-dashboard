import { createAuthClient } from "better-auth/react";
import { config } from "@/lib/config";

console.log("Auth Client Base URL:", config.BASE_URL, import.meta.env);
export const authClient = createAuthClient({
  baseURL: config.BASE_URL,
});
