<script setup lang="ts">
const shoppingListStore = useShoppingListStore()
const shoppingLists = computed(() => shoppingListStore.shoppingLists)

const productStore = useProductStore()
const products = computed(() => productStore.products)

onMounted(async () => {
  await shoppingListStore.getShoppingLists()
  await productStore.loadProducts()
})

function findProductNameByProductId(productId: any) {
  return products.value.find(product => product.productId === productId)?.productName
}

async function deleteShoppingList(shoppingListId: number) {
  await shoppingListStore.deleteShoppingList(shoppingListId)
}

function useShoppingList(shoppingList: Object) {
  shoppingListStore.useShoppingList(shoppingList)
  navigateTo('/')
}

</script>

<template>
  <h1 class="text-3xl font-bold m-5 text-center">Einkaufslisten</h1>
  <PrimeAccordion :activeIndex="0">
    <PrimeAccordionTab v-for="shoppingList in shoppingLists">
      <template #header>
        <div class="flex justify-between w-full">
          <p class="my-auto">{{ shoppingList.name }}</p>
          <div class="flex gap-2">
            <PrimeButton @click="deleteShoppingList(shoppingList.id)" class="bg-red-800 border-red-800" size="small">
              <Icon name="fa6-solid:trash"></Icon>
            </PrimeButton>
            <PrimeButton @click="useShoppingList(shoppingList)" class="bg-trolley-primary border-trolley-primary"
                         size="small">
              <Icon name="fa6-solid:file-import"></Icon>
            </PrimeButton>
          </div>
        </div>
      </template>
      <PrimeListbox :options="shoppingList.items">
        <template #option="product">
          <div class="flex justify-between">
            <p>{{ findProductNameByProductId(product.option.productId) }}</p>
            <PrimeBadge :value="product.option.amount" class="bg-trolley-primary"/>
          </div>
        </template>
      </PrimeListbox>
    </PrimeAccordionTab>
  </PrimeAccordion>
  </template>

<style scoped>

</style>