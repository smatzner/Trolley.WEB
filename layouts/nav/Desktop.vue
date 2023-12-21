<template>
  <PrimeMenubar
      :model="links"
      class="rounded-3xl bg-white m-2 pl-5 border-0 shadow"
      :pt="{
        content: {class: 'rounded-3xl'},
        menu: {class: 'rounded-3xl'}
      }"
  >
    <template #item="{item, props}">
      <NuxtLink v-bind="props.action" :to="item.route">{{ item.label }}</NuxtLink>
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
const role = computed(() => authStore.role)


const links = computed(() => {
  let items = [
    {label: 'Home', route: '/'}
  ]
  if (isLoggedIn.value) {
    if (role.value === 'Admin') {
      items.push({label: 'Admin', route: '/admin'})
    }
    if (role.value === 'ShopOwner' || role.value === 'Admin') {
      items.push({label: 'Shop', route: '/user/shop'})
    }
    items.push(
        {label: 'Einkaufslisten', route: '/shoppinglists'},
    )
  }

  return items
})


</script>
