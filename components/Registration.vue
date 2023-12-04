
<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const username = ref('');
const email = ref('');
const password = ref('');
const authStore = useAuthStore();

const register = async () => {
  try {
    await authStore.register(username.value, email.value, password.value);
    this.$router.push('/login'); // Weiterleiten zur Login-Seite
  } catch (error) {
    console.error(error.message);
  }
};
</script>

<template>
   <div class="p-fluid">
    <h2>Registrierung</h2>
    <form @submit.prevent="register">
      <PrimeInputText v-model="username" placeholder="Benutzername" />
      <PrimeInputText v-model="email" type="email" placeholder="Email" />
      <PrimeInputText v-model="password" type="password" placeholder="Passwort" />
      <PrimeButton label="Registrieren" type="submit" />
    </form>
  </div>
</template>

<style lang="scss" scoped>

</style>