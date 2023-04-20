import { apiService } from "@/api/api-service";
import { LoginPayload, LoginResponse } from "./auth.types";

export async function signInRequest(data: LoginPayload) {
    return apiService.post<LoginResponse>("/auth/signin", data);
  }

  