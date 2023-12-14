<script setup lang="ts">
import NavMobile from "~/layouts/nav/Mobile.vue";
import NavDesktop from "~/layouts/nav/Desktop.vue";

</script>

<template>
  <NavDesktop v-if="!$device.isMobile" @login="toggleLoginDialog()"></NavDesktop>
  <main class="p-4 mb-28">
    <slot/>
  </main>
  <NavMobile v-if="$device.isMobile"/>

  <Login/>

  <Registration/>

</template>