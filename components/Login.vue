<script setup lang="ts">
import * as yup from "yup";

const authStore = useAuthStore();
const loginDialog = computed(() => authStore.loginDialog)
const userErrorMessage = ref('');

const visible = ref(false)

const toast = useToast()

watch(loginDialog, () => visible.value = loginDialog.value)
watch(visible, () => authStore.loginDialog = visible.value)


const schema = yup.object({
  email: yup.string().required().email().label('Email address'),
  password: yup.string().required().label('Password')
})

const initialValues = {email: '', password: ''}

async function login(values: any) {
  try {
    await authStore.login(values.email, values.password)
    visible.value = false
    toast.add({severity: 'custom', summary: 'Login erfolgreich', group: 'auth', life: 2000})
  } catch (e: any) {
    console.error(e)// TODO: validation
    userErrorMessage.value = 'Email oder Passwort inkorrekt'
  }
}


</script>

<template>
  <PrimeDialog v-model:visible="visible" modal :pt="{mask: {style: 'backdrop-filter: blur(2px)'}}" dismissable-mask
               class="rounded-3xl">
    <template #container="{closeCallback}">
      <div class="p-5 bg-gradient-to-r from-trolley-primary to-trolley-accent rounded-3xl">
        <PrimeMessage v-if="userErrorMessage" severity="error" class="h-12 flex"
                      :pt="{
                          root: {class: 'bg-orange-300 text-orange-500 border-orange-500 border-l-8 rounded-3xl'},
                          icon: {class: 'text-orange-500'},
                          closeButton: {class: 'text-orange-500'},
                      }">
          {{ userErrorMessage }}
        </PrimeMessage>

        <VeeForm
            :initial-values="initialValues"
            :validation-schema="schema"
            v-slot="{meta: formMeta, error: formErrors}"
            @submit="login"
        >
          <VeeInputText label="E-mail" name="email" type="email"/>

          <VeePassword label="Passwort" name="password"/>

          <div class="flex align-items-center gap-2">
            <PrimeButton
                label="Login"
                text
                class="p-3 w-full text-white border-1 border-white-alpha-30 hover:bg-white-alpha-10 rounded-3xl"
                type="submit"
            />
            <PrimeButton label="Abbrechen" @click="closeCallback" text class="p-3 w-full text-white rounded-3xl"/>
          </div>

        </VeeForm>
      </div>
    </template>
  </PrimeDialog>

</template>
