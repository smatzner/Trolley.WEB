<script setup lang="ts">
const props = defineProps({
  product: {
    required: true,
    type: Object
  }
})


</script>

<template>
  <PrimeButton :style="{backgroundImage: `url(${product.icon})`}"
               class="bg-trolley-primary m-4 p-0 icon-button text-white justify-center items-end">
    <span class="text-xs p-2">{{product.subCategoryName}}</span>
  </PrimeButton>
</template>

<style scoped>
.icon-button {
  width: 100px;
  height: 100px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  //filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(9deg) brightness(106%) contrast(101%);
}
</style>