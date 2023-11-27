<template>
  <div class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200">
    <div class="grid h-full max-w-lg grid-cols-3 mx-auto">
      <Button text rounded aria-label="Einstellungen">
        <Icon name="fa6-solid:gear"></Icon>
      </Button>
      <Button text rounded aria-label="Suche">
        <Icon name="fa6-solid:magnifying-glass"></Icon>
      </Button>
      <Button text rounded aria-label="User">
        <Icon name="fa6-solid:user"></Icon>
      </Button>
    </div>
  </div>
</template>

<script setup>

const items = ref([
  {
    label: 'Einstellungen',
    icon: '/icons/settings.svg'
  }
])
</script>
