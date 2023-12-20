<script setup lang="ts">
const props = defineProps({
  error: Object
})

const errorDialog = ref(false)
</script>

<template>
  <PrimeButton
      class="h-[15px] w-[45px] rounded-[20px] flex mx-auto mt-1 bg-gray-400 opacity-20 border-0 z-10"
      size="small"
      unstyled
      @click="errorDialog = true"
  />
  <div
      class="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
    <div class="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
      <div class="relative">
        <div class="absolute">
          <div class="">
            <h1 class="my-2 text-gray-800 font-bold text-2xl">
              Es sieht so aus, als hättest du den Eingang zum großen Nichts gefunden. Tut uns leid!
            </h1>
            <p class="my-2 text-gray-800">Bitte besuche unsere Startseite, um dahin zu gelangen, wo du hin möchtest.</p>
            <PrimeButton
                @click="clearError({redirect: '/'})"
                label="Bring mich zurück!"
                size="small"
                class="sm:w-full lg:w-auto my-2 px-8 text-center bg-trolley-primary text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-trolley-primary focus:ring-opacity-50 rounded-3xl"/>
          </div>
        </div>
        <div>
          <img src="https://i.ibb.co/G9DC8S0/404-2.png"/>
        </div>
      </div>
    </div>
    <div>
      <img src="https://i.ibb.co/ck1SGFJ/Group.png"/>
    </div>
  </div>

  <PrimeDialog
      v-model:visible="errorDialog"
      position="top"
      dismissable-mask
      header="Error"
  >
    <p><span class="font-semibold">Statuscode</span>: {{ error.statusCode }}</p>
    <p><span class="font-semibold">Message</span>: {{ error.message }}</p>

  </PrimeDialog>
</template>