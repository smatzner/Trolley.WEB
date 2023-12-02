<script setup lang="ts">
const props = defineProps({
  product: {
    required: true,
    type: Object
  }
})
</script>

<template>
  <PrimeButton v-if="product.isOrganic" class="bg-trolley-primary flex-col text-white aspect-square">
    <Icon :name="'fa6-solid:'+ product.iconName" class="text-7xl"/>
    <span class="text-sm mt-2">{{ product.productName }}</span>
  </PrimeButton>
</template>

<style scoped>

</style>