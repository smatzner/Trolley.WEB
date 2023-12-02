<script setup lang="ts">

import {useAsyncData} from "#app";

const userMenu = ref()
const userMenuItems = ref([
  {
    label: 'Login',
    route: '/auth/login'
  },
  {
    label: 'Registrieren',
    route: '/auth/register'
  }
])

const visibleSearchField = ref(false)
const toggle = (e: any) => userMenu.value.toggle(e)
const productStore = useProductStore()

onBeforeMount(async () => {
  await productStore.loadProducts()
})

const products = computed(() => productStore.products)
const selectedProduct = ref()
const filteredProducts = ref()

const search = (e: any): any => {
  setTimeout(() => {
    if (!e.query.trim().length) {
      filteredProducts.value = [...products.value]
    } else {
      filteredProducts.value = products.value.filter((product: any) => {
        if (product.isOrganic) {
          return product.productName.toLowerCase().startsWith(e.query.toLowerCase())
        }
      })
    }
  }, 250)
}

async function addProductToShoppingList(){
  if(typeof selectedProduct.value  === 'object'){
    selectedProduct.value = selectedProduct.value.productName
  }
  useAsyncData(async () => await productStore.loadProductByName(selectedProduct.value))
  selectedProduct.value = ''
}

</script>

<template>
  <PrimeToolbar class="fixed bottom-0 w-full rounded-t-2xl menubar-shadow bg-white">
    <template #start>
      <PrimeButton text rounded severity="secondary" aria-label="Einstellungen" class="place-content-center w-20">
        <NuxtLink to="/settings">
          <Icon name="fa6-solid:gear" class="text-lg"></Icon>
        </NuxtLink>
      </PrimeButton>
    </template>
    <template #center>
      <PrimeButton text rounded severity="secondary" aria-label="Suche" class="place-content-center w-20"
                   @click="visibleSearchField = true">
        <Icon name="fa6-solid:magnifying-glass" class="text-lg"></Icon>
      </PrimeButton>
    </template>
    <template #end>
      <PrimeButton text rounded severity="secondary" @click="toggle" aria-haspopup="true" aria-controls="userMenu"
                   aria-label="User" class="place-content-center w-20">
        <Icon name="fa6-solid:user" class="text-lg"></Icon>
      </PrimeButton>
      <PrimeMenu ref="userMenu" id="userMenu" :model="userMenuItems" :popup="true">
        <template #item="{item}">
          <NuxtLink :to="item.route">{{ item.label }}</NuxtLink>
        </template>
      </PrimeMenu>
    </template>
  </PrimeToolbar>

  <PrimeSidebar v-model:visible="visibleSearchField" header="Produkt hinzufügen" position="bottom" class="h-1/3 rounded-t-2xl">
    <div class="flex justify-center">
      <form @submit.prevent="addProductToShoppingList()" class="flex flex-column gap-2">
        <PrimeAutoComplete v-model="selectedProduct" optionLabel="productName" :suggestions="filteredProducts" @complete="search" placeholder="Produkt suchen" inputClass="text-sm"/>
        <PrimeButton type="submit" label="Hinzufügen" class="bg-trolley-primary" size="small"/>
      </form>
    </div>
  </PrimeSidebar>

</template>

<style scoped>
.menubar-shadow {
  box-shadow: 0 0 82px 0 rgba(10, 14, 18, 0.10);
}
</style>