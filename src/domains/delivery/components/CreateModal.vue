<script setup lang="ts">
import SelectAutocomplete from '@components/ui/SelectAutocomplete.vue';
import { useDeliveryStore } from '../delivery.store';
import { IDeliveryRulePayload } from '../delivery';
import { ACOption, Address } from '@/types';
import { Ref, computed, reactive, ref } from 'vue';
import Input from '@components/ui/Input.vue';
import Spinner from '@components/ui/Spinner.vue';

interface CreateModalEmits {
    (event: 'process', payload: any)
}

const emits = defineEmits<CreateModalEmits>();
type CreateDeliveryRule = Omit<IDeliveryRulePayload, 'address'> & {address: ACOption}

const form: IDeliveryRulePayload = reactive({
    address: {
        id: '',
        label: ''
    },
    amountFrom: 0,
    order: 0,
    amount: 0,
})
const list: Ref<Address[]> = ref([])

const isInvalidForm = computed<boolean>(() => {
    return !form.address || !form.amount 
})

const deliveryStore = useDeliveryStore()
const isLoading: Ref<boolean> = ref(false)

const fetchAddresses = async (query: string) => {
    try {
        const result = await deliveryStore.getDeliveryAddress(query)
        if (result) {
            list.value = result
        }
    } catch (err) {}
}

const options = computed(() => list.value.length ? list.value.map(item => ({
    id: item.unrestricted_value,
    label: item.value
})) : [])

const process = async () => {
    if (!isInvalidForm.value) {
        isLoading.value = true;

        const payload = {...form}
        payload.address = list.value.find(item => item.unrestricted_value === payload.address.id)
        const result = await deliveryStore.createDelivery(payload)
        isLoading.value = false;
        if (result) {
            emits('process', result.object)
        }
    }
}

</script>
<template>
    <div class="w-screen max-w-sm">
        <form @submit.prevent="process" class="grid grid-cols-1 gap-5" autocomplete="off">
            <SelectAutocomplete @fetch="fetchAddresses" placeholder="Начните писать" label="Адрес" :options="options" v-model="form.address" />
            <Input label="Цена" v-model.number="form.amount" />
            <Input label="Порядок" v-model.number="form.order" />

            <button class="button w-36" :disabled="isInvalidForm">
                <Spinner v-if="isLoading" />
                <span v-else>Сохранить</span>
            </button>
        </form>
    </div>
</template>