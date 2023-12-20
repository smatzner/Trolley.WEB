<script setup lang="ts">
import {useDonationStore} from "~/stores/DonationStore";

const authStore = useAuthStore()
const role = computed(() => authStore.role)
const donationStore = useDonationStore()

const links = computed(() => {
  let items = []
  if (!authStore.isLoggedIn) {
    items.push(
        {label: 'Login', command: () => login()},
        {label: 'Registrieren', command: () => register()}
    )
    return items
  } else {
    if (role.value === 'Admin') {
      items.push({label: 'Admin', route: '/admin'})
    }
    if (role.value === 'ShopOwner' || role.value === 'Admin'){
      items.push({label: 'Shop', route: '/user/shop'})
    }
    items.push(
        {label: 'Profil', route: '/user/profile'},
        {label: 'Einkaufslisten', route: '/shoppinglists'},
        {label: 'Logout', route: '/'},
    )
    if(role.value === 'User'){
      items.push({label: 'Go Premium', command: () => goPremium()})
    }
  }

  return items
})


const emit = defineEmits(['closeUserMenu', 'login'])

const toast = useToast()

function login() {
  authStore.loginDialog = true
  emit('closeUserMenu')
}

function register() {
  authStore.registrationDialog = true
  emit('closeUserMenu')
}

function logout() {
  authStore.logout()
  emit('closeUserMenu')
  toast.add({severity: 'custom', summary: 'Abmeldung erfolgreich', group: 'auth', life: 2000})
}

function goPremium() {
  donationStore.donationDialog = true
  emit('closeUserMenu')
}

</script>

<template>
  <PrimeSidebar :position="$device.isMobile ? 'bottom' : 'right'" class="rounded-2xl"
                :class="$device.isMobile ? 'h-1/2' : 'lg:w-1/3 md:w-1/2 w-full'" header="User">
    <div class="mx-auto grid content-center gap-4 w-2/3 h-full">
      <template v-for="link in links">
        <template v-if="authStore.isLoggedIn">
          <NuxtLink :to="link.route" v-if="link.label === 'Logout'" @click="logout()">
            <PrimeButton :label="link.label" class="bg-trolley-primary border-trolley-primary w-full rounded-3xl"/>
          </NuxtLink>
          <NuxtLink v-else :to="link.route" @click="emit('closeUserMenu')">
            <PrimeButton
                :label="link.label"
                class="w-full rounded-3xl"
                @click="link.command"
                :class="link.label === 'Go Premium' ? 'bg-gradient-to-r from-green-400 to-trolley-accent hover:from-trolley-accent hover:to-green-400 border-0' : 'bg-trolley-primary border-trolley-primary'"
            />
          </NuxtLink>

        </template>
        <PrimeButton v-else :label="link.label" @click="link.command"
                     class="bg-trolley-primary border-trolley-primary w-full rounded-3xl"/>
      </template>
    </div>
  </PrimeSidebar>


</template>

<style scoped>

</style>