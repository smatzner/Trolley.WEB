<template>
  <PrimeMenubar :model="items">
    <template #item="{item, props}">
      <a class="" v-bind="props.action">{{ item.label }}</a>
    </template>
    <template #end>
      <PrimeButton text rounded severity="secondary" @click="visibleUserMenu = true" aria-haspopup="true" aria-controls="userMenu"
                   aria-label="User" class="place-content-center w-20">
        <Icon name="fa6-solid:user" class="text-lg"></Icon>
      </PrimeButton>
    </template>
  </PrimeMenubar>

  <UserMenu v-model:visible="visibleUserMenu" @closeUserMenu="visibleUserMenu = false" @login="login()"/>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const userMenu = ref();
const router = useRouter();

const visibleUserMenu = ref(false)

const emit = defineEmits(['login'])

function login(){
  emit('login')
}

const logout = () => {
  authStore.logout();
  router.push('/'); // Optional: Leite den Benutzer nach dem Logout um
};

const userMenuItems = computed(() => {
  return authStore.isLoggedIn
      ? [{label: 'Logout', command: logout},
        {label: 'Einstellungen', route: '/settings'}
      ]
      : [
        {label: 'Login', route: '/auth/login'},
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
