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
const bouncingElement = ref(false)

watch(costsPerMarket, () => {
  if (costsPerMarket.value.length > 0) {
    selectedMarket.value = costsPerMarket.value.reduce((prev, curr) => prev.totalPrice < curr.totalPrice ? prev : curr).marketName

    if(totalPrice.value > 0){
      bouncingElement.value = true
      setTimeout(() => {
        bouncingElement.value = false
      }, 2000)
    }

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
  try {
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
  <PrimeFieldset
      v-for="category in categories"
      :legend="category"
      :toggleable="true"
      class="mt-3 sm:w-[418px] w-[360px] lg:w-[520px] mx-auto"
      :pt="{
        root: {class: 'border-0 shadow-lg rounded-2xl'},
        legend: {class: 'w-full bg-white border-0 rounded-2xl'},
        toggler: {class: 'w-full justify-start'}
      }"
  >
    <div class="grid grid-cols-3 lg:grid-cols-4 gap-2 justify-items-center">
      <template v-for="product in productsInShoppingList">
        <Product v-if="product.productCategoryName == category" :product="product"/>
      </template>
    </div>
  </PrimeFieldset>

  <PrimeSpeedDial
      :model="items"
      direction="left"
      class="fixed right-5 drop-shadow-2xl"
      :class="$device.isMobile ? 'bottom-[100px]' : 'bottom-5'"
      buttonClass="bg-trolley-primary border-trolley-primary"
      :rotateAnimation="false"
      :hideOnClickOutside="false"
      :visible="!$device.isMobile"
  >
    <template #icon>
      <Icon name="fa6-solid:cart-shopping"/>
    </template>
    <template #item="{item}">
      <PrimeInputGroup v-if="item.label === 'Gesamtkosten'"
                       :class="bouncingElement ? 'animate-bounce' : 'animate-none'">
        <PrimeDropdown
            v-model="selectedMarket"
            optionValue="marketName"
            @change="updatePrice"
            class="w-32 rounded-l-3xl pl-2"
            :options="marketItems"
            optionLabel="marketName"
            text
            rounded
            raised
            panelClass="rounded-3xl"
        />
        <PrimeInputGroupAddon class="rounded-r-3xl">{{ totalPrice }} €</PrimeInputGroupAddon>
      </PrimeInputGroup>
      <PrimeButton
          v-if="item.label === 'Einkaufsliste speichern' && isLoggedIn && productsInShoppingList.length > 0"
          @click="visibleDialog = true"
          class="bg-trolley-primary border-trolley-primary rounded-full h-[50px] w-[50px] p-0"
      >
        <Icon name="fa6-solid:floppy-disk" class="mx-auto"/>
      </PrimeButton>
    </template>
  </PrimeSpeedDial>

  <PrimeDialog
      v-model:visible="visibleDialog"
      modal
      dismissableMask
      header="Einkaufsliste speichern"
      class="m-4"
      :pt="{
        root: {class: 'rounded-3xl'},
        header: {class: 'rounded-t-3xl'},
        content: {class: 'rounded-b-3xl'},
        closeButton: {class: 'focus:ring-0'}
      }"
  >
    <form @submit.prevent="saveShoppingList()">
      <PrimeInputText class="w-48 h-12 rounded-3xl pl-5" v-model="shoppingListName.name" placeholder="Bezeichnung"/>
      <PrimeButton
          type="submit"
          class="ms-3 bg-trolley-primary border-trolley-primary border-0 rounded-full h-[50px] w-[50px] p-0"
      >
        <Icon name="fa6-solid:floppy-disk" class="mx-auto"/>
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
