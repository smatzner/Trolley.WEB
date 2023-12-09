<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/AuthStore'; // Importiere den AuthStore
import ProductSearch from "~/components/ProductSearch.vue";
import Menu from 'primevue/menu';

const authStore = useAuthStore();
const userMenu = ref();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push('/'); // Optional: Leite den Benutzer nach dem Logout um
};

const userMenuItems = computed(() => {
  return authStore.isLoggedIn
    ? [{ label: 'Logout', command: logout }, { separator: true },
    { label: 'Einstellungen', route: '/settings' }
    ]
    : [
      { label: 'Login', route: '/auth/login' }, { separator: true },
      { label: 'Registrieren', route: '/auth/register' }
    ];
});


const toggle = (e: any) => userMenu.value.toggle(e);
const visibleSearchField = ref(false);
</script>

<template>
  <PrimeToolbar class="fixed bottom-0 w-full rounded-t-2xl menubar-shadow bg-white">
    <template #start>
      <NuxtLink to="/settings">
        <PrimeButton text rounded severity="secondary" aria-label="Einstellungen" class="place-content-center w-20">
          <Icon name="fa6-solid:gear" class="text-lg"></Icon>
        </PrimeButton>
      </NuxtLink>
    </template>
    <template #center>
      <PrimeButton text rounded severity="secondary" aria-label="Suche" class="place-content-center w-20"
        @click="visibleSearchField = true">
        <Icon name="fa6-solid:magnifying-glass" class="text-lg"></Icon>
      </PrimeButton>
    </template>
    <template #end>
      <PrimeButton text rounded severity="secondary" @click="toggle" aria-haspopup="true" aria-controls="userMenu"
        aria-label="User" class="place-content-center w-20">
        <Icon name="fa6-solid:user" class="text-lg"></Icon>
      </PrimeButton>
      <PrimeMenu ref="userMenu" id="userMenu" :model="userMenuItems" :popup="true">
        <template #item="{ item }">
          <button v-if="item.label === 'Logout'" @click="logout">{{ item.label }}</button>
          <NuxtLink v-else :to="item.route">{{ item.label }}</NuxtLink>
        </template>
      </PrimeMenu>
    </template>
  </PrimeToolbar>

  <ProductSearch v-model:visible="visibleSearchField" />
</template>

<style scoped>
.menubar-shadow {
  box-shadow: 0 0 82px 0 rgba(10, 14, 18, 0.10);
}
</style>