<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'text'
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
})
</script>

<template>
  <VeeField :name="name" v-slot="{field, meta, errors}">
    <label class="flex flex-col m-4">

      <span class="font-light text-white text-sm mb-1 ms-3">{{ label }}</span>

      <input
          v-bind="field"
          class="p-3 rounded-3xl"
          :class="{
                    'border-orange-400' : !meta.valid && meta.touched
                  }"
          :placeholder="placeholder"
          :type="type"
      />

      <VeeErrorMessage :name="name" as="small" class="text-orange-400 mt-1 ms-3 font-medium"/>
    </label>
  </VeeField>
</template>