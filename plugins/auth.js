// plugins/auth.js
import {useAuthStore} from "~/stores/AuthStore.js";

export default defineNuxtPlugin(async (nuxtApp) => {
    const authStore = useAuthStore();
    await authStore.initializeStore();
});