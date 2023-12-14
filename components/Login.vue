<script setup lang="ts">

const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const loginDialog = computed(() => authStore.loginDialog)
const userErrorMessage = ref('');

const visible = ref(false)

const toast = useToast()

watch(loginDialog, () => visible.value = loginDialog.value)
watch(visible, () => authStore.loginDialog = visible.value)

async function login() {
  try {
    await authStore.login(email.value, password.value)
    visible.value = false
    toast.add({severity: 'custom', summary: 'Login erfolgreich',group:'auth', life: 2000})
  } catch (e: any) {
    console.log(e)// TODO: validation
  }
}
</script>

<template>
  <PrimeDialog v-model:visible="visible" modal :pt="{mask: {style: 'backdrop-filter: blur(2px)'}}" dismissable-mask>
    <template #container="{closeCallback}">
      <div class="p-5 rounded-md bg-gradient-to-r from-trolley-primary to-trolley-accent">
        <form @submit.prevent="login">
          <label class="flex flex-col m-4">
            <span class="font-light text-white text-sm mb-1">E-Mail</span>
            <PrimeInputText v-model="email" class="border-none p-3"/>
          </label>
          <label class="flex flex-col m-4">
            <span class="font-light text-white text-sm mb-1">Password</span>
            <PrimeInputText v-model="password" class="border-none p-3" type="password"/>
          </label>
          <div class="flex align-items-center gap-2">
            <PrimeButton label="Sign-In" text
                         class="p-3 w-full text-white border-1 border-white-alpha-30 hover:bg-white-alpha-10"
                         type="submit"/>
            <PrimeButton label="Cancel" @click="closeCallback" text class="p-3 w-full text-white"/>
          </div>
        </form>
      </div>
    </template>
  </PrimeDialog>

</template>
