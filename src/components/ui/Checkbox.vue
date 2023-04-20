<template>
  <div class="flex max-w-sm items-center gap-2 checkbox">
    <label :for="id">
      {{ label }}
    </label>
    <input
      :id="id"
      class="form-input py-3 cursor-pointer rounded-full"
      :value="modelValue"
      :checked="modelValue"
      :placeholder="placeholder ? placeholder : ''"
      @change="onChange"
      type="checkbox"
    />
  </div>
</template>

<script setup lang="ts">
interface InputProps {
  label: string;
  modelValue: boolean;
  placeholder?: string;
  type?: string;
}

const id = self.crypto.randomUUID();
const onChange = (ev: any) => {
  emits('update:modelValue', ev.target.checked)
}

const emits = defineEmits(["update:modelValue"]);
defineProps<InputProps>();
</script>
<style scoped>
.checkbox label {
  margin-left: calc(1.25rem + 1px);
}
</style>
