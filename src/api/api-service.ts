import { useAuthStore } from '@/domains/auth/auth.store'
import { mande } from 'mande'

export const apiService = mande('/api/v1/settings/')

export function setToken(token: string) {
    // todos.options will be used for all requests
    apiService.options.headers.Authorization = 'Bearer ' + token
}

export function clearToken() {
    delete apiService.options.headers.Authorization
}

export function handleDefaultError(err: any) {
    if (err.response instanceof DOMException) return;
    if (err instanceof DOMException) return;

    if (err.body) window.toastError(err.body.message)
    if (err.response.status === 401) {
        const authStore = useAuthStore()
        authStore.logout()
        clearToken()
    }
}