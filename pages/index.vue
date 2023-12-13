<script setup>
import {useAsyncData} from "#app";

const productStore = useProductStore()
onBeforeMount(async () => {
  console.log('index aufruf')
  await productStore.loadProducts()
  // useasyncData(async () => await productStore.loadProducts())
})
</script>

<template>
  <ShoppingList/>
</template>

<style scoped>

</style>