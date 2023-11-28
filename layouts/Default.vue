<script setup lang="ts">
import NavMobile from "~/layouts/NavMobile.vue";
import NavDesktop from "~/layouts/NavDesktop.vue";

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
  <NavDesktop v-if="windowWidth >= 500"></NavDesktop>
  <main class="p-4">
      <slot/>
  </main>
  <NavMobile v-if="windowWidth < 500"></NavMobile>
</template>

<style scoped>

</style>