<script setup lang="ts">
// const toast = useToast();
//
// const totalSize = ref(0);
// const totalSizePercent = ref(0);
// const files = ref([]);
//
// const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
//   removeFileCallback(index);
//   totalSize.value -= parseInt(formatSize(file.size));
//   totalSizePercent.value = totalSize.value / 10;
// };
//
// const onClearTemplatingUpload = (clear) => {
//   clear();
//   totalSize.value = 0;
//   totalSizePercent.value = 0;
// };
//
// const onSelectedFiles = (event) => {
//   files.value = event.files;
//   files.value.forEach((file) => {
//     totalSize.value += parseInt(formatSize(file.size));
//   });
// };
//
// const uploadEvent = (callback) => {
//   totalSizePercent.value = totalSize.value / 10;
//   callback();
// };
//
// const onTemplatedUpload = () => {
//   toast.add({severity: "info", summary: "Success", detail: "File Uploaded", life: 3000});
// };
//
// const formatSize = (bytes) => {
//   const k = 1024;
//   const dm = 3;
//   const sizes = this.$primevue.config.locale.fileSizeTypes;
//
//   if (bytes === 0) {
//     return `0 ${sizes[0]}`;
//   }
//
//   const i = Math.floor(Math.log(bytes) / Math.log(k));
//   const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
//
//   return `${formattedSize} ${sizes[i]}`;
// }

async function uploadCsv(event){
  console.log($event)
}

</script>

<template>
  <h1>Shop Owner</h1>
  <form>
    <span class="p-float-label">
      <PrimeInputText
          id="marketName"
      />
      <label for="marketName">Marktname</label>
    </span>
    <PrimeFileUpload
        name="demo[]"
        url="/api/upload"
        @upload="uploadCsv($event)"
        :multiple="true"
        accept=".csv"
        :maxFileSize="1000000"
    >
      <template #empty>
        <p>Drag and drop files to here to upload.</p>
      </template>
    </PrimeFileUpload>
    <PrimeToast/>
<!--    <PrimeFileUpload
        name="demo[]"
        url="/api/upload"
        @upload="onTemplatedUpload($event)"
        :multiple="true"
        accept="csv/*"
        :maxFileSize="1000000"
        @select="onSelectedFiles"
    >
      <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
        <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
          <div class="flex gap-2">
            <PrimeButton
                @click="chooseCallback()"
                rounded
                class="p-0 w-[50px] h-[50px] flex justify-center"
                outlined
            >
              <Icon name="prime:folder-open" size="24px"/>
            </PrimeButton>
            <PrimeButton
                @click="uploadEvent(uploadCallback)"
                rounded
                outlined
                severity="success"
                class="p-0 w-[50px] h-[50px] flex justify-center"
                :disabled="!files || files.length === 0"
            >
              <Icon name="prime:cloud-upload" size="24px"/>
            </PrimeButton>
            <PrimeButton
                @click="clearCallback()"
                rounded
                outlined
                severity="danger"
                class="p-0 w-[50px] h-[50px] flex justify-center"
                :disabled="!files || files.length === 0"
            >
              <Icon name="prime:times" size="24px"/>
            </PrimeButton>
          </div>
          <PrimeProgressBar
              :value="totalSizePercent"
              :showValue="false"
              :class="['md:w-20rem h-1rem w-full md:ml-auto', { 'exceeded-progress-bar': totalSizePercent > 100 }]"
          >
            <span class="white-space-nowrap">{{ totalSize }}B / 1Mb</span>
          </PrimeProgressBar>
        </div>
      </template>
      <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
        <div v-if="files.length > 0">
          <h5>Pending</h5>
          <div class="flex flex-wrap p-0 sm:p-5 gap-5">
            <div v-for="(file, index) of files" :key="file.name + file.type + file.size"
                 class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
              <div>
                <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50"
                     class="shadow-2"/>
              </div>
              <span class="font-semibold">{{ file.name }}</span>
              <div>{{ formatSize(file.size) }}</div>
              <PrimeBadge value="Pending" severity="warning"/>
              <PrimeButton
                  @click="onRemoveTemplatingFile(file, removeFileCallback, index)"
                  outlined
                  rounded
                  class="p-0 w-[50px] h-[50px] flex justify-center"
                  severity="danger"
              >
                <Icon name="prime:times" size="24px"/>
              </PrimeButton>
            </div>
          </div>
        </div>

        <div v-if="uploadedFiles.length > 0">
          <h5>Completed</h5>
          <div class="flex flex-wrap p-0 sm:p-5 gap-5">
            <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size"
                 class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
              <div>
                <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50"
                     class="shadow-2"/>
              </div>
              <span class="font-semibold">{{ file.name }}</span>
              <div>{{ formatSize(file.size) }}</div>
              <PrimeBadge value="Completed" class="mt-3" severity="success"/>
              <PrimeButton
                  @click="removeUploadedFileCallback(index)"
                  outlined
                  rounded
                  severity="danger"
              >
                <Icon name="prime:times" size="24px"/>
              </PrimeButton>
            </div>
          </div>
        </div>
      </template>
      <template #empty>
        <div class="grid justify-items-center">
          <Icon name="prime:cloud-upload" size="100px" class="border-2 rounded-full p-5 w-[160px] h-[160px]"/>
          <p class="mt-4 mb-0">Drag and drop files to here to upload.</p>
        </div>
      </template>
    </PrimeFileUpload>-->
  </form>
</template>

<style scoped>

</style>

