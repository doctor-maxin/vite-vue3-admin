<script setup lang="ts">
import { reactive, Ref, ref, computed, onMounted} from 'vue';
import { IGiftCardPayload } from '../gift-card';
import Checkbox from '@components/ui/Checkbox.vue';
import Input from '@components/ui/Input.vue';
import Spinner from '@components/ui/Spinner.vue';
import { useGiftCardsStore } from '../gift-card.store';
import {ArrowsUpDownIcon} from '@heroicons/vue/24/outline'
import {ClipboardDocumentIcon} from '@heroicons/vue/24/outline'
import { useCode } from '@/composables/useCode';
import { useClipboard } from '@vueuse/core';
import { useInputDate } from '@/composables/useInputDate';

interface GiftCardModalEmits {
    (event: 'process', payload: IGiftCardPayload)
}

const isLoading: Ref<boolean> = ref(false)

const form = reactive<IGiftCardPayload>({
    balance: 0,
    email: '',
    code: '',
    nominal: 0,
    expiredDate: '',
    isActive: true
});

const giftCardsStore = useGiftCardsStore()
const {generateCode} = useCode()
const {copy} = useClipboard()
const {toString} = useInputDate()

const process = async () => {
    if (!isInvalidForm.value) {
        isLoading.value = true;

        const payload = {...form}
        if (!payload.expiredDate) {
            payload.expiredDate = new Date()
            payload.expiredDate.setMonth(payload.expiredDate.getMonth() + 6)
        }
        const result = await giftCardsStore.createGiftCard(payload)
        isLoading.value = false;
        if (result) {
            emits('process', result.object)
        }
    }
}

const emits = defineEmits<GiftCardModalEmits>();

const isInvalidForm = computed<boolean>(() => {
    return !form.balance || !form.nominal 
})


const copyCode = () => {
    copy(form.code)
    window.toastSuccess('Скопировано')
}
const refreshCode = () => {
    const code = generateCode()
    form.code = code
}

onMounted(refreshCode)
</script>
<template>
    <div class="w-screen max-w-sm">
        <form @submit.prevent="process" class="grid grid-cols-1 gap-5" autocomplete="off">
            <div class="flex items-end gap-2"> 
                <Input
                    placeholder="5000"
                    class="w-full"
                    label="Код"
                    v-model="form.code"
                />
                <button @click="refreshCode" class="button-icon px-3 flex justify-center"><ArrowsUpDownIcon class="icon" /> </button>
                <button @click="copyCode" class="button-icon px-3 flex justify-center"><ClipboardDocumentIcon class="icon" /> </button>
            </div>
            <Input
                placeholder="5000"
                label="Номинал"
                v-model.number="form.nominal"
            />
            <Input
                placeholder="test@test.me"
                label="Email"
                v-model="form.email"
            />
            <Input
                placeholder="5000"
                label="Баланс"
                v-model.number="form.balance"
            />
            <Input
                label="Дата окончания"
                type="date"
                v-model="form.expiredDate"
                :min="toString()"
            />
            <Checkbox
                label="Активен"
                v-model="form.isActive"
            />
            <button class="button w-36" :disabled="isInvalidForm">
                <Spinner v-if="isLoading" />
                <span v-else>Сохранить</span>
            </button>
        </form>
    </div>
</template>