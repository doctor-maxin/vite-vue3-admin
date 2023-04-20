import { defineStore } from "pinia";
import { IPaymentType } from "./payments";
import { handleDefaultError } from "@/api/api-service";
import { createPaymentRequest, listPaymentRequest, removePaymentRequest, updatePaymentRequest } from "./payments.api";

interface PaymentsState {
    list: IPaymentType[];
}

export const usePaymentsStore = defineStore("payments", {
    state: (): PaymentsState => ({
        list: [],
    }),
    actions: {
        async loadList() {
            const list = await listPaymentRequest().catch(handleDefaultError)
            
            if (list && list?.array) {
                this.list = list.array;
            }
        },
        async createPayment(form: any) {
            const result = await createPaymentRequest(form).catch(handleDefaultError)
            if (result && result.object) {
                this.list.push(result.object)
                window.toastSuccess('Добавлено')
            }
            return result
        },
        async removePayment(id: string) {
            const result = await removePaymentRequest(id).catch(handleDefaultError)
            if (result) {
                this.list = this.list.filter(item => item._id !== id)
                window.toastSuccess('Удалено')
            }
            return result
        },
        async updatePayment(id: string, form: any) {
            const result = await updatePaymentRequest(id, form).catch(handleDefaultError)
            if (result && result.object) {
                this.list = this.list.map(item => item._id === id ? result.object : item)
                window.toastSuccess('Обновлено')
            }
            return result
        }
    }
})