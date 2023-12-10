<script setup lang="ts">

import {algorithms} from "iron-webcrypto";

const props = defineProps({
  product: {
    required: true,
    type: Object
  }
})

const productStore = useProductStore()
const menu = ref()
const items = ref([
  {
    label: 'Löschen',
    command: () => removeProductFromShoppingList()
  },
  {
    label: 'Anzahl',
    command: () => {
      productStore.updateProductFromShoppingList(props.product)
    }
  },
  {
    label: 'Bio',
    command: () => {
      props.product.isOrganic = !props.product.isOrganic
    }
  },
  {
    label: 'Diskonter',
    command: () => {
      props.product.isDiscountProduct = !props.product.isDiscountProduct
      productStore.updateProductFromShoppingList(props.product)
    }
  }
])

// watch(menu => console.log(menu))

function onRightClick(event: any) {
  console.log(event)
  menu.value.show(event)
}

function removeProductFromShoppingList() {
  productStore.removeProductFromShoppingList(props.product.productId)
}
</script>

<template>
  <PrimeButton class="bg-trolley-primary flex-col text-white aspect-square" @click="removeProductFromShoppingList()"
               @contextmenu="onRightClick">
    <Icon :name="'fa6-solid:'+ product.iconName" class="text-7xl"/>
    <span class="text-xs mt-1" v-if="product.isOrganic">Bio {{ product.productName }}</span>
    <span class="text-xs mt-1" v-else-if="product.isDiscountProduct">Diskonter {{ product.productName }}</span>
    <span class="text-xs mt-1" v-else>{{ product.productName }}</span>
    <span class="text-xs mt-1">{{ product.amount }}</span>
    <PrimeContextMenu ref="menu" :model="items">
            <template #item="{item, props}">
              <PrimeInputNumber v-if="item.label === 'Anzahl'" v-model="product.amount" v-bind="props.action" inputId="horizontal-buttons" showButtons buttonLayout="horizontal" :min="1" class="ms-2 me-12" inputClass="text-sm text-center w-10 h-8"
                                decrementButtonClass="w-1/3 h-8 bg-trolley-primary  border-trolley-primary" incrementButtonClass="w-1/3 h-8 bg-trolley-primary border-trolley-primary">
                <template #decrementbuttonicon>-</template>
                <template #incrementbuttonicon>+</template>
              </PrimeInputNumber>
              <span v-else class="mx-4 my-3" v-bind="props.action">{{item.label}}</span>
            </template>
    </PrimeContextMenu>
  </PrimeButton>
</template>

<style scoped>

</style>