<script setup lang="ts">

const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const loginDialog = computed(() => authStore.loginDialog)
const userErrorMessage = ref('');

const visible = ref(false)

watch(loginDialog, () => visible.value = loginDialog.value)
watch(visible, () => authStore.loginDialog = visible.value)
async function login() {
  try {
    await authStore.login(email.value, password.value)
    visible.value = false
  } catch (e) {
    console.error(e) // TODO: validation
  }
}
</script>

<template>
  <PrimeDialog v-model:visible="visible" modal :pt="{mask: {style: 'backdrop-filter: blur(2px)'}}" dismissable-mask>
    <template #container="{closeCallback}">
      <form @submit.prevent="login">
        <div class="p-5 rounded-md bg-gradient-to-r from-trolley-primary to-trolley-accent">
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
        </div>
      </form>
    </template>
  </PrimeDialog>
</template>
