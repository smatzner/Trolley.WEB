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
    <span class="text-sm mt-2">{{ product.productName }}</span>
  </PrimeButton>
</template>

<style scoped>

</style>