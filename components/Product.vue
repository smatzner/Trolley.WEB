<script setup lang="ts">

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
    command: () => removeProductFromShoppingList(),
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
      if (props.product.isDiscountProduct) props.product.isDiscountProduct = false
      props.product.isOrganic = !props.product.isOrganic
      productStore.updateProductFromShoppingList(props.product)

    }
  },
  {
    label: 'Diskonter',
    command: () => {
      if (props.product.isOrganic) props.product.isOrganic = false
      props.product.isDiscountProduct = !props.product.isDiscountProduct
      productStore.updateProductFromShoppingList(props.product)
    }
  }
])

function onRightClick(event: any) {
  menu.value.show(event)
}

function removeProductFromShoppingList() {
  productStore.removeProductFromShoppingList(props.product.productId)
}
</script>

<template>
  <PrimeButton
      class="bg-trolley-primary flex-col text-white w-[6.25rem] aspect-square rounded-2xl"
      @click="removeProductFromShoppingList()"
      @contextmenu="onRightClick">
    <Icon :name="'fa6-solid:'+ product.iconName" class="text-7xl"/>
    <span class="text-xs mt-1" v-if="product.isOrganic">Bio {{ product.productName }}</span>
    <span class="text-xs mt-1" v-else-if="product.isDiscountProduct">Diskonter {{ product.productName }}</span>
    <span class="text-xs mt-1" v-else>{{ product.productName }}</span>
    <span class="text-xs mt-1">{{ product.amount }}</span>
  </PrimeButton>

  <PrimeContextMenu ref="menu" :model="items">
    <template #item="{item, props}">
      <PrimeInputNumber v-if="item.label === 'Anzahl'" v-model="product.amount" v-bind="props.action"
                        inputId="horizontal-buttons2" showButtons buttonLayout="horizontal" :min="1" class="ms-2 me-12"
                        inputClass="text-sm text-center w-10 h-8"
                        decrementButtonClass="w-1/3 h-8 bg-trolley-primary  border-trolley-primary"
                        incrementButtonClass="w-1/3 h-8 bg-trolley-primary border-trolley-primary">
        <template #decrementbuttonicon>-</template>
        <template #incrementbuttonicon>+</template>
      </PrimeInputNumber>
      <span v-else class="mx-4 my-3" v-bind="props.action">{{ item.label }}</span>
    </template>
  </PrimeContextMenu>
</template>