<script setup lang="ts">
import NavMobile from "~/layouts/nav/Mobile.vue"
import NavDesktop from "~/layouts/nav/Desktop.vue"

</script>

<template>
  <NavDesktop v-if="!$device.isMobile"></NavDesktop>
  <main class="p-4 mb-28">
    <slot/>
  </main>
  <NavMobile v-if="$device.isMobile"/>

  <Login/>

  <Registration/>

  <Donation/>

  <PrimeToast
      position="top-center"
      group="auth"
      :pt="{
        root: {class : 'rounded-3xl md:w-96 w-5/6'},
        container: {class: 'rounded-3xl'}
      }"
  >
    <template #container="{ message, closeCallback }">
      <div class="flex flex-col gap-3 p-3 w-full bg-black shadow-2 rounded-3xl px-5">
        <div class="flex justify-between">
          <p class="m-0 font-semibold text-base text-white">{{ message.summary }}</p>
          <PrimeButton text class="text-white p-0" @click="closeCallback">
            <Icon name="fa6-solid:xmark"/>
          </PrimeButton>
        </div>
      </div>
    </template>
  </PrimeToast>

</template>