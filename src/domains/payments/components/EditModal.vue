<script setup lang="ts">
import { reactive, Ref, ref, computed, onMounted} from 'vue';
import { IPaymentType, PaymentTypes, IPaymentTypePayload } from '../payments';
import { usePaymentsStore } from '../payments.store';
import Select from '@ui/Select.vue'
import Input from '@ui/Input.vue'
import Checkbox from '@ui/Checkbox.vue'
import { ACOption } from '@/types';
import Spinner from '@components/ui/Spinner.vue';

interface EditModalEmits {
    (event: 'process', payload: any)
}
interface EditModalProps {
    entity: IPaymentType;
}
type PaymentTypeEdit = Omit<IPaymentTypePayload, "code"> & {code: ACOption}

const emits = defineEmits<EditModalEmits>();
const props = defineProps<EditModalProps>()

const isLoading: Ref<boolean> = ref(false)
const form: PaymentTypeEdit = reactive({
    isActive: true,
    code: {
        id: PaymentTypes.SBER,
        label: PaymentTypes.SBER.toUpperCase()
    } as ACOption,
    title: '',
});
const isInvalidForm = computed<boolean>(() => {
    return !form.code || !form.title 
})
const paymentsStore = usePaymentsStore()

const process = async () => {
    if (!isInvalidForm.value) {
        isLoading.value = true;

        const payload = {...form}
        payload.code = payload.code.id
        const result = await paymentsStore.updatePayment(props.entity._id, payload)
        isLoading.value = false;
        if (result) {
            emits('process', result.object)
        }
    }
}

const options = Object.values(PaymentTypes).map((item) => {
    return {
        id: item,
        label: item.toUpperCase()
    }
})
onMounted(() => {
    if (props.entity) {
        form.code = {
            id: props.entity.code,
            label: props.entity.code.toUpperCase()
        }
        form.title = props.entity.title
        form.isActive = props.entity.isActive
    }
})
</script>
<template>
    <div class="w-screen max-w-sm">
        <form @submit.prevent="process" class="grid grid-cols-1 gap-5" autocomplete="off">
            <Select  label="Тип оплаты" :options="options" v-model="form.code" />
            <Input label="Название" v-model="form.title" />
                <Checkbox label="Активность" v-model="form.isActive" />

            <button class="button w-36" :disabled="isInvalidForm">
                <Spinner v-if="isLoading" />
                <span v-else>Сохранить</span>
            </button>
        </form>
    </div>
</template>