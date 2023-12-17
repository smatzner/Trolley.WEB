export default defineNuxtRouteMiddleware(() => {
    const authStore = useAuthStore()
    const isLoggedIn = computed(() => authStore.isLoggedIn)

    console.log(isLoggedIn)
    if (!isLoggedIn) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }
})