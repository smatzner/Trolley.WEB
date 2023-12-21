<script setup lang="ts">
const productStore = useProductStore()
const products = computed(() => productStore.products)
const selectedProduct = ref()
const filteredProducts = ref()

const search = (e: any): any => {
  setTimeout(() => {
    if (!e.query.trim().length) {
      filteredProducts.value = [...products.value]
    } else {
      filteredProducts.value = products.value.filter((product: any) => {
        if (product.isOrganic) {
          return product.productName.toLowerCase().startsWith(e.query.toLowerCase())
        }
      })
    }
  }, 250)
}

const organic = ref(false)
const discount = ref(false)
const amount = ref(1)

watch(organic, () => {
  if (organic.value) discount.value = false
})
watch(discount, () => {
  if (discount.value) organic.value = false
})

const shoppingListProduct = ref({
  productName: '',
  isDiscountProduct: false,
  isOrganic: false,
  amount: 0,
})

async function addProductToShoppingList() {
  if (typeof selectedProduct.value === 'object') {
    selectedProduct.value = selectedProduct.value.productName
  }
  shoppingListProduct.value = {
    productName: selectedProduct.value,
    isDiscountProduct: discount.value,
    isOrganic: organic.value,
    amount: amount.value
  }

  useAsyncData(async () => await productStore.addProductToShoppingList(shoppingListProduct.value))
  selectedProduct.value = ''
  amount.value = 1
}

</script>

<template>
  <div class="flex justify-center">
    <form @submit.prevent="addProductToShoppingList()">
      <div class="flex">
        <PrimeAutoComplete
            v-model="selectedProduct"
            optionLabel="productName"
            :suggestions="filteredProducts"
            @complete="search"
            placeholder="Produkt suchen"
            emptySearchMessage="Kein Ergebnis"
            class="h-8 w-36"
            inputClass="text-sm w-36 rounded-2xl"
            panelClass="rounded-3xl"
            :pt="{
              emptyMessage: {class: 'p-3 text-center'}
            }"
        />
        <PrimeInputNumber
            v-model="amount"
            inputId="horizontal-buttons"
            showButtons
            buttonLayout="horizontal"
            :min="1"
            class="ms-2 me-12"
            inputClass="text-sm text-center w-10 h-8"
            decrementButtonClass="w-1/2 h-8 bg-trolley-primary border-trolley-primary rounded-l-2xl"
            incrementButtonClass="w-1/2 h-8 bg-trolley-primary border-trolley-primary rounded-r-2xl"
        >
          <template #decrementbuttonicon>-</template>
          <template #incrementbuttonicon>+</template>
        </PrimeInputNumber>
        <PrimeButton
            v-if="!$device.isMobile"
            type="submit"
            label="Hinzufügen"
            class="bg-trolley-primary border-trolley-primary h-8 rounded-2xl"
            size="small"
        />
      </div>

      <div class="flex justify-center mx-auto w-1/3 mt-3 gap-2" :class="$device.isMobile ? 'flex-col item-start' : ''">
        <div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer" v-model="organic">
            <div
                class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-trolley-primary"></div>
            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Bio</span>
          </label>
        </div>
        <div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer" v-model="discount">
            <div
                class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-trolley-primary"></div>
            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Diskonter</span>
          </label>
        </div>
      </div>
      <div v-if="$device.isMobile" class="flex mt-3">
        <PrimeButton type="submit" label="Hinzufügen"
                     class="bg-trolley-primary border-trolley-primary h-8 mx-auto rounded-3xl"/>
      </div>
    </form>
  </div>
</template>