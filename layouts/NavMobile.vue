<script setup lang="ts">

const menu = ref()
const userItems = ref([
  {
    label: 'Login'
  },
  {
    label: 'Registrieren'
  }
])
const toggle = (e) => menu.value.toggle(e)
</script>

<template>
  <PrimeToolbar class="fixed bottom-0 z-50 w-full rounded-t-2xl menubar-shadow bg-white">
    <template #start>
      <PrimeButton text rounded severity="secondary" aria-label="Einstellungen" class="place-content-center w-28">
        <Icon name="fa6-solid:gear" class="text-2xl"></Icon>
      </PrimeButton>
    </template>
    <template #center>
      <PrimeButton text rounded severity="secondary" aria-label="Suche" class="place-content-center w-28">
        <Icon name="fa6-solid:magnifying-glass" class="text-2xl"></Icon>
      </PrimeButton>
    </template>
    <template #end>
      <PrimeButton text rounded severity="secondary" @click="toggle" aria-haspopup="true" aria-controls="userMenu" aria-label="User" class="place-content-center w-28">
        <Icon name="fa6-solid:user" class="text-2xl"></Icon>
      </PrimeButton>
      <PrimeMenu ref="menu" id="userMenu" :model="userItems" :popup="true"></PrimeMenu>
    </template>
  </PrimeToolbar>
</template>

<style scoped>
.menubar-shadow {
  box-shadow: 0 0 82px 0 rgba(10, 14, 18, 0.10);
}
</style>