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

const register = async () => {
    try {
        await authStore.register(username.value, password.value);
        router.push('/auth/login');
    } catch (error) {
        console.error(error.message);
    }
};
</script>

<template>
    <div class="p-fluid">
        <h2>Registrierung</h2>
        <form @submit.prevent="register">
            <InputText v-model="username" placeholder="E-Mail" />
            <InputText v-model="password" type="password" placeholder="Passwort" />
            <Button label="Registrieren" type="submit" />
        </form>
    </div>
</template>

<style scoped>

</style>
