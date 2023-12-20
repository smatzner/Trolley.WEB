<script setup lang="ts">
definePageMeta({
  middleware: 'shop-owner'
})

const file = ref()
const BASE_URL = 'https://localhost:7124'

const authStore = useAuthStore()
const userId = computed(() => authStore.user.id)
const marketName = ref()

const isDragging = ref(false)

const toast = useToast()

async function submitUpload() {
  let formData = new FormData()
  formData.append('userId', userId.value)
  formData.append('marketName', marketName.value)
  formData.append('file', file.value)

  const {data} = await useFetch(BASE_URL + '/api/Upload/Csv', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: localStorage.getItem('token')
    }
  })

  toast.add({severity: 'custom', summary: 'Datei erfolgreich hochgeladen', group: 'auth', life: 2000})
  file.value = null
  marketName.value = ''
}

function dropFile(e: any) {
  isDragging.value = false
  file.value = e.dataTransfer.files[0]
}

function dragOver() {
  isDragging.value = true
}

function dragLeave() {
  isDragging.value = false
}

function chooseFile(e: any) {
  file.value = e.target.files[0]
}
</script>

<template>
  <div class="flex justify-center">
    <form @submit.prevent="submitUpload" class="w-[330px] p-5 bg-white shadow-2xl rounded-2xl border-0">
      <div class="mx-auto mt-3">
        <span class="p-float-label">
          <PrimeInputText
              id="marketName"
              v-model="marketName"
              class="rounded-3xl"
          />
          <label for="marketName">Marktname</label>
        </span>
      </div>

      <label
          for="dropzone-file"
          class="mt-5 flex flex-col items-center justify-center w-full aspect-square border-2 border-gray-300 border-dashed rounded-3xl cursor-pointer bg-gray-50 hover:bg-gray-100"
          @drop.prevent="dropFile($event)"
          @dragover.prevent="dragOver"
          @dragleave="dragLeave"
      >
        <template v-if="file">
          <PrimeCard class="bg-white p-5 rounded-2xl shadow w-44 relative" unstyled>
            <template #header>
              <PrimeBadge
                  unstyled
                  class="absolute -top-2 -right-2 rounded-full bg-red-600 w-7 h-7 flex justify-center items-center"
                  @click.prevent="file = null">
                <Icon name="fa6-solid:xmark" class="text-white"/>
              </PrimeBadge>
            </template>
            <template #content>
              <PrimeImage src="https://upload.wikimedia.org/wikipedia/commons/3/3d/Logo_CSV.svg" alt="Image"/>
              <span class="text-xs">{{ file.name }}</span>
            </template>
          </PrimeCard>
        </template>
        <template v-else>
          <div v-if="!isDragging" class="flex flex-col items-center justify-center pt-5 pb-6">
            <Icon name="fa6-solid:cloud-arrow-up" size="50" class="mb-5"/>
            <p class="mb-2 text-sm text-gray-500 font-semibold">
              Klicken um Produktliste hochzuladen
            </p>
            <p class="text-xs text-gray-500">oder Produktliste ins Feld ziehen</p>
          </div>
          <div v-else class="flex flex-col items-center justify-center pt-5 pb-6">
            <Icon name="fa6-solid:cloud-arrow-down" size="50" class="mb-5"/>
            <p class="mb-2 text-sm text-gray-500">
              Produktliste zum hochladen hier loslassen
            </p>
            <p></p>
          </div>
        </template>

        <input id="dropzone-file" type="file" class="hidden" @change="chooseFile($event)"/>
      </label>
      <PrimeButton
          type="submit"
          label="Hochladen"
          size="small"
          class="float-right mt-5 bg-trolley-primary border-trolley-primary rounded-3xl"
      />
    </form>
  </div>

</template>

<style scoped>

</style>

