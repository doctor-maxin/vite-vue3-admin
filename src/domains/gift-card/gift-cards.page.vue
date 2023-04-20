<script setup lang="ts">
import TableLayout from '@components/layouts/TableLayout.vue';
import { storeToRefs } from 'pinia';
import { Ref, reactive, ref } from 'vue';
import { useGiftCardsStore } from './gift-card.store';
import { tryOnMounted } from '@vueuse/core';
import Modal from '@ui/Modal.vue';
import GiftCardModal from './components/GiftCardModal.vue'
import GiftCardEditModal from './components/GiftCardEditModal.vue'
import { TableField } from '@/types';
import { IGiftCard } from './gift-card';
import { GiftIcon } from '@heroicons/vue/24/solid';

const isOpenModal: Ref<boolean> = ref(false);
const isEditModalOpen: Ref<boolean> = ref(false);
const giftCardsStore = useGiftCardsStore();
const selectedGF: Ref<IGiftCard | null> = ref(null);
const { list } = storeToRefs(giftCardsStore)

const addGF = () => {
    isOpenModal.value = true;
}

const editGF = (id: string) => {
    selectedGF.value = list.value.find(item => item._id === id)
    isEditModalOpen.value = true;
}
const removeGF = (id: string) => {
    giftCardsStore.removeGiftCard(id)
}

const fields = ref<TableField[]>([
    {
        label: 'Код',
        type: 'code',
        key: 'code'
    },
    {
        label: 'Баланс',
        type: 'money',
        key: 'balance'
    },
    {
        label: 'Номинал',
        type: 'money',
        key: 'nominal'
    },
    {
        label: 'Дата окончания',
        type: 'date',
        key: 'expiredDate'
    },
    {
        label: 'Активна',
        type: 'boolean',
        key: 'isActive'
    },
    {
        label: 'Email',
        type: 'text',
        key: 'email'
    },
])

tryOnMounted(giftCardsStore.loadList)
</script>
<template>
    <div>
        <TableLayout :fields="fields" :list="list" title="Подарочные карты" @add="addGF" @remove="removeGF" @edit="editGF">
            <!-- <button @click="" class="button-icon">
            <span>Создать на 5000</span> 
            <GiftIcon class="icon" />
        </button> -->
        </TableLayout>
        <Modal title="Добавить ПК" :is-open="isOpenModal" @on-close="isOpenModal = false">
            <GiftCardModal @process="isOpenModal = false" />
        </Modal>
        <Modal title="Редактирование ПК" :is-open="isEditModalOpen" @on-close="isEditModalOpen = false">
            <GiftCardEditModal :entity="selectedGF" @process="isEditModalOpen = false" />
        </Modal>
    </div>
</template>