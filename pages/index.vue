<script setup lang="ts">
import {useProductStore} from "#imports";
import Product from "~/components/Product.vue";

const icons = [
  {
    name: 'Heidelbeeren',
    path: '/icons/blueberries.svg'
  },
  {
    name: 'Camembert',
    path: '/icons/cheesse.svg'
  },
  {
    name: 'Milch',
    path: '/icons/milk.svg'
  },
]

const productStore = useProductStore()
const products = productStore.products
const categories = productStore.categories

</script>

<template>
<!--  <h1>Obst & Gemüse</h1>-->
<!--  <div class="mx-auto flex justify-center">-->
<!--    <PrimeButton v-for="icon in icons" :style="{ backgroundImage: `url(${icon.path})` }"-->
<!--                 class="bg-trolley-primary m-4 icon-button text-white">-->
<!--    </PrimeButton>-->
<!--  </div>-->

  <PrimeFieldset v-for="category in categories" :legend="category" :toggleable="true" class="mt-3">
    <template v-for="product in products">
      <Product v-if="product.categoryName == category" :product="product"/>
    </template>
  </PrimeFieldset>


</template>

<style scoped>

</style>