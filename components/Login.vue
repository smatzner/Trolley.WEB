<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from '@/stores/AuthStore';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const username = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();
const userErrorMessage = ref('');


const login = async () => {
  try {
    await authStore.login(username.value, password.value);
    router.push('/');
  } catch (error) {
    console.error('Login-Fehler:', error);
    if (error.message.includes('400')) {
      userErrorMessage.value = 'Login fehlgeschlagen: Benutzername oder Daten ungültig.';
    } else {
      userErrorMessage.value = 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.';
    }
  }
}

</script>

<template>
  <div class="p-fluid">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <InputText v-model="username" placeholder="E-Mail"/>
      <PrimePassword v-model="password">
        <template #header>
          <h6>Melde dich mit deinem Passwort an.</h6>
        </template>
        <template #footer>
          <Divider/>
          <p class="mt-2">Suggestions</p>
          <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
            <li>At least one lowercase</li>
            <li>At least one uppercase</li>
            <li>At least one numeric</li>
            <li>Minimum 8 characters</li>
          </ul>
        </template>
      </PrimePassword>
      <Button label="Einloggen" type="submit"/>
    </form>
  </div>
</template>

<style scoped></style>
