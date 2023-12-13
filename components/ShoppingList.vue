<script setup lang="ts">

const productStore = useProductStore()
const productsInShoppingList = computed(() => productStore.productsInShoppingList)
const categories = computed(() => productStore.categories)
const costsPerMarket = computed(() => productStore.costsPerMarket)

const marketItems = ref(costsPerMarket.value.map(market => ({marketName: market.marketName})))
const selectedMarket = ref()
const totalPrice = ref(0)

const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isLoggedIn)

const shoppingListStore = useShoppingListStore()
const visibleDialog = ref(false)
const shoppingListName = ref({
  name: ''
})


watch(costsPerMarket, () => {
  if (costsPerMarket.value.length > 0) {
    selectedMarket.value = costsPerMarket.value.reduce((prev, curr) => prev.totalPrice < curr.totalPrice ? prev : curr).marketName
    totalPrice.value = Math.round(costsPerMarket.value.reduce((prev, curr) => prev.totalPrice < curr.totalPrice ? prev : curr).totalPrice * 100) / 100
  } else {
    selectedMarket.value = ''
    totalPrice.value = 0
  }
})

const items = ref([
  {
    label: 'Gesamtkosten',
  },
  {
    label: 'Einkaufsliste speichern'
  }
])

async function saveShoppingList() {
  await shoppingListStore.saveShoppingList(productStore.shoppingList, shoppingListName.value)
  navigateTo('/shoppinglists')
}

function updatePrice() {
  console.log(selectedMarket.value)
  costsPerMarket.value.find((market) => {
    if (market.marketName === selectedMarket.value) {
      totalPrice.value = Math.round(market.totalPrice * 100) / 100
    }
  })
}

</script>

<template>
  <PrimeFieldset v-for="category in categories" :legend="category" :toggleable="true"
                 class="mt-3 border-0 shadow-md w-vh">
    <div class="grid grid-cols-3 gap-1 fieldset-container">
      <template v-for="product in productsInShoppingList">
        <Product v-if="product.productCategoryName == category" :product="product"/>
      </template>
    </div>
  </PrimeFieldset>

  <PrimeSpeedDial :model="items" direction="left" class="fixed bottom-[100px] right-5 drop-shadow-2xl"
                  buttonClass="bg-trolley-primary border-trolley-primary" :rotateAnimation="false"
                  :hideOnClickOutside="false">
    <template #icon>
      <Icon name="fa6-solid:cart-shopping"/>
    </template>
    <template #item="{item}">
      <PrimeInputGroup v-if="item.label === 'Gesamtkosten'">
        <PrimeDropdown v-model="selectedMarket" optionValue="marketName" @change="updatePrice" class="w-32"
                       :options="marketItems"
                       optionLabel="marketName" text rounded raised></PrimeDropdown>
        <PrimeInputGroupAddon>{{ totalPrice }} €</PrimeInputGroupAddon>
      </PrimeInputGroup>
      <PrimeButton v-if="item.label === 'Einkaufsliste speichern' && isLoggedIn && productsInShoppingList.length > 0" @click="visibleDialog = true"
                   class="bg-trolley-primary border-trolley-primary">
        <Icon name="fa6-solid:floppy-disk"/>
      </PrimeButton>
    </template>
  </PrimeSpeedDial>

  <PrimeDialog v-model:visible="visibleDialog" modal dismissableMask header="Einkaufsliste speichern" class="m-4">
    <form @submit.prevent="saveShoppingList()">
      <PrimeInputText class="w-48 h-12" v-model="shoppingListName.name" placeholder="Bezeichnung"/>
      <PrimeButton type="submit" class="ms-3 h-12 bg-trolley-primary border-trolley-primary">
        <Icon name="fa6-solid:floppy-disk"/>
      </PrimeButton>
    </form>
  </PrimeDialog>
</template>

<style scoped>

</style>