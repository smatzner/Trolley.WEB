<script setup lang="ts">

const productStore = useProductStore()
const products = computed(() => productStore.productsInShoppingList)
const categories = computed(() => productStore.categories)

const items = ref([
  {
    label: 'check',
    icon: 'fa6-solid:check',
    totalPrice: 56.6
  }
])

const marketItems = ref([
  {name: 'Spar'},
  {name: 'Billa'}
])
const selectedMarket = ref()

</script>

<template>
  <PrimeFieldset v-for="category in categories" :legend="category" :toggleable="true" class="mt-3 border-0 shadow-md w-vh">
    <div class="grid grid-cols-3 gap-1 fieldset-container">
      <template v-for="product in products">
        <Product v-if="product.productCategoryName == category" :product="product"/>
      </template>
    </div>
  </PrimeFieldset>

  <PrimeSpeedDial :model="items" direction="left" class="fixed bottom-[100px] right-5 drop-shadow-2xl"
                  buttonClass="bg-trolley-primary border-trolley-primary" :rotateAnimation="false" :hideOnClickOutside="false" >
    <template #icon>
      <Icon name="fa6-solid:cart-shopping"/>
    </template>
    <template #item="slotProps">
      <PrimeInputGroup>
        <PrimeButton><Icon :name="slotProps.item.icon"/></PrimeButton>
        <PrimeDropdown label="Spar" v-model="selectedMarket" class="w-40" :options="marketItems" optionLabel="name" text rounded raised></PrimeDropdown>
        <PrimeInputGroupAddon>{{slotProps.item.totalPrice}} €</PrimeInputGroupAddon>
      </PrimeInputGroup>
    </template>
  </PrimeSpeedDial>
</template>

<style scoped>

</style>