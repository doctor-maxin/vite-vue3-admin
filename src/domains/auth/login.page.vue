<script setup lang="ts">
import LoginIcon from "@heroicons/vue/24/outline/UserCircleIcon";
import LockClosedIcon from "@heroicons/vue/24/outline/LockClosedIcon";
import { Ref, reactive, ref } from "vue";
import Spinner from "../../components/ui/Spinner.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "./auth.store";

const isLoading: Ref<boolean> = ref(false);
const router = useRouter();
const authStore = useAuthStore();
const form = reactive({
  email: "",
  password: "",
});


const submit = async () => {
  console.log("!!");
  isLoading.value = true;

  const result = await authStore.login(form);

  if (result) {
    await router.push("/");
  }
  isLoading.value = false;
};
</script>
<template>
 <div class="flex pt-20 items-start justify-center">
    <form
      @submit.prevent="submit"
      action=""
      class="p-12 grid shadow grid-cols-1 bg-white rounded-5xl gap-5 max-w-xl"
      method="post"
    >
      <h1 class="font-bold text-center text-5xl mb-5">Введите ваши данные</h1>
      <div class="grid gap-2 items-center relative">
        <LoginIcon class="icon absolute left-4" />
        <input
          v-model.lazy="form.email"
          class="form-input pl-12 py-3 rounded-xl"
          placeholder="Email"
          required
          type="email"
        />
      </div>
      <div class="grid gap-2 items-center relative">
        <LockClosedIcon class="icon absolute left-4" />
        <input
          v-model.lazy="form.password"
          class="form-input pl-12 py-3 rounded-xl"
          placeholder="Пароль"
          required
          type="password"
        />
      </div>
      <button
        type="submit"
        :disabled="isLoading"
        class="button"
        :class="{ 'cursor-progress': isLoading }"
      >
        <Spinner v-if="isLoading" />
        <span v-else>Войти</span>
      </button>
    </form>
  </div>
</template>