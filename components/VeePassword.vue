<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  feedback: {
    type: Boolean,
    default: false
  },
  immediateValidation:{
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <VeeField :name="name" v-slot="{field, meta, errors}">
    <label class="flex flex-col m-4">

      <span class="font-light text-white text-sm mb-1">{{ label }}</span>

      <PrimePassword
          type="password"
          class="border-none"
          :class="{
                    'border-orange-400' : !meta.valid && meta.touched
                  }"
          :feedback="feedback"
          toggleMask
          :inputProps="field"
          inputClass="w-full"
          weakLabel="Schwaches Passwort"
          mediumLabel="Durchschnittliches Passwort"
          strongLabel="Starkes Passwort"
      />

      <VeeErrorMessage v-if="immediateValidation" :name="name" as="small" class="text-orange-400 mt-1 font-medium"/>

    </label>
  </VeeField>
</template>
