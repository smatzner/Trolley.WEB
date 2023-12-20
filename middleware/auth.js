export default defineNuxtRouteMiddleware(() => {
    const authStore = useAuthStore()
    const isLoggedIn = computed(() => authStore.isLoggedIn)

    if (!isLoggedIn.value) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }
})