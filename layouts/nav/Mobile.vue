<script setup lang="ts">

const visibleSearchField = ref(false)
const visibleUserMenu = ref(false)

const route = useRoute()
const currentRoute = computed(() => route.path)

const toast = useToast()
const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isLoggedIn)

function toggleSearchField() {
  visibleSearchField.value = true
  if (currentRoute.value !== '/') navigateTo('/')
}

const visibleToolTip = ref(true)
onMounted(() => {
  if (visibleToolTip.value && !isLoggedIn.value && !localStorage.getItem('shoppingList')) {
    toast.add({severity: 'custom', summary: 'Hier klicken, um Einkaufsliste zu erstellen', group: 'tooltip', life: 10000})
  }
})

watch(visibleToolTip, () => {
  if (!visibleToolTip.value) {
    toast.remove({group: 'tooltip'})
  }
})

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
                   @click="[toggleSearchField(), visibleToolTip = false]">
        <Icon name="fa6-solid:magnifying-glass" class="text-lg"></Icon>
      </PrimeButton>
    </template>
    <template #end>
      <PrimeButton text rounded severity="secondary" @click="visibleUserMenu = true" aria-haspopup="true"
                   aria-controls="userMenu"
                   aria-label="User" class="place-content-center w-20">
        <Icon name="fa6-solid:user" class="text-lg"></Icon>
      </PrimeButton>
    </template>
  </PrimeToolbar>

  <ProductSearch v-model:visible="visibleSearchField"/>

  <UserMenu v-model:visible="visibleUserMenu" @closeUserMenu="visibleUserMenu = false"/>

  <PrimeToast
      position="bottom-center"
      group="tooltip"
      :pt="{
        root: {class : 'rounded-3xl mb-16 w-5/6'},
        container: {class: 'rounded-3xl animate-bounce'}
      }"
  >
    <template #container="{ message, closeCallback }">
      <div class="flex flex-col gap-3 p-3 mx-auto bg-black shadow-2 rounded-3xl px-5">
        <div class="flex justify-center">
          <p class="m-0 font-semibold text-base text-sm text-white">{{ message.summary }}</p>
        </div>
        <div class="flex justify-center">
          <Icon name="fa6-solid:arrow-down" class="text-white"/>
        </div>
      </div>
    </template>
  </PrimeToast>

</template>

<style scoped>
.menubar-shadow {
  box-shadow: 0 0 82px 0 rgba(10, 14, 18, 0.10);
}
</style>