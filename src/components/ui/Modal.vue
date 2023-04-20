<template>
  <div>
    <TransitionRoot :show="isOpen" as="template">
      <Dialog
        :initial-focus="initialFocus"
        @close="$emit('on-close')"
        class="relative z-50"
      >
        <TransitionChild
          enter="duration-200 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-100 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
        </TransitionChild>
        <div class="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            enter="duration-200 ease-out"
            enter-from="opacity-0 scale-95 translate-y-20"
            enter-to="opacity-100 scale-100 translate-y-0"
            leave="duration-100 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full p-12 shadow max-w-xl rounded-3xl bg-white relative"
            >
              <div @click="$emit('on-close')">
                <CloseIcon
                  class="fill-primary-900 absolute -right-6 -top-6 cursor-pointer w-12 rounded-full bg-white"
                />
              </div>
              <DialogTitle class="text-3xl m-0 mb-10">{{ title }}</DialogTitle>
              <DialogDescription v-if="description">
                {{ description }}</DialogDescription
              >
              <slot />
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";
import CloseIcon from "@heroicons/vue/24/solid/XCircleIcon";
import { Ref } from "vue";

interface ModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  initialFocus?: HTMLElement;
}
interface ModalEmits {
  (event: "on-close"): void;
}

defineProps<ModalProps>();
defineEmits<ModalEmits>();
</script>
