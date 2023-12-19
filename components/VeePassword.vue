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

      <span class="font-light text-white text-sm mb-1 ms-3">{{ label }}</span>

      <PrimePassword
          type="password"
          :class="{
                    'border-orange-400' : !meta.valid && meta.touched
                  }"
          :feedback="feedback"
          toggleMask
          :inputProps="field"
          inputClass="w-full rounded-3xl"
          weakLabel="Schwaches Passwort"
          mediumLabel="Durchschnittliches Passwort"
          strongLabel="Starkes Passwort"
          :pt="{
            hideIcon: {class: 'me-1'},
            showIcon: {class: 'me-1'}
          }"
      />

      <VeeErrorMessage v-if="immediateValidation" :name="name" as="small" class="text-orange-400 mt-1 ms-3 font-medium"/>

    </label>
  </VeeField>
</template>
