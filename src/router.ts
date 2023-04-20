import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Checkout from './domains/checkout/checkout.page.vue'
import GiftCards from './domains/gift-card/gift-cards.page.vue'
import GiftCard from './domains/gift-card/gift-card.page.vue'
import GiftCardTransactions from './domains/gift-card/transactions.page.vue'
import Delivery from './domains/delivery/delivery.page.vue'
import Payments from './domains/payments/payments.page.vue'
import Login from './domains/auth/login.page.vue'

export const routes: RouteRecordRaw[] = [
    { path: '/', component: Checkout, name: 'Checkout' },
    {
        path: '/gift-cards', component: GiftCards
    },
    {
        path: '/gift-cards/history', component: GiftCardTransactions
    },
    { path: '/delivery', component: Delivery },
    { path: '/payments', component: Payments },
    { path: '/login', component: Login, name: 'login' },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`,
})


export default router