<script setup lang="ts">
import { useMoney } from '@/composables/useMoney';
import { TableField } from '@/types';
import TopBar from '@components/common/TopBar.vue';
import { CheckIcon } from '@heroicons/vue/20/solid';
import { ClipboardDocumentIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/solid';
import { computed } from 'vue';
interface TableLayoutProps {
    title: string;
    list: any[]
    fields: TableField[]
}

interface TableLayoutEmits {
    (event: 'add', payload: any): void;
    (event: 'remove', id: string): void;
    (event: 'edit', id: string): void;
}

const {money} = useMoney()
const toCode = (val: string) => `${val.slice(0,4)}-${val.slice(4,8)}-${val.slice(8,12)}-${val.slice(12)}`
const props = defineProps<TableLayoutProps>()
defineEmits<TableLayoutEmits>()

const haveCodes = computed(() => {
    let have = false;
    props.fields.forEach(item => {
        if (item.type === 'code') have = true
    })
    return have
})
</script>
<template>
    <div>
        <div class="mb-8">
            <TopBar :title="title" @add="$emit('add', $event)">
                <slot />
            </TopBar>
        </div>
        <div class="bg-white rounded-3xl px-8 py-4">
            <span v-if="list.length === 0" class="w-full text-xl rounded-2xl bg-white">
                Список пуст
            </span>
            <table v-else class="table">
                <thead>
                    <tr>
                        <th v-for="(field, index) of fields" :key="index">
                            <span>{{ field.label }}</span>
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item of list" :key="item._id">
                        <td v-for="field of fields" :key="field.label">
                            <template v-if="field.type === 'text' && typeof field.key === 'string'">
                                <span>{{ item[field.key] }}</span>
                            </template>
                            <template v-if="field.type === 'text' && typeof field.key !== 'string'">
                                <span>{{ field.key(item) }}</span>
                            </template>
                            <template v-else-if="field.type === 'code' && typeof field.key === 'string'">
                                <span>{{ toCode(item[field.key]) }}</span>
                            </template>
                            <template v-else-if="field.type === 'tag' && typeof field.key === 'string'">
                                <span class="bg-blue-100 text-sm px-4 py-1 font-bold rounded-xl">{{ item[field.key].toUpperCase() }}</span>
                            </template>
                            <template v-else-if="field.type === 'date' && typeof field.key === 'string'">
                                <span>{{ new Date(item[field.key]).toLocaleDateString() }}</span>
                            </template>
                            <template v-else-if="field.type === 'money' && typeof field.key === 'string'">
                                <span>{{  money(item[field.key]) }}</span>
                            </template>
                            <template v-else-if="field.type === 'boolean' && typeof field.key === 'string'">
                                <CheckIcon class="icon" :class="{'text-green-600': item[field.key]}" />
                            </template>
                        </td>
                        <td>
                            <div class="flex gap-2">
                                <button v-if="haveCodes"><ClipboardDocumentIcon class="icon" /> </button>
                                <button @click="$emit('edit', item._id)" class=""><PencilIcon class="icon" /> </button>
                                <button @click="$emit('remove', item._id)" class="text-red-600"><TrashIcon class="icon" /> </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style>

</style>