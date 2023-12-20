<script setup>

const toast = useToast();
const BASE_URL = 'https://localhost:7124';
const userStore = useUserStore();
const user = computed(() => userStore.user);
const isUpdating = ref(false);
const newPassword = ref('');
const currentPassword = ref('');
const dialogVisible = ref(false);
const authStore = useAuthStore();
const router = useRouter();
const userEmail = computed(() => authStore.user.email);
const email = ref('');



const items = ref([
    {
        label: 'Ja', route: '/', command: () => {
            confirmDelete();
            authStore.logout();
        }
    },
])

watch(authStore, () => {
    authStore.user.email.value = userEmail.value;
})

onBeforeMount(async () => {
    email.value = user.value?.email;
    await userStore.loadUser();
})


async function updateEmail() {
    console.log('updateEmail')
    if (!email.value) {
        toast.add({ severity: 'warn', summary: 'Warnung', detail: 'E-Mail-Adresse darf nicht leer sein', life: 5000 });
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
    toast.add({ severity: 'custom', summary: 'E-Mail geändert', group: 'auth', life: 3000 });
    authStore.initializeStore();

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
        toast.add({
            severity: 'warn',
            summary: 'Warnung',
            detail: 'Neues Passwort darf nicht gleich dem aktuellen Passwort sein',
            life: 5000
        });
        console.error('Neues Passwort darf nicht gleich dem aktuellen Passwort sein');
        return;
    }
    isUpdating.value = true;
    try {
        await userStore.updatePassword(currentPassword.value, newPassword.value);
        toast.add({
            severity: 'info',
            summary: 'Erfolg',
            detail: 'Passwort erfolgreich geändert',
            group: 'headless',
            life: 3000
        });
        currentPassword.value = '';
        newPassword.value = '';
    } catch (e) {

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
    <div class="max-w-md mx-auto p-5 bg-white rounded-lg shadow-lg">
        <div class="text-center">
            <PrimeAvatar image="/TrolleyLogo.png" size="xlarge" shape="circle"
                class="inline-block border-4 border-trolley-primary shadow-lg" />
            <h2 class="text-2xl font-semibold text-trolley-primary">{{ userEmail }}</h2>
        </div>


        <div class="mt-4">
            <label for="email" class="block ms-2 text-sm font-medium text-trolley-primary mb-1">E-Mail</label>
            <PrimeInputText v-model="email" id="email" type="email" placeholder="Neue E-Mail-Adresse"
                class="w-full rounded-3xl shadow-sm" />
            <PrimeButton label="E-Mail ändern" @click="updateEmail" :loading="isUpdating"
                class="mt-3 w-full bg-trolley-primary text-white py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-trolley-primary focus:ring-opacity-50 rounded-3xl " />
        </div>

        <div class="mt-6">
            <label for="currentPassword" class="block ms-2 text-sm font-medium text-trolley-primary">Aktuelles
                Passwort</label>
            <PrimeInputText v-model="currentPassword" id="currentPassword" type="password" placeholder="Aktuelles Passwort"
                class="w-full rounded-3xl shadow-sm" />
        </div>

        <div class="mt-2">
            <label for="newPassword" class="block ms-2 text-sm font-medium text-trolley-primary ">Neues Passwort</label>
            <PrimeInputText v-model="newPassword" id="newPassword" type="password" placeholder="Neues Passwort"
                class="w-full shadow-sm rounded-3xl" />
            <PrimeButton label="Passwort ändern" @click="updatePassword" :loading="isUpdating"
                class="mt-2 w-full bg-trolley-primary text-white py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-trolley-primary focus:ring-opacity-50 rounded-3xl" />
        </div>

        <PrimeButton label="Account löschen" severity="danger" @click="openDialog"
            class="w-full bg-red-500 mt-6 text-white py-2 hover:bg-red-600 rounded-3xl" />

        <PrimeDialog v-model:visible="dialogVisible" header="Account löschen" modal class="rounded-3xl"
            :pt="{ mask: { style: 'backdrop-filter: blur(2px)' } }" dismissable-mask>
            <template #container="{ closeCallback }">
                <div class="p-5 bg-gray-200 w-[400px] rounded-3xl">
                    <p class="text-lg text-center mb-4">Möchtest du deinen Account wirklich löschen?</p>

                    <div class="flex align-items-center gap-2 justify-center">
                        <PrimeButton label="Ja" severity="danger" @click="confirmDelete"
                            class="p-3 w-full text-white rounded-3xl" type="button" />
                        <PrimeButton label="Nein" @click="closeDialog"
                            class="p-3 w-full text-white bg-trolley-primary hover:bg-trolley-accent rounded-3xl" />
                    </div>
                </div>
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
}</style>