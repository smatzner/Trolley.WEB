<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const username = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
    try {
        await authStore.login(username.value, password.value);
        router.push('/');
    } catch (error) {
        console.error(error.message);
    }
}
</script>

<template>
    <div class="p-fluid">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <InputText v-model="username" placeholder="E-Mail" />
            <InputText v-model="password" type="password" placeholder="Passwort" />
            <Button label="Einloggen" type="submit" />
        </form>
    </div>
</template>

<style scoped>

</style>
