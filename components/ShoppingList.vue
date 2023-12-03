<script setup lang="ts">

const productStore = useProductStore()
const products = computed(() => productStore.productsInShoppingList)
const categories = computed(() => productStore.categories)

</script>

<template>
  <PrimeFieldset v-for="category in categories" :legend="category" :toggleable="true" class="mt-3 border-0 shadow-md">
    <div class="grid grid-cols-3 gap-1 fieldset-container">
      <template v-for="product in products">
        <Product v-if="product.productCategoryName == category" :product="product"/>
      </template>
    </div>
  </PrimeFieldset>
</template>

<style scoped>

</style>