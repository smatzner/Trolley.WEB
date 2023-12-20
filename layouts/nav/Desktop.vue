<template>
  <PrimeMenubar :model="items" class="rounded-3xl bg-white m-2 pl-5 border-0 shadow">
    <template #item="{item, props}">
      <a v-bind="props.action">{{ item.label }}</a>
    </template>
    <template #end>
      <PrimeButton text rounded severity="secondary" @click="visibleUserMenu = true" aria-haspopup="true"
                   aria-controls="userMenu"
                   aria-label="User" class="place-content-center w-20">
        <Icon name="fa6-solid:user" class="text-lg"></Icon>
      </PrimeButton>
    </template>
  </PrimeMenubar>

  <UserMenu v-model:visible="visibleUserMenu" @closeUserMenu="visibleUserMenu = false"/>
</template>

<script setup lang="ts">
const userMenu = ref();
const visibleUserMenu = ref(false)

const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isLoggedIn)


const items = computed(() => {
  if (isLoggedIn.value) {
    return [
      {label: 'Home', command: () => navigateTo('/')},
      {label: 'Einkaufslisten', command: () => navigateTo('/shoppinglists')}
    ]
  } else {
    return[
        {label: 'Home', command: () => navigateTo('/')}
    ]
  }
})


</script>
