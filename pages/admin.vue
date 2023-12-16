<template>
  <div class="card">
    <PrimeDataTable :value="tempProducts" :paginator="true" :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
      tableStyle="min-width: 50rem">
      <div class="flex flex-wrap align-items-center justify-content-between gap-2">
        <span class="text-xl text-900 font-bold">Temporäre Produkte</span>
      </div>
      <PrimeColumn field="userName" header="Shopbesitzer"></PrimeColumn>
      <PrimeColumn field="marketName" header="Marktname"></PrimeColumn>
      <PrimeColumn field="productName" header="Produktname"></PrimeColumn>
      <PrimeColumn field="dateCreated" header="Erstellt am">
        <template #body="slotProps">{{ formatDate(slotProps.data.dateCreated) }}</template>
      </PrimeColumn>

      <PrimeColumn headerStyle="width: 10rem">
        <template #body="slotProps">
          <div class="flex flex-end align-items-space-between justify-content-between gap-1">
            <PrimeButton type="button" rounded severity="info" @click="showProductInfo(slotProps)">
              <Icon name="fa6-solid:info" severity="primary" />
            </PrimeButton>
            <PrimeButton @click="remove1Product(slotProps)" type="button" rounded severity="danger">
              <Icon name="fa6-solid:x" />
            </PrimeButton>
            <PrimeButton @click="approve1Product(slotProps)" type="button" rounded severity="success">
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

  <PrimeDialog :visible="isProductInfoVisible" @hide="closeProductInfo">
  <h3>Produktinformationen</h3>
  <p>{{ productInfo.userName }}</p>
  <p>{{ productInfo.marketName }}</p>
  <p>{{ productInfo.productName }}</p>
  <p>{{ productInfo.price }}</p>
  <p>{{ productInfo.isOrganic }}</p>
  <p>{{ productInfo.isDiscountProduct }}</p>
</PrimeDialog>

</template>

<script setup>
import { useAdminStore } from '@/stores/AdminStore';


const tempProducts = computed(() => adminStore.tempProducts);
const adminStore = useAdminStore();
const usersWithRoles = computed(() => adminStore.allUsersWithRoles);
const selectedRole = ref({});
const currentUserId = ref('');
const isRoleDialogVisible = ref(false);
const isProductInfoVisible = ref(false);
const productInfo = ref({});

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

const showProductInfo = async (slotProps) => {
  if (slotProps && slotProps.data && slotProps.data.id) {
    const productId = slotProps.data.id;
    try {
      const response = await adminStore.get1TempProduct(productId);
      console.log('Serverantwort:', response);
      if (response) {
        productInfo.value = response;
        isProductInfoVisible.value = true;
      } else {
        throw new Error('Keine Antwort vom Server');
      }
    } catch (error) {
      console.error('Fehler beim Laden der Produktinformationen:', error.message);
    }
  } else {
    console.error('Ungültige Daten: slotProps, slotProps.data oder slotProps.data.id ist undefined');
  }
};


const closeProductInfo = () => {
  isProductInfoVisible.value = false;
};

const approve1Product = async (slotProps) => {
  if (slotProps && slotProps.data) {
    await adminStore.approve1Product(slotProps.data.id);
    await adminStore.loadTempProducts();
  } else {
    console.error('slotProps oder slotProps.data ist undefined');
  }
};

const remove1Product = async (slotProps) => {
  if (slotProps && slotProps.data) {
    await adminStore.remove1Product(slotProps.data.id);
    await adminStore.loadTempProducts();
  } else {
    console.error('slotProps oder slotProps.data ist undefined');
  }
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
``
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