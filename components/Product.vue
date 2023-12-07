<script setup lang="ts">
const props = defineProps({
  product: {
    required: true,
    type: Object
  }
})

const productStore = useProductStore()

function removeProductFromShoppingList(){
  productStore.removeProductFromShoppingList(props.product.productId)
}
</script>

<template>
  <PrimeButton class="bg-trolley-primary flex-col text-white aspect-square" @click="removeProductFromShoppingList()">
    <Icon :name="'fa6-solid:'+ product.iconName" class="text-7xl"/>
    <span class="text-xs mt-1">{{ product.productName }}</span>
    <span class="text-xs mt-1">{{ product.amount }}</span>
  </PrimeButton>
</template>

<style scoped>

</style>