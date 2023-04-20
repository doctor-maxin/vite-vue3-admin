import { defineStore } from "pinia";
import { listGiftCardsRequest, createGiftCardRequest, updateGiftCardRequest, removeGiftCardRequest } from "./gift-card.api";
import { IGiftCard } from "./gift-card";
import {  handleDefaultError } from "@/api/api-service";

interface GiftCardsState {
    list: IGiftCard[];
}

export const useGiftCardsStore = defineStore('gift-cards', {
    state: (): GiftCardsState => ({
        list: [],
    }),
    actions: {
        async loadList() {
            const list = await listGiftCardsRequest().catch(handleDefaultError)

            if (list && list?.array) {
                this.list = list.array;
            }
        },
        async createGiftCard(form: any) {
            const result = await createGiftCardRequest(form).catch(handleDefaultError)
            if (result && result.object) {
                this.list.push(result.object)
                window.toastSuccess('Добавлено')
            }
            return result
        },
        async removeGiftCard(id: string) {
            const result = await removeGiftCardRequest(id).catch(handleDefaultError)
            if (result) {
                this.list = this.list.filter(item => item._id !== id)
                window.toastSuccess('Удалено')
            }
            return result
        },
        async updateGiftCard(id: string, form: any) {
            const result = await updateGiftCardRequest(id, form).catch(handleDefaultError)
            if (result && result.object) {
                this.list = this.list.map(item => item._id === id ? result.object : item)
                window.toastSuccess('Обновлено')
            }
            return result
        }
    }
})