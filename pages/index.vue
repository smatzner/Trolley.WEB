<script setup>

const productStore = useProductStore()

onBeforeMount(async () => {
  await productStore.loadProducts()
})
</script>

<template>
  <ShoppingList/>
</template>

<style scoped>

</style>