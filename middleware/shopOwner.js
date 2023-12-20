export default defineNuxtRouteMiddleware(() => {
    const authStore = useAuthStore()
    const user = computed(() => authStore.user)

    if (user.value) {
        if (user.value.role !== "ShopOwner" && user.value.role !== "Admin") {
            throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
        }
    } else {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }
});
