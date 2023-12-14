<script setup lang="ts">
const authStore = useAuthStore()

const links = computed(() => {
  if (authStore.isLoggedIn) {
    return [
      {label: 'Profil', route: '/'},
      {label: 'Einkaufslisten', route: '/shoppinglists'},
      {label: 'Logout', route: '/'},
      {label: 'Go Premium', route: '/donation'}
    ]
  } else {
    return [
      {label: 'Login', command: () => login()},
      {label: 'Registrieren', command: () => register()}
    ]
  }
})

const emit = defineEmits(['closeUserMenu','login'])

function login() {
  authStore.loginDialog = true
  emit('closeUserMenu')
}

function register(){
  authStore.registrationDialog = true
  emit('closeUserMenu')
}

function logout() {
  authStore.logout()
  emit('closeUserMenu')
}

</script>

<template>
  <PrimeSidebar :position="$device.isMobile ? 'bottom' : 'right'" class="rounded-2xl" :class="$device.isMobile ? 'h-1/2' : 'lg:w-1/3 md:w-1/2 w-full'" header="User">
    <div class="mx-auto grid content-center gap-4 w-2/3 h-full">
      <template v-for="link in links">
        <template v-if="authStore.isLoggedIn">
          <PrimeButton v-if="link.label === 'Logout'" :label="link.label" @click="logout()"
                       class="bg-trolley-primary border-trolley-primary"/>
          <NuxtLink v-else :to="link.route" @click="emit('closeUserMenu')">
            <PrimeButton :label="link.label" class="w-full" :class="link.label === 'Go Premium' ? 'bg-trolley-accent border-trolley-accent' : 'bg-trolley-primary border-trolley-primary'"/>
          </NuxtLink>
        </template>
          <PrimeButton v-else :label="link.label" @click="link.command" class="bg-trolley-primary border-trolley-primary w-full"/>
      </template>
    </div>
  </PrimeSidebar>
</template>

<style scoped>

</style>