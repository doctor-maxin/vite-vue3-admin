<script setup lang="ts">
import { ACOption } from "types";
import { Ref, computed, ref, watch } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  ComboboxLabel,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

interface SelectProps {
  label: string;
  modelValue: ACOption;
  options: ACOption[];
  disabled?: boolean;
}
interface SelectEmits {
  (event: "update:modelValue", payload: ACOption): void;
}
const props = defineProps<SelectProps>();
const emits = defineEmits<SelectEmits>();
let query: Ref<string> = ref("");

let selected: Ref<ACOption> = ref(props.modelValue);
const onChange = (event) => {
  query.value = event.target.value;
};

let filteredOptions = computed(() =>
  query.value === ""
    ? props.options
    : props.options.filter((person) =>
        person.label
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, ""))
      )
);

watch(selected, () => emits("update:modelValue", selected.value));
watch(() => props.modelValue, () => {
  selected.value = props.modelValue
});
</script>
<template>
  <div class="max-w-sm w-full">
    <Combobox
      v-model="selected"
      :disabled="disabled || false"
      v-slot="{ disabled }"
    >
      <div class="relative mt-1">
        <div class="flex flex-col relative">
          <ComboboxLabel class="text-base ml-5">{{ label }}:</ComboboxLabel>
          <ComboboxInput
            :disabled="disabled"
            class="w-full py-3 px-5 rounded-xl focus:ring-1 disabled:bg-slate-50"
            :displayValue="(option: ACOption) => option.label"
            @change="onChange"
          />
          <ComboboxButton
            class="absolute inset-y-0 mt-6 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </ComboboxButton>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="absolute z-10 scrollbar max-w-sm mt-1 max-h-60 w-full rounded-xl overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <div
              v-if="filteredOptions.length === 0 && query !== ''"
              class="relative cursor-default select-none py-2 px-4 text-gray-700"
            >
              Нет вариантов.
            </div>

            <ComboboxOption
              v-for="item in filteredOptions"
              as="template"
              :key="item.id"
              :value="item"
              v-slot="{ selected, active }"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-primary text-white': active,
                  'text-gray-900': !active,
                }"
              >
                <span
                  class="block truncate"
                  :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ item.label }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3"
                  :class="{ 'text-white': active, 'text-teal-600': !active }"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </div>
</template>
