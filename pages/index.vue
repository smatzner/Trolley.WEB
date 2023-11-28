<script setup lang="ts">
const icons = [
  {
    name: 'Heidelbeeren',
    path: '/icons/blueberries.svg'
  },
  {
    name: 'Camembert',
    path: '/icons/cheesse.svg'
  },
  {
    name: 'Milch',
    path: '/icons/milk.svg'
  },
]

</script>

<template>
  <h1>Obst & Gemüse</h1>
  <div class="mx-auto flex justify-center">
    <PrimeButton v-for="icon in icons" :style="{ backgroundImage: `url(${icon.path})` }"
                 class="bg-trolley-primary m-4 icon-button text-white">
    </PrimeButton>
  </div>

</template>

<style scoped>
.icon-button {
  width: 100px;
  height: 100px;
  fill: white;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center 10px;
}
</style>