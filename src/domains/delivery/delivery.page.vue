<script setup lang="ts">
import TableLayout from '@components/layouts/TableLayout.vue';
import { storeToRefs } from 'pinia';
import { Ref, ref } from 'vue';
import { tryOnMounted } from '@vueuse/core';
import Modal from '@ui/Modal.vue';
import { TableField } from '@/types';
import CreateModal from './components/CreateModal.vue'
import EditModal from './components/EditModal.vue'
import { IDeliveryRule } from './delivery';
import { useDeliveryStore } from './delivery.store';

const isOpenModal: Ref<boolean> = ref(false);
const isEditModalOpen: Ref<boolean> = ref(false);
const selectedItem: Ref<IDeliveryRule | null> = ref(null);
const deliveryStore = useDeliveryStore()
const {list} = storeToRefs(deliveryStore)

const add = () => {
    isOpenModal.value = true;
}

const edit = (id: string) => {
    selectedItem.value = list.value.find(item => item._id === id)
    isEditModalOpen.value = true;
}
const remove = (id: string) => {
    deliveryStore.removeDelivery(id)
}


const fields = ref<TableField[]>([
    {
        label: 'Адрес',
        type: 'text',
        key: (add) => add.address.value
    },
    {
        label: 'Цена',
        type: 'text',
        key: 'amount'
    },
    {
        label: 'Порядок',
        type: 'text',
        key: 'order'
    },
])
tryOnMounted(deliveryStore.loadList)
</script>
<template>
    <div>
        <TableLayout :fields="fields" :list="list" title="Правила доставки" @add="add" @remove="remove" @edit="edit" />

        <Modal title="Добавить" :is-open="isOpenModal" @on-close="isOpenModal = false">
            <CreateModal @process="isOpenModal = false" />
        </Modal>
        <Modal title="Изменить" :is-open="isEditModalOpen" @on-close="isEditModalOpen = false">
            <EditModal :entity="selectedItem" @process="isEditModalOpen = false" />
        </Modal>
    </div>
</template>