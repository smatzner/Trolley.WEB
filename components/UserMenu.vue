<script setup lang="ts">
const authStore = useAuthStore()

const links = computed(() => {
  if (authStore.isLoggedIn) {
    return [
      {label: 'Profil', route: '/'},
      {label: 'Einkaufslisten', route: '/shoppinglists'},
      {label: 'Logout', route: '/'},
      {label: 'Go Premium', route: '/'}
    ]
  } else {
    return [
      {label: 'Login', route: '/auth/login'},
      {label: 'Registrieren', route: '/auth/register'}
    ]
  }
})

const emit = defineEmits(['closeUserMenu'])

function logout() {
  authStore.logout()
  emit('closeUserMenu')
}

</script>

<template>
  <PrimeSidebar position="bottom" class="h-1/2 rounded-t-2xl" header="User">
    <div class="mx-auto grid content-center gap-4 w-2/3 h-full">
      <template v-for="link in links">
        <template v-if="authStore.isLoggedIn">
          <PrimeButton v-if="link.label === 'Logout'" :label="link.label" @click="logout()"
                       class="bg-trolley-primary border-trolley-primary"/>
          <NuxtLink v-else :to="link.route" @click="emit('closeUserMenu')">
            <PrimeButton :label="link.label" class="w-full" :class="link.label === 'Go Premium' ? 'bg-trolley-accent border-trolley-accent' : 'bg-trolley-primary border-trolley-primary'"/>
          </NuxtLink>
        </template>
        <NuxtLink v-else :to="link.route">
          <PrimeButton :label="link.label" class="bg-trolley-primary border-trolley-primary w-full"/>
        </NuxtLink>
      </template>
    </div>
  </PrimeSidebar>
</template>

<style scoped>

</style>