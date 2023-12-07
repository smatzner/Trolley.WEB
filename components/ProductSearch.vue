<script setup lang="ts">
import {useAsyncData} from "#app";

const productStore = useProductStore()
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

async function addProductToShoppingList() {
  if (typeof selectedProduct.value === 'object') {
    selectedProduct.value = selectedProduct.value.productName
  }
  useAsyncData(async () => await productStore.addProductToShoppingList(selectedProduct.value,1))
  selectedProduct.value = ''
}
</script>

<template>
  <PrimeSidebar header="Produkt hinzufügen" position="bottom"
                class="h-1/3 rounded-t-2xl">
    <div class="flex justify-center">
      <form @submit.prevent="addProductToShoppingList()" class="flex flex-column gap-2">
        <PrimeAutoComplete v-model="selectedProduct" optionLabel="productName" :suggestions="filteredProducts"
                           @complete="search" placeholder="Produkt suchen" inputClass="text-sm"/>
        <PrimeButton type="submit" label="Hinzufügen" class="bg-trolley-primary" size="small"/>
      </form>
    </div>
  </PrimeSidebar>
</template>

<style scoped>

</style>