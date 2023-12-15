<template>
  <div class="card">
    <PrimeDataTable :value="tempProducts" :paginator="true" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem">
      <div class="flex flex-wrap align-items-center justify-content-between gap-2">
        <span class="text-xl text-900 font-bold">Temporäre Produkte</span>
      </div>
      <PrimeColumn field="userName" header="Shopbesitzer"></PrimeColumn>
      <PrimeColumn field="marketName" header="Marktname"></PrimeColumn>
      <PrimeColumn field="dateCreated" header="Erstellt am">
        <template #body="slotProps">{{ formatDate(slotProps.data.dateCreated) }}</template>
      </PrimeColumn>
      <PrimeColumn headerStyle="width: 10rem">
        <template #body>
          <div class="flex flex-end align-items-space-between justify-content-between gap-1">
            <PrimeButton type="button" rounded severity="primary">
              <Icon name="fa6-solid:info" />
            </PrimeButton>
            <PrimeButton type="button" rounded severity="danger">
              <Icon name="fa6-solid:x" />
            </PrimeButton>
            <PrimeButton @click="approve1Product(slotProps.data.id)" type="button" rounded severity="success">
              <Icon name="fa6-solid:check" />
            </PrimeButton>

          </div>
        </template>
      </PrimeColumn>
      <template #footer> Insgesamt gibt es {{ tempProducts ? tempProducts.length : 0 }} temporäre Produkte. </template>
    </PrimeDataTable>
    <PrimeDataTable :value="usersWithRoles" :paginator="true" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
          <span class="text-xl text-900 font-bold">Benutzer</span>
        </div>
      </template>
      <PrimeColumn field="user.id" header="ID"></PrimeColumn>
      <PrimeColumn field="user.email" header="Email"></PrimeColumn>
      <PrimeColumn field="roles" header="Rollen">
        <template #body="slotProps">{{ slotProps.data.roles.join(', ') }}</template>
      </PrimeColumn>
      <PrimeColumn headerStyle="width: 15rem">
        <template #body="slotProps">
          <div class="flex flex-end align-items-space-between justify-content-between gap-1">
            <!-- Options Button für die Rollenaktualisierung -->
            <PrimeButton type="button" rounded severity="info" @click="showRoleDialog(slotProps.data.user.id)">
              <Icon name="fa6-solid:gear" />
            </PrimeButton>
            <!-- Löschen-Button -->
            <PrimeButton type="button" rounded severity="danger" @click="deleteUser(slotProps.data.user.id)">
              <Icon name="fa6-solid:trash" />
            </PrimeButton>
          </div>
        </template>
      </PrimeColumn>
    </PrimeDataTable>

    <PrimeDialog :visible="isRoleDialogVisible" @hide="closeRoleDialog">
      <PrimeDropdown v-model="selectedRole" :options="rolesOptions" optionLabel="name" placeholder="Rolle auswählen" />
      <PrimeButton label="Update Role" @click="updateUserRole" />
    </PrimeDialog>
  </div>
</template>

<script setup>
import { useAdminStore } from '@/stores/AdminStore';


const tempProducts = computed(() => adminStore.tempProducts);
const adminStore = useAdminStore();
const usersWithRoles = computed(() => adminStore.allUsersWithRoles);
const selectedRole = ref({});
const currentUserId = ref('');
const isRoleDialogVisible = ref(false);

const rolesOptions = [
  { name: 'User', value: 'User' },
  { name: 'PremiumUser', value: 'PremiumUser' },
  { name: 'ShopOwner', value: 'ShopOwner' },
  { name: 'Admin', value: 'Admin' },
];

watch(() => adminStore.usersWithRoles, (newVal, oldVal) => {
  console.log('newVal', newVal);
  console.log('oldVal', oldVal);
}, { deep: true });


onBeforeMount(() => {
  adminStore.loadTempProducts();
  adminStore.getAllUsersWithRoles();
});


const approve1Product = (productId) => {
  adminStore.approve1Product(productId);
};


const showRoleDialog = (userId) => {
  currentUserId.value = userId;
  isRoleDialogVisible.value = true;
};

const closeRoleDialog = () => {
  isRoleDialogVisible.value = false;
};

const updateUserRole = async () => {
  if (selectedRole.value && selectedRole.value.value) {
    await adminStore.updateRoleForUser(currentUserId.value, selectedRole.value.value);
    await adminStore.getAllUsersWithRoles();
    closeRoleDialog();
  }
};

const deleteUser = async (userId) => {
  await adminStore.deleteUser(userId);
  await adminStore.getAllUsersWithRoles();
};



const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

</script>
