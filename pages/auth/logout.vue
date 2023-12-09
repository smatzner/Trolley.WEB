
<script setup>
import { useAuthStore } from '@/stores/AuthStore';


definePageMeta({
    layout: 'auth'

})

const authStore = useAuthStore();

const logout = () => {
    authStore.logout();

    router.push('/login');
}

</script>

<template>
    <div>
      <div v-if="authStore.isLoggedIn">
        <button @click="logout">Logout</button>
      </div>
      <div v-else>
        <button @click="() => router.push('/auth/login')">Login</button>
        <button @click="() => router.push('/auth/register')">Registrieren</button>
      </div>
    </div>
  </template>

<style lang="scss" scoped>

</style>