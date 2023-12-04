
<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const username = ref('');
const password = ref('');
const authStore = useAuthStore();

const login = async () => {
  try {
    await authStore.login(username.value, password.value);
    this.$router.push('/'); 
  } catch (error) {
    console.error(error.message);
  }
}
</script>

<template>
  <div class="p-fluid">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <InputText v-model="username" placeholder="Benutzername" />
      <InputText v-model="password" type="password" placeholder="Passwort" />
      <Button label="Einloggen" />
    </form>
  </div>
</template>

<style lang="scss" scoped>

</style>