<script setup lang="ts">
const shoppingListStore = useShoppingListStore()
const shoppingLists = computed(() => shoppingListStore.shoppingLists.shoppingLists)
const shoppingListsProducts = computed(() => shoppingListStore.shoppingListsProducts.totalCostPerMarket.items)

const productStore = useProductStore()

onBeforeMount(async () => {
  await shoppingListStore.getShoppingLists()
})
</script>

<template>
<!--  {{ shoppingListsProducts }}-->

  <PrimeFieldset v-for="shoppingList in shoppingLists" :legend="shoppingList.name" toggleable collapsed>
    <PrimeListbox :options="shoppingListsProducts">
      <template #option="{option}">
        {{option}}

      </template>
    </PrimeListbox>
  </PrimeFieldset>


</template>

<style scoped>

</style>