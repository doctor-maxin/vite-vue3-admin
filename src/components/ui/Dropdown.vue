<template>
  <div class="w-full max-w-sm px-4">
    <Popover v-slot="{ open, close }" class="relative">
      <PopoverButton
        :class="open ? '' : 'text-opacity-90'"
        class="group w-full inline-flex items-center rounded-2xl border-primary-900/60 bg-white border-2 px-3 py-2 text-base font-medium text-black hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <span class="w-full">{{ title }}</span>
        <ChevronDownIcon
          :class="open ? '' : 'text-opacity-70'"
          aria-hidden="true"
          class="ml-2 h-5 w-5 text-purple-400 transition duration-150 ease-in-out group-hover:text-opacity-80"
        />
      </PopoverButton>
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel
          class="absolute w-full left-0 z-10 mt-1 w-fit max-w-none- transform px-4 sm:px-0 lg:max-w-3xl"
        >
          <div
            class="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5"
          >
            <div class="relative grid grid-cols-1 gap-2 bg-white p-2">
              <button
                type="button"
                v-for="item in list"
                :key="item.name"
                @click="onSelect(item, close)"
                class="flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
              >
                <div class="mx-1">
                  <p class="text-sm font-medium text-gray-900">
                    {{ item.name }}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>

<script lang="ts" setup>
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import ChevronDownIcon from "@heroicons/vue/24/outline/ChevronDownIcon";

interface DropdownEmits {
  (event: "on-select", payload: any): void;
}
type DropdownListItem = {
  name: string;
  value: any;
};

const props = defineProps<{
  title: string;
  list: DropdownListItem[];
}>();

const emits = defineEmits<DropdownEmits>();

const onSelect = (item: DropdownListItem, close) => {
  emits("on-select", item.value);
  close();
};
</script>

<style scoped></style>
