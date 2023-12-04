<script setup lang="ts">
import NavMobile from "~/layouts/nav/Mobile.vue";
import NavDesktop from "~/layouts/nav/Desktop.vue";

const windowWidth = ref()

onMounted(() => {
  if (process.client) {
    windowWidth.value = window.innerWidth
    window.addEventListener('resize', () => {
      windowWidth.value = window.innerWidth
    })
  }
})


</script>

<template>
  <NavDesktop v-if="windowWidth > 960"></NavDesktop>
  <main class="p-4">
      <slot/>
  </main>
<!--  <NavMobile v-if="windowWidth <= 960"></NavMobile>-->
  <NavMobile/>
</template>

<style scoped>

</style>