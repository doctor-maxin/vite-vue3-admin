<script setup lang="ts">
import SelectAutocomplete from '@components/ui/SelectAutocomplete.vue';
import { useDeliveryStore } from '../delivery.store';
import { IDeliveryRule, IDeliveryRulePayload } from '../delivery';
import { ACOption, Address } from '@/types';
import { Ref, computed, reactive, ref } from 'vue';
import Input from '@components/ui/Input.vue';
import Spinner from '@components/ui/Spinner.vue';
import { tryOnMounted } from '@vueuse/shared';

interface ModalEmits {
    (event: 'process', payload: any)
}
interface ModalProps {
    entity: IDeliveryRule;
}

const emits = defineEmits<ModalEmits>();
const props = defineProps<ModalProps>();
type EditDeliveryRyle = Omit<IDeliveryRulePayload, 'address'> & {address: ACOption}

const form: EditDeliveryRyle = reactive({
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

        const payload = {
            ...form,
            address: list.value.find(item => item.unrestricted_value === payload.address.id)
        }
        const result = await deliveryStore.updateDelivery(props.entity._id, payload)
        isLoading.value = false;
        if (result) {
            emits('process', result.object)
        }
    }
}

tryOnMounted(() => {
    if (props.entity) {
        console.log(props.entity)
        form.address = {
            id: props.entity.address.unrestricted_value,
            label: props.entity.address.value
        }
        form.amount = props.entity.amount
        if (props.entity.order) form.order = props.entity.order
        if (props.entity.amountFrom) form.amountFrom = props.entity.amountFrom
        if (props.entity.amountTo) form.amountFrom = props.entity.amountTo
    }
})

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