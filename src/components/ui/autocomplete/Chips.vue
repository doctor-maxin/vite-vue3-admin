<template>
  <div class="chip [word-wrap: break-word]">
    {{ option.label }}
    <button @click="$emit('remove', option)">
      <CloseIcon class="w-full h-full" />
    </button>
  </div>
</template>

<script setup lang="ts">
import CloseIcon from "@heroicons/vue/24/solid/XMarkIcon";
interface ChipsProps {
  option: any;
}

defineProps<ChipsProps>();
</script>

<style scoped>
.chip {
  @apply border-primary text-sm w-fit bg-white rounded-2xl my-1 px-4 mr-4 flex items-center cursor-pointer justify-between border  leading-loose  shadow-none transition-[opacity] duration-300 ease-linear hover:border-primary-900;
}
.chip button {
  @apply w-4 ml-2 h-4 flex items-center text-red-800;
}
</style>
