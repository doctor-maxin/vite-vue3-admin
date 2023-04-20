<template>
  <aside
    class="bg-primary z-10 p-7 relative h-full w-full before:bg-primary before:w-full before:-z-10 before:absolute before:top-0 before:h-full before:left-40"
  >
    <div class="logo w-full">
    </div>
    <ul>
      <li>
        <router-link active-class="active-link" class="sidebar-link" to="/"
          ><DashboardIcon class="icon" />
          <span class="ml-10 mr-auto">Чекаут</span></router-link
        >
      </li>
      <li>
        <router-link active-class="active-link" class="sidebar-link" to="/gift-cards"
          ><GiftTopIcon class="icon" />
          <span class="ml-10 mr-auto">Подарочные карты</span></router-link
        >
      </li>
      <li>
        <router-link active-class="active-link" class="sidebar-link" to="/gift-cards/history"
          ><WarehouseIcon class="icon" />
          <span class="ml-10 mr-auto">Транзакции ПК</span></router-link
        >
      </li>
      <li>
        <router-link
          active-class="active-link"
          class="sidebar-link"
          to="/payments"
          ><CreditCardIcon class="icon" />
          <span class="ml-10 mr-auto">Способы оплаты</span></router-link
        >
      </li>
      <li>
        <router-link
          active-class="active-link"
          class="sidebar-link"
          to="/delivery"
          ><MapIcon class="icon" />
          <span class="ml-10 mr-auto">Доставка</span></router-link
        >
      </li>
      <li>
        <span @click="authStore.logout" class="cursor-pointer sidebar-link"
          ><LogoutIcon class="icon" />
          <span class="ml-10 mr-auto">Выйти</span></span
        >
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import DashboardIcon from "@heroicons/vue/24/outline/Squares2X2Icon";
import CreditCardIcon from "@heroicons/vue/24/outline/CreditCardIcon";
import WarehouseIcon from "@heroicons/vue/24/outline/TableCellsIcon";
import LogoutIcon from "@heroicons/vue/24/outline/ArrowLeftOnRectangleIcon";
import { useAuthStore } from "@/domains/auth/auth.store";
import { GiftTopIcon, MapIcon } from "@heroicons/vue/20/solid";

const authStore = useAuthStore();
</script>
