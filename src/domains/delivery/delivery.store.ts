import { defineStore } from "pinia";
import { IDeliveryRule } from "./delivery";
import { listDeliveryRequest, createDeliveryRequest, getDelivryAddress, removeDeliveryRequest, updateDeliveryRequest } from "./delivery.api";
import { handleDefaultError } from "@/api/api-service";

interface DeliveryState {
    list: IDeliveryRule[];
    controller: AbortController;
}

export const useDeliveryStore = defineStore("delivery", {
    state: (): DeliveryState => ({
        list: [],
        controller: new AbortController()
    }),
    actions: {
        async loadList() {
            const list = await listDeliveryRequest().catch(handleDefaultError)
            
            if (list && list?.array) {
                this.list = list.array;
            }
        },
        async createDelivery(form: any) {
            const result = await createDeliveryRequest(form).catch(handleDefaultError)
            if (result && result.object) {
                this.list.push(result.object)
                window.toastSuccess('Добавлено')
            }
            return result
        },
        async removeDelivery(id: string) {
            const result = await removeDeliveryRequest(id).catch(handleDefaultError)
            if (result) {
                this.list = this.list.filter(item => item._id !== id)
                window.toastSuccess('Удалено')
            }
            return result
        },
        async updateDelivery(id: string, form: any) {
            const result = await updateDeliveryRequest(id, form).catch(handleDefaultError)
            if (result && result.object) {
                this.list = this.list.map(item => item._id === id ? result.object : item)
                window.toastSuccess('Обновлено')
            }
            return result
        },
        async getDeliveryAddress(query: string) {
            if (this.controller) this.controller.abort()
            this.controller = null;
            this.controller = new AbortController()

            const result = await getDelivryAddress(query, this.controller.signal).catch(handleDefaultError)
            if (result && result.suggestions) {
                return result.suggestions
            }
        }
    }
})