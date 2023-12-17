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

const toast = useToast()

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
  try{
    await shoppingListStore.saveShoppingList(productStore.shoppingList, shoppingListName.value)
    toast.add({severity: 'custom', summary: 'Einkaufsliste gespeichert', group: 'headless', life: 3000})
    visibleDialog.value = false
  } catch (e) {
    console.error(e)
  }

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
  <AddProductForm v-if="!$device.isMobile"/>
  <PrimeFieldset v-for="category in categories" :legend="category" :toggleable="true"
                 class="mt-3 border-0 shadow-md sm:w-[418px] w-[360px] lg:w-[520px] mx-auto">
    <div class="grid grid-cols-3 lg:grid-cols-4 gap-2 justify-items-center">
      <template v-for="product in productsInShoppingList">
        <Product v-if="product.productCategoryName == category" :product="product"/>
      </template>
    </div>
  </PrimeFieldset>

  <PrimeSpeedDial :model="items" direction="left" class="fixed right-5 drop-shadow-2xl"
                  :class="$device.isMobile ? 'bottom-[100px]' : 'bottom-5'"
                  buttonClass="bg-trolley-primary border-trolley-primary" :rotateAnimation="false"
                  :hideOnClickOutside="false" :visible="!$device.isMobile">
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
      <PrimeButton v-if="item.label === 'Einkaufsliste speichern' && isLoggedIn && productsInShoppingList.length > 0"
                   @click="visibleDialog = true"
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

  <PrimeToast position="top-center" group="headless">
    <template #container="{ message, closeCallback }">
        <div class="flex flex-col gap-3 p-3 w-full bg-black shadow-2 rounded-xl">
          <div class="flex justify-between">
            <p class="m-0 font-semibold text-base text-white">{{ message.summary }}</p>
            <PrimeButton text class="text-white p-0" @click="closeCallback">
              <Icon name="fa6-solid:xmark"/>
            </PrimeButton>
          </div>
          <div class="mx-auto gap-3">
            <PrimeButton size="small" class="text-trolley-accent" text @click="navigateTo('/shoppinglists')">
              <Icon name="fa6-solid:right-to-bracket"/>
              <span class="ms-3 font-semibold">Zu Einkaufslisten</span>
            </PrimeButton>
            <PrimeButton label="Schließen" size="small" class="text-white" text @click="closeCallback"/>
          </div>
        </div>
    </template>
  </PrimeToast>
</template>

<style scoped>

</style>
