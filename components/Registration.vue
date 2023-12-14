<script setup lang="ts">

const email = ref('');
const password = ref('');
const confirmPassword = ref('')
const authStore = useAuthStore();
const registrationDialog = computed(() => authStore.registrationDialog)
const userErrorMessage = ref('');

const visible = ref(false)

const toast = useToast()

watch(registrationDialog, () => visible.value = registrationDialog.value)
watch(visible, () => authStore.registrationDialog = visible.value)

async function register() {
  if(password.value === confirmPassword.value){
    try {
      await authStore.register(email.value, password.value)
      visible.value = false
      toast.add({ severity: 'cusotm', summary: 'Registrierung erfolgreich', group: 'auth', life: 2000 })
    } catch (e : any) {
      console.log(e.status)
    }
  } else {
    console.log('Passwörter stimmen nicht überein') // TODO: validation
  }
}
</script>

<template>
  <PrimeDialog v-model:visible="visible" modal :pt="{mask: {style: 'backdrop-filter: blur(2px)'}}" dismissable-mask>
    <template #container="{closeCallback}">
      <form @submit.prevent="register">
        <div class="p-5 rounded-md bg-gradient-to-r from-trolley-primary to-trolley-accent">
          <label class="flex flex-col m-4">
            <span class="font-light text-white text-sm mb-1">E-Mail</span>
            <PrimeInputText v-model="email" class="border-none p-3"/>
          </label>
          <label class="flex flex-col m-4">
            <span class="font-light text-white text-sm mb-1">Passwort</span>
            <PrimePassword v-model="password" class="border-none" type="password" promptLabel="Passwort wählen"
                           weakLabel="Schwaches Passwort" mediumLabel="Durchschnittliches Passwort" strongLabel="Starkes Passwort"/>
          </label>
          <label class="flex flex-col m-4">
            <span class="font-light text-white text-sm mb-1">Passwort bestätigen</span>
            <PrimePassword v-model="confirmPassword" class="border-none" type="password" :feedback="false"/>
          </label>
          <div class="flex align-items-center gap-2">
            <PrimeButton label="Registrieren" text
                         class="p-3 w-full text-white border-1 border-white-alpha-30 hover:bg-white-alpha-10"
                         type="submit"/>
            <PrimeButton label="Abbrechen" @click="closeCallback" text class="p-3 w-full text-white"/>
          </div>
        </div>
      </form>
    </template>
  </PrimeDialog>
  <PrimeToast/>
</template>
