<script setup lang="ts">
import Chip from "@components/ui/autocomplete/Chips.vue";
import { useDebounce } from "@composables/useDebounce";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import { ACOption } from "types";
import { Ref, ref, watch } from "vue";

interface SelectAutocompleteProps {
  label: string;
  modelValue: ACOption[];
  disabled?: boolean;
  placeholder?: string;
  options: ACOption[];
}
interface SelectAutocompleteEmits {
  (event: "update:modelValue", payload: any): void;
  (event: "fetch", query: any): Promise<void>;
}

const props = defineProps<SelectAutocompleteProps>();
const emits = defineEmits<SelectAutocompleteEmits>();
const { debounce } = useDebounce();

let selected: Ref<ACOption[]> = ref(props.modelValue);
let query: Ref<string> = ref("");

const onChange = (event) => {
  query.value = event.target.value;
  debounce(emits("fetch", event.target.value), 300);
};
const removeOption = (option: ACOption) => {
  selected.value = selected.value.filter((o) => o.id !== option.id);
};
watch(selected, () => emits("update:modelValue", selected));
watch(() => props.modelValue, (value) => {
  selected.value = value;
})
</script>

<template>
  <div class="max-w-sm w-screen">
    <Combobox
      v-model="selected"
      multiple
      class="w-full"
      :disabled="disabled || false"
      v-slot="{ disabled }"
    >
      <div class="relative mt-1 w-full max-w-full">
        <div class="flex flex-col relative">
          <ComboboxLabel class="text-base ml-5">{{ label }}:</ComboboxLabel>
          <ComboboxInput
            :disabled="disabled"
            :placeholder="placeholder || ''"
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
              v-if="options.length === 0 && query !== ''"
              class="relative cursor-default select-none py-2 px-4 text-gray-700"
            >
              Nothing found.
            </div>

            <ComboboxOption
              v-for="person in options"
              as="template"
              :key="person.id"
              :value="person"
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
                  {{ person.label }}
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
        <div class="flex flex-wrap w-full max-w-full">
          <template v-for="option in selected" :key="option.id">
            <Chip @remove="removeOption" :option="option" />
          </template>
        </div>
      </div>
    </Combobox>
  </div>
</template>
