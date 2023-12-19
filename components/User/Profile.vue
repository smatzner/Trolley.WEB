<script setup>
// definePageMeta({
//     middleware: 'auth'
// })

const toast = useToast();
const BASE_URL = 'https://localhost:7124';
const userStore = useUserStore();
const user = computed(() => userStore.user);
const isUpdating = ref(false);
const email = ref('');
const newPassword = ref('');
const currentPassword = ref('');
const dialogVisible = ref(false);
const authStore = useAuthStore();
const router = useRouter();


const items = ref([
    {
        label: 'Ja', route: '/', command: () => {
            confirmDelete();
            authStore.logout();
        }
    },
])

onBeforeMount(async () => {
    email.value = user.value?.email;
    await userStore.loadUser();
})


async function updateEmail() {
    if (!email.value) {
        toast.add({ severity: 'warn', summary: 'Warnung', detail: 'E-Mail-Adresse darf nicht leer sein', life: 5000 });
        console.error('E-Mail-Adresse darf nicht leer sein');
        return;
    }
    const emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
    if (!emailRegex.test(email.value)) {
        toast.add({ severity: 'warn', summary: 'Warnung', detail: 'E-Mail-Adresse ist nicht valide', life: 5000 });
        console.error('E-Mail-Adresse ist nicht valide');
        return;
    }

    isUpdating.value = true;
    const { data, pending, refresh, error: fetchError } = await useFetch(`${BASE_URL}/api/AppUser/UpdateEmail`, {
        method: 'PUT',
        headers: {
            Authorization: localStorage.getItem('token'),

        },
        body: JSON.stringify({ newEmail: email.value })
    });
    isUpdating.value = pending.value;
    error.value = fetchError.value;

    if (!pending.value || data.value) {
        user.value.email = email.value;
    }
    toast.add({ severity: 'custom', summary: 'E-Mail geändert', group: 'headless', life: 3000 });

    if (fetchError.value) {
        toast.add({ severity: 'error', summary: 'Fehler aufgetreten', detail: fetchError.value, life: 5000 });
        console.error('Fehler beim Aktualisieren der E-Mail:', fetchError.value);
    }

    if (refresh.value) {
        await refresh.value();
    }
}

async function updatePassword() {
    if (!currentPassword.value || !newPassword.value) {
        toast.add({ severity: 'warn', summary: 'Warnung', detail: 'Passwort darf nicht leer sein', life: 5000 });
        console.error('Passwort darf nicht leer sein');
        return;
    }
    if (currentPassword.value === newPassword.value) {
        toast.add({ severity: 'warn', summary: 'Warnung', detail: 'Neues Passwort darf nicht gleich dem aktuellen Passwort sein', life: 5000 });
        console.error('Neues Passwort darf nicht gleich dem aktuellen Passwort sein');
        return;
    }
    isUpdating.value = true;
    try {
        await userStore.updatePassword(currentPassword.value, newPassword.value);
        toast.add({ severity: 'info', summary: 'Erfolg', detail: 'Passwort erfolgreich geändert', group: 'headless', life: 3000 });
        currentPassword.value = '';
        newPassword.value = '';
    } catch (e) {
        console.error(e);
        toast.add({ severity: 'error', summary: 'Fehler aufgetreten', detail: e.message, life: 5000 });
    } finally {
        isUpdating.value = false;
    }
}


async function confirmDelete() {
    try {
        await userStore.deleteUser();
        toast.add({ severity: 'custom', summary: 'Account gelöscht', group: 'headless', life: 3000 });
        authStore.logout();
        router.push('/');
        toast.add({ severity: 'custom', summary: 'Account erfolgreich gelöscht!', group: 'auth', life: 2000 });
    } catch (e) {
        console.error(e);
        toast.add({ severity: 'error', summary: 'Fehler aufgetreten', detail: e.message, life: 5000 });
    }
}

function openDialog() {
    dialogVisible.value = true;
}

function closeDialog() {
    dialogVisible.value = false;
}

</script>

<template>
    <div class="max-w-md mx-auto p-5 bg-blue-100 rounded-lg shadow-lg">
        <div class="text-center">
            <PrimeAvatar image="/TrolleyLogo.png" size="xlarge" shape="circle" class="inline-block border-4 border-blue-500 shadow-lg" />
            <h2 class="text-2xl font-semibold text-blue-600">Userprofil</h2>
        </div>

        <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-blue-700 mb-1">E-Mail</label>
            <PrimeInputText v-model="email" id="email" type="email" placeholder="Neue E-Mail-Adresse" class="w-full border-blue-300 rounded-md shadow-sm" />
            <PrimeButton label="E-Mail ändern" @click="updateEmail" :loading="isUpdating" class="mt-3 w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-600 " />
        </div>

        <div class="mb-4">
            <label for="currentPassword" class="block text-sm font-medium text-blue-700">Aktuelles Passwort</label>
            <PrimeInputText v-model="currentPassword" id="currentPassword" type="password" placeholder="Aktuelles Passwort" class="w-full border-blue-300 rounded-md shadow-sm" />
        </div>

        <div class="mb-6">
            <label for="newPassword" class="block text-sm font-medium text-blue-700 ">Neues Passwort</label>
            <PrimeInputText v-model="newPassword" id="newPassword" type="password" placeholder="Neues Passwort" class="w-full border-blue-300 rounded-md shadow-sm" />
            <PrimeButton label="Passwort ändern" @click="updatePassword" :loading="isUpdating" class="mt-3 w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-600" />
        </div>

        <PrimeButton label="Account löschen" @click="openDialog" class="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600" />

        <PrimeDialog v-model:visible="dialogVisible" header="Account löschen" :modal="true" closable>
            <p>Möchtest du deinen Account wirklich löschen?</p>
            <template #footer>
                <PrimeButton label="Nein" icon="pi pi-times" @click="closeDialog" class="mr-2 bg-blue-900" />
                <PrimeButton label="Ja" icon="pi pi-check" @click="confirmDelete" autofocus class="bg-red-500 text-white" />
            </template>
        </PrimeDialog>
    </div>
</template>

  
  
<style scoped>
.user-profile {
    padding: 20px;
}

.form-group {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 0.5rem;
}

/* Responsive Styling für breitere Bildschirme */
@media (min-width: 768px) {
    .user-profile {
        max-width: 600px;
        margin: auto;
    }
}
</style>