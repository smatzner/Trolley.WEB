<template>
  <PrimeMenubar :model="items">
    <template #item="{item, props}">
      <a class="" v-bind="props.action">{{ item.label }}</a>
    </template>
    <template #end>
      <PrimeButton text rounded severity="secondary" @click="toggle" aria-haspopup="true" aria-controls="userMenu"
                   aria-label="User" class="place-content-center w-20">
        <Icon name="fa6-solid:user" class="text-lg"></Icon>
      </PrimeButton>
      <PrimeMenu ref="userMenu" id="userMenu" :model="userMenuItems" :popup="true">
        <template #item="{ item, props }">
          <div v-bind="props.action">
            <button v-if="item.label === 'Logout'" @click="logout">{{ item.label }}</button>
            <NuxtLink v-else :to="item.route">{{ item.label }}</NuxtLink>

          </div>
        </template>
      </PrimeMenu>
    </template>
  </PrimeMenubar>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const userMenu = ref();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push('/'); // Optional: Leite den Benutzer nach dem Logout um
};

const userMenuItems = computed(() => {
  return authStore.isLoggedIn
      ? [{label: 'Logout', command: logout}, {separator: true},
        {label: 'Einstellungen', route: '/settings'}
      ]
      : [
        {label: 'Login', route: '/auth/login'}, {separator: true},
        {label: 'Registrieren', route: '/auth/register'}
      ];
});

const items = ref([
  {
    label: 'Home',
    command: () => navigateTo('/')
  },
  {
    label: 'Einstellungen',
    command: () => navigateTo('/settings')
  }
]);

const toggle = (e: any) => userMenu.value.toggle(e);
</script>
