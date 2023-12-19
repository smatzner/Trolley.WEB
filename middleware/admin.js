export default defineNuxtRouteMiddleware((to, from) => {
    console.log(to, from)
    const authStore = useAuthStore()
    const user = computed(() => authStore.user)

    if (user.value) {
        if (user.value.role !== "Admin") {
            throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
        }
    } else {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }
});
