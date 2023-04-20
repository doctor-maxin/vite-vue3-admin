import { createApp, markRaw } from "vue";
import "./assets/styles/index.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
});
const app = createApp(App);

app.use(router);
app.use(pinia);

if (import.meta.env.DEV) {
    app.config.globalProperties.window = window
app.config.globalProperties.window.toastError = (message: string) => {
    //@ts-ignore
    window.Toastify({
        text: `
        <div class="toast-icon-wrapper"> 
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
         </div>   <div class="toast-message">${message}</div>
        `,
        duration: 3000,
        close: true,
        className: "toast-error",
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        escapeMarkup: false,
        onClick: function () {}, // Callback after click
      }).showToast();   
};
app.config.globalProperties.window.toastSuccess = (message: string) => {
    //@ts-ignore
    window.Toastify({
        text: `
        <div class="toast-icon-wrapper"> 
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
        </div>   <div class="toast-message">${message}</div>
        `,
        duration: 3000,
        close: true,
        className: "toast-success",
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        escapeMarkup: false,
        onClick: function () {}, // Callback after click
      }).showToast();
};
}

app.mount("#settings");

declare global {
    interface Window { 
        toastSuccess: (message: string) => void; 
        toastError: (message: string) => void;
    }
}