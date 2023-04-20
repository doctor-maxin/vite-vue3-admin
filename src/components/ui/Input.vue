<template>
  <div class="flex flex-col max-w-sm input">
    <label :for="id">
      {{ label }}
    </label>
    <input
      :id="id"
      class="form-input py-3 px-5 rounded-xl"
      :value="modelValue"
      :min="min"
      :placeholder="placeholder ? placeholder : ''"
      @input="onChange"
      :type="type ? type : 'text'"
    />
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

interface InputProps {
  label: string;
  modelValue: string | number;
  placeholder?: string;
  type?: string;
  min?: string;
}
interface InputEmits {
  (event: 'update:modelValue', payload: InputProps['modelValue'])
}

const id = self.crypto.randomUUID();

const emits = defineEmits<InputEmits>();
const props = defineProps<InputProps>();
const onChange = (ev: any) => {
  emits('update:modelValue', ev.target.value)
}
</script>
<style scoped>
.input label {
  margin-left: calc(1.25rem + 1px);
}
</style>
