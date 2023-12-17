<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const shoppingListStore = useShoppingListStore()
const shoppingLists = computed(() => shoppingListStore.shoppingLists)

const productStore = useProductStore()
const products = computed(() => productStore.products)

const confirm = useConfirm()

onBeforeMount(async () => {
  await shoppingListStore.getShoppingLists()
  await productStore.loadProducts()
})

function findProductNameByProductId(productId: any) {
  return products.value.find(product => product.productId === productId)?.productName
}

function deleteShoppingList(shoppingListId: number, event: any) {
  confirm.require({
    target: event.target,
    message: 'Willst du die Einkaufsliste wirklich löschen?',
    rejectLabel: 'Nein',
    rejectClass: 'text-black p-button-text',
    acceptLabel: 'Ja',
    acceptClass: 'bg-red-800 border-red-800 p-button-danger',
    accept: async () => {
      await shoppingListStore.deleteShoppingList(shoppingListId)
    }
  })
}

function useShoppingList(shoppingList: Object) {
  shoppingListStore.useShoppingList(shoppingList)
  navigateTo('/')
}

</script>

<template>
  <h1 class="text-3xl font-bold m-5 text-center">Einkaufslisten</h1>
  <PrimeConfirmPopup/>
  <div class="text-center" v-if="shoppingLists.length < 1">Keine Einkaufslisten gespeichert</div>
  <PrimeAccordion :activeIndex="0" class="2xl:w-1/2 xl:w-3/4 mx-auto">
    <PrimeAccordionTab v-for="shoppingList in shoppingLists">
      <template #header>
        <div class="flex justify-between w-full">
          <p class="my-auto">{{ shoppingList.name }}</p>
          <div class="flex gap-2">
            <PrimeButton
                @click="deleteShoppingList(shoppingList.id, $event)"
                class="bg-red-800 border-red-800"
                severity="danger" size="small"
            >
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