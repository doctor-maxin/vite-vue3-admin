<script setup lang="ts">
import TableLayout from '@components/layouts/TableLayout.vue';
import { storeToRefs } from 'pinia';
import { Ref, ref } from 'vue';
import { tryOnMounted } from '@vueuse/core';
import Modal from '@ui/Modal.vue';
import { TableField } from '@/types';
import { IPaymentType } from './payments';
import { usePaymentsStore } from './payments.store';
import CreateModal from './components/CreateModal.vue'
import EditModal from './components/EditModal.vue'

const isOpenModal: Ref<boolean> = ref(false);
const isEditModalOpen: Ref<boolean> = ref(false);
const selectedItem: Ref<IPaymentType | null> = ref(null);
const paymentStore = usePaymentsStore()
const {list} = storeToRefs(paymentStore)
    
const add = () => {
    isOpenModal.value = true;
}

const edit = (id: string) => {
    selectedItem.value = list.value.find(item => item._id === id)
    isEditModalOpen.value = true;
}
const remove = (id: string) => {
    paymentStore.removePayment(id)
}


const fields = ref<TableField[]>([
    {
        label: 'Наименование',
        type: 'text',
        key: 'title'
    },
    {
        label: 'Тип',
        type: 'tag',
        key: 'code'
    },
    {
        label: 'Активна',
        type: 'boolean',
        key: 'isActive'
    },
])

tryOnMounted(paymentStore.loadList)
</script>
<template>
    <div>
        <TableLayout :fields="fields" :list="list" title="Способы оплаты" @add="add" @remove="remove" @edit="edit" />

        <Modal title="Добавить" :is-open="isOpenModal" @on-close="isOpenModal = false">
            <CreateModal @process="isOpenModal = false" />
        </Modal>
        <Modal title="Изменить" :is-open="isEditModalOpen" @on-close="isEditModalOpen = false">
            <EditModal :entity="selectedItem" @process="isEditModalOpen = false" />
        </Modal>
    </div>
</template>