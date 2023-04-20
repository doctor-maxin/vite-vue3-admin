import { apiService } from "@/api/api-service";
import { KYResult } from "@/types";
import { IPaymentType } from "./payments";

export function listPaymentRequest() {
    return apiService.get<KYResult<IPaymentType>>('/payments')
}

export function createPaymentRequest(form: any) {
    return apiService.post<KYResult<IPaymentType>>('/payments', form)
}

export function updatePaymentRequest(id: string, form: any) {
    return apiService.put<KYResult<IPaymentType>>(`/payments/${id}`, form)
}

export function removePaymentRequest(id: string) {
    return apiService.delete<KYResult<IPaymentType>>(`/payments/${id}`)
}