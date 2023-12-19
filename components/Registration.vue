<script setup lang="ts">
import * as yup from 'yup'
import VeePassword from "~/components/VeePassword.vue";

const authStore = useAuthStore();
const registrationDialog = computed(() => authStore.registrationDialog)
const userErrorMessage = ref('');

const visible = ref(false)

const toast = useToast()

watch(registrationDialog, () => visible.value = registrationDialog.value)
watch(visible, () => authStore.registrationDialog = visible.value)

const schema = yup.object({
  email: yup.string().required().email().label('Email address'),
  password: yup.string().required().min(6).label('Password'),
  confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('password')], 'Passwörter stimmen nicht überein')
      .label('Password Confirm')
})

const initialValues = {email: '', password: '', confirmPassword: ''}

const validate = ref(false)

async function register(values: any) {
  try {
    await authStore.register(values.email, values.password)
    visible.value = false
    toast.add({severity: 'cusotm', summary: 'Registrierung erfolgreich', group: 'auth', life: 2000})
  } catch (e: any) {
    userErrorMessage.value = e
  }
}
</script>

<template>
  <PrimeDialog
      v-model:visible="visible"
      modal
      class="rounded-3xl"
      :pt="{mask: {style: 'backdrop-filter: blur(2px)'}}"
      dismissable-mask>
    <template #container="{closeCallback}">
      <div class="p-5 bg-gradient-to-r from-trolley-primary to-trolley-accent w-[400px] rounded-3xl">
        <PrimeMessage
            v-if="userErrorMessage" severity="error" class="flex"
            :pt="{
              root: {class: 'bg-orange-300 text-orange-500 border-orange-500 rounded-3xl'},
              icon: {class: 'text-orange-500'},
              closeButton: {class: 'text-orange-500'},
            }">
          {{ userErrorMessage }}
        </PrimeMessage>

        <VeeForm
            :initial-values="initialValues"
            :validation-schema="schema"
            v-slot="{meta: formMeta, error: formErrors}"
            @submit="register"
        >
          <VeeInputText label="E-Mail" name="email" type="email"/>

          <VeePassword label="Passwort" name="password" :feedback="true" :immediate-validation="validate"/>

          <VeePassword label="Passwort bestätigen" name="confirmPassword" :immediate-validation="validate"/>

          <div class="flex align-items-center gap-2">
            <PrimeButton
                label="Registrieren"
                @click="validate = true"
                text
                class="p-3 w-full text-white border-1 border-white-alpha-30 hover:bg-white-alpha-10 rounded-3xl"
                type="submit"/>
            <PrimeButton
                label="Abbrechen"
                @click="closeCallback"
                text
                class="p-3 w-full text-white rounded-3xl"
            />
          </div>
        </VeeForm>
      </div>
    </template>
  </PrimeDialog>
  <PrimeToast/>
</template>
