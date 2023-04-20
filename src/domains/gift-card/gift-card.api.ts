import { apiService } from "@/api/api-service";
import { KYResult } from "@/types";
import { IGiftCard } from "./gift-card";

export function listGiftCardsRequest() {
    return apiService.get<KYResult<IGiftCard>>('/gift-cards')
}

export function createGiftCardRequest(form: any) {
    return apiService.post<KYResult<IGiftCard>>('/gift-cards', form)
}

export function updateGiftCardRequest(id: string, form: any) {
    return apiService.put<KYResult<IGiftCard>>(`/gift-cards/${id}`, form)
}

export function removeGiftCardRequest(id: string) {
    return apiService.delete<KYResult<IGiftCard>>(`/gift-cards/${id}`)
}