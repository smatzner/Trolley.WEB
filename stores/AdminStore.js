import { defineStore } from 'pinia';

export const useAdminStore = defineStore('admin', () => {
    const BASE_URL = 'https://localhost:7124';

    const users = useState('users', () => []);
    const allUsersWithRoles = useState('allUsersWithRoles', () => []);
    const roles = useState('roles', () => []);
    const tempProducts = useState('tempProducts', () => []);

    async function loadUsers() {
        try {
            const { data } = await useFetch(`${BASE_URL}/api/Admin/GetAllUsers`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            users.value = data.value;
        } catch (e) {
            console.error('Error loading users:', e);
        }
    }

    async function loadTempProducts() {
        try {
            const { data } = await useFetch(`${BASE_URL}/api/Admin/GetTempProducts`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });


            tempProducts.value = data;
        } catch (e) {
            console.error('Error loading temp products:', e);
        }
    }

    async function deleteUser(userId) {
        try {
            const { data, error } = await useFetch(`${BASE_URL}/api/Admin/DeleteUser?userId=${userId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: localStorage.getItem('token'),
                    'content-type': 'application/json'
                }
            });

            if (response.ok) {
                allUsersWithRoles.value = allUsersWithRoles.value.filter(user => user.id !== userId);
            }

        } catch (e) {
            console.error('Error deleting user:', e);
        }
    }

    async function getAllUsersWithRoles() {
        try {
            const { data, error } = await useFetch(`${BASE_URL}/api/Admin/GetAllUsersWithRoles`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });

            if (error.value) {
                console.error('Error loading users with roles:', error.value);
                return;
            }

            allUsersWithRoles.value = data;
        } catch (e) {
            console.error('Error loading users with roles:', e);
        }
    }


    async function getUserRoles(userId) {
        try {
            const { data } = await useFetch(`${BASE_URL}/api/Admin/GetUserRoles?userId=${userId}`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            roles.value = data.value;
        } catch (e) {
            console.error('Error getting user roles:', e);
        }
    }

    async function addRoleToUser(userId, roleName) {
        try {
            await useFetch(`${BASE_URL}/api/Admin/AddRoleToUser`, {
                method: 'POST',
                body: JSON.stringify({ userId, roleName }),
                headers: {
                    Authorization: localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            console.error('Error adding role to user:', e);
        }
    }

    async function removeRoleFromUser(userId, roleName) {
        try {
            await useFetch(`${BASE_URL}/api/Admin/RemoveRoleFromUser`, {
                method: 'POST',
                body: JSON.stringify({ userId, roleName }),
                headers: {
                    Authorization: localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
        } catch (e) {
            console.error('Error removing role from user:', e);
        }
    }

    async function updateRoleForUser(userId, roleName) {
        try {
            await useFetch(`${BASE_URL}/api/Admin/UpdateRole`, {
                method: 'PUT',
                body: JSON.stringify({ userId, roleName }),
                headers: {
                    Authorization: localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                allUsersWithRoles.value = allUsersWithRoles.value.filter(user => user.id !== userId);
            }
        } catch (e) {
            console.error('Error updating role for user:', e);
        }
    }

    async function deleteTempProducts() {
        try {
            await useFetch(`${BASE_URL}/api/Admin/DeleteTempProducts`, {
                method: 'DELETE',
                headers: {
                    Authorization: localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
            // Aktualisiere State oder Benachrichtige das Frontend
        } catch (e) {
            console.error('Error deleting temp products:', e);
        }
    }

    async function getTempProducts() {
        try {
            const { data } = await useFetch(`${BASE_URL}/api/Admin/GetTempProducts`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            tempProducts.value = data.value;
        } catch (e) {
            console.error('Error getting temp products:', e);
        }
    }

    async function get1TempProduct(tempProductId) {
        try {
            const { data } = await useFetch(`${BASE_URL}/api/Admin/Get1TempProduct?tempProductId=${tempProductId}`, {
                method: 'GET',
                headers: {
                    Authorization: localStorage.getItem('token'),
                    'content-type': 'application/json'
                }
            });
            // Verarbeite die einzelne TempProduct-Daten
        } catch (e) {
            console.error(`Error getting temp product with id ${tempProductId}:`, e);
        }
    }

    async function approve1Product(tempProductId) {
        try {
            await useFetch(`${BASE_URL}/api/Admin/Approve1Product?tempProductId=${tempProductId}`, {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
            // Benachrichtige das Frontend über die erfolgreiche Genehmigung
        } catch (e) {
            console.error(`Error approving temp product with id ${tempProductId}:`, e);
        }
    }

    async function approveProducts() {
        try {
            await useFetch(`${BASE_URL}/api/Admin/ApproveProducts`, {
                method: 'POST',
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
        } catch (e) {
            console.error('Error approving products:', e);
        }
    }

    async function remove1Product(productId) {
        try {
            await useFetch(`${BASE_URL}/api/Admin/Remove1TempProduct?tempProductId=${productId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
        } catch (e) {
            console.error('Error removing product:', e);
        }
    }
    
    

    return {
        users,
        roles,
        allUsersWithRoles,
        tempProducts,
        loadUsers,
        getUserRoles,
        addRoleToUser,
        removeRoleFromUser,
        deleteTempProducts,
        getTempProducts,
        get1TempProduct,
        approve1Product,
        approveProducts,
        loadTempProducts,
        getAllUsersWithRoles,
        updateRoleForUser,
        deleteUser,
        remove1Product

    };
});
