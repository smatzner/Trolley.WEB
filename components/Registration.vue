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
const userErrorMessage = ref('');

const register = async () => {
    try {
        await authStore.register(username.value, password.value);
        router.push('/');
    } catch (error) {
        console.error(error.message);
        if (error.message.includes('400')) {
            userErrorMessage.value = 'Registrierung fehlgeschlagen: Benutzername oder Daten ungültig.';
        } else {
            userErrorMessage.value = 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.';
        }
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
            <p v-if="userErrorMessage" class="error-message">{{ userErrorMessage }}</p>
        </form>
    </div>
</template>

<style scoped></style>
