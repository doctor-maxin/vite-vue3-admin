import { apiService } from "@/api/api-service";
import { Address, KYResult } from "@/types";
import { IDeliveryRule } from "./delivery";

export function listDeliveryRequest() {
    return apiService.get<KYResult<IDeliveryRule>>('/delivery')
}

export function createDeliveryRequest(form: any) {
    return apiService.post<KYResult<IDeliveryRule>>('/delivery', form)
}

export function updateDeliveryRequest(id: string, form: any) {
    return apiService.put<KYResult<IDeliveryRule>>(`/delivery/${id}`, form)
}

export function removeDeliveryRequest(id: string) {
    return apiService.delete<KYResult<IDeliveryRule>>(`/delivery/${id}`)
}

export function getDelivryAddress(query: string, signal: AbortSignal) {
    return apiService.get<{suggestions: Address[]}>(`/delivery/suggestions`, {
        signal,
        query: {
            address: query,
        },
    })
}