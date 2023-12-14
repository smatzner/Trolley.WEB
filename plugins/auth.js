// plugins/auth.js
import {useAuthStore} from "~/stores/AuthStore.js";

export default defineNuxtPlugin((nuxtApp) => {
    const authStore = useAuthStore();
    authStore.initializeStore();
});