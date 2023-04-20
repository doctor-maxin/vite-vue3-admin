<template>
  <div class="flex justify-end gap-4 px-5 py-4 bg-white rounded-3xl">
    <h1 class="text-4xl font-bold mr-auto overflow-hidden block text-ellipsis">
      {{ title }}
    </h1>
    <button @click="$emit('add')" class="button-icon">
        <span>Добавить</span> 
        <PlusIcon class="icon" />
    </button>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/20/solid';


type TopBarProps = {
  title: string;
};
type TopBarEmits = {
  (event: 'add', payload: void): void;
}

defineProps<TopBarProps>();
defineEmits<TopBarEmits>()
</script>