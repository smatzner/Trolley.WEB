<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

function panelClass(props: any, parent: any, index: any) {
  return parent.state.d_activeIndex === index ? 'rounded-t-3xl' : 'rounded-3xl'
}

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
    group: 'pt',
    target: event.target,
    message: 'Willst du die Einkaufsliste wirklich löschen?',
    rejectLabel: 'Nein',
    rejectClass: 'text-black p-button-text rounded-3xl',
    acceptLabel: 'Ja',
    acceptClass: 'bg-red-800 border-red-800 p-button-danger rounded-3xl',
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
  <div class="text-center" v-if="shoppingLists.length < 1">Keine Einkaufslisten gespeichert</div>
  <PrimeAccordion class="2xl:w-1/2 xl:w-3/4 mx-auto">
    <PrimeAccordionTab
        v-for="(shoppingList, index) in shoppingLists"
        :pt="{
          root: {class: 'shadow-lg rounded-3xl mb-3'},
          headerAction: ({ props, parent }) => ({class: panelClass(props, parent, index) + ' bg-white border-0'}),
          content : {class: 'rounded-b-3xl border-0'}
        }"
    >
      <template #header>
        <div class="flex justify-between w-full">
          <p class="my-auto">{{ shoppingList.name }}</p>
          <div class="flex gap-2">
            <PrimeButton
                @click="deleteShoppingList(shoppingList.id, $event)"
                class="bg-red-800 border-red-800 rounded-3xl"
                severity="danger"
                size="small"
            >
              <Icon name="fa6-solid:trash"/>
            </PrimeButton>
            <PrimeButton
                @click="useShoppingList(shoppingList)"
                class="bg-trolley-primary border-trolley-primary rounded-3xl"
                size="small"
            >
              <Icon name="fa6-solid:file-import"/>
            </PrimeButton>
          </div>
        </div>
      </template>
      <PrimeListbox :options="shoppingList.items" class="rounded-3xl">
        <template #option="product">
          <div class="flex justify-between">
            <p>{{ findProductNameByProductId(product.option.productId) }}</p>
            <PrimeBadge :value="product.option.amount" class="bg-trolley-primary"/>
          </div>
        </template>
      </PrimeListbox>
    </PrimeAccordionTab>
  </PrimeAccordion>

  <PrimeConfirmPopup
    group="pt"
    :pt="{
      root: {class: 'rounded-3xl drop-shadow-lg'},
    }"
  >
    <template #icon>
      <Icon name="fa6-solid:triangle-exclamation" class="text-black" size="25"/>
    </template>
  </PrimeConfirmPopup>
</template>

<style scoped>

</style>