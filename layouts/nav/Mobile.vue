<script setup lang="ts">

const visibleSearchField = ref(false)
const visibleUserMenu = ref(false)

const route = useRoute()
const currentRoute = computed(() => route.path)

function toggleSearchField(){
  visibleSearchField.value = true
  if(currentRoute.value !== '/') navigateTo('/')
}

</script>

<template>

  <PrimeToolbar class="fixed bottom-0 w-full rounded-t-3xl menubar-shadow bg-white">
    <template #start>
      <NuxtLink to="/">
        <PrimeButton text rounded severity="secondary" aria-label="Home" class="place-content-center w-20">
          <Icon name="fa6-solid:house" class="text-lg"></Icon>
        </PrimeButton>
      </NuxtLink>
    </template>
    <template #center>
      <PrimeButton text rounded severity="secondary" aria-label="Suche" class="place-content-center w-20"
        @click="toggleSearchField()">
        <Icon name="fa6-solid:magnifying-glass" class="text-lg"></Icon>
      </PrimeButton>
    </template>
    <template #end>
      <PrimeButton text rounded severity="secondary" @click="visibleUserMenu = true" aria-haspopup="true" aria-controls="userMenu"
        aria-label="User" class="place-content-center w-20">
        <Icon name="fa6-solid:user" class="text-lg"></Icon>
      </PrimeButton>
    </template>
  </PrimeToolbar>

  <ProductSearch v-model:visible="visibleSearchField"/>

  <UserMenu v-model:visible="visibleUserMenu" @closeUserMenu="visibleUserMenu = false"/>

</template>

<style scoped>
.menubar-shadow {
  box-shadow: 0 0 82px 0 rgba(10, 14, 18, 0.10);
}
</style>