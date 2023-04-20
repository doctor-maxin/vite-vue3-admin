<script setup lang="ts">
import Sidebar from "@components/common/Sidebar.vue";
import { RouterView, useRouter } from "vue-router";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "./domains/auth/auth.store";
import { setToken } from "./api/api-service";

const router = useRouter();
const authStore = useAuthStore();
const { isLogged, token } = storeToRefs(authStore);

onMounted(() => {
  if (!isLogged.value) router.push("/login");
  if (token) setToken(token.value)
});

</script>

<template>
  <div
    class="h-screen grid grid-cols-1"
    :class="{ 'grid-cols-[18rem_auto]': isLogged }"
  >
    <Sidebar v-if="isLogged" />
    <div
      class="rounded-5xl bg-[#efefef] h-full w-full relative z-10 p-7 bg-gray-50 overflow-x-hidden"
    >
      <RouterView v-slot="{ Component }">
        <transition mode="out-in" name="fade">
          <component :is="Component" />
        </transition>
      </RouterView>
    </div>
  </div>
</template>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.178s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease-out;
}
.slide-enter-to {
  position: absolute;
  top: 0;
}
.slide-enter-from {
  position: absolute;
  top: -100%;
}
.slide-leave-to {
  position: absolute;
  top: -100%;
}
.slide-leave-from {
  position: absolute;
  top: 0;
}
</style>
