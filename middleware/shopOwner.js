export default defineNuxtRouteMiddleware(() => {
    const authStore = useAuthStore()
    const user = computed(() => authStore.user)

    if (user.value) {
        if (user.value.role !== "ShopOwner") {
            throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
        }
    } else {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }
});
